document.addEventListener('navLoaded', () => {
    const burgerBtn = document.getElementById('burger-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const MOBILE_WIDTH = 1025;

    burgerBtn.addEventListener('click', () => {
        if (window.innerWidth < MOBILE_WIDTH) {
            burgerBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');

            document.body.classList.toggle('menu-open');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        }
    });

    document.querySelectorAll('.mobile-nav-button[data-target]').forEach(button => {
        button.addEventListener('click', () => {
            if (window.innerWidth >= MOBILE_WIDTH) return;

            const targetId = button.getAttribute('data-target');
            const dropdown = document.getElementById(targetId);

            document.querySelectorAll('.mobile-dropdown.open').forEach(openDropdown => {
                if (openDropdown.id !== targetId) {
                    openDropdown.classList.remove('open');
                    document.querySelector(`.mobile-nav-button[data-target="${openDropdown.id}"]`)?.classList.remove('active');
                }
            });

            dropdown.classList.toggle('open');
            button.classList.toggle('active');
        });
    });
});
