document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.carousel-card');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const containerGlobal = document.querySelector('.container');

    if (!track || !cards.length || !containerGlobal || !prevButton || !nextButton) {
        console.error("Éléments du carousel introuvables. Vérifiez les sélecteurs dans le HTML.");
        return;
    }

    const cardWidth = cards[0].offsetWidth;
    const gap = parseInt(window.getComputedStyle(track).gap);
    const containerWidth = containerGlobal.offsetWidth;
    const totalCardsWidth = cards.length * (cardWidth + gap) - gap;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let velocity = 0;
    let lastTime = 0;
    let lastPos = 0;

    const enableCarousel = () => totalCardsWidth > containerWidth;

    const setTransform = (position) => {
        track.style.transform = `translateX(${position}px)`;
    };

    const limitTranslate = (translate) => {
        const maxTranslate = 0;
        const minTranslate = -(totalCardsWidth - containerWidth);
        return Math.min(Math.max(translate, minTranslate), maxTranslate);
    };

    const canScrollLeft = () => currentTranslate < 0;
    const canScrollRight = () => currentTranslate > -(totalCardsWidth - containerWidth);

    const startDrag = (e) => {
        if (!enableCarousel()) return;
        isDragging = true;
        startPos = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        lastPos = startPos;
        lastTime = performance.now();
        track.style.cursor = 'grabbing';
        track.style.userSelect = 'none';
        track.style.transition = 'none';
    };

    const drag = (e) => {
        if (isDragging) {
            const currentPosition = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            const currentTime = performance.now();
            const timeDiff = currentTime - lastTime;

            if (timeDiff > 0) {
                velocity = (currentPosition - lastPos) / timeDiff;
                lastPos = currentPosition;
                lastTime = currentTime;
            }

            const diff = currentPosition - startPos;
            currentTranslate = limitTranslate(prevTranslate + diff);
            setTransform(currentTranslate);

            updateControls();
        }
    };

    const stopDrag = () => {
        if (isDragging) {
            isDragging = false;
            track.style.cursor = 'grab';
            track.style.userSelect = 'auto';

            if (Math.abs(velocity) > 0.1) {
                applyInertia();
            } else {
                track.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)';
                // Pas de crantage ici
            }

            updateControls();
        }
    };

    const applyInertia = () => {
        const inertiaDuration = 500;
        const inertiaDistance = velocity * inertiaDuration * 0.5;

        currentTranslate = limitTranslate(currentTranslate + inertiaDistance);
        track.style.transition = `transform ${inertiaDuration}ms ease-out`;
        setTransform(currentTranslate);

        velocity = 0;
        prevTranslate = currentTranslate;

        setTimeout(() => {
            track.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)';
            // Pas de crantage ici
            updateControls();
        }, inertiaDuration);
    };

    const updateControls = () => {
        if (!enableCarousel()) {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
        } else {
            prevButton.style.display = 'flex';
            nextButton.style.display = 'flex';
        }

        if (currentTranslate >= 0) {
            prevButton.disabled = true;
            prevButton.style.opacity = '0.5';
        } else {
            prevButton.disabled = false;
            prevButton.style.opacity = '1';
        }

        if (currentTranslate <= -(totalCardsWidth - containerWidth)) {
            nextButton.disabled = true;
            nextButton.style.opacity = '0.5';
        } else {
            nextButton.disabled = false;
            nextButton.style.opacity = '1';
        }
    };

    track.addEventListener('mousedown', startDrag);
    track.addEventListener('touchstart', startDrag, { passive: true });

    window.addEventListener('mousemove', drag);
    window.addEventListener('touchmove', drag, { passive: true });

    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchend', stopDrag);

    prevButton.addEventListener('click', () => {
        if (!enableCarousel() || !canScrollLeft()) return;
        currentTranslate = limitTranslate(currentTranslate + (cardWidth + gap));
        setTransform(currentTranslate);
        prevTranslate = currentTranslate;
        updateControls();
    });

    nextButton.addEventListener('click', () => {
        if (!enableCarousel() || !canScrollRight()) return;
        currentTranslate = limitTranslate(currentTranslate - (cardWidth + gap));
        setTransform(currentTranslate);
        prevTranslate = currentTranslate;
        updateControls();
    });

    updateControls();
    window.addEventListener('resize', updateControls);
});