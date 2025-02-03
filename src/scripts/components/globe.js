document.addEventListener('DOMContentLoaded', () => {
    const radius = 200;
    const margin = 50;
    const canvas = document.getElementById('earthCanvas');
    const ctx = canvas.getContext('2d');
    const img = document.getElementById('mapImage');

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotation = { x: Math.PI / 1.05, y: Math.PI / 2 };
    let points = [];
    let lastRenderTime = 0;
    const FRAME_RATE = 60;
    const FRAME_INTERVAL = 1000 / FRAME_RATE;

    function setupCanvas() {
        const devicePixelRatio = window.devicePixelRatio || 1;
        const scale = 2 * devicePixelRatio;
        canvas.width = (radius * 2 + margin * 2) * scale;
        canvas.height = (radius * 2 + margin * 2) * scale;
        canvas.style.width = `${radius * 2 + margin * 2}px`;
        canvas.style.height = `${radius * 2 + margin * 2}px`;
        ctx.scale(scale, scale);
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

        const pointRadius = radius * 0.99;
        const step = 3.5;

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

        let scale = 1;
        let yOffset = 0;

        if (bounceAnimation.active) {
            const elapsed = Date.now() - bounceAnimation.startTime;
            const progress = elapsed / bounceAnimation.duration;

            if (progress >= 1) {
                bounceAnimation.active = false;
            } else {
                const wave = Math.sin(progress * Math.PI * 4.5) *
                    Math.sin(progress * Math.PI * 3) *
                    Math.exp(-progress * 3);
                scale = 1 + (wave * bounceAnimation.amplitude);
                yOffset = wave * 10;
            }
        }

        const globeFillColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--clr-globe-fill').trim();
        const globeGlowColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--clr-globe-glow').trim();
        const globeShadowColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--clr-globe-shadow').trim();
        const globeOutlineColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--clr-globe-outline').trim();

        const outerGlowRadius = radius * 1.1;
        const glowGradient = ctx.createRadialGradient(
            center.x,
            center.y,
            radius * scale,
            center.x,
            center.y,
            outerGlowRadius * scale
        );

        const glowColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--clr-globe-glow').trim();

        let colorValues;
        if (glowColor.startsWith('rgba')) {
            colorValues = glowColor.match(/[\d.]+/g);
            const r = colorValues[0];
            const g = colorValues[1];
            const b = colorValues[2];

            glowGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.15)`);
            glowGradient.addColorStop(0.2, `rgba(${r}, ${g}, ${b}, 0.12)`);
            glowGradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, 0.08)`);
            glowGradient.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, 0.05)`);
            glowGradient.addColorStop(0.8, `rgba(${r}, ${g}, ${b}, 0.02)`);
            glowGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        }

        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(center.x, center.y, outerGlowRadius * scale, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = globeFillColor;
        ctx.beginPath();
        ctx.arc(center.x, center.y, radius * scale, 0, Math.PI * 2);
        ctx.fill();

        ctx.save();
        ctx.beginPath();

        const visiblePoints = points
            .map(point => ({
                original: point,
                rotated: rotatePoint(point)
            }))
            .filter(({ rotated }) => rotated.z >= 0)
            .sort((a, b) => a.rotated.z - b.rotated.z);

        visiblePoints.forEach(({ original, rotated }) => {
            const x = center.x + (rotated.x * scale);
            const y = center.y + (rotated.y * scale) +
                (yOffset * ((rotated.z + radius) / (2 * radius)));
            const opacity = Math.pow(rotated.z / radius + 1, 2) / 3;
            const size = (0.5 + (rotated.z / radius)) * scale;

            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.restore();

        ctx.strokeStyle = globeOutlineColor;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(center.x, center.y, radius * scale, 0, Math.PI * 2);
        ctx.stroke();

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

    function handleMouseUp(e) {
        const clickDuration = Date.now() - mouseDownTime;
        const totalMove = Math.abs(e.clientX - startPosition.x);

        if (clickDuration < clickThreshold && totalMove < moveThreshold) {
            bounceAnimation.active = true;
            bounceAnimation.startTime = Date.now();
        }

        isDragging = false;
        canvas.classList.remove('grabbing');
    }

    function handleMouseDown(e) {
        isDragging = true;
        mouseDownTime = Date.now();
        startPosition = {
            x: e.clientX,
            y: e.clientY
        };
        previousMousePosition = {
            x: e.clientX,
            y: e.clientY
        };
        canvas.classList.add('grabbing');
    }

    function handleMouseMove(e) {
        if (!isDragging) return;

        const currentTime = performance.now();
        if (currentTime - lastRenderTime < FRAME_INTERVAL) return;

        const deltaMove = {
            x: e.clientX - previousMousePosition.x
        };

        rotation.y += deltaMove.x * 0.005;

        previousMousePosition = {
            x: e.clientX,
            y: e.clientY
        };

        lastRenderTime = currentTime;
        requestAnimationFrame(drawEarth);
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

    setupCanvas();
    img.onload = () => {
        generatePointsFromImage();
        drawEarth();
        animate();
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    window.addEventListener('resize', () => {
        setupCanvas();
        drawEarth();
    });
});
