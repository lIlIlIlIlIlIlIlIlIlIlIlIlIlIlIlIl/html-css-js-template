document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.image-comparison input[type="range"]');

    sliders.forEach(slider => {
        const MIN_LIMIT = 10;
        const MAX_LIMIT = 90;
        let isDragging = false;
        let startX;
        let startValue;

        const parent = slider.closest('.image-comparison');
        setSliderValue(parent, 50);

        slider.addEventListener('input', (e) => {
            updateSliderValue(parseInt(e.target.value));
        });

        slider.addEventListener('pointerdown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startValue = parseInt(slider.value);
            slider.setPointerCapture(e.pointerId);
        });

        slider.addEventListener('pointermove', (e) => {
            if (!isDragging) return;

            const dx = e.clientX - startX;
            const percentMove = (dx / slider.offsetWidth) * 100;
            let newValue = startValue + percentMove;

            updateSliderValue(newValue);
        });

        slider.addEventListener('pointerup', () => {
            isDragging = false;
        });

        function updateSliderValue(value) {
            let limitedValue = value;
            if (value < MIN_LIMIT) limitedValue = MIN_LIMIT;
            if (value > MAX_LIMIT) limitedValue = MAX_LIMIT;

            slider.value = limitedValue;
            setSliderValue(parent, limitedValue);
        }
    });
});

function setSliderValue(parent, value) {
    parent.style.setProperty('--value', `${value}%`);
}
