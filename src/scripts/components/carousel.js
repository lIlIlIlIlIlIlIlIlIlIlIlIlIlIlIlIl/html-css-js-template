window.addEventListener('carouselLoaded', () => {
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselCards = document.querySelectorAll('.carousel-card');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const globalContainer = document.querySelector('.container');
    const moreInfoButtons = document.querySelectorAll('.more-info-button');

    let cardWidth, cardGap, containerWidth, totalCardsWidth;
    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;
    let previousTranslate = 0;
    let velocity = 0;
    let lastTime = 0;
    let lastPosition = 0;
    let animationFrame;

    const TRANSITION_DURATION = '0.3s';
    const TRANSITION_TIMING = 'cubic-bezier(0.25, 0.1, 0.25, 1)';

    const calculateDimensions = () => {
        cardWidth = carouselCards[0].offsetWidth;
        cardGap = parseInt(window.getComputedStyle(carouselTrack).gap) || 0;
        containerWidth = globalContainer.offsetWidth;
        totalCardsWidth = carouselCards.length * (cardWidth + cardGap) - cardGap;
    };

    const isCarouselEnabled = () => totalCardsWidth > containerWidth;

    const setCarouselTransform = (position) => {
        carouselContainer.style.transform = `translateX(${position}px)`;
    };

    const limitCarouselTranslate = (translate) => {
        const maxTranslate = -(totalCardsWidth - containerWidth);
        return Math.min(Math.max(translate, maxTranslate), 0);
    };

    const startCarouselDrag = (event) => {
        if (!isCarouselEnabled()) return;
        isDragging = true;
        startPosition = event.type.includes('touch') ? event.touches[0].clientX : event.clientX;
        lastPosition = startPosition;
        lastTime = performance.now();
        carouselContainer.style.cursor = 'grabbing';
        carouselContainer.style.userSelect = 'none';
        carouselContainer.style.transition = 'none';

        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }

        const computedTransform = window.getComputedStyle(carouselContainer).transform;
        if (computedTransform !== 'none') {
            const matrix = RegExp(/matrix.*\((.+)\)/).exec(computedTransform)[1].split(', ');
            currentTranslate = parseFloat(matrix[4]);
            previousTranslate = currentTranslate;
        }

        window.addEventListener('touchmove', handleCarouselDrag, { passive: false });
    };

    const handleCarouselDrag = (event) => {
        if (isDragging) {
            const currentPosition = event.type.includes('touch') ? event.touches[0].clientX : event.clientX;
            const currentTime = performance.now();
            const timeDiff = currentTime - lastTime;

            if (timeDiff > 0) {
                velocity = (currentPosition - lastPosition) / timeDiff;
                lastPosition = currentPosition;
                lastTime = currentTime;
            }

            const positionDiff = currentPosition - startPosition;
            currentTranslate = previousTranslate + positionDiff;

            const maxTranslate = -(totalCardsWidth - containerWidth);
            if (currentTranslate > 0 || currentTranslate < maxTranslate) {
                const overshoot = currentTranslate > 0 ? currentTranslate : currentTranslate - maxTranslate;
                currentTranslate = currentTranslate > 0 ? overshoot * 0.2 : maxTranslate + overshoot * 0.2;
            }

            setCarouselTransform(currentTranslate);
        }
    };

    const stopCarouselDrag = () => {
        if (isDragging) {
            isDragging = false;
            carouselContainer.style.cursor = 'grab';
            carouselContainer.style.userSelect = 'auto';
            window.removeEventListener('touchmove', handleCarouselDrag);
            carouselContainer.style.transition = `transform ${TRANSITION_DURATION} ${TRANSITION_TIMING}`;

            if (Math.abs(velocity) > 0) {
                applyCarouselInertia();
            } else {
                snapToNearestCarouselCard();
            }
        }
    };

    const applyCarouselInertia = () => {
        const calculateSnapPosition = () => {
            const cardWidthWithGap = cardWidth + cardGap;
            const maxTranslate = -(totalCardsWidth - containerWidth);

            let finalTranslate = currentTranslate + velocity * 300;
            finalTranslate = limitCarouselTranslate(finalTranslate);

            let snapPosition = Math.round((finalTranslate + cardGap / 2) / cardWidthWithGap) * cardWidthWithGap;

            if (Math.abs(finalTranslate - maxTranslate) < cardWidth / 2) {
                snapPosition = maxTranslate;
            } else {
                snapPosition = Math.max(Math.min(snapPosition, 0), maxTranslate);
            }

            return snapPosition;
        };

        const snapPosition = calculateSnapPosition();
        updateCarouselControls(snapPosition);

        const animateToSnapPosition = () => {
            const duration = 400;
            const startTime = performance.now();
            const startPosition = currentTranslate;

            carouselContainer.style.transition = 'none';

            const animate = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const easeOutProgress = 1 - Math.pow(1 - progress, 3);

                currentTranslate = startPosition + (snapPosition - startPosition) * easeOutProgress;
                setCarouselTransform(currentTranslate);

                if (progress < 1) {
                    animationFrame = requestAnimationFrame(animate);
                } else {
                    carouselContainer.style.transition = `transform ${TRANSITION_DURATION} ${TRANSITION_TIMING}`;
                    currentTranslate = snapPosition;
                    setCarouselTransform(currentTranslate);
                    previousTranslate = currentTranslate;
                }
            };

            animationFrame = requestAnimationFrame(animate);
        };

        animateToSnapPosition();
    };

    const snapToNearestCarouselCard = () => {
        const cardWidthWithGap = cardWidth + cardGap;
        const maxTranslate = -(totalCardsWidth - containerWidth);

        if (currentTranslate >= 0) {
            currentTranslate = 0;
        } else if (currentTranslate <= maxTranslate) {
            currentTranslate = maxTranslate;
        } else {
            const visibleCardIndex = Math.round(Math.abs(currentTranslate) / cardWidthWithGap);
            currentTranslate = -visibleCardIndex * cardWidthWithGap;
        }

        setCarouselTransform(currentTranslate);
        previousTranslate = currentTranslate;
        updateCarouselControls(currentTranslate);
    };

    const updateCarouselControls = (position) => {
        const setButtonDisabledStyle = (button, isDisabled) => {
            button.disabled = isDisabled;
            button.style.opacity = isDisabled ? '0.5' : '1';
        };

        if (!isCarouselEnabled()) {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
            return;
        }

        prevButton.style.display = 'flex';
        nextButton.style.display = 'flex';

        setButtonDisabledStyle(prevButton, position >= 0);
        setButtonDisabledStyle(nextButton, position <= -(totalCardsWidth - containerWidth));
    };

    calculateDimensions();
    updateCarouselControls(currentTranslate);

    window.addEventListener('resize', () => {
        calculateDimensions();
        currentTranslate = limitCarouselTranslate(currentTranslate);
        setCarouselTransform(currentTranslate);
        previousTranslate = currentTranslate;
    });

    carouselContainer.addEventListener('mousedown', startCarouselDrag);
    carouselContainer.addEventListener('touchstart', startCarouselDrag, { passive: true });
    window.addEventListener('mousemove', handleCarouselDrag);
    window.addEventListener('mouseup', stopCarouselDrag);
    window.addEventListener('touchend', stopCarouselDrag);

    prevButton.addEventListener('click', () => {
        if (!isCarouselEnabled() || currentTranslate >= 0) return;

        if (currentTranslate <= -(totalCardsWidth - containerWidth)) {
            const visibleCardIndex = Math.floor(Math.abs(currentTranslate) / (cardWidth + cardGap));
            const offset = visibleCardIndex * (cardWidth + cardGap);
            currentTranslate = -offset;
        } else {
            currentTranslate = limitCarouselTranslate(currentTranslate + (cardWidth + cardGap));
        }

        setCarouselTransform(currentTranslate);
        previousTranslate = currentTranslate;
        updateCarouselControls(currentTranslate);
    });

    nextButton.addEventListener('click', () => {
        if (!isCarouselEnabled() || currentTranslate <= -(totalCardsWidth - containerWidth)) return;
        currentTranslate = limitCarouselTranslate(currentTranslate - (cardWidth + cardGap));
        setCarouselTransform(currentTranslate);
        previousTranslate = currentTranslate;
        updateCarouselControls(currentTranslate);
    });

    moreInfoButtons.forEach(button => {
        button.addEventListener('mousedown', (event) => {
            event.preventDefault();
            startCarouselDrag(event);
        });

        button.addEventListener('touchstart', (event) => {
            event.preventDefault();
            startCarouselDrag(event);
        });
    });
});
