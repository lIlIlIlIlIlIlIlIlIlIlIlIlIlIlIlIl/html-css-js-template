class NavComponent extends HTMLElement {
    async connectedCallback() {
        const mediumData = [
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit. Praesent elementum ultricies metus.",
                link: "#",
                itemIndex: 0
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit. Praesent elementum ultricies metus.",
                link: "#",
                itemIndex: 1
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit. Praesent elementum ultricies metus.",
                link: "#",
                itemIndex: 2
            },
            {
                title: "Lorem ipsum",
                description: "",
                link: "#",
                itemIndex: 3
            }
        ];

        const smallData = [
            { title: "Lorem ipsum", link: "#", itemIndex: 0 },
            { title: "Lorem ipsum", link: "#", itemIndex: 1 },
            { title: "Lorem ipsum", link: "#", itemIndex: 2 },
            { title: "Lorem ipsum", link: "#", itemIndex: 3 },
            { title: "Lorem ipsum", link: "#", itemIndex: 4 },
            { title: "Lorem ipsum", link: "#", itemIndex: 5 }
        ];

        const navItemsData = [
            { type: "dropdown", id: "medium-dropdown-container", dataType: "medium", title: "Lorem ipsum", items: mediumData },
            { type: "dropdown", id: "small-dropdown-container", dataType: "small", title: "Lorem ipsum", items: smallData },
            { type: "link", title: "Lorem ipsum", link: "#" },
            { type: "link", title: "Lorem ipsum", link: "#" }
        ];

        const ctaButtonsData = [
            { type: "ghost", title: "Lorem ipsum", link: "#", class: "cta-ghost-button" },
            { type: "primary", title: "Lorem ipsum", link: "#", class: "" }
        ];

        const mobileCta = {
            title: "Lorem ipsum",
            link: "#"
        };

        const logoData = {
            title: "Lorem Ipsum",
            link: "#",
            path: "src/assets/images/logos/logo.svg"
        };

        const componentConfig = {
            navId: "main-nav",
            mobileMenuId: "mobile-menu",
            burgerMenuId: "burger-menu-btn"
        };

        const arrowData = {
            path: "src/assets/images/icons/arrow.svg"
        };

        const generateLogo = ({ title, link, path }) => {
            return `
                <a href="${link}" class="logo">
                    <img src="${path}" alt="${title}" class="logo-svg" />
                    <span class="logo-title">${title}</span>
                </a>
            `;
        };

        const generateArrowSVG = async ({ path }) => {
            try {
                const response = await fetch(path);
                let svgText = await response.text();

                if (!svgText.includes('viewBox')) {
                    svgText = svgText.replace('<svg', '<svg viewBox="0 0 24 24"');
                }

                return svgText;
            } catch (error) {
                console.error(error);
                return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';
            }
        };

        const arrowSVG = await generateArrowSVG(arrowData);

        const generateButton = (buttonData) => {
            const buttonClass = buttonData.type === "primary" ? "cta-button" : "ghost-button";
            if (buttonData.type === "primary") {
                return `<button class="${buttonClass}">
                    <p>${buttonData.title}</p>
                    <span class="arrow-icon">
                        ${arrowSVG}
                    </span>
                </button>`;
            } else {
                return `<button class="${buttonClass}">${buttonData.title}</button>`;
            }
        };

        const generateDropdownItem = (item, isMobile = false) => {
            return `
                <a href="${item.link}" class="dropdown-item" style="--item-index: ${item.itemIndex}">
                    <span class="item-title">${item.title}</span>
                    ${item.description ? `<span class="item-description">${item.description}</span>` : ''}
                </a>
            `;
        };

        const generateDropdownContent = (items, dataType) => {
            return items.map(item => generateDropdownItem(item)).join('');
        };

        const generateDesktopNav = (navItems) => {
            return navItems.map(item => {
                if (item.type === "dropdown") {
                    return `
                        <div class="nav-group" id="${item.id}">
                            <button class="ghost-button">${item.title}</button>
                            <div class="nav-bridge"></div>
                            <div class="dropdown-container">
                                <div class="dropdown-content">
                                    ${generateDropdownContent(item.items, item.dataType)}
                                </div>
                            </div>
                        </div>
                    `;
                } else {
                    return `
                        <a href="${item.link}">
                            <button class="ghost-button">${item.title}</button>
                        </a>
                    `;
                }
            }).join('');
        };

        const generateCtaButtons = (buttons) => {
            return buttons.map(button => `
                <a href="${button.link}" ${button.class ? `class="${button.class}"` : ''}>
                    ${generateButton(button)}
                </a>
            `).join('');
        };

        const generateMobileNav = (navItems) => {
            return navItems.map(item => {
                if (item.type === "dropdown") {
                    const dropdownId = `mobile-${item.id.replace('-container', '')}`;
                    return `
                        <div class="mobile-nav-item">
                            <button class="mobile-nav-button" data-target="${dropdownId}">
                                ${item.title}
                                <span class="chevron">↓</span>
                            </button>
                            <div class="mobile-dropdown ${item.dataType}" id="${dropdownId}">
                                ${item.items.map(subItem => generateDropdownItem(subItem, true)).join('')}
                            </div>
                        </div>
                    `;
                } else {
                    return `
                        <div class="mobile-nav-item">
                            <a href="${item.link}" class="mobile-nav-button">
                                ${item.title}
                            </a>
                        </div>
                    `;
                }
            }).join('');
        };

        const generateBurgerButton = (id) => {
            return `
                <button class="burger-menu-btn" id="${id}" aria-label="Toggle menu">
                    <div class="burger-icon">
                        <span class="burger-bar"></span>
                        <span class="burger-bar"></span>
                        <span class="burger-bar"></span>
                    </div>
                </button>
            `;
        };

        const navHtml = `
            <nav id="${componentConfig.navId}">
                <div class="nav-inner-container">
                    <div class="nav-container">
                        ${generateLogo(logoData)}

                        <div class="desktop-nav">
                            ${generateDesktopNav(navItemsData)}
                        </div>

                        <div class="cta-buttons">
                            ${generateCtaButtons(ctaButtonsData)}
                            ${generateBurgerButton(componentConfig.burgerMenuId)}
                        </div>
                    </div>
                </div>
            </nav>

            <div class="mobile-menu" id="${componentConfig.mobileMenuId}">
                <div class="mobile-menu-content">
                    ${generateMobileNav(navItemsData)}
                    <div class="mobile-cta">
                        <a href="${mobileCta.link}" class="mobile-ghost-button">
                            ${mobileCta.title}
                        </a>
                    </div>
                </div>
            </div>
        `;

        this.innerHTML = navHtml;
        document.dispatchEvent(new CustomEvent('navLoaded'));
    }
}

customElements.define('nav-component', NavComponent);
