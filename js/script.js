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

// Toggle on hamburger click
hamburger.addEventListener('click', (e) => {
    // Stop event from bubbling so it doesn't immediately
    // trigger any document click listener
    e.stopPropagation();
    navMenu.classList.contains('nav-open') ? closeMenu() : openMenu();
});

// Close when clicking the dark overlay
navOverlay.addEventListener('click', closeMenu);

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
});

// ==========================================
// Smooth Scroll + Auto-close Menu on Nav Click
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();

            // Close mobile menu first, then scroll
            if (navMenu.classList.contains('nav-open')) {
                closeMenu();
                // Small delay so the drawer close animation doesn't fight scroll
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth' });
                }, 50);
            } else {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ==========================================
// Header Shadow on Scroll (Throttled)
// ==========================================
const header = document.querySelector('header');
const orb1   = document.querySelector('.orb-1');
const orb2   = document.querySelector('.orb-2');
let ticking  = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const s = window.pageYOffset;

            // Header shadow
            header.style.boxShadow = s > 50
                ? '0 4px 24px rgba(0,0,0,0.4)'
                : 'none';

            // Subtle parallax on orbs
            if (orb1) orb1.style.transform = `translate(${s * 0.04}px, ${s * 0.04}px)`;
            if (orb2) orb2.style.transform = `translate(${-s * 0.04}px, ${-s * 0.04}px)`;

            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// ==========================================
// Active Nav Highlight via Intersection Observer
// ==========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

// rootMargin: negative top offset to account for sticky header height
const sectionObserver = new IntersectionObserver((entries) => {
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
}, {
    threshold: 0.35,
    rootMargin: '-80px 0px -30% 0px'
});

sections.forEach(section => sectionObserver.observe(section));

// ==========================================
// Scroll Reveal for Cards & Timeline Items
// ==========================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity  = '1';
            entry.target.style.transform = 'translateY(0)';
            // Unobserve after reveal so it doesn't re-trigger
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card, .timeline-item, .hackathon-card, .contact-item')
    .forEach((el, i) => {
        el.style.opacity   = '0';
        el.style.transform = 'translateY(28px)';
        // Stagger delay based on element index within its parent
        const siblings = el.parentElement.children;
        const idx = Array.from(siblings).indexOf(el);
        el.style.transition = `opacity 0.5s ease-out ${idx * 0.08}s, transform 0.5s ease-out ${idx * 0.08}s`;
        revealObserver.observe(el);
    });
