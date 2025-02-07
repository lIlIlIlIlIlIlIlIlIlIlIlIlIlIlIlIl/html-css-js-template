class CardsHalfImageComponent extends HTMLElement {
    async connectedCallback() {
        const arrowData = {
            path: "src/assets/images/icons/arrow.svg"
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

        const arrowSVG = await generateSVG(arrowData);

        const cardsData = [
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit.<br>Praesent elementum ultricies metus.",
                imgSrc: "src/assets/images/illustrations/11.jpg",
                link: "#",
                type: "image"
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit.<br>Praesent elementum ultricies metus.",
                imgSrc: "src/assets/images/illustrations/12.jpg",
                link: "#",
                type: "image"
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit.<br>Praesent elementum ultricies metus.",
                imgSrc: "src/assets/images/illustrations/13.jpg",
                link: "#",
                type: "image"
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit.<br>Praesent elementum ultricies metus.",
                imgSrc: "src/assets/images/illustrations/14.jpg",
                link: "#",
                type: "image"
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit.<br>Praesent elementum ultricies metus.",
                imgSrc: "src/assets/images/illustrations/15.jpg",
                link: "#",
                type: "image"
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit.<br>Praesent elementum ultricies metus.",
                imgSrc: "src/assets/images/illustrations/16.jpg",
                link: "#",
                type: "image"
            }
        ];

        let cardsHtml = cardsData.map(card => {
            return `
                <div class="card" id="card">
                    <a href="${card.link}">
                        <img src="${card.imgSrc}" alt="Illustration">
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
                <div class="cards-grid cards-grid-3x2">
                    ${cardsHtml}
                </div>
            </div>
        </section>
        `;

        window.dispatchEvent(new CustomEvent('cardsLoaded'));
    }
}

customElements.define('cards-half-image', CardsHalfImageComponent);
