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

    document.querySelectorAll('.nav-group').forEach(navGroup => {
        const els = {
            button: navGroup.querySelector('.ghost-button'),
            dropdown: navGroup.querySelector('.dropdown-container')
        };

        const forceReflow = element => element.offsetHeight;
        const resetAnimations = () => {
            navGroup.querySelectorAll('.dropdown-item').forEach(item => {
                const curr = item.style.animation;
                item.style.animation = 'none';
                forceReflow(item);
                item.style.animation = curr || '';
            });
        };

        els.button?.addEventListener('mouseenter', () => {
            resetAnimations();
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= MOBILE_WIDTH && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            burgerBtn.classList.remove('active');
            document.body.classList.remove('menu-open');
            document.body.style.overflow = '';
        }
    });
});
