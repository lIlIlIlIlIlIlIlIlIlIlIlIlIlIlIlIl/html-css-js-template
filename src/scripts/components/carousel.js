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
    let animationFrame;

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

    const limitTranslate = (translate) => {
        const maxTranslate = -(totalCardsWidth - containerWidth);
        return Math.min(Math.max(translate, maxTranslate), 0);
    };

    const startDrag = (e) => {
        if (!enableCarousel()) return;
        isDragging = true;
        startPos = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        lastPos = startPos;
        lastTime = performance.now();
        container.style.cursor = 'grabbing';
        container.style.userSelect = 'none';
        container.style.transition = 'none';

        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }

        const computedTransform = window.getComputedStyle(container).transform;
        if (computedTransform !== 'none') {
            const matrix = RegExp(/matrix.*\((.+)\)/).exec(computedTransform)[1].split(', ');
            currentTranslate = parseFloat(matrix[4]);
            prevTranslate = currentTranslate;
        }

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

            const maxTranslate = -(totalCardsWidth - containerWidth);
            if (currentTranslate > 0 || currentTranslate < maxTranslate) {
                const overshoot = currentTranslate > 0 ? currentTranslate : currentTranslate - maxTranslate;
                currentTranslate = currentTranslate > 0 ? overshoot * 0.2 : maxTranslate + overshoot * 0.2;
            }

            setTransform(currentTranslate);
        }
    };

    const stopDrag = () => {
        if (isDragging) {
            isDragging = false;
            container.style.cursor = 'grab';
            container.style.userSelect = 'auto';

            window.removeEventListener('touchmove', drag);

            if (Math.abs(velocity) > 0.1) {
                applyInertia();
            } else {
                snapToNearestCard();
            }
        }
    };

    const applyInertia = () => {
        const calculateSnapPosition = () => {
            const cardWidthWithGap = cardWidth + gap;
            const maxTranslate = -(totalCardsWidth - containerWidth);

            let finalTranslate = currentTranslate + velocity * 1000;
            finalTranslate = limitTranslate(finalTranslate);

            let snapPosition = Math.round((finalTranslate + gap / 2) / cardWidthWithGap) * cardWidthWithGap;

            if (Math.abs(finalTranslate - maxTranslate) < cardWidth / 2) {
                snapPosition = maxTranslate;
            } else {
                snapPosition = Math.max(Math.min(snapPosition, 0), maxTranslate);
            }

            return snapPosition;
        };

        const snapPosition = calculateSnapPosition();

        const animateToSnapPosition = () => {
            const duration = 400;
            const startTime = performance.now();
            const startPosition = currentTranslate;

            const animate = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);

                const easeOutProgress = 1 - Math.pow(1 - progress, 3);

                currentTranslate = startPosition + (snapPosition - startPosition) * easeOutProgress;
                setTransform(currentTranslate);

                if (progress < 1) {
                    animationFrame = requestAnimationFrame(animate);
                } else {
                    currentTranslate = snapPosition;
                    setTransform(currentTranslate);
                    prevTranslate = currentTranslate;
                    updateControls();
                }
            };

            animationFrame = requestAnimationFrame(animate);
        };

        animateToSnapPosition();
    };

    const snapToNearestCard = () => {
        const cardWidthWithGap = cardWidth + gap;
        const maxTranslate = -(totalCardsWidth - containerWidth);

        let snapPosition = Math.round((currentTranslate + gap / 2) / cardWidthWithGap) * cardWidthWithGap;
        if (Math.abs(currentTranslate - maxTranslate) < cardWidth / 2) {
            snapPosition = maxTranslate;
        } else {
            snapPosition = Math.max(Math.min(snapPosition, 0), maxTranslate);
        }

        updateControls();
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
        container.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)';
        currentTranslate = limitTranslate(currentTranslate + (cardWidth + gap));
        updateControls();
        setTransform(currentTranslate);
        prevTranslate = currentTranslate;
    });

    nextButton.addEventListener('click', () => {
        if (!enableCarousel() || currentTranslate <= -(totalCardsWidth - containerWidth)) return;
        container.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)';
        currentTranslate = limitTranslate(currentTranslate - (cardWidth + gap));
        updateControls();
        setTransform(currentTranslate);
        prevTranslate = currentTranslate;
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
