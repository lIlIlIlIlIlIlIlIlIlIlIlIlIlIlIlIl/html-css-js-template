class CardsHalfImageComponent extends HTMLElement {

    connectedCallback() {
        const cardsData = [
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit. Praesent elementum ultricies metus.",
                imgSrc: "src/assets/images/illustrations/1.jpg",
                link: "#",
                type: "image"
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit. Praesent elementum ultricies metus.",
                imgSrc: "src/assets/images/illustrations/1.jpg",
                link: "#",
                type: "image"
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit. Praesent elementum ultricies metus.",
                imgSrc: "src/assets/images/illustrations/1.jpg",
                link: "#",
                type: "image"
            }
        ];

        let cardsHtml = cardsData.map(card => {
            return `
                <div class="card">
                    <img src="${card.imgSrc}" alt="Illustration">
                    <div class="card-content">
                        <h3>${card.title}</h3>
                        <p>${card.description}</p>
                        <a href="${card.link}" class="card-link">
                            Lorem ipsum
                            <span class="arrow-icon">
                                <svg class="arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </span>
                        </a>
                    </div>
                </div>
            `;
        }).join("");

        this.innerHTML = `
        <section>
            <div class="container">
                <h2>Lorem ipsum</h2>
                <div class="cards-grid">
                    ${cardsHtml}
                </div>
            </div>
        </section>
        `;
    }
}

customElements.define('cards-half-image', CardsHalfImageComponent);
