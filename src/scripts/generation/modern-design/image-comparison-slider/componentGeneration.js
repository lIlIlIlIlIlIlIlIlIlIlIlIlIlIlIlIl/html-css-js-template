class ImageComparisonSliderComponent extends HTMLElement {
    async connectedCallback() {
        const sliderArrowData = {
            path: "src/assets/images/icons/slider-arrows.svg"
        };

        const generateSVG = async ({ path }) => {
            try {
                const response = await fetch(path);
                let svgText = await response.text();

                if (!svgText.includes('viewBox')) {
                    svgText = svgText.replace('<svg', '<svg viewBox="0 0 24 24"');
                }

                return svgText;
            } catch (error) {
                console.error(error);
            }
        };

        const sliderArrowSVG = await generateSVG(sliderArrowData);

        const cardsData = [
            {
                beforeImage: "src/assets/images/illustrations/17.jpg",
                afterImage: "src/assets/images/illustrations/18.jpg"
            }
        ];

        let slidersHtml = cardsData.map(slider => {
            return `
                <div class="card">
                    <div class="image-comparison">
                        <img src="${slider.afterImage}" alt="After">
                        <div class="image-overlay">
                            <img src="${slider.beforeImage}" alt="Before">
                        </div>
                        <div class="slider-container">
                            <input type="range" min="0" max="100" value="50" oninput="this.style.setProperty('--value', this.value + '%');">
                            <div class="slider-line">
                                <div class="slider-handle">
                                    ${sliderArrowSVG}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join("");

        this.innerHTML = `
            <section>
                <div class="container">
                    <h2>Lorem ipsum</h2>
                    <div class="cards-grid cards-grid-2x1">
                        ${slidersHtml}
                    </div>
                </div>
            </section>
        `;

        window.dispatchEvent(new CustomEvent('imageComparisonLoaded'));
    }
}

customElements.define('image-comparison-slider', ImageComparisonSliderComponent);
