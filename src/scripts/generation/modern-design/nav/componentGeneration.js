class NavComponent extends HTMLElement {
    async connectedCallback() {
        const largeData = {
            groups: [
                [
                    {
                        title: "Lorem ipsum",
                        description: "Dolor sit amet, consectetur adipiscing elit.",
                        link: "#",
                        itemIndex: 0,
                        iconPath: "src/assets/images/icons/cloud.svg"
                    },
                    {
                        title: "Lorem ipsum",
                        description: "Dolor sit amet, consectetur adipiscing elit.",
                        link: "#",
                        itemIndex: 1,
                        iconPath: "src/assets/images/icons/server.svg"
                    },
                    {
                        title: "Lorem ipsum",
                        description: "Dolor sit amet, consectetur adipiscing elit.",
                        link: "#",
                        itemIndex: 2,
                        iconPath: "src/assets/images/icons/database.svg"
                    },
                    {
                        title: "Lorem ipsum",
                        description: "Dolor sit amet, consectetur adipiscing elit.",
                        link: "#",
                        itemIndex: 3,
                        iconPath: "src/assets/images/icons/bank.svg"
                    },
                    {
                        title: "Lorem ipsum",
                        description: "Dolor sit amet, consectetur adipiscing elit.",
                        link: "#",
                        itemIndex: 4,
                        iconPath: "src/assets/images/icons/credit-card.svg"
                    },
                    {
                        title: "Lorem ipsum",
                        description: "Dolor sit amet, consectetur adipiscing elit.",
                        link: "#",
                        itemIndex: 5,
                        iconPath: "src/assets/images/icons/wallet.svg"
                    }
                ],
                [
                    {
                        title: "Lorem ipsum",
                        description: "Dolor sit amet, consectetur adipiscing elit.",
                        link: "#",
                        itemIndex: 0,
                        iconPath: "src/assets/images/icons/cloud.svg"
                    },
                    {
                        title: "Lorem ipsum",
                        description: "Dolor sit amet, consectetur adipiscing elit.",
                        link: "#",
                        itemIndex: 1,
                        iconPath: "src/assets/images/icons/server.svg"
                    },
                    {
                        title: "Lorem ipsum",
                        description: "Dolor sit amet, consectetur adipiscing elit.",
                        link: "#",
                        itemIndex: 2,
                        iconPath: "src/assets/images/icons/database.svg"
                    }
                ],
                [
                    {
                        title: "Lorem ipsum",
                        description: "Dolor sit amet, consectetur adipiscing elit.",
                        link: "#",
                        itemIndex: 0,
                        iconPath: "src/assets/images/icons/cloud.svg"
                    },
                    {
                        title: "Lorem ipsum",
                        description: "Dolor sit amet, consectetur adipiscing elit.",
                        link: "#",
                        itemIndex: 1,
                        iconPath: "src/assets/images/icons/server.svg"
                    },
                    {
                        title: "Lorem ipsum",
                        description: "Dolor sit amet, consectetur adipiscing elit.",
                        link: "#",
                        itemIndex: 2,
                        iconPath: "src/assets/images/icons/database.svg"
                    },
                    {
                        title: "Lorem ipsum",
                        description: "Dolor sit amet, consectetur adipiscing elit.",
                        link: "#",
                        itemIndex: 3,
                        iconPath: "src/assets/images/icons/bank.svg"
                    }
                ]
            ]
        };

        const mediumWithSubData = [
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit.",
                link: "#",
                itemIndex: 0,
                iconPath: "src/assets/images/icons/cloud.svg",
                subItems: [
                    {
                        title: "Lorem ipsum", link: "#", itemIndex: 0,
                        iconPath: ""
                    },
                    {
                        title: "Lorem ipsum", link: "#", itemIndex: 1,
                        iconPath: ""
                    },
                    {
                        title: "Lorem ipsum", link: "#", itemIndex: 2,
                        iconPath: ""
                    },
                    {
                        title: "Lorem ipsum", link: "#", itemIndex: 3,
                        iconPath: ""
                    },
                    {
                        title: "Lorem ipsum", link: "#", itemIndex: 4,
                        iconPath: ""
                    },
                    {
                        title: "Lorem ipsum", link: "#", itemIndex: 5,
                        iconPath: ""
                    },
                    {
                        title: "Lorem ipsum", link: "#", itemIndex: 6,
                        iconPath: ""
                    }
                ]
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit.",
                link: "#",
                itemIndex: 1,
                iconPath: "src/assets/images/icons/server.svg",
                subItems: [
                    {
                        title: "Lorem ipsum", link: "#", itemIndex: 0,
                        iconPath: ""
                    },
                    {
                        title: "Lorem ipsum", link: "#", itemIndex: 1,
                        iconPath: ""
                    },
                    {
                        title: "Lorem ipsum", link: "#", itemIndex: 2,
                        iconPath: ""
                    },
                    {
                        title: "Lorem ipsum", link: "#", itemIndex: 3,
                        iconPath: ""
                    },
                    {
                        title: "Lorem ipsum", link: "#", itemIndex: 4,
                        iconPath: ""
                    },
                    {
                        title: "Lorem ipsum", link: "#", itemIndex: 5,
                        iconPath: ""
                    }
                ]
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit.",
                link: "#",
                itemIndex: 2,
                iconPath: "src/assets/images/icons/database.svg",
                subItems: [
                    {
                        title: "Lorem ipsum", link: "#", itemIndex: 0,
                        iconPath: ""
                    },
                    {
                        title: "Lorem ipsum", link: "#", itemIndex: 1,
                        iconPath: ""
                    },
                    {
                        title: "Lorem ipsum", link: "#", itemIndex: 2,
                        iconPath: ""
                    },
                    {
                        title: "Lorem ipsum", link: "#", itemIndex: 3,
                        iconPath: ""
                    },
                    {
                        title: "Lorem ipsum", link: "#", itemIndex: 4,
                        iconPath: ""
                    }
                ]
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit.",
                link: "#",
                itemIndex: 3,
                iconPath: "src/assets/images/icons/bank.svg",
                subItems: [
                    {
                        title: "Lorem ipsum", link: "#", itemIndex: 0,
                        iconPath: ""
                    },
                    {
                        title: "Lorem ipsum", link: "#", itemIndex: 1,
                        iconPath: ""
                    },
                    {
                        title: "Lorem ipsum", link: "#", itemIndex: 2,
                        iconPath: ""
                    },
                    {
                        title: "Lorem ipsum", link: "#", itemIndex: 3,
                        iconPath: ""
                    }
                ]
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit.",
                link: "#",
                itemIndex: 4,
                iconPath: "src/assets/images/icons/credit-card.svg",
                subItems: [
                    {
                        title: "Lorem ipsum", link: "#", itemIndex: 0,
                        iconPath: ""
                    },
                    {
                        title: "Lorem ipsum", link: "#", itemIndex: 1,
                        iconPath: ""
                    },
                    {
                        title: "Lorem ipsum", link: "#", itemIndex: 2,
                        iconPath: ""
                    }
                ]
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit.",
                link: "#",
                itemIndex: 5,
                iconPath: "src/assets/images/icons/wallet.svg",
                subItems: [
                    {
                        title: "Lorem ipsum", link: "#", itemIndex: 0,
                        iconPath: ""
                    },
                    {
                        title: "Lorem ipsum", link: "#", itemIndex: 1,
                        iconPath: ""
                    }
                ]
            }
        ];

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
                description: "Dolor sit amet, consectetur adipiscing elit. Praesent elementum ultricies metus.",
                link: "#",
                itemIndex: 3
            },
            {
                title: "Lorem ipsum",
                description: "Dolor sit amet, consectetur adipiscing elit. Praesent elementum ultricies metus.",
                link: "#",
                itemIndex: 4
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
            { type: "dropdown", id: "large-dropdown-container", dataType: "large", title: "Lorem ipsum", items: largeData },
            { type: "dropdown", id: "medium-with-sub-dropdown-container", dataType: "large", title: "Lorem ipsum", items: mediumWithSubData },
            { type: "dropdown", id: "medium-dropdown-container", dataType: "medium", title: "Lorem ipsum", items: mediumData },
            { type: "dropdown", id: "small-dropdown-container", dataType: "small", title: "Lorem ipsum", items: smallData },
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

        const generateSVG = async (path) => {
            if (!path) return '';

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

        const arrowSVG = await generateSVG(arrowData.path);

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

        const generateItemIcon = async (iconPath) => {
            if (!iconPath) return '';
            const iconSvg = await generateSVG(iconPath);
            return iconSvg ? `
                <div class="item-icon-container">
                    <div class="item-icon">${iconSvg}</div>
                </div>
            ` : '';
        };

        const generateSubItem = async (subItem) => {
            const subIconHtml = await generateItemIcon(subItem.iconPath);

            return `
                <a href="${subItem.link}" class="sub-dropdown-item" style="--item-index: ${subItem.itemIndex}">
                    <div class="sub-item-wrapper">
                        ${subIconHtml}
                        <span class="item-title">${subItem.title}</span>
                    </div>
                </a>
            `;
        };

        const generateItemWithSubItems = async (item, hasDescription, dataType, iconHtml) => {
            const subItemsHtml = await Promise.all(item.subItems.map(subItem => generateSubItem(subItem)));

            return `
                <div class="dropdown-item-with-sub" style="--item-index: ${item.itemIndex}">
                    <a href="${item.link}" class="dropdown-item has-sub-items">
                        <div class="item-wrapper ${hasDescription ? 'has-description' : ''} ${dataType === 'medium' ? 'medium-item' : ''}">
                            ${iconHtml}
                            <div class="item-main-content">
                                <div class="title-row">
                                    <span class="item-title">${item.title}</span>
                                </div>
                                ${hasDescription ? `<span class="item-description">${item.description}</span>` : ''}
                            </div>
                            <div class="chevron-container">
                                <span class="chevron-right">›</span>
                            </div>
                        </div>
                    </a>
                    <div class="sub-dropdown-container">
                        <div class="sub-dropdown-content">
                            ${subItemsHtml.join('')}
                        </div>
                    </div>
                </div>
            `;
        };

        const generateSimpleItem = (item, hasDescription, dataType, iconHtml) => {
            return `
                <a href="${item.link}" class="dropdown-item" style="--item-index: ${item.itemIndex}">
                    <div class="item-wrapper ${hasDescription ? 'has-description' : ''} ${dataType === 'medium' ? 'medium-item' : ''}">
                        ${iconHtml}
                        <div class="item-content">
                            <div class="title-row">
                                <span class="item-title">${item.title}</span>
                            </div>
                            ${hasDescription ? `<span class="item-description">${item.description}</span>` : ''}
                        </div>
                    </div>
                </a>
            `;
        };

        const generateDropdownItem = async (item, isMobile = false, dataType = "") => {
            const hasDescription = item.description && item.description.trim() !== '';
            const iconHtml = await generateItemIcon(item.iconPath);

            if (item.subItems && item.subItems.length > 0) {
                return generateItemWithSubItems(item, hasDescription, dataType, iconHtml);
            } else {
                return generateSimpleItem(item, hasDescription, dataType, iconHtml);
            }
        };

        const generateLargeDropdownContent = async (largeData) => {
            const groupHtmls = await Promise.all(largeData.groups.map(group => Promise.all(group.map(item => generateDropdownItem(item, false, 'medium')))));

            return `
                <div class="large-dropdown-group">
                    ${groupHtmls.map(groupHtml => `
                        <div class="large-dropdown-section">
                            ${groupHtml.join('')}
                        </div>
                    `).join('')}
                </div>
            `;
        };

        const generateDropdownContent = async (items, dataType) => {
            if (dataType === 'large' && items.groups) {
                return generateLargeDropdownContent(items);
            }

            const contentItems = await Promise.all(items.map(item => generateDropdownItem(item, false, dataType)));
            return contentItems.join('');
        };

        const generateDesktopNav = async (navItems) => {
            const navElements = await Promise.all(navItems.map(async item => {
                if (item.type === "dropdown") {
                    return `
                        <div class="nav-group" id="${item.id}">
                            <button class="ghost-button">${item.title}</button>
                            <div class="nav-bridge"></div>
                            <div class="dropdown-container ${item.dataType}">
                                <div class="dropdown-content">
                                    ${await generateDropdownContent(item.items, item.dataType)}
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
            }));

            return navElements.join('');
        };

        const generateCtaButtons = (buttons) => {
            return buttons.map(button => `
                <a href="${button.link}" ${button.class ? `class="${button.class}"` : ''}>
                    ${generateButton(button)}
                </a>
            `).join('');
        };

        const generateMobileSubItemsContent = async (subItems) => {
            if (!subItems || subItems.length === 0) return '';

            const mobileSubItems = await Promise.all(subItems.map(async subItem => {
                const subIconHtml = await generateItemIcon(subItem.iconPath);

                return `
                    <a href="${subItem.link}" class="mobile-sub-item">
                        <div class="mobile-sub-item-wrapper">
                            ${subIconHtml}
                            <span>${subItem.title}</span>
                        </div>
                    </a>
                `;
            }));

            return `
                <div class="mobile-sub-items">
                    ${mobileSubItems.join('')}
                </div>
            `;
        };

        const generateMobileLargeDropdown = async (largeData, dropdownId) => {
            const allGroups = largeData.groups.flat();

            const mobileItems = await Promise.all(allGroups.map(async item => {
                return `<div class="mobile-dropdown-item-container">
                    ${await generateDropdownItem(item, true, 'large')}
                </div>`;
            }));

            return mobileItems.join('');
        };

        const generateMobileNav = async (navItems) => {
            const mobileNavItems = await Promise.all(navItems.map(async item => {
                if (item.type === "dropdown") {
                    const dropdownId = `mobile-${item.id.replace('-container', '')}`;

                    let dropdownItems;

                    if (item.dataType === 'large' && item.items.groups) {
                        dropdownItems = await generateMobileLargeDropdown(item.items, dropdownId);
                    } else {
                        dropdownItems = await Promise.all(item.items.map(async subItem => {
                            const subDropdownContent = subItem.subItems && subItem.subItems.length > 0
                                ? `<button class="mobile-sub-button" data-sub-target="mobile-sub-${dropdownId}-${subItem.itemIndex}">
                                    <span class="chevron">↓</span>
                                  </button>
                                  <div class="mobile-sub-dropdown" id="mobile-sub-${dropdownId}-${subItem.itemIndex}">
                                      ${await generateMobileSubItemsContent(subItem.subItems)}
                                  </div>`
                                : '';

                            return `
                                <div class="mobile-dropdown-item-container">
                                    ${await generateDropdownItem(subItem, true, item.dataType)}
                                    ${subDropdownContent}
                                </div>
                            `;
                        }));
                    }

                    return `
                        <div class="mobile-nav-item">
                            <button class="mobile-nav-button" data-target="${dropdownId}">
                                ${item.title}
                                <span class="chevron">↓</span>
                            </button>
                            <div class="mobile-dropdown ${item.dataType}" id="${dropdownId}">
                                ${typeof dropdownItems === 'string' ? dropdownItems : dropdownItems.join('')}
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
            }));

            return mobileNavItems.join('');
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

        const desktopNav = await generateDesktopNav(navItemsData);
        const mobileNav = await generateMobileNav(navItemsData);

        const navHtml = `
            <nav id="${componentConfig.navId}">
                <div class="nav-inner-container">
                    <div class="nav-container">
                        ${generateLogo(logoData)}

                        <div class="desktop-nav">
                            ${desktopNav}
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
                    ${mobileNav}
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
