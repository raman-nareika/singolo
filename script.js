!!function() {
    document.addEventListener("DOMContentLoaded", () => {
        const activeMenuClass = "menu__link_active";
        //Header
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