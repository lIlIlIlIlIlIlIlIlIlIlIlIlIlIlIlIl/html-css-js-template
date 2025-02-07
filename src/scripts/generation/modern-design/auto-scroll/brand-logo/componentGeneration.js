class AutoScrollBrandLogoComponent extends HTMLElement {
    async connectedCallback() {
        const logosData = [
            {
                path: "src/assets/images/logos/microsoft.svg"
            },
            {
                path: "src/assets/images/logos/github.svg"
            },
            {
                path: "src/assets/images/logos/docker.svg"
            },
            {
                path: "src/assets/images/logos/openai.svg"
            },
            {
                path: "src/assets/images/logos/ollama.svg"
            },
            {
                path: "src/assets/images/logos/bolt.svg"
            },
            {
                path: "src/assets/images/logos/stripe.svg"
            },
        ];

        const generateSVGs = async (logos) => {
            return Promise.all(
                logos.map(async ({ path }) => {
                    try {
                        const response = await fetch(path);
                        let svgText = await response.text();

                        if (!svgText.includes('viewBox')) {
                            svgText = svgText.replace('<svg', '<svg viewBox="0 0 100 100"');
                        }

                        return `<div class="svg-container">${svgText}</div>`;
                    } catch (error) {
                        console.error(error);
                    }
                })
            );
        };

        const svgs = await generateSVGs(logosData);
        this.innerHTML = `
        <section>
            <div class="container">
                <h2>Nos Partenaires</h2>
                <div class="auto-scroll-container" aria-label="Logos de nos partenaires">
                    <div class="auto-scroll-track">${svgs.join('')}</div>
                    <div class="auto-scroll-track" aria-hidden="true">${svgs.join('')}</div>
                </div>
            </div>
        </section>
        `;
    }
}

customElements.define('auto-scroll-brand-logo', AutoScrollBrandLogoComponent);
