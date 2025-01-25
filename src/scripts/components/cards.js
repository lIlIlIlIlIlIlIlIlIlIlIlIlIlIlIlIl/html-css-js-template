const cards = document.querySelectorAll('.card');

function handleCardHover(event) {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const percentX = (mouseX / rect.width - 0.5) * 2;
    const percentY = (mouseY / rect.height - 0.5) * 2;

    const rotateX = -percentY * 2;
    const rotateY = percentX * 2;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

function resetCardTransform(event) {
    const card = event.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
}

cards.forEach(card => {
    card.addEventListener('mousemove', handleCardHover);
    card.addEventListener('mouseleave', resetCardTransform);
});