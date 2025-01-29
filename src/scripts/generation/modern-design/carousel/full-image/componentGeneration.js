class CarouselFullImageComponent extends HTMLElement {
    connectedCallback() {
        const cardsData = [
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit. Praesent elementum ultricies metus.",
                imgSrc: "src/assets/images/illustrations/1.jpg",
                link: "#"
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit. Praesent elementum ultricies metus.",
                imgSrc: "src/assets/images/illustrations/1.jpg",
                link: "#"
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit. Praesent elementum ultricies metus.",
                imgSrc: "src/assets/images/illustrations/1.jpg",
                link: "#"
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit. Praesent elementum ultricies metus.",
                imgSrc: "src/assets/images/illustrations/1.jpg",
                link: "#"
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit. Praesent elementum ultricies metus.",
                imgSrc: "src/assets/images/illustrations/1.jpg",
                link: "#"
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit. Praesent elementum ultricies metus.",
                imgSrc: "src/assets/images/illustrations/1.jpg",
                link: "#"
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit. Praesent elementum ultricies metus.",
                imgSrc: "src/assets/images/illustrations/1.jpg",
                link: "#"
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit. Praesent elementum ultricies metus.",
                imgSrc: "src/assets/images/illustrations/1.jpg",
                link: "#"
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit. Praesent elementum ultricies metus.",
                imgSrc: "src/assets/images/illustrations/1.jpg",
                link: "#"
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit. Praesent elementum ultricies metus.",
                imgSrc: "src/assets/images/illustrations/1.jpg",
                link: "#"
            },
        ]

        let cardsHtml = cardsData.map(card => `
            <div class="carousel-card">
                <img src="${card.imgSrc}" alt="Illustration">
                <div class="card-background"></div>
                <div class="card-content">
                    <h3>${card.title}</h3>
                    <p>${card.description}</p>
                    <div class="buttons-container">
                        <button class="more-info-button">
                            <a href="${card.link}">
                                <p>Lorem ipsum</p>
                                <span class="arrow-icon">
                                    <svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
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
                        <button class="carousel-prev">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                        <button class="carousel-next">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="carousel">
                    <div class="carousel-container">
                        <div class="carousel-track">
                            ${cardsHtml}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `;
    }
}

customElements.define('carousel-full-image', CarouselFullImageComponent);