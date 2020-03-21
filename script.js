

!!function() {
    document.addEventListener("DOMContentLoaded", () => {
        //Header
        const header = document.getElementById("header");
        let headerOffsetTop = header.offsetTop;
        const stickyHeaderClass = "header_sticky";
        const activeMenuClass = "menu__link_active";
        const sliderId = "#slider";
        const menuItems = [...document.getElementsByClassName("menu__link")].map(a => a.getAttribute("href")).filter(link => link.length > 1);//.concat(sliderId);

        window.onscroll = function(e) {
            if (window.pageYOffset > headerOffsetTop) {
                header.classList.add(stickyHeaderClass);
            } else {
                header.classList.remove(stickyHeaderClass);
            }

            menuItems.forEach(function(link) {
                let menuLink = link === sliderId ? document.querySelector(".menu__link_home") : document.querySelector(`[href='${link}']`);
                let section = document.querySelector(link);
                let sectionOffsetTop = section.offsetTop;
                
                if(window.pageYOffset + header.offsetHeight >= sectionOffsetTop) {
                    if(!menuLink.classList.contains(activeMenuClass)) {
                        resetMenu();
                        menuLink.classList.add(activeMenuClass);
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
        };

        //Portfolio
        
        [...document.getElementsByClassName("category-btn")].forEach(btn => {
            btn.addEventListener("click", function() {
                const projects = [...document.getElementsByClassName("project")];
                const shuffledProjects = shuffle(projects).slice();

                disableAndActivate(this, "category-btn_active");
                shuffleAndReplace(projects, shuffledProjects);
            });
        });

        [...document.getElementsByClassName("project__image")].forEach(image => {
            image.addEventListener("click", function() {
                if(this.classList.contains("project__image_active")){
                    this.classList.remove("project__image_active");
                } else {
                    const active = document.querySelector(".project__image_active");
                    
                    if(active) {
                        active.classList.remove("project__image_active");
                    }

                    this.classList.add("project__image_active");
                }
            });
        });

        const shuffleAndReplace = function(originalProjects, shuffledProjects) {
            
            
            for(let i = 0; i < originalProjects.length; i++) {
                let old = originalProjects[i];
                let _new = shuffledProjects[i];
                
                old.replaceWith(_new);
            }
        };

        const shuffle = function(array) {
            let j, temp;
            const arr = [];
            array.forEach(x => arr.push(x.cloneNode(true)));
            
            for(let i = arr.length - 1; i > 0; i--){
                j = Math.floor(Math.random()*(i + 1));
                temp = arr[j];
                arr[j] = arr[i];
                arr[i] = temp;
            }
            return arr;
        }

        const disableAndActivate = function(btn, activeClass) {
            const prevActive = document.querySelector(`.${activeClass}`);
            
            if(prevActive) {
                prevActive.classList.remove(activeClass);
                prevActive.disabled = false;
            }

            btn.disabled = true;
            btn.classList.add(activeClass);
        };

        //Form
        const form = document.querySelector(".form");
        const modal = document.getElementById("mailSentDodal");
        const close = document.querySelector(".modal__close");
        const modalBtn = document.querySelector(".modal__body_btn");

        form.addEventListener("submit", function(e) {
            e.preventDefault();
            
            let subject = document.querySelector(".form__subject").value;
            if(!subject) subject = "Без темы";
            let desc = document.querySelector(".form__textarea").value;
            if(!desc) desc = "Без описания";

            document.querySelector(".modal__subject").value = subject;
            document.querySelector(".modal__desc").value = desc;
            modal.style.display = "block";
            e.target.reset();
        });

        [close, modalBtn].forEach(x => x.onclick = function() {
            modal.style.display = "none";
        });
    });
}();