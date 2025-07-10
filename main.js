document.addEventListener('DOMContentLoaded', () => {

    initCursorAnimation();
    initHeaderScroll();
    initMobileMenu();
    initHeroAnimation();
    initScrollAnimation();
    initSkillsAnimation();
    initProjectFilter();
    initContactForm();
    initParticles();
});

// Cursor
function initCursorAnimation() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (!cursorDot || !cursorOutline) return;

    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
            cursorDot.style.transform = `translate(${posX}px, ${posY}px)`;
            setTimeout(() => {
                cursorOutline.style.transform = `translate(${posX}px, ${posY}px)`;
            }, 100);
        });

        const interactiveElements = document.querySelectorAll('a, button, .project-card, .social-link, input, textarea');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.backgroundColor = 'rgba(220, 38, 38, 0.2)';
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    } else {
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
    }
}

// Header scroll
function initHeaderScroll() {
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        header?.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// Mobile menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        });
    });
}

// Hero animation
function initHeroAnimation() {
    const greeting = document.querySelector('.greeting');
    const name = document.querySelector('.name');
    const profession = document.querySelector('.profession');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(greeting, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
      .fromTo(name, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.5')
      .fromTo(profession, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.5')
      .fromTo(heroDescription, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.5')
      .fromTo(heroButtons, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.5');
}

// Scroll animation
function initScrollAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo('.about-image', { x: -100, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1,
        scrollTrigger: { trigger: '.about-content', start: 'top 80%', end: 'bottom 60%', toggleActions: 'play none none none' }
    });

    gsap.fromTo('.about-text', { x: 100, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1,
        scrollTrigger: { trigger: '.about-content', start: 'top 80%', end: 'bottom 60%', toggleActions: 'play none none none' }
    });

    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.fromTo(card, { y: 100, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.8, delay: i * 0.2,
            scrollTrigger: { trigger: '.projects-grid', start: 'top 80%', end: 'bottom 60%', toggleActions: 'play none none none' }
        });
    });

    gsap.fromTo('.contact-info', { x: -100, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1,
        scrollTrigger: { trigger: '.contact-content', start: 'top 80%', end: 'bottom 60%', toggleActions: 'play none none none' }
    });

    gsap.fromTo('.contact-form', { x: 100, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1,
        scrollTrigger: { trigger: '.contact-content', start: 'top 80%', end: 'bottom 60%', toggleActions: 'play none none none' }
    });

    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.fromTo(header, { y: -50, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.8,
            scrollTrigger: { trigger: header, start: 'top 80%', end: 'bottom 60%', toggleActions: 'play none none none' }
        });
    });
}

// Skills animation
function initSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const animateSkills = () => {
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress') + '%';
            bar.style.width = progress;
        });
    };

    ScrollTrigger.create({
        trigger: '.skills-content',
        start: 'top 80%',
        onEnter: animateSkills,
        once: true
    });

    gsap.utils.toArray('.tech-icon').forEach((icon, i) => {
        gsap.fromTo(icon, { y: 50, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.5, delay: i * 0.1,
            scrollTrigger: { trigger: '.tech-icons', start: 'top 80%', end: 'bottom 60%', toggleActions: 'play none none none' }
        });
    });
}

// Project filters
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const match = filterValue === 'all' || card.getAttribute('data-category') === filterValue;
                gsap.to(card, {
                    scale: match ? 1 : 0.8,
                    opacity: match ? 1 : 0,
                    duration: 0.5,
                    display: match ? 'block' : 'none',
                    onComplete: () => {
                        card.style.display = match ? 'block' : 'none';
                    }
                });
            });
        });
    });
}

// Contact form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);

            const scriptURL = 'https://script.google.com/macros/s/AKfycby4ALsLzygVo-AE-6GoF5ijAZgiebIvBR_Lc-AiVWrT-bt3XGwN6h33YV-xmb4amt6b7Q/exec';

            fetch(scriptURL, {
                method: 'POST',
                body: formData
            })
            .then(res => res.text())
            .then(result => {
                showToast("✅ Message sent successfully!");
                contactForm.reset();
            })
            .catch(err => {
                showToast("❌ Message failed to send.");
                console.error(err);
            });
        });
    }
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = msg;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}


// Particles
function initParticles() {
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 }},
                color: { value: '#dc2626' },
                shape: { type: 'circle' },
                opacity: { value: 0.5 },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: '#dc2626', opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2 }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }},
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 1 }},
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }
}


