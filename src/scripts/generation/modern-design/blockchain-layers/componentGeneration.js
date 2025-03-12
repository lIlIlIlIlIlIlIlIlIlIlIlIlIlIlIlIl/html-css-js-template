class LayerComponent extends HTMLElement {
    connectedCallback() {
        const layersData = [
            {
                layer: 3,
                title: "L3",
                description: "Dolor sit amet, consectetur adipiscing elit.<br>Praesent elementum ultricies metus.<br>Dolor sit amet, consectetur adipiscing elit.<br>Praesent elementum ultricies metus.",
                layerText: "L3"
            },
            {
                layer: 2,
                title: "L2",
                description: "Dolor sit amet, consectetur adipiscing elit.<br>Praesent elementum ultricies metus.<br>Dolor sit amet, consectetur adipiscing elit.<br>Praesent elementum ultricies metus.",
                layerText: "L2"
            },
            {
                layer: 1,
                title: "L1",
                description: "Dolor sit amet, consectetur adipiscing elit.<br>Praesent elementum ultricies metus.<br>Dolor sit amet, consectetur adipiscing elit.<br>Praesent elementum ultricies metus.",
                layerText: "L1"
            }
        ];

        const generateCubeLayers = (layers) => {
            return layers.map(({ layer, layerText }) => `
                <div class="cube-layer" data-layer="${layer}">
                    <div class="cube">
                        <div class="face front"></div>
                        <div class="face back"></div>
                        <div class="face right"></div>
                        <div class="face left"></div>
                        <div class="face top">
                            <div class="layer-text">${layerText}</div>
                        </div>
                        <div class="face bottom"></div>
                    </div>
                </div>
            `).join('');
        };

        const generateLayerInfos = (layers) => {
            return layers.map(({ layer, title, description }) => `
                <div class="layer-info" data-for="${layer}">
                    <h2>${title}</h2>
                    <p>${description}</p>
                </div>
            `).join('');
        };

        this.innerHTML = `
            <section>
                <div class="container">
                    <h2>Lorem Ipsum</h2>
                    <div class="blockchain-view">
                        <div class="cube-stack" id="cubeStack">
                            ${generateCubeLayers(layersData)}
                        </div>

                        <div class="explanation-section">
                            ${generateLayerInfos(layersData)}
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}

customElements.define('blockchain-layers', LayerComponent);
