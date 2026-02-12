// ==========================================
// Hamburger Menu Toggle
// ==========================================
const hamburger   = document.getElementById('hamburger');
const navMenu     = document.getElementById('nav-menu');
const navOverlay  = document.getElementById('nav-overlay');

function openMenu() {
    navMenu.classList.add('nav-open');
    navOverlay.classList.add('active');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    navMenu.classList.remove('nav-open');
    navOverlay.classList.remove('active');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
    navMenu.classList.contains('nav-open') ? closeMenu() : openMenu();
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
});

navOverlay.addEventListener('click', closeMenu);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
});

// ==========================================
// Smooth Scrolling
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ==========================================
// Scroll Reveal Animation
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .timeline-item, .hackathon-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ==========================================
// Active Navigation Highlight on Scroll
// ==========================================
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('nav a[href^="#"]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const sectionTop    = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId     = section.getAttribute('id');
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ==========================================
// Header Shadow on Scroll
// ==========================================
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    header.style.boxShadow = window.pageYOffset > 100
        ? '0 4px 20px rgba(0, 0, 0, 0.3)'
        : 'none';
});

// ==========================================
// Parallax Effect for Background Orbs
// ==========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');
    if (orb1) orb1.style.transform = 'translate(' + (scrolled * 0.1) + 'px, ' + (scrolled * 0.1) + 'px)';
    if (orb2) orb2.style.transform = 'translate(' + (-scrolled * 0.1) + 'px, ' + (-scrolled * 0.1) + 'px)';
});

// ==========================================
// Lazy Loading Images
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                obs.unobserve(img);
            }
        });
    });
    lazyImages.forEach(img => imageObserver.observe(img));
});

// ==========================================
// Console Easter Egg
// ==========================================
console.log('%c Hey there!', 'font-size: 20px; font-weight: bold; color: #00ff88;');
console.log('%cLooking for something? Feel free to reach out!', 'font-size: 14px; color: #64748b;');
console.log('%c nikhilmaurya217@gmail.com', 'font-size: 14px; color: #0047ff;');
