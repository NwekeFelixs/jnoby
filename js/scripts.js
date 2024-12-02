document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.querySelector(".toggle-theme");
    const icon = toggleButton?.querySelector("i");
    const body = document.body;
    const menuToggler = document.querySelector(".toggle-menu");
    const closeMenu = document.querySelector(".bx-x");
    const menu = document.querySelector(".navbar");

    // Check localStorage for theme state
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "light") {
        body.classList.remove("dark-mode");
        icon?.classList.replace("bx-sun", "bx-moon");
    } else {
        body.classList.add("dark-mode");
        icon?.classList.replace("bx-moon", "bx-sun");
    }

    // Add click event to toggle theme
    toggleButton?.addEventListener("click", () => {
        if (body.classList.contains("dark-mode")) {
            body.classList.remove("dark-mode");
            icon?.classList.replace("bx-sun", "bx-moon");
            localStorage.setItem("theme", "light");
        } else {
            body.classList.add("dark-mode");
            icon?.classList.replace("bx-moon", "bx-sun");
            localStorage.setItem("theme", "dark");
        }
    });

    // Add click event to toggle menu
    menuToggler?.addEventListener("click", () => {
        menu?.classList.add("active");
    });

    // Add click event to close menu
    closeMenu?.addEventListener("click", () => {
        menu?.classList.remove("active");
    });

    // Initialize Swiper only if .swiper exists
    const swiperContainer = document.querySelector('.swiper');
    if (swiperContainer) {
        new Swiper('.swiper', {
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            scrollbar: {
                el: '.swiper-scrollbar',
            },
        });
    }

    // Define the counter function
    const startCounter = (counter) => {
        let startValue = 0;
        const endValue = parseInt(counter.getAttribute("data-value"), 10);
        const duration = 1000 / endValue;

        const countUp = setInterval(() => {
            startValue += 1;
            counter.textContent = startValue;
            if (startValue === endValue) {
                clearInterval(countUp);
            }
        }, duration);
    };

    // Counter Display with Intersection Observer
    const valueDisplays = document.querySelectorAll('.num');

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    startCounter(counter);
                    observer.unobserve(counter); // Stop observing once the counter has started
                }
            });
        },
        { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    // Observe each counter element
    valueDisplays.forEach((counter) => {
        observer.observe(counter);
    });
});
