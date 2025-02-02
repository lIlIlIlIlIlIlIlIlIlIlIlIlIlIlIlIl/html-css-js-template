document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('earthCanvas');
    const ctx = canvas.getContext('2d');
    const mapImage = document.getElementById('mapImage');
    const radius = 250;
    const margin = 20;
    let mouseDownTime = 0;
    const clickThreshold = 150;

    function resizeCanvas() {
        canvas.width = (radius * 2) + (margin * 2);
        canvas.height = (radius * 2) + (margin * 2);
    }
    resizeCanvas();

    const points = [];
    let rotationX = Math.PI / 1.1;
    let rotationY = Math.PI / 2;
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;

    function generatePointsFromImage() {
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = mapImage.width;
        tempCanvas.height = mapImage.height;

        tempCtx.translate(mapImage.width, 0);
        tempCtx.scale(-1, 1);
        tempCtx.drawImage(mapImage, 0, 0);

        const step = 3;
        for (let y = 0; y < mapImage.height; y += step) {
            for (let x = 0; x < mapImage.width; x += step) {
                const imageData = tempCtx.getImageData(x, y, 1, 1).data;
                if (imageData[0] > 128) {
                    const lat = 90 - (y / mapImage.height * 180);
                    const lon = (x / mapImage.width * 360 - 180);
                    const phi = (90 - lat) * Math.PI / 180;
                    const theta = lon * Math.PI / 180;
                    const x3d = -radius * Math.sin(phi) * Math.cos(theta);
                    const y3d = radius * Math.cos(phi);
                    const z3d = radius * Math.sin(phi) * Math.sin(theta);
                    points.push({ x: x3d, y: y3d, z: z3d });
                }
            }
        }
    }

    let bounceAnimation = {
        active: false,
        startTime: 0,
        duration: 1200,
        amplitude: 0.08
    };

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let scale = 1;
        let yOffset = 0;

        if (bounceAnimation.active) {
            const elapsed = Date.now() - bounceAnimation.startTime;
            const progress = elapsed / bounceAnimation.duration;

            if (progress >= 1) {
                bounceAnimation.active = false;
            } else {
                const wave = Math.sin(progress * Math.PI * 4.5) * Math.sin(progress * Math.PI * 3) * Math.exp(-progress * 3);
                scale = 1 + (wave * bounceAnimation.amplitude);
                yOffset = wave * 10;
            }
        }

        const planetFillColor = getComputedStyle(document.documentElement).getPropertyValue('--clr-globe-fill').trim();
        ctx.fillStyle = planetFillColor;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, radius * scale, 0, Math.PI * 2);
        ctx.fill();

        const sortedPoints = [...points].sort((a, b) => {
            const aPos = rotatePoint(a);
            const bPos = rotatePoint(b);
            return aPos.z - bPos.z;
        });

        const pointColor = getComputedStyle(document.documentElement).getPropertyValue('--clr-globe-points').trim();

        sortedPoints.forEach(point => {
            const rotated = rotatePoint(point);
            const screenX = canvas.width / 2 + (rotated.x * scale);
            const screenY = canvas.height / 2 + (rotated.y * scale) + (yOffset * ((rotated.z + radius) / (2 * radius)));

            const distanceFromTop = (rotated.z + radius) / (2 * radius);
            const opacity = 0.5 + 0.5 * distanceFromTop;
            const size = (0.5 + 0.5 * distanceFromTop) * 1.2 * scale;

            ctx.fillStyle = pointColor.replace('1)', `${opacity})`);
            ctx.beginPath();
            ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    function rotatePoint(point) {
        let x1 = point.x * Math.cos(rotationY) - point.z * Math.sin(rotationY);
        let z1 = point.x * Math.sin(rotationY) + point.z * Math.cos(rotationY);
        let y2 = point.y * Math.cos(rotationX) - z1 * Math.sin(rotationX);
        let z2 = point.y * Math.sin(rotationX) + z1 * Math.cos(rotationX);
        return { x: x1, y: y2, z: z2 };
    }

    canvas.addEventListener('mousedown', (e) => {
        isDragging = true;
        const rect = canvas.getBoundingClientRect();
        previousMouseX = e.clientX - rect.left;
        previousMouseY = e.clientY - rect.top;
        canvas.classList.add('grabbing');
        mouseDownTime = Date.now();
    });

    canvas.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const deltaX = x - previousMouseX;
            rotationY += deltaX * 0.005;
            previousMouseX = x;
            previousMouseY = e.clientY - rect.top;
        }
    });

    document.addEventListener('mouseup', () => {
        const clickDuration = Date.now() - mouseDownTime;
        if (clickDuration < clickThreshold) {
            bounceAnimation.active = true;
            bounceAnimation.startTime = Date.now();
        }
        isDragging = false;
        canvas.classList.remove('grabbing');
    });

    canvas.addEventListener('mouseleave', () => {
        isDragging = false;
        canvas.classList.remove('grabbing');
    });

    const rotationSpeed = 0.002;

    function animate() {
        if (!isDragging) {
            rotationY += rotationSpeed;
        }
        draw();
        requestAnimationFrame(animate);
    }

    mapImage.onload = () => {
        generatePointsFromImage();
        animate();
    };
});
