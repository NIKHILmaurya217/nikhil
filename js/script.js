// ==========================================
// Mobile Full-Screen Nav Panel
// ==========================================
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');

// Build the mobile menu panel once, append to body
// This avoids ALL z-index / stacking context issues with fixed headers
let mobilePanel = null;

function buildMobilePanel() {
    if (mobilePanel) return; // only build once

    mobilePanel = document.createElement('div');
    mobilePanel.className = 'mobile-menu-panel';
    mobilePanel.setAttribute('role', 'dialog');
    mobilePanel.setAttribute('aria-modal', 'true');
    mobilePanel.setAttribute('aria-label', 'Navigation menu');

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'mobile-menu-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close navigation');
    closeBtn.addEventListener('click', closeMenu);
    mobilePanel.appendChild(closeBtn);

    // Available badge
    const badge = document.createElement('div');
    badge.className = 'mobile-menu-badge';
    badge.textContent = '🚀 Available for Freelance';
    mobilePanel.appendChild(badge);

    // Clone nav links into the panel
    const ul = document.createElement('ul');
    const originalLinks = navMenu.querySelectorAll('li');
    originalLinks.forEach(li => {
        const clone = li.cloneNode(true);
        // Wire up click on cloned links
        clone.querySelector('a').addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                closeMenu();
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth' });
                }, 320); // wait for panel close animation
            }
        });
        ul.appendChild(clone);
    });
    mobilePanel.appendChild(ul);

    // Social links row
    const socials = document.createElement('div');
    socials.className = 'mobile-menu-socials';
    socials.innerHTML = `
        <a href="https://github.com/NIKHILmaurya217" target="_blank" aria-label="GitHub">
            <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
        <a href="https://linkedin.com/in/nikhil217" target="_blank" aria-label="LinkedIn">
            <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
    `;
    mobilePanel.appendChild(socials);

    // Close on backdrop tap (tap outside the ul/close btn area)
    mobilePanel.addEventListener('click', function (e) {
        if (e.target === mobilePanel) closeMenu();
    });

    document.body.appendChild(mobilePanel);
}

// Track scroll position for body lock
let savedScrollY = 0;

function openMenu() {
    buildMobilePanel();

    // Lock scroll: save position, fix body
    savedScrollY = window.scrollY;
    document.body.style.position  = 'fixed';
    document.body.style.top       = `-${savedScrollY}px`;
    document.body.style.width     = '100%';
    document.body.style.overflowY = 'scroll'; // keep scrollbar space

    document.body.classList.add('menu-open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');

    // Focus trap — move focus into panel
    setTimeout(() => {
        const firstLink = mobilePanel.querySelector('a, button');
        if (firstLink) firstLink.focus();
    }, 50);
}

function closeMenu() {
    document.body.classList.remove('menu-open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');

    // Restore scroll position
    document.body.style.position  = '';
    document.body.style.top       = '';
    document.body.style.width     = '';
    document.body.style.overflowY = '';
    window.scrollTo(0, savedScrollY);

    // Return focus to hamburger
    hamburger.focus();
}

hamburger.addEventListener('click', () => {
    document.body.classList.contains('menu-open') ? closeMenu() : openMenu();
});

// Escape key closes menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
        closeMenu();
    }
});

// Only build/use panel on mobile widths
// (on resize to desktop, ensure menu is closed)
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && document.body.classList.contains('menu-open')) {
        closeMenu();
    }
});

// ==========================================
// Desktop smooth scroll (nav links in header)
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==========================================
// Header shadow on scroll (throttled)
// ==========================================
const header = document.querySelector('header');
const orb1   = document.querySelector('.orb-1');
const orb2   = document.querySelector('.orb-2');
let ticking  = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const s = window.pageYOffset;

            header.style.boxShadow = s > 50
                ? '0 4px 24px rgba(0,0,0,0.4)'
                : 'none';

            if (orb1) orb1.style.transform = `translate(${s * 0.04}px, ${s * 0.04}px)`;
            if (orb2) orb2.style.transform = `translate(${-s * 0.04}px, ${-s * 0.04}px)`;

            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// ==========================================
// Active nav highlight (Intersection Observer)
// ==========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

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
            // Also update cloned links inside mobile panel
            if (mobilePanel) {
                mobilePanel.querySelectorAll('a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        }
    });
}, {
    threshold: 0.35,
    rootMargin: '-68px 0px -30% 0px'
});

sections.forEach(section => sectionObserver.observe(section));

// ==========================================
// Scroll-reveal for cards
// ==========================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity   = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card, .timeline-item, .hackathon-card, .contact-item')
    .forEach(el => {
        el.style.opacity   = '0';
        el.style.transform = 'translateY(28px)';
        const idx = Array.from(el.parentElement.children).indexOf(el);
        el.style.transition = `opacity 0.5s ease-out ${idx * 0.08}s, transform 0.5s ease-out ${idx * 0.08}s`;
        revealObserver.observe(el);
    });