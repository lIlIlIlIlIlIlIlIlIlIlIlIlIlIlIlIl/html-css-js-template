class BackToTopComponent extends HTMLElement {
    async connectedCallback() {
        const chevronData = {
            path: "src/assets/images/icons/chevron.svg"
        };

        const generateChevronSVG = async ({ path }) => {
            try {
                const response = await fetch(path);
                let svgText = await response.text();

                if (!svgText.includes('viewBox')) {
                    svgText = svgText.replace('<svg', '<svg viewBox="0 0 24 24"');
                }

                svgText = svgText.replace(/<svg/, '<svg class="chevron"');

                return svgText;
            } catch (error) {
                console.error(error);
            }
        };

        const chevronSVG = await generateChevronSVG(chevronData);

        this.innerHTML = `
            <button class="back-to-top nav-down">
                ${chevronSVG}
            </button>
        `;
        window.dispatchEvent(new CustomEvent('backToTopLoaded'));
    }
}

customElements.define('back-to-top', BackToTopComponent);
