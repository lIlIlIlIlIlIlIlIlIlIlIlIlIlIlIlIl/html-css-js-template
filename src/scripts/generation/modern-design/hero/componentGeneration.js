class HeroSectionComponent extends HTMLElement {
    async connectedCallback() {
        const arrowData = {
            path: "src/assets/images/icons/arrow.svg"
        };

        const generateArrowSVG = async ({ path }) => {
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

        const arrowSVG = await generateArrowSVG(arrowData);

        this.innerHTML = `
            <section class="hero">
                <div class="hero-content">
                    <h1>Lorem Ipsum</h1>
                    <p>Dolor sit amet, consectetur adipiscing elit. Praesent elementum ultricies metus.</p>
                    <div class="cta-container">
                        <button class="cta-button">
                            <a href="#">
                                <p>Lorem ipsum</p>
                                <span class="arrow-icon">
                                    ${arrowSVG}
                                </span>
                            </a>
                        </button>
                    </div>
                </div>
            </section>
        `;
    }
}

customElements.define('hero-section', HeroSectionComponent);
