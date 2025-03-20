class CardsLogoComponent extends HTMLElement {
    async connectedCallback() {
        const arrowData = {
            path: "src/assets/images/icons/arrow.svg"
        };
        const logoData = {
            path: "src/assets/images/icons/card-logo.svg"
        };

        const generateSVG = async ({ path }) => {
            try {
                const response = await fetch(path);
                let svgText = await response.text();

                svgText = svgText.replace(/fill="[^"]*"/g, '');

                if (!svgText.includes('viewBox')) {
                    svgText = svgText.replace('<svg', '<svg viewBox="0 0 24 24"');
                }

                return svgText;
            } catch (error) {
                console.error(error);
            }
        };

        const arrowSVG = await generateSVG(arrowData);
        const logoSVG = await generateSVG(logoData);

        const cardsData = [
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit.<br>Praesent elementum ultricies metus.",
                link: "#",
                type: "logo"
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit.<br>Praesent elementum ultricies metus.",
                link: "#",
                type: "logo"
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit.<br>Praesent elementum ultricies metus.",
                link: "#",
                type: "logo"
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit.<br>Praesent elementum ultricies metus.",
                link: "#",
                type: "logo"
            }
        ];

        let cardsHtml = cardsData.map(card => {
            return `
                <div class="card">
                    <a href="${card.link}">
                        <div class="card-logo">
                            <div class="logo">
                                ${logoSVG}
                            </div>
                        </div>
                        <div class="card-content">
                            <h3>${card.title}</h3>
                            <p>${card.description}</p>
                            <div class="card-cta">
                                Lorem ipsum
                                <span class="arrow-icon">
                                    ${arrowSVG}
                                </span>
                            </div>
                        </div>
                    </a>
                </div>
            `;
        }).join("");

        this.innerHTML = `
        <section>
            <div class="container">
                <h2>Lorem ipsum</h2>
                <div class="cards-grid cards-grid-2x2">
                    ${cardsHtml}
                </div>
            </div>
        </section>
        `;
    }
}

customElements.define('cards-logo', CardsLogoComponent);
