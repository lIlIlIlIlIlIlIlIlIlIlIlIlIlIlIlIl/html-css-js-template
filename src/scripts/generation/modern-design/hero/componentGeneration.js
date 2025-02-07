class HeroSectionComponent extends HTMLElement {
    connectedCallback() {
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
                                    <svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
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
