document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.image-comparison input[type="range"]');

    sliders.forEach(slider => {
        const MIN_LIMIT = 10;
        const MAX_LIMIT = 90;

        const parent = slider.closest('.image-comparison');
        setSliderValue(parent, 50);

        slider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);

            let limitedValue = value;
            if (value < MIN_LIMIT) limitedValue = MIN_LIMIT;
            if (value > MAX_LIMIT) limitedValue = MAX_LIMIT;

            if (limitedValue !== value) {
                e.target.value = limitedValue;
            }

            setSliderValue(parent, limitedValue);
        });
    });
});

function setSliderValue(parent, value) {
    parent.style.setProperty('--value', `${value}%`);
}
