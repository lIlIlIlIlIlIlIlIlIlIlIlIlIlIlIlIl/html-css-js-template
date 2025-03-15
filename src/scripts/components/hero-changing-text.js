window.addEventListener('changingText', (event) => {
    const { container, selector, texts, interval, fadeTime } = event.detail;

    if (!container || !selector) {
        console.error('Paramètres manquants pour l\'initialisation du texte changeant');
        return;
    }

    const textElement = container.querySelector(selector);
    if (!textElement) {
        console.error(`Élément ${selector} non trouvé dans le conteneur`);
        return;
    }

    const textValues = texts && texts.length > 0 ? texts : [
        "Adipiscing elit",
        "Sed non risus",
        "Suspendisse lectus"
    ];

    let currentIndex = 0;
    textElement.textContent = textValues[currentIndex];

    const changeText = () => {
        textElement.style.opacity = '0';

        setTimeout(() => {
            currentIndex = (currentIndex + 1) % textValues.length;
            textElement.textContent = textValues[currentIndex];

            textElement.style.opacity = '1';
        }, fadeTime || 500);
    };

    setInterval(changeText, interval || 3000);
});