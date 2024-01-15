document.addEventListener("DOMContentLoaded", function () {
    const errorElement = document.getElementById("error");
    const footer = document.getElementById("footer");

    function revealFooter() {
        const reachedEnd = window.innerHeight + window.scrollY >= document.body.offsetHeight;
        if (reachedEnd) {
            footer.classList.add("footer-reveal");
        }
    }

    window.addEventListener("scroll", revealFooter);
    window.addEventListener("resize", revealFooter);
});