window.addEventListener('faqLoaded', (event) => {
    const { plusSVG, minusSVG } = event.detail;

    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('.faq-icon');

            if (answer.classList.contains('open')) {
                icon.classList.remove('rotate-open');
                icon.classList.add('rotate-close');
                setTimeout(() => {
                    icon.innerHTML = plusSVG;
                }, 100);
                answer.classList.remove('open');
                answer.style.maxHeight = null;
            } else {
                icon.classList.remove('rotate-close');
                icon.classList.add('rotate-open');
                setTimeout(() => {
                    icon.innerHTML = minusSVG;
                }, 100);
                answer.classList.add('open');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});
