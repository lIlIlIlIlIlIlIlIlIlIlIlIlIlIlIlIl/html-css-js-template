document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const container = document.querySelector('.carousel-container');
    const cards = document.querySelectorAll('.carousel-card');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const containerGlobal = document.querySelector('.container');
    const moreInfoButtons = document.querySelectorAll('.more-info-button');

    let cardWidth, gap, containerWidth, totalCardsWidth;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let velocity = 0;
    let lastTime = 0;
    let lastPos = 0;

    const calculateDimensions = () => {
        cardWidth = cards[0].offsetWidth;
        gap = parseInt(window.getComputedStyle(track).gap) || 0;
        containerWidth = containerGlobal.offsetWidth;
        totalCardsWidth = cards.length * (cardWidth + gap) - gap;
    };

    const enableCarousel = () => totalCardsWidth > containerWidth;

    const setTransform = (position) => {
        container.style.transform = `translateX(${position}px)`;
    };

    const limitTranslate = (translate) => Math.min(Math.max(translate, -(totalCardsWidth - containerWidth)), 0);

    const startDrag = (e) => {
        if (!enableCarousel()) return;
        isDragging = true;
        startPos = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        lastPos = startPos;
        lastTime = performance.now();
        container.style.cursor = 'grabbing';
        container.style.userSelect = 'none';
        container.style.transition = 'none';

        window.addEventListener('touchmove', drag, { passive: false });
    };

    const drag = (e) => {
        if (isDragging) {
            e.preventDefault();
            const currentPosition = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            const currentTime = performance.now();
            const timeDiff = currentTime - lastTime;

            if (timeDiff > 0) {
                velocity = (currentPosition - lastPos) / timeDiff;
                lastPos = currentPosition;
                lastTime = currentTime;
            }

            const diff = currentPosition - startPos;
            currentTranslate = prevTranslate + diff;

            currentTranslate = limitTranslate(currentTranslate) + diff * 0.2;

            setTransform(currentTranslate);
        }
    };

    const stopDrag = () => {
        if (isDragging) {
            isDragging = false;
            container.style.cursor = 'grab';
            container.style.userSelect = 'auto';

            if (currentTranslate > 0 || currentTranslate < -(totalCardsWidth - containerWidth)) {
                springBack();
            } else if (Math.abs(velocity) > 0.1) {
                applyInertia();
            } else {
                snapToNearestCard();
            }

            updateControls();

            window.removeEventListener('touchmove', drag);
        }
    };

    const springBack = () => {
        const maxTranslate = -(totalCardsWidth - containerWidth);
        const targetTranslate = currentTranslate > 0 ? 0 : maxTranslate;
        container.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
        currentTranslate = targetTranslate;
        setTransform(currentTranslate);
        prevTranslate = currentTranslate;
    };

    const applyInertia = () => {
        const duration = 500;
        const distance = velocity * duration;

        if (currentTranslate > 0) {
            currentTranslate = 0;
            container.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
        } else if (currentTranslate < -(totalCardsWidth - containerWidth)) {
            currentTranslate = -(totalCardsWidth - containerWidth);
            container.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
        } else {
            currentTranslate = limitTranslate(currentTranslate + distance);
            container.style.transition = `transform ${duration}ms ease-out`;
        }

        setTransform(currentTranslate);
        velocity = 0;
        prevTranslate = currentTranslate;

        setTimeout(() => {
            container.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)';
            snapToNearestCard();
        }, duration);
    };

    const snapToNearestCard = () => {
        const cardWidthWithGap = cardWidth + gap;
        const maxTranslate = -(totalCardsWidth - containerWidth);

        if (currentTranslate <= maxTranslate && !isDragging) {
            const visibleCardIndex = Math.floor(Math.abs(currentTranslate) / cardWidthWithGap);
            const offset = visibleCardIndex * cardWidthWithGap;
            currentTranslate = -offset;
            container.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)';
            setTransform(currentTranslate);
            prevTranslate = currentTranslate;
            return;
        }

        let snapPosition = Math.round(currentTranslate / cardWidthWithGap) * cardWidthWithGap;
        snapPosition = Math.max(Math.min(snapPosition, 0), maxTranslate);

        container.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)';
        currentTranslate = snapPosition;
        setTransform(currentTranslate);
        prevTranslate = currentTranslate;
    };

    const updateControls = () => {
        const disabledStyle = (btn, condition) => {
            btn.disabled = condition;
            btn.style.opacity = condition ? '0.5' : '1';
        };

        if (!enableCarousel()) {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
            return;
        }

        prevButton.style.display = 'flex';
        nextButton.style.display = 'flex';
        disabledStyle(prevButton, currentTranslate >= 0);
        disabledStyle(nextButton, currentTranslate <= -(totalCardsWidth - containerWidth));
    };

    window.addEventListener('resize', () => {
        calculateDimensions();
        currentTranslate = limitTranslate(currentTranslate);
        setTransform(currentTranslate);
        prevTranslate = currentTranslate;
        updateControls();
    });

    container.addEventListener('mousedown', startDrag);
    container.addEventListener('touchstart', startDrag, { passive: true });
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchend', stopDrag);

    prevButton.addEventListener('click', () => {
        if (!enableCarousel() || currentTranslate >= 0) return;

        if (currentTranslate <= -(totalCardsWidth - containerWidth)) {
            const visibleCardIndex = Math.floor(Math.abs(currentTranslate) / (cardWidth + gap));
            const offset = visibleCardIndex * (cardWidth + gap);
            currentTranslate = -offset;
            setTransform(currentTranslate);
            prevTranslate = currentTranslate;
            snapToNearestCard();
        } else {
            currentTranslate = limitTranslate(currentTranslate + (cardWidth + gap));
            setTransform(currentTranslate);
            prevTranslate = currentTranslate;
        }

        updateControls();
    });

    nextButton.addEventListener('click', () => {
        if (!enableCarousel() || currentTranslate <= -(totalCardsWidth - containerWidth)) return;
        currentTranslate = limitTranslate(currentTranslate - (cardWidth + gap));
        setTransform(currentTranslate);
        prevTranslate = currentTranslate;
        updateControls();
    });

    moreInfoButtons.forEach(button => {
        button.addEventListener('mousedown', (e) => {
            e.preventDefault();
            startDrag(e);
        });

        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            startDrag(e);
        });
    });

    calculateDimensions();
    updateControls();
});