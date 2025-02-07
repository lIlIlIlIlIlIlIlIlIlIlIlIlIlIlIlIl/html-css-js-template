class CarouselFullImageComponent extends HTMLElement {
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
                imgSrc: "src/assets/images/illustrations/1.jpg",
                link: "#"
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit.<br>Praesent elementum ultricies metus.",
                imgSrc: "src/assets/images/illustrations/2.jpg",
                link: "#"
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit.<br>Praesent elementum ultricies metus.",
                imgSrc: "src/assets/images/illustrations/3.jpg",
                link: "#"
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit.<br>Praesent elementum ultricies metus.",
                imgSrc: "src/assets/images/illustrations/4.jpg",
                link: "#"
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit.<br>Praesent elementum ultricies metus.",
                imgSrc: "src/assets/images/illustrations/5.jpg",
                link: "#"
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit.<br>Praesent elementum ultricies metus.",
                imgSrc: "src/assets/images/illustrations/6.jpg",
                link: "#"
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit.<br>Praesent elementum ultricies metus.",
                imgSrc: "src/assets/images/illustrations/7.jpg",
                link: "#"
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit.<br>Praesent elementum ultricies metus.",
                imgSrc: "src/assets/images/illustrations/8.jpg",
                link: "#"
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit.<br>Praesent elementum ultricies metus.",
                imgSrc: "src/assets/images/illustrations/9.jpg",
                link: "#"
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit.<br>Praesent elementum ultricies metus.",
                imgSrc: "src/assets/images/illustrations/10.jpg",
                link: "#"
            },
        ]

        let cardsHtml = cardsData.map(card => `
            <div class="carousel-card">
                <img src="${card.imgSrc}" alt="Illustration">
                <div class="overlay-transparent"></div>
                <div class="overlay-dark"></div>
                <div class="card-content">
                    <h3>${card.title}</h3>
                    <p>${card.description}</p>
                    <div class="buttons-container">
                        <button class="more-info-button">
                            <a href="${card.link}">
                                <p>Lorem ipsum</p>
                                <span class="arrow-icon">
                                    ${arrowSVG}
                                </span>
                            </a>
                        </button>
                    </div>
                </div>
            </div>
        `).join("");

        this.innerHTML = `
        <section class="carousel-section">
            <div class="container">
                <div class="carousel-header">
                    <h2>Lorem ipsum</h2>
                    <div class="carousel-controls">
                        <button class="carousel-prev" id="carousel-prev">
                            ${arrowSVG}
                        </button>
                        <button class="carousel-next" id="carousel-next">
                            ${arrowSVG}
                        </button>
                    </div>
                </div>
                <div class="carousel-container">
                    <div class="carousel-track" id="carousel-track">
                        ${cardsHtml}
                    </div>
                </div>
            </div>
        </section>
        `;

        window.dispatchEvent(new CustomEvent('carouselLoaded'));
    }
}

customElements.define('carousel-full-image', CarouselFullImageComponent);
