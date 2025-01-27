document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const container = document.querySelector('.carousel-container');
    const cards = document.querySelectorAll('.carousel-card');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const containerGlobal = document.querySelector('.container');

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

    const canScrollLeft = () => currentTranslate < 0;
    const canScrollRight = () => currentTranslate > -(totalCardsWidth - containerWidth);

    const startDrag = (e) => {
        if (!enableCarousel()) return;
        isDragging = true;
        startPos = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        lastPos = startPos;
        lastTime = performance.now();
        container.style.cursor = 'grabbing';
        container.style.userSelect = 'none';
        container.style.transition = 'none';
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
            currentTranslate = prevTranslate + diff;

            if (currentTranslate > 0 || currentTranslate < -(totalCardsWidth - containerWidth)) {
                currentTranslate = prevTranslate + diff * 0.3;
            }

            setTransform(currentTranslate);
            updateControls();
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
        }
    };

    const springBack = () => {
        const targetTranslate = limitTranslate(currentTranslate);
        container.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
        currentTranslate = targetTranslate;
        setTransform(currentTranslate);
        prevTranslate = currentTranslate;
    };

    const applyInertia = () => {
        const duration = 500;
        const distance = velocity * duration * 0.5;
        let targetTranslate = limitTranslate(currentTranslate + distance);
        const cardWidthWithGap = cardWidth + gap;
        const cardIndex = Math.round(-targetTranslate / cardWidthWithGap);
        targetTranslate = -(cardIndex * cardWidthWithGap);
        currentTranslate = limitTranslate(targetTranslate);
        container.style.transition = `transform ${duration}ms ease-out`;
        setTransform(currentTranslate);
        velocity = 0;
        prevTranslate = currentTranslate;
        setTimeout(() => container.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)', duration);
    };

    const snapToNearestCard = () => {
        const cardWidthWithGap = cardWidth + gap;
        const cardIndex = Math.round(-currentTranslate / cardWidthWithGap);
        currentTranslate = limitTranslate(-(cardIndex * cardWidthWithGap));
        container.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)';
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

    calculateDimensions();
    updateControls();
});