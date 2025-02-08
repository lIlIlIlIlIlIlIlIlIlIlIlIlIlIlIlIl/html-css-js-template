class CustomNavbar extends HTMLElement {
    async connectedCallback() {
        const logoData = {
            path: "src/assets/images/icons/logo.svg"
        };

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
                return '';
            }
        };

        const logoSVG = await generateSVG(logoData);
        const arrowSVG = await generateSVG(arrowData);

        const navbarData = {
            categories: [
                { name: "Lorem Ipsum", link: "#" },
                {
                    name: "Lorem Ipsum", subcategories: [
                        { name: "Lorem Ipsum", link: "#" },
                        { name: "Lorem Ipsum", link: "#" },
                        { name: "Lorem Ipsum", link: "#" }
                    ]
                },
                { name: "Lorem Ipsum", link: "#" }
            ],
            buttons: [
                { name: "Lorem Ipsum", link: "#" },
                { name: "Lorem Ipsum", link: "#" }
            ]
        };

        const generateNavbarHTML = (data) => {
            const categoriesHtml = data.categories.map(category => {
                let subcategoriesHtml = '';
                if (category.subcategories) {
                    subcategoriesHtml = `
                        <ul class="dropdown-menu">
                            ${category.subcategories.map(subcategory => `
                                <li><a href="${subcategory.link}">${subcategory.name}</a></li>
                            `).join('')}
                        </ul>
                    `;
                    return `
                        <li class="navbar-item dropdown">
                            <a class="dropdown-toggle">${category.name}</a>
                            ${subcategoriesHtml}
                        </li>
                    `;
                } else {
                    return `
                        <li class="navbar-item">
                            <a href="${category.link}">${category.name}</a>
                        </li>
                    `;
                }
            }).join('');

            const buttonsHtml = data.buttons.map(button => `
                <button class="cta-button">
                    <a href="${button.link}">
                        <p>${button.name}</p>
                        <span class="arrow-icon">
                            ${arrowSVG}
                        </span>
                    </a>
                </button>
            `).join('');

            return {
                categoriesHtml,
                buttonsHtml
            };
        };

        const { categoriesHtml, buttonsHtml } = generateNavbarHTML(navbarData);

        this.innerHTML = `
            <div class="container">
                <nav class="navbar">
                    <div class="navbar-container">
                        <div class="navbar-logo">${logoSVG}</div>
                        <ul class="navbar-menu">
                            ${categoriesHtml}
                        </ul>
                        <div class="navbar-cta-container">
                            ${buttonsHtml}
                        </div>
                        <button class="burger-menu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </nav>
                <div class="mobile-menu">
                    <ul class="navbar-menu">
                        ${categoriesHtml}
                    </ul>
                    <div class="navbar-cta-container">
                        ${buttonsHtml}
                    </div>
                </div>
            </div>
        `;

        const burgerMenu = this.querySelector('.burger-menu');
        const mobileMenu = this.querySelector('.mobile-menu');
        const mobileDropdowns = this.querySelectorAll('.mobile-menu .navbar-item.dropdown');

        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        mobileDropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            link.addEventListener('click', (e) => {
                e.preventDefault();
                mobileDropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                dropdown.classList.toggle('active');
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                if (dropdown.classList.contains('active')) {
                    const dropdownRect = dropdownMenu.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;
                    if (dropdownRect.bottom > viewportHeight) {
                        dropdown.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });

        document.addEventListener('click', (event) => {
            if (!this.querySelector('.mobile-menu').contains(event.target)) {
                mobileDropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
            if (!this.contains(event.target)) {
                burgerMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    }
}

customElements.define('navbar-section', CustomNavbar);
