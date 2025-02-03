class EarthGlobeComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section>
                <div class="container">
                    <h2>Lorem ipsum</h2>
                    <canvas id="earthCanvas"></canvas>
                    <svg id="pointsSVG" class="points-overlay"></svg>
                    <img id="mapImage"
                        src="src/assets/images/illustrations/map.png" crossOrigin="anonymous">
                </div>
            </section>
        `;
    }
}

customElements.define('earth-globe', EarthGlobeComponent);
