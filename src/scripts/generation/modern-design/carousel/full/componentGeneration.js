class CarouselFullComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <section class="carousel-section">
            <div class="container">
                <div class="carousel-header">
                    <h2>Carousel</h2>
                    <div class="carousel-controls">
                        <button class="carousel-prev">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                        <button class="carousel-next">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="carousel">
                    <div class="carousel-container">
                        <div class="carousel-track">
                            <div class="carousel-card">
                                <img src="src/assets/images/illustrations/1.jpg" alt="Illustration">
                                <div class="card-background"></div>
                                <div class="card-content">
                                    <h3>Carousel Card 1</h3>
                                    <p>Description de la première card du carousel.</p>
                                    <div class="buttons-container">
                                        <button class="more-info-button">
                                            <a href="#">
                                                <p>Lorem ipsum</p>
                                                <span class="arrow-icon">
                                                    <svg class="arrow" width="16" height="16" viewBox="0 0 24 24"
                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                    </svg>
                                                </span>
                                            </a>
                                        </button>
                                        <button class="more-info-button">
                                            <a href="#">
                                                <p>Lorem ipsum</p>
                                                <span class="arrow-icon">
                                                    <svg class="arrow" width="16" height="16" viewBox="0 0 24 24"
                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                    </svg>
                                                </span>
                                            </a>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="carousel-card">
                                <img src="src/assets/images/illustrations/1.jpg" alt="Illustration">
                                <div class="card-background"></div>
                                <div class="card-content">
                                    <h3>Carousel Card 1</h3>
                                    <p>Description de la première card du carousel.</p>
                                    <div class="buttons-container">
                                        <button class="more-info-button">
                                            <a href="#">
                                                <p>Lorem ipsum</p>
                                                <span class="arrow-icon">
                                                    <svg class="arrow" width="16" height="16" viewBox="0 0 24 24"
                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                    </svg>
                                                </span>
                                            </a>
                                        </button>
                                        <button class="more-info-button">
                                            <a href="#">
                                                <p>Lorem ipsum</p>
                                                <span class="arrow-icon">
                                                    <svg class="arrow" width="16" height="16" viewBox="0 0 24 24"
                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                    </svg>
                                                </span>
                                            </a>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="carousel-card">
                                <img src="src/assets/images/illustrations/1.jpg" alt="Illustration">
                                <div class="card-background"></div>
                                <div class="card-content">
                                    <h3>Carousel Card 1</h3>
                                    <p>Description de la première card du carousel.</p>
                                    <div class="buttons-container">
                                        <button class="more-info-button">
                                            <a href="#">
                                                <p>Lorem ipsum</p>
                                                <span class="arrow-icon">
                                                    <svg class="arrow" width="16" height="16" viewBox="0 0 24 24"
                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                    </svg>
                                                </span>
                                            </a>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="carousel-card">
                                <img src="src/assets/images/illustrations/1.jpg" alt="Illustration">
                                <div class="card-background"></div>
                                <div class="card-content">
                                    <h3>Carousel Card 1</h3>
                                    <p>Description de la première card du carousel.</p>
                                    <div class="buttons-container">
                                        <button class="more-info-button">
                                            <a href="#">
                                                <p>Lorem ipsum</p>
                                                <span class="arrow-icon">
                                                    <svg class="arrow" width="16" height="16" viewBox="0 0 24 24"
                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                    </svg>
                                                </span>
                                            </a>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="carousel-card">
                                <img src="src/assets/images/illustrations/1.jpg" alt="Illustration">
                                <div class="card-background"></div>
                                <div class="card-content">
                                    <h3>Carousel Card 1</h3>
                                    <p>Description de la première card du carousel.</p>
                                    <div class="buttons-container">
                                        <button class="more-info-button">
                                            <a href="#">
                                                <p>Lorem ipsum</p>
                                                <span class="arrow-icon">
                                                    <svg class="arrow" width="16" height="16" viewBox="0 0 24 24"
                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                    </svg>
                                                </span>
                                            </a>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="carousel-card">
                                <img src="src/assets/images/illustrations/1.jpg" alt="Illustration">
                                <div class="card-background"></div>
                                <div class="card-content">
                                    <h3>Carousel Card 1</h3>
                                    <p>Description de la première card du carousel.</p>
                                    <div class="buttons-container">
                                        <button class="more-info-button">
                                            <a href="#">
                                                <p>Lorem ipsum</p>
                                                <span class="arrow-icon">
                                                    <svg class="arrow" width="16" height="16" viewBox="0 0 24 24"
                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                    </svg>
                                                </span>
                                            </a>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="carousel-card">
                                <img src="src/assets/images/illustrations/1.jpg" alt="Illustration">
                                <div class="card-background"></div>
                                <div class="card-content">
                                    <h3>Carousel Card 1</h3>
                                    <p>Description de la première card du carousel.</p>
                                    <div class="buttons-container">
                                        <button class="more-info-button">
                                            <a href="#">
                                                <p>Lorem ipsum</p>
                                                <span class="arrow-icon">
                                                    <svg class="arrow" width="16" height="16" viewBox="0 0 24 24"
                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                    </svg>
                                                </span>
                                            </a>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="carousel-card">
                                <img src="src/assets/images/illustrations/1.jpg" alt="Illustration">
                                <div class="card-background"></div>
                                <div class="card-content">
                                    <h3>Carousel Card 1</h3>
                                    <p>Description de la première card du carousel.</p>
                                    <div class="buttons-container">
                                        <button class="more-info-button">
                                            <a href="#">
                                                <p>Lorem ipsum</p>
                                                <span class="arrow-icon">
                                                    <svg class="arrow" width="16" height="16" viewBox="0 0 24 24"
                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                    </svg>
                                                </span>
                                            </a>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="carousel-card">
                                <img src="src/assets/images/illustrations/1.jpg" alt="Illustration">
                                <div class="card-background"></div>
                                <div class="card-content">
                                    <h3>Carousel Card 1</h3>
                                    <p>Description de la première card du carousel.</p>
                                    <div class="buttons-container">
                                        <button class="more-info-button">
                                            <a href="#">
                                                <p>Lorem ipsum</p>
                                                <span class="arrow-icon">
                                                    <svg class="arrow" width="16" height="16" viewBox="0 0 24 24"
                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                    </svg>
                                                </span>
                                            </a>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `;
    }
}

customElements.define('carousel-full', CarouselFullComponent);