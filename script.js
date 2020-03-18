

!!function() {
    document.addEventListener("DOMContentLoaded", () => {
        //Header
        const header = document.getElementById("header");
        let sticky = header.offsetTop;
        const stickyHeaderClass = "header_sticky";
        const activeMenuClass = "menu__link_active";
        const menu = {};

        window.onscroll = function(e) {
            if (window.pageYOffset > sticky) {
                header.classList.add(stickyHeaderClass);
            } else {
                header.classList.remove(stickyHeaderClass);
            }
        };

        [...document.getElementsByClassName("menu__link")].forEach(link => {
            link.addEventListener("click", function() {
                let active = document.getElementsByClassName(activeMenuClass)[0];

                if(active !== undefined) {
                    active.classList.remove(activeMenuClass);
                }

                this.classList.add(activeMenuClass);
            });
        });
    });
}();