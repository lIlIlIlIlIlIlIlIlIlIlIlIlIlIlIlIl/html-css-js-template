window.addEventListener('backToTopLoaded', () => {
    let lastScrollTop = 0;

    window.addEventListener("scroll", () => {
        let st = window.scrollY;
        let myButton = document.querySelector(".back-to-top");

        if (st > 0) {
            myButton.classList.remove("nav-up");
            myButton.classList.add("nav-down");
            myButton.disabled = true;
        }

        if (st > lastScrollTop) {
            myButton.classList.remove("nav-up");
            myButton.classList.add("nav-down");
            myButton.disabled = true;
        } else {
            myButton.classList.remove("nav-down");
            myButton.classList.add("nav-up");
            myButton.style.display = "flex";
            myButton.disabled = false;
        }

        lastScrollTop = st;

        let rootElement = document.documentElement;
        let scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;

        if (rootElement.scrollTop / scrollTotal < 0.1) {
            myButton.classList.remove("nav-up");
            myButton.classList.add("nav-down");
            myButton.disabled = true;
        }
    });

    let backToTopButton = document.querySelector(".back-to-top");

    backToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
