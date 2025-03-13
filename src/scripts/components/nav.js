document.addEventListener('navLoaded', () => {
    const burgerBtn = document.getElementById('burger-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const MOBILE_WIDTH = 768;

    const toggleMobileMenu = (isActive) => {
        document.body.style.overflow = isActive ? 'hidden' : '';
        mobileMenu.style.visibility = 'visible';

        if (!isActive) {
            setTimeout(() => !mobileMenu.classList.contains('active') && (mobileMenu.style.visibility = 'hidden'), 250);
        }
    };

    burgerBtn.addEventListener('click', () => {
        if (window.innerWidth < MOBILE_WIDTH) {
            burgerBtn.classList.toggle('active');
            const isActive = mobileMenu.classList.toggle('active');
            toggleMobileMenu(isActive);
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
            bridge: navGroup.querySelector('.nav-bridge'),
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

        const shouldClose = (e, targets) => !targets.some(el => el === e.relatedTarget || (el && el.contains(e.relatedTarget)));

        const handleMouseEnter = () => {
            if (!navGroup.classList.contains('open')) {
                resetAnimations();
                navGroup.classList.add('open');
            }
        };

        const createMouseLeaveHandler = (excludedElements) => e => {
            if (shouldClose(e, excludedElements)) {
                navGroup.classList.remove('open');
            }
        };

        Object.values(els).forEach(el => el?.addEventListener('mouseenter', handleMouseEnter));

        els.button?.addEventListener('mouseleave', createMouseLeaveHandler([els.bridge, els.dropdown]));
        els.bridge?.addEventListener('mouseleave', createMouseLeaveHandler([els.button, els.dropdown]));
        els.dropdown?.addEventListener('mouseleave', createMouseLeaveHandler([els.button, els.bridge]));
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= MOBILE_WIDTH && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            burgerBtn.classList.remove('active');
            toggleMobileMenu(false);
        }
    });
});