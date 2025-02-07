class ImageComparisonSliderComponent extends HTMLElement {
    connectedCallback() {
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
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
                                        <path d="M7 7L3 11M3 11L7 15M3 11H21M17 7L21 11M21 11L17 15"/>
                                    </svg>
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
                    <div class="cards-grid cards-grid-2x1">
                        ${slidersHtml}
                    </div>
                </div>
            </section>
        `;
    }
}

customElements.define('image-comparison-slider', ImageComparisonSliderComponent);
