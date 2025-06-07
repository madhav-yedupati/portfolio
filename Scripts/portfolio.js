// Navigation Menu Toggle
const menuIcon = document.getElementById('menu-icon');
const headerLinks = document.getElementById('header-links');
const scrollToTopButton = document.getElementById('scroll-to-top');
const modeToggle = document.getElementById('mode-toggle');
const body = document.body;

// Menu functionality
menuIcon.addEventListener('click', () => {
    headerLinks.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuIcon.contains(e.target) && !headerLinks.contains(e.target)) {
        headerLinks.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking
            headerLinks.classList.remove('active');
        }
    });
});

// Scroll to top button functionality
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopButton.style.display = 'flex';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Active link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.header-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active-link');
        }
    });
});

// Theme toggle functionality
modeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const icon = modeToggle.querySelector('i');
    if (body.classList.contains('light-mode')) {
        icon.classList.remove('fa-code');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-code');
    }
}); 