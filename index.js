navOpen = false;

function toggleNav() {
    if (!navOpen) {
        document.getElementById("nav-overlay").style.height = "100%";
        document.body.style.height = "100%";
        document.body.style.overflowY = "hidden";
        document.getElementById("nav-overlay").style.paddingTop = "100px";

    } else {
        document.getElementById("nav-overlay").style.height = "0%";
        document.body.style.height = null;
        document.body.style.overflowY = null;
        document.getElementById("nav-overlay").style.paddingTop = "0px";
    }

    Array.prototype.slice.call(document.getElementById("hamburger-nav").children).forEach(element => {
        if (element.classList.contains("hidden")) {
            element.classList.remove("hidden");
        } else {
            element.classList.add("hidden");
        }
    });
    navOpen = !navOpen;
}