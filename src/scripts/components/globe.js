document.addEventListener('DOMContentLoaded', () => {
    const MAX_WIDTH = 500;
    const containerWidth = Math.min(window.innerWidth, MAX_WIDTH);
    const scale = containerWidth / MAX_WIDTH;
    const radius = 200 * scale;
    const margin = 50 * scale;
    const canvas = document.getElementById('earthCanvas');
    const ctx = canvas.getContext('2d');
    const img = document.getElementById('mapImage');

    const FRAME_RATE = 60;
    const FRAME_INTERVAL = 1000 / FRAME_RATE;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotation = { x: Math.PI / 1, y: Math.PI / 2 };
    const MIN_ROTATION_X = Math.PI / 1.2;
    const MAX_ROTATION_X = Math.PI / 0.8;
    let points = [];
    let lastRenderTime = 0;

    const cities = [
        { name: 'Paris', lat: 43, lon: 2.333333 },
        { name: 'Los Angeles', lat: 25, lon: 117 },
        { name: 'New York', lat: 37, lon: 71 },
        { name: 'Tokyo', lat: 28, lon: -129 },
    ];

    function setupCanvas() {
        const devicePixelRatio = window.devicePixelRatio || 1;
        const pixelScale = 2 * devicePixelRatio;

        canvas.width = (radius * 2 + margin * 2) * pixelScale;
        canvas.height = (radius * 2 + margin * 2) * pixelScale;
        canvas.style.width = '100%';
        canvas.style.maxWidth = `${MAX_WIDTH}px`;
        canvas.style.aspectRatio = '1/1';

        ctx.scale(pixelScale, pixelScale);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
    }

    function generatePointsFromImage() {
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = img.width;
        tempCanvas.height = img.height;

        tempCtx.translate(img.width, 0);
        tempCtx.scale(-1, 1);
        tempCtx.drawImage(img, 0, 0);

        const pointRadius = radius * 0.975;
        const step = 4;

        for (let y = 0; y < img.height; y += step) {
            for (let x = 0; x < img.width; x += step) {
                const imageData = tempCtx.getImageData(x, y, 1, 1).data;
                if (imageData[0] > 128) {
                    const lat = 90 - (y / img.height * 180);
                    const lon = (x / img.width * 360 - 180);
                    const phi = (90 - lat) * Math.PI / 180;
                    const theta = lon * Math.PI / 180;
                    const x3d = -pointRadius * Math.sin(phi) * Math.cos(theta);
                    const y3d = pointRadius * Math.cos(phi);
                    const z3d = pointRadius * Math.sin(phi) * Math.sin(theta);
                    points.push({ x: x3d, y: y3d, z: z3d });
                }
            }
        }
    }

    function rotatePoint(point) {
        let x1 = point.x * Math.cos(rotation.y) - point.z * Math.sin(rotation.y);
        let z1 = point.x * Math.sin(rotation.y) + point.z * Math.cos(rotation.y);
        let y2 = point.y * Math.cos(rotation.x) - z1 * Math.sin(rotation.x);
        let z2 = point.y * Math.sin(rotation.x) + z1 * Math.cos(rotation.x);
        return { x: x1, y: y2, z: z2 };
    }

    function drawEarth() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const center = { x: radius + margin, y: radius + margin };

        const outerGlowRadius = radius * 1.1;
        const outerGlowColor = getComputedStyle(document.documentElement).getPropertyValue('--clr-globe-glow-outer').trim();
        let outerGlowColorValues;

        if (outerGlowColor.startsWith('rgba')) {
            outerGlowColorValues = outerGlowColor.match(/[\d.]+/g);
            const r = outerGlowColorValues[0];
            const g = outerGlowColorValues[1];
            const b = outerGlowColorValues[2];

            const outerGlowGradient = ctx.createRadialGradient(center.x, center.y, radius * scale, center.x, center.y, outerGlowRadius * scale);
            outerGlowGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.15)`);
            outerGlowGradient.addColorStop(0.2, `rgba(${r}, ${g}, ${b}, 0.12)`);
            outerGlowGradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, 0.08)`);
            outerGlowGradient.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, 0.05)`);
            outerGlowGradient.addColorStop(0.8, `rgba(${r}, ${g}, ${b}, 0.02)`);
            outerGlowGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

            ctx.fillStyle = outerGlowGradient;
            ctx.beginPath();
            ctx.arc(center.x, center.y, outerGlowRadius * scale, 0, Math.PI * 2);
            ctx.fill();
        }

        const globeFillColor = getComputedStyle(document.documentElement).getPropertyValue('--clr-globe-fill').trim();
        ctx.fillStyle = globeFillColor;
        ctx.beginPath();
        ctx.arc(center.x, center.y, radius * scale, 0, Math.PI * 2);
        ctx.fill();

        ctx.save();
        const innerGlowGradient = ctx.createRadialGradient(
            center.x,
            center.y,
            radius * 0.8 * scale,
            center.x,
            center.y,
            radius * scale
        );

        const innerGlowColor = getComputedStyle(document.documentElement).getPropertyValue('--clr-globe-glow-inner').trim();
        let innerGlowColorValues;

        if (innerGlowColor.startsWith('rgba')) {
            innerGlowColorValues = innerGlowColor.match(/[\d.]+/g);
            const r = innerGlowColorValues[0];
            const g = innerGlowColorValues[1];
            const b = innerGlowColorValues[2];

            innerGlowGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.0)`);
            innerGlowGradient.addColorStop(0.2, `rgba(${r}, ${g}, ${b}, 0.05)`);
            innerGlowGradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, 0.1)`);
            innerGlowGradient.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, 0.15)`);
            innerGlowGradient.addColorStop(0.8, `rgba(${r}, ${g}, ${b}, 0.2)`);
            innerGlowGradient.addColorStop(0.9, `rgba(${r}, ${g}, ${b}, 0.25)`);
            innerGlowGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0.3)`);
        }

        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = innerGlowGradient;
        ctx.beginPath();
        ctx.arc(center.x, center.y, radius * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';

        const visiblePoints = points
            .map(point => ({
                original: point,
                rotated: rotatePoint(point)
            }))
            .filter(({ rotated }) => rotated.z >= 0)
            .sort((a, b) => a.rotated.z - b.rotated.z);

        visiblePoints.forEach(({ original, rotated }) => {
            const x = center.x + (rotated.x * scale);
            const y = center.y + (rotated.y * scale);
            const opacity = Math.pow(rotated.z / radius + 1, 2) / 3;
            const size = (0.25 + (rotated.z / radius)) * scale;

            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        });

        const cityPointColor = getComputedStyle(document.documentElement).getPropertyValue('--clr-globe-city-point').trim();
        const sizeMultiplier = 3;
        cities.forEach(city => {
            const { lat, lon } = city;
            const phi = (90 - lat) * Math.PI / 180;
            const theta = lon * Math.PI / 180;
            const cityX = radius * scale * -Math.sin(phi) * Math.cos(theta);
            const cityY = radius * scale * Math.cos(phi);
            const cityZ = radius * scale * Math.sin(phi) * Math.sin(theta);

            const cityRotated = rotatePoint({ x: cityX, y: cityY, z: cityZ });

            if (cityRotated.z >= 0) {
                const cityXScreen = center.x + (cityRotated.x * scale);
                const cityYScreen = center.y + (cityRotated.y * scale);
                const cityOpacity = Math.pow(cityRotated.z / radius + 1, 2) / 3;
                const citySize = (0.25 + (cityRotated.z / radius) * sizeMultiplier) * scale;

                ctx.fillStyle = cityPointColor;
                ctx.beginPath();
                ctx.arc(cityXScreen, cityYScreen, citySize, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        ctx.restore();

        const globeOutlineColor = getComputedStyle(document.documentElement).getPropertyValue('--clr-globe-outline').trim();
        ctx.strokeStyle = globeOutlineColor;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(center.x, center.y, radius * scale, 0, Math.PI * 2);
        ctx.stroke();

        const globeShadowColor = getComputedStyle(document.documentElement).getPropertyValue('--clr-globe-shadow').trim();
        const shadowGradient = ctx.createRadialGradient(
            center.x - radius * 0.1,
            center.y - radius * 0.1,
            0,
            center.x,
            center.y,
            radius * scale
        );

        shadowGradient.addColorStop(0, 'transparent');
        shadowGradient.addColorStop(0.7, 'transparent');
        shadowGradient.addColorStop(0.95, globeShadowColor);
        shadowGradient.addColorStop(1, globeShadowColor);

        ctx.fillStyle = shadowGradient;
        ctx.beginPath();
        ctx.arc(center.x, center.y, radius * scale, 0, Math.PI * 2);
        ctx.fill();
    }

    let mouseDownTime = 0;
    let startPosition = { x: 0, y: 0 };
    const clickThreshold = 150;
    const moveThreshold = 5;
    let bounceAnimation = {
        active: false,
        startTime: 0,
        duration: 1200,
        amplitude: 0.03
    };

    function handleStart(e) {
        isDragging = true;
        mouseDownTime = Date.now();

        const touch = e.type === 'touchstart' ? e.touches[0] : e;

        startPosition = {
            x: touch.clientX,
            y: touch.clientY
        };
        previousMousePosition = {
            x: touch.clientX,
            y: touch.clientY
        };

        canvas.classList.add('grabbing');

        if (e.type === 'touchstart') {
            e.preventDefault();
        }
    }

    function handleMove(e) {
        if (!isDragging) return;

        const currentTime = performance.now();
        if (currentTime - lastRenderTime < FRAME_INTERVAL) return;

        const touch = e.type === 'touchmove' ? e.touches[0] : e;

        const deltaMove = {
            x: touch.clientX - previousMousePosition.x,
            y: touch.clientY - previousMousePosition.y
        };

        rotation.y += deltaMove.x * 0.005;

        rotation.x -= deltaMove.y * 0.005;
        rotation.x = Math.max(MIN_ROTATION_X, Math.min(MAX_ROTATION_X, rotation.x));

        previousMousePosition = {
            x: touch.clientX,
            y: touch.clientY
        };

        lastRenderTime = currentTime;
        requestAnimationFrame(drawEarth);

        if (e.type === 'touchmove') {
            e.preventDefault();
        }
    }

    function handleEnd(e) {
        const touch = e.type === 'touchend' ? e.changedTouches[0] : e;
        const clickDuration = Date.now() - mouseDownTime;
        const totalMove = Math.abs(touch.clientX - startPosition.x);

        if (clickDuration < clickThreshold && totalMove < moveThreshold) {
            bounceAnimation.active = true;
            bounceAnimation.startTime = Date.now();
        }

        isDragging = false;
        canvas.classList.remove('grabbing');
    }

    function animate() {
        const currentTime = performance.now();

        if (!isDragging && currentTime - lastRenderTime >= FRAME_INTERVAL) {
            rotation.y += 0.002;
            drawEarth();
            lastRenderTime = currentTime;
        }

        requestAnimationFrame(animate);
    }

    function addEventListeners() {
        canvas.addEventListener('mousedown', handleStart);
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleEnd);

        canvas.addEventListener('touchstart', handleStart, { passive: false });
        canvas.addEventListener('touchmove', handleMove, { passive: false });
        canvas.addEventListener('touchend', handleEnd);
        canvas.addEventListener('touchcancel', handleEnd);

        window.addEventListener('resize', () => {
            setupCanvas();
            drawEarth();
        });
    }

    setupCanvas();
    img.onload = () => {
        generatePointsFromImage();
        drawEarth();
        animate();
        addEventListeners();
    };
});
