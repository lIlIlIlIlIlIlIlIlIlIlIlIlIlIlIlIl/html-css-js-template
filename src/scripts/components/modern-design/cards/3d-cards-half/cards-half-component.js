class CardsFullComponent extends HTMLElement {

    connectedCallback() {
        this.innerHTML = `
        <section>
            <div class="container">
                <h2>Lorem ipsum</h2>
                <div class="cards-grid">
                    <div class="card">
                        <img src="src/assets/images/illustrations/1.jpg" alt="Illustration">
                        <div class="card-content">
                            <h3>Lorem ipsum</h3>
                            <p>Dolor sit amet, consectetur adipiscing elit. Praesent elementum ultricies metus, placerat
                                suscipit orci.</p>
                            <a href="#" class="card-link">
                                Lorem ipsum
                                <span class="arrow-icon">
                                    <svg class="arrow" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>
                    <div class="card">
                        <img src="src/assets/images/illustrations/1.jpg" alt="Illustration">
                        <div class="card-content">
                            <h3>Lorem ipsum</h3>
                            <p>Dolor sit amet, consectetur adipiscing elit. Praesent elementum ultricies metus, placerat
                                suscipit orci.</p>
                            <a href="#" class="card-link">
                                Lorem ipsum
                                <span class="arrow-icon">
                                    <svg class="arrow" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>
                    <div class="card">
                        <img src="src/assets/images/illustrations/1.jpg" alt="Illustration">
                        <div class="card-content">
                            <h3>Lorem ipsum</h3>
                            <p>Dolor sit amet, consectetur adipiscing elit. Praesent elementum ultricies metus, placerat
                                suscipit orci.</p>
                            <a href="#" class="card-link">
                                Lorem ipsum
                                <span class="arrow-icon">
                                    <svg class="arrow" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-logo">
                            <div class="logo-circle">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6h2V7zm0 8h-2v2h2v-2z"
                                        fill="var(--clr-accent-color-pale)" />
                                </svg>
                            </div>
                        </div>
                        <div class="card-content">
                            <h3>Lorem ipsum</h3>
                            <p>Dolor sit amet, consectetur adipiscing elit. Praesent elementum ultricies metus, placerat
                                suscipit orci.</p>
                            <a href="#" class="card-link">
                                Lorem ipsum
                                <span class="arrow-icon">
                                    <svg class="arrow" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-logo">
                            <div class="logo-circle">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6h2V7zm0 8h-2v2h2v-2z"
                                        fill="var(--clr-accent-color-pale)" />
                                </svg>
                            </div>
                        </div>
                        <div class="card-content">
                            <h3>Lorem ipsum</h3>
                            <p>Dolor sit amet, consectetur adipiscing elit. Praesent elementum ultricies metus, placerat
                                suscipit orci.</p>
                            <a href="#" class="card-link">
                                Lorem ipsum
                                <span class="arrow-icon">
                                    <svg class="arrow" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-logo">
                            <div class="logo-circle">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6h2V7zm0 8h-2v2h2v-2z"
                                        fill="var(--clr-accent-color-pale)" />
                                </svg>
                            </div>
                        </div>
                        <div class="card-content">
                            <h3>Lorem ipsum</h3>
                            <p>Dolor sit amet, consectetur adipiscing elit. Praesent elementum ultricies metus, placerat
                                suscipit orci.</p>
                            <a href="#" class="card-link">
                                Lorem ipsum
                                <span class="arrow-icon">
                                    <svg class="arrow" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `;
    }
}

customElements.define('cards-half', CardsFullComponent);