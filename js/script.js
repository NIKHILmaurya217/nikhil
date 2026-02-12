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
// Nav Links — close menu THEN scroll
// ==========================================
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target   = document.querySelector(targetId);

        // Close mobile menu first, then scroll after transition ends (350ms)
        closeMenu();

        setTimeout(() => {
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 150);
    });
});

// Also handle other anchor links (hero CTA buttons etc.)
document.querySelectorAll('a[href^="#"]:not(.nav-link)').forEach(anchor => {
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
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

document.querySelectorAll('.skill-card, .timeline-item, .hackathon-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    revealObserver.observe(el);
});

// ==========================================
// Active Nav Highlight on Scroll
// ==========================================
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('nav a[href^="#"]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const top    = section.offsetTop - 120;
        const height = section.offsetHeight;
        const id     = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation, { passive: true });

// ==========================================
// Header Shadow on Scroll
// ==========================================
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    header.style.boxShadow = window.pageYOffset > 100
        ? '0 4px 20px rgba(0,0,0,0.3)'
        : 'none';
}, { passive: true });

// ==========================================
// Parallax Orbs
// ==========================================
window.addEventListener('scroll', () => {
    const s    = window.pageYOffset;
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');
    if (orb1) orb1.style.transform = 'translate(' + (s * 0.1) + 'px,' + (s * 0.1) + 'px)';
    if (orb2) orb2.style.transform = 'translate(' + (-s * 0.1) + 'px,' + (-s * 0.1) + 'px)';
}, { passive: true });

// ==========================================
// Console Easter Egg
// ==========================================
console.log('%c Hey there!', 'font-size:20px;font-weight:bold;color:#00ff88;');
console.log('%cFeel free to reach out!', 'font-size:14px;color:#64748b;');
console.log('%c nikhilmaurya217@gmail.com', 'font-size:14px;color:#0047ff;');
