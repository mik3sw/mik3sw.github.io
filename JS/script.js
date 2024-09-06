document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const scrollContainer = document.querySelector('.scroll-container');
    const backgroundOverlay = document.querySelector('.background-overlay');
    const menuButton = document.querySelector('.menu-button');
    const menu = document.querySelector('.menu');
    const menuLinks = menu.querySelectorAll('a');

    let isScrolling = false;
    let startY;
    let currentSection = 0;

    function updateBackground() {
        if (currentSection === 0) {
            backgroundOverlay.style.opacity = '1';
            menuButton.style.setProperty('--menu-button-color', 'white');
        } else {
            backgroundOverlay.style.opacity = '0';
            menuButton.style.setProperty('--menu-button-color', 'black');
        }
    }

    function updateVisibility() {
        sections.forEach((section, index) => {
            const content = section.querySelector('.content');
            if (index <= currentSection) {
                content.classList.add('visible');
            } else {
                content.classList.remove('visible');
            }
        });
    }

    function scrollToSection(index) {
        isScrolling = true;
        currentSection = index;
        sections[currentSection].scrollIntoView({ behavior: 'smooth' });
        updateBackground();
        updateVisibility();

        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }

    scrollContainer.addEventListener('scroll', () => {
        const currentIndex = Math.round(scrollContainer.scrollTop / window.innerHeight);
        if (currentIndex !== currentSection) {
            currentSection = currentIndex;
            updateBackground();
            updateVisibility();
        }
    });

    menuButton.addEventListener('click', () => {
        menu.classList.toggle('open');
        menuButton.classList.toggle('open');
    });

    menuLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetIndex = Array.from(sections).findIndex(section => section.id === targetId);
            scrollToSection(targetIndex);
            menu.classList.remove('open');
            menuButton.classList.remove('open');
        });
    });

    // Inizializza lo stato
    updateBackground();
    updateVisibility();
});

const icon = document.querySelector('.icon');
        const iconContainer = document.querySelector('.icon-container');
        const max_distance = 5;

        iconContainer.addEventListener('mousemove', (e) => {
            const rect = iconContainer.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distanceX = (e.clientX - centerX) / (rect.width / 2);
            const distanceY = (e.clientY - centerY) / (rect.height / 2);

            const translateX = distanceX * max_distance;
            const translateY = distanceY * max_distance;

            icon.style.transform = `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px))`;
        });

        iconContainer.addEventListener('mouseleave', () => {
            icon.style.transform = 'translate(-50%, -50%)';
        });