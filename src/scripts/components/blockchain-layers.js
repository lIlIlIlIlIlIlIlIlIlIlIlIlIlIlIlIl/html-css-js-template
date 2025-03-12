document.addEventListener('DOMContentLoaded', () => {
    const cubeLayers = document.querySelectorAll('.cube-layer');
    const layerInfos = document.querySelectorAll('.layer-info');
    const cubeStack = document.getElementById('cubeStack');

    const totalLayers = cubeLayers.length;
    const layerSpacing = 50;
    const defaultTransform = "rotateX(-30deg) rotateY(45deg)";

    const layerElements = new Map();

    cubeLayers.forEach((layer, index) => {
        layer.style.top = `${index * layerSpacing + 30}px`;
        layer.style.zIndex = totalLayers - index;

        layerElements.set(layer, {
            cube: layer.querySelector('.cube'),
            text: layer.querySelector('.layer-text'),
            layerNum: layer.getAttribute('data-layer')
        });
    });

    cubeStack.style.height = `${totalLayers * layerSpacing + 30}px`;

    function resetAll() {
        cubeLayers.forEach(layer => {
            const elements = layerElements.get(layer);
            layer.style.opacity = "0.25";
            elements.cube.style.transform = defaultTransform;
            if (elements.text) elements.text.style.opacity = "0";
        });

        layerInfos.forEach(info => {
            info.style.opacity = "0";
            info.style.visibility = "hidden";
        });

        if (totalLayers > 0) {
            const defaultLayer = cubeLayers[0];
            const elements = layerElements.get(defaultLayer);

            defaultLayer.style.opacity = "1";
            if (elements.text) elements.text.style.opacity = "1";

            const defaultInfo = document.querySelector(`.layer-info[data-for="${elements.layerNum}"]`);
            if (defaultInfo) {
                defaultInfo.style.opacity = "1";
                defaultInfo.style.visibility = "visible";
            }
        }
    }

    function showLayer(event) {
        const currentLayer = event.currentTarget;
        const elements = layerElements.get(currentLayer);

        cubeLayers.forEach(layer => {
            const layerEls = layerElements.get(layer);
            layer.style.opacity = "0";
            layerEls.cube.style.transform = defaultTransform;
            if (layerEls.text) layerEls.text.style.opacity = "0";
        });

        layerInfos.forEach(info => {
            info.style.opacity = "0";
            info.style.visibility = "hidden";
        });

        currentLayer.style.opacity = "1";
        if (elements.text) elements.text.style.opacity = "1";

        const info = document.querySelector(`.layer-info[data-for="${elements.layerNum}"]`);
        if (info) {
            info.style.opacity = "1";
            info.style.visibility = "visible";
        }
    }

    function adjustCubeStackSize() {
        const viewWidth = document.querySelector('.blockchain-view').offsetWidth;
        const availableWidth = viewWidth / 3 - 16;

        if (availableWidth < 300) {
            const scale = Math.max(0.65, availableWidth / 300);
            cubeStack.style.transform = `scale(${scale})`;
        } else {
            cubeStack.style.transform = 'none';
        }
    }

    resetAll();

    cubeLayers.forEach(layer => {
        layer.addEventListener('mouseenter', showLayer);
    });
    cubeStack.addEventListener('mouseleave', resetAll);

    adjustCubeStackSize();
    window.addEventListener('resize', adjustCubeStackSize);
});
