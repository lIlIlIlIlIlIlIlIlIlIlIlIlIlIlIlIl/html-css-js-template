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

        const texts = [
            "Consectetur",
            "Adipiscing elit",
            "Sed non risus"
        ];

        this.innerHTML = `
            <section class="hero">
                <div class="hero-content">
                    <div class="title-container">
                        <h1>Lorem Ipsum dolor sit amet</h1>
                        <div id="changing-text" class="subtitle"></div>
                    </div>
                    <p>Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.</p>
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

        window.dispatchEvent(new CustomEvent('changingText', {
            detail: {
                container: this,
                selector: '#changing-text',
                texts: texts,
                interval: 3000,
                fadeTime: 500
            }
        }));
    }
}

customElements.define('hero-section', HeroSectionComponent);
