// Mode Toggle with New Modes & Local Storage
const modeToggle = document.getElementById('mode-toggle');
const body = document.body;

const modes = [
    { name: "malware-mode", icon: "fa-biohazard", primary: "#00ff99", background: "#161b22" }, // Green & Dark Blue
    { name: "pentester-mode", icon: "fa-skull", primary: "#ff4d4d", background: "#22272e" }, // Red & Dark Gray
    { name: "software-mode", icon: "fa-code", primary: "#3498db", background: "#2c3e50" }, // Blue & Navy
    { name: "cyberpunk-mode", icon: "fa-gamepad", primary: "#ff007f", background: "#121212" }, // Neon Pink & Black
    { name: "hacker-mode", icon: "fa-terminal", primary: "#39ff14", background: "#000000" }, // Bright Green & Black
    { name: "red-team-mode", icon: "fa-user-secret", primary: "#ff3333", background: "#1a1a1a" }, // Red & Dark Black
    { name: "blue-team-mode", icon: "fa-shield-alt", primary: "#0066ff", background: "#1c2331" }, // Deep Blue & Dark Navy
    { name: "osint-mode", icon: "fa-search", primary: "#ffcc00", background: "#14213d" }, // Yellow & Deep Blue
    { name: "forensics-mode", icon: "fa-microscope", primary: "#00e1ff", background: "#1b1b1b" }, // Cyan & Dark Gray
    { name: "exploitdev-mode", icon: "fa-bug", primary: "#ff5500", background: "#101820" }, // Orange & Deep Navy
    { name: "terminal-mode", icon: "fa-desktop", primary: "#33ff33", background: "#0a0a0a" }, // Green & Very Dark Gray
    { name: "stealth-mode", icon: "fa-user-ninja", primary: "#5c677d", background: "#131417" }, // Grayish Blue & Dark
    { name: "cve-mode", icon: "fa-exclamation-triangle", primary: "#ff1100", background: "#2a1e1e" }, // Deep Red & Dark Brown
    { name: "re-mode", icon: "fa-tools", primary: "#00eaff", background: "#1e1b2d" }, // Electric Blue & Dark Purple
    { name: "ctf-mode", icon: "fa-flag", primary: "#ff00ff", background: "#121826" }, // Purple & Dark Blue
    { name: "aiml-mode", icon: "fa-robot", primary: "#1abc9c", background: "#1a1a2e" }, // Turquoise & Deep Blue
    { name: "space-mode", icon: "fa-moon", primary: "#bb86fc", background: "#0b0f1e" }, // Soft Purple & Deep Space
    { name: "darknet-mode", icon: "fa-mask", primary: "#ff0066", background: "#0f0f0f" }, // Neon Pink & Deep Black
];

// Retrieve last selected mode from localStorage or default to software-mode
let currentModeIndex = parseInt(localStorage.getItem('modeIndex')) || 2;

// Function to apply mode
function applyMode(index) {
    const { name, icon, primary, background } = modes[index];
    body.className = name;
    body.style.setProperty('--primary-color', primary);
    body.style.setProperty('--background-color', background);
    modeToggle.innerHTML = `<i class="fas ${icon}"></i>`;
    
    // Save mode preference
    localStorage.setItem('modeIndex', index);
    
    // Update the header and footer colors based on the current mode
    const headerBg = background ? adjustColorBrightness(background, 10) : background;
    const footerBg = background ? adjustColorBrightness(background, -10) : background;
    
    body.style.setProperty('--header-bg', headerBg);
    body.style.setProperty('--footer-bg', footerBg);
}

// Function to adjust color brightness
function adjustColorBrightness(hex, percent) {
    // Convert hex to RGB
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);

    // Adjust brightness
    r = Math.min(255, Math.max(0, r + percent));
    g = Math.min(255, Math.max(0, g + percent));
    b = Math.min(255, Math.max(0, b + percent));

    // Convert back to hex
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Initialize mode on page load
applyMode(currentModeIndex);

// Toggle mode on button click
modeToggle.addEventListener('click', () => {
    currentModeIndex = (currentModeIndex + 1) % modes.length;
    applyMode(currentModeIndex);

    // Smooth button animation
    modeToggle.style.transform = 'scale(1.2)';
    setTimeout(() => modeToggle.style.transform = 'scale(1)', 200);
});

// Toggle Menu for Small Screens with Animation
const menuIcon = document.getElementById('menu-icon');
const headerLinks = document.getElementById('header-links');

menuIcon.addEventListener('click', () => {
    headerLinks.classList.toggle('active');
    menuIcon.classList.toggle('active');
    
    // Change icon when menu is toggled
    if (headerLinks.classList.contains('active')) {
        menuIcon.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        menuIcon.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Certificate Navigation with Enhanced Animation
const certificates = [
    { image: 'images/linux.jpg', link: 'link-to-cert1', title: 'Linux Administration' },
    { image: 'images/guide.jpg', link: 'link-to-cert2', title: 'Cybersecurity Guide' },
    { image: 'images/osint.jpg', link: 'link-to-cert3', title: 'OSINT Fundamentals' },
    { image: 'images/guide.jpg', link: 'link-to-cert4', title: 'Advanced Security' },
];

let currentCertIndex = 0;
const certImage = document.getElementById('certificate-image');
const certLink = document.getElementById('certificate-link');
const certTitle = document.getElementById('certificate-title');

const updateCertificate = () => {
    if (!certImage || !certLink) return; // Guard clause if elements don't exist

    certImage.style.opacity = 0;
    setTimeout(() => {
        certImage.src = certificates[currentCertIndex].image;
        certLink.href = certificates[currentCertIndex].link;
        if (certTitle) {
            certTitle.textContent = certificates[currentCertIndex].title;
        }
        certImage.style.opacity = 1;
    }, 300);
};

// Add event listeners only if elements exist
if (document.getElementById('next-cert')) {
    document.getElementById('next-cert').addEventListener('click', () => {
        currentCertIndex = (currentCertIndex + 1) % certificates.length;
        updateCertificate();
    });
}

if (document.getElementById('prev-cert')) {
    document.getElementById('prev-cert').addEventListener('click', () => {
        currentCertIndex = (currentCertIndex - 1 + certificates.length) % certificates.length;
        updateCertificate();
    });
}

// Only call updateCertificate if certImage exists
if (certImage && certLink) {
    updateCertificate();
}

// Dynamic Header Opacity with Enhanced Scroll Effects
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Scroll-to-top button visibility
    if (currentScroll > 300) {
        scrollToTopButton.classList.add('visible');
    } else {
        scrollToTopButton.classList.remove('visible');
    }
    
    // Header effects
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        header.style.opacity = '0.7';
        header.style.transform = 'translateY(-10px)';
    } else {
        // Scrolling up
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});

// Hover Effects for Project Cards
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.4)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
    });
});

// Enhanced Contact Icons Animation
const contactIcons = document.querySelectorAll('.contact-icons a');

contactIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.2) rotate(5deg)';
        icon.style.color = 'var(--primary-color)';
    });

    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1) rotate(0deg)';
        icon.style.color = 'white';
    });
});

// Search Functionality
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

if (searchButton && searchInput) {
    searchButton.addEventListener('click', () => {
        performSearch();
    });
    
    // Also search when Enter key is pressed
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
}

function performSearch() {
    const query = searchInput.value.toLowerCase();
    const sections = document.querySelectorAll('section');
    let foundResults = false;

    sections.forEach(section => {
        const sectionText = section.textContent.toLowerCase();
        if (sectionText.includes(query)) {
            section.style.display = 'block';
            foundResults = true;
            
            // Highlight matching text
            highlightMatches(section, query);
        } else {
            section.style.display = 'none';
        }
    });
    
    // Show a message if no results found
    const resultsMessage = document.getElementById('search-results-message');
    if (resultsMessage) {
        if (!foundResults && query !== '') {
            resultsMessage.textContent = 'No results found. Try a different search term.';
            resultsMessage.style.display = 'block';
        } else {
            resultsMessage.style.display = 'none';
        }
    }
}

function highlightMatches(element, query) {
    // This is a simplified version - in practice you'd need more sophisticated text node traversal
    const nodes = element.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
    nodes.forEach(node => {
        const text = node.textContent;
        if (text.toLowerCase().includes(query)) {
            const regex = new RegExp(`(${query})`, 'gi');
            node.innerHTML = text.replace(regex, '<mark>$1</mark>');
        }
    });
}

// Clear Search
if (document.getElementById('clear-search')) {
    document.getElementById('clear-search').addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.display = 'block';
            
            // Remove highlights
            const nodes = section.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
            nodes.forEach(node => {
                node.innerHTML = node.innerText;
            });
        });
        
        // Hide any results message
        const resultsMessage = document.getElementById('search-results-message');
        if (resultsMessage) {
            resultsMessage.style.display = 'none';
        }
    });
}

// Responsive about box handling
const aboutBox = document.querySelector('.about-box');
const profileImage = document.querySelector('.profile-image');

function handleResize() {
    if (window.innerWidth <= 768) {
        if (aboutBox) aboutBox.classList.add('active');
        // Add a slight delay to trigger the animation after the layout change
        setTimeout(() => {
            if (profileImage) profileImage.classList.add('animate');
        }, 50); // 50ms delay to ensure the layout is updated
    } else {
        if (aboutBox) aboutBox.classList.remove('active');
        if (profileImage) profileImage.classList.remove('animate');
    }
}

// Trigger the effect on page load and window resize
window.addEventListener('resize', handleResize);
window.addEventListener('load', handleResize);

// Scroll-to-Top Button (Fixed)
const scrollToTopButton = document.getElementById('scroll-to-top');

if (scrollToTopButton) {
    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Add Intersection Observer for animations
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        // Remove the class first
        section.classList.remove('animate__fadeIn');
        // Then observe the element
        observer.observe(section);
    });
});

// Fix RTL layout issues
document.addEventListener('DOMContentLoaded', () => {
    // For RTL layout, ensure proper alignment in smaller screens
    if (document.documentElement.dir === 'rtl') {
        const menuIcon = document.querySelector('.menu-icon');
        const headerLinks = document.querySelector('.header-links');
        
        if (menuIcon && headerLinks && window.innerWidth <= 768) {
            headerLinks.style.right = 'auto';
            headerLinks.style.left = '20px';
        }
    }
});



