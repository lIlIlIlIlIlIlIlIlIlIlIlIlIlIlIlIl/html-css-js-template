class FAQComponent extends HTMLElement {
    async connectedCallback() {
        const iconData = {
            plusPath: "src/assets/images/icons/plus.svg",
            minusPath: "src/assets/images/icons/minus.svg"
        };

        const generateSVG = async (path) => {
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

        const plusSVG = await generateSVG(iconData.plusPath);
        const minusSVG = await generateSVG(iconData.minusPath);

        const faqData = [
            {
                title: "Lorem Ipsum",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.<br> Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.<br> Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.<br> Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor.<br> Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales.<br> Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh.<br> Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit."
            },
            {
                title: "Lorem Ipsum",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.<br> Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.<br> Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.<br> Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor.<br> Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales.<br> Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh.<br> Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit."
            },
            {
                title: "Lorem Ipsum",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.<br> Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.<br> Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.<br> Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor.<br> Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales.<br> Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh.<br> Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit."
            },
            {
                title: "Lorem Ipsum",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.<br> Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.<br> Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.<br> Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor.<br> Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales.<br> Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh.<br> Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit."
            }
        ];

        let faqHtml = faqData.map((faq, index) => {
            return `
                <div class="faq-item">
                    <div class="faq-question" data-index="${index}">
                        <h3>${faq.title}</h3>
                        <div class="faq-icon-container">
                            <div class="faq-icon">${plusSVG}</div>
                        </div>
                    </div>
                    <div class="faq-answer">
                        <p>${faq.content}</p>
                    </div>
                </div>
            `;
        }).join("");

        this.innerHTML = `
            <section>
                <div class="faq-container">
                    <h2>Lorem Ipsum</h2>
                    <div class="faq-list">
                        ${faqHtml}
                    </div>
                </div>
            </section>
        `;

        window.dispatchEvent(new CustomEvent('faqLoaded', { detail: { plusSVG, minusSVG } }));
    }
}

customElements.define('faq-section', FAQComponent);
