!!function() {
    document.addEventListener("DOMContentLoaded", () => {
        //Header
        const header = document.getElementById("header");
        let headerOffsetTop = header.offsetTop;
        const stickyHeaderClass = "header_sticky";
        const activeMenuClass = "menu__link_active";
        const sliderId = "#slider";
        const menuLinks = [...document.getElementsByClassName("menu__link")];
        const menuItems = [sliderId].concat(menuLinks.map(a => a.getAttribute("href")).filter(link => link.length > 1));

        window.onscroll = function(e) {
            /*if (window.pageYOffset > headerOffsetTop) {
                header.classList.add(stickyHeaderClass);
            } else {
                header.classList.remove(stickyHeaderClass);
            }*/
            let lower = menuItems.filter(function(link) {
                let section = document.querySelector(link);

                return window.pageYOffset + header.offsetHeight >= section.offsetTop;
            });
            let activeLink = lower[lower.length - 1];
            let menuLink = document.querySelector(`[href='${activeLink}']`) ?? document.querySelector(".menu__link_home");
            if(!menuLink.classList.contains(activeMenuClass)) {
                resetMenu();
                menuLink.classList.add(activeMenuClass);
            }
            
        };

        menuLinks.forEach(link => {
            link.addEventListener("click", function(e) {
                e.preventDefault();
                const sectionId = e.target.getAttribute("href").substr(1)
                document.getElementById(sectionId).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
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

        document.querySelector(".header__burger").onclick = function() {
            this.classList.toggle("rotated90");
            document.querySelector(".header__title").classList.toggle("header__title_left");
            document.querySelector("nav").classList.toggle("nav_active");
        };

        //slider

        [...document.getElementsByClassName("slider__phone_home")].forEach(btn => {
            btn.onclick = function(e) {
                e.target.parentNode.querySelector(".slider__phone-display").classList.toggle("slider__phone_active");
            }
        });

        let items = document.querySelectorAll('.slider__slide');
        let currentItem = 0;
        let isEnabled = true;

        const changeCurrentItem = function(n) {
            currentItem = (n + items.length) % items.length;
        }

        const changeSliderBackground = function () {
            const slider = document.getElementById("slider");
            
            slider.classList.toggle("slider-red");
            slider.classList.toggle("slider-blue");
        };

        function hideItem(direction) {
            isEnabled = false;
            items[currentItem].classList.add(direction);
            items[currentItem].addEventListener('animationend', function() {
                this.classList.remove('slider__slide_active', direction);
            });
        }

        function showItem(direction) {
            items[currentItem].classList.add('slider__slide_next', direction);
            items[currentItem].addEventListener('animationend', function() {
                this.classList.remove('slider__slide_next', direction);
                this.classList.add('slider__slide_active');
                isEnabled = true;
            });
        }

        function nextItem(n) {
            hideItem('to-left');
            changeCurrentItem(n + 1);
            changeSliderBackground();
            showItem('from-right');
        }

        function previousItem(n) {
            hideItem('to-right');
            changeCurrentItem(n - 1);
            changeSliderBackground();
            showItem('from-left');
        }

        document.querySelector(".slider__prev").onclick = function() {
            if (isEnabled) {
                previousItem(currentItem);
            }
        };

        document.querySelector(".slider__next").onclick = function() {
            if (isEnabled) {
                nextItem(currentItem);
            }
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
            image.onclick = function() {
                if(this.classList.contains("project__image_active")) {
                    this.classList.remove("project__image_active");
                } else {
                    const active = document.querySelector(".project__image_active");
                    
                    if(active) {
                        active.classList.remove("project__image_active");
                    }

                    this.classList.add("project__image_active");
                }
            };
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