class EarthGlobeComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section>
                <div class="container">
                    <h2>Lorem ipsum</h2>
                        <canvas id="earthCanvas"></canvas>
                        <svg id="pointsSVG" class="points-overlay"></svg>
                    <img id="mapImage"
                        src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Carte_du_monde_crete.png"
                        crossorigin="anonymous">
                </div>
            </section>
        `;
    }
}

customElements.define('earth-globe', EarthGlobeComponent);
