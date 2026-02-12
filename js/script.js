// ==========================================
// Hamburger Menu Toggle
// ==========================================
const hamburger  = document.getElementById('hamburger');
const navMenu    = document.getElementById('nav-menu');
const navOverlay = document.getElementById('nav-overlay');

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

navOverlay.addEventListener('click', closeMenu);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
});

// ==========================================
// Optimized Smooth Scroll & Nav Close
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            
            // Close mobile menu if it was clicked
            if (navMenu.classList.contains('nav-open')) {
                closeMenu();
            }

            // Using native scroll (CSS scroll-padding-top handles the offset)
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==========================================
// High-Performance Scroll Listeners (Throttled)
// ==========================================
const header = document.querySelector('header');
const orb1 = document.querySelector('.orb-1');
const orb2 = document.querySelector('.orb-2');
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const s = window.pageYOffset;
            
            // 1. Header Shadow Logic
            header.style.boxShadow = s > 50 
                ? '0 4px 20px rgba(0,0,0,0.3)' 
                : 'none';

            // 2. Optimized Parallax (using smaller multiplier for subtle feel)
            if (orb1) orb1.style.transform = `translate(${s * 0.05}px, ${s * 0.05}px)`;
            if (orb2) orb2.style.transform = `translate(${-s * 0.05}px, ${-s * 0.05}px)`;

            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// ==========================================
// Active Nav Highlight (Intersection Observer)
// ==========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
    threshold: 0.5,
    rootMargin: "-100px 0px -20% 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// ==========================================
// Scroll Reveal (kept your original logic)
// ==========================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card, .timeline-item, .hackathon-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    revealObserver.observe(el);
});