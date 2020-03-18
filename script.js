

!!function() {
    document.addEventListener("DOMContentLoaded", () => {
        //Header
        const header = document.getElementById("header");
        let headerOffsetTop = header.offsetTop;
        const stickyHeaderClass = "header_sticky";
        const activeMenuClass = "menu__link_active";
        const menuItems = [...document.getElementsByClassName("menu__link")].map(a => a.getAttribute("href")).filter(link => link.length > 1);

        window.onscroll = function(e) {
            if (window.pageYOffset > headerOffsetTop) {
                header.classList.add(stickyHeaderClass);
            } else {
                header.classList.remove(stickyHeaderClass);
            }

            menuItems.forEach(function(link) {
                let section = document.querySelector(link);
                let sectionoffsetTop = section.offsetTop;
                
                if(window.pageYOffset + header.offsetHeight >= sectionoffsetTop) {
                    if(!section.classList.contains(activeMenuClass)) {
                        resetMenu();
                        document.querySelector(`[href='${link}']`).classList.add(activeMenuClass);
                    }
                }
            });
        };

        [...document.getElementsByClassName("menu__link")].forEach(link => {
            link.addEventListener("click", function() {
                resetMenu();
                this.classList.add(activeMenuClass);
            });
        });

        const resetMenu = function() {
            const active = document.getElementsByClassName(activeMenuClass);
            [...active].forEach(function(a) {
                a.classList.remove(activeMenuClass)
            });
        }
    });
}();