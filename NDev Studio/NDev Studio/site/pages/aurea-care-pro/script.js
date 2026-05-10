document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const overlay = document.querySelector('.menu-overlay');

    const closeMenu = () => {
        if (!hamburger || !navMenu) return;
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
    };

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isOpen = hamburger.classList.toggle('active');
            navMenu.classList.toggle('active', isOpen);
            hamburger.setAttribute('aria-expanded', String(isOpen));
            document.body.classList.toggle('menu-open', isOpen);
        });
    }

    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for fixed header
                const headerOffset = header ? header.offsetHeight + 10 : 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Form Submission (WhatsApp)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            const name = contactForm.querySelector('input[type="text"]')?.value?.trim() || '';
            const email = contactForm.querySelector('input[type="email"]')?.value?.trim() || '';
            const objective = contactForm.querySelector('select')?.value?.trim() || '';
            const message = contactForm.querySelector('textarea')?.value?.trim() || '';
            
            btn.innerText = 'Abrindo WhatsApp...';
            btn.disabled = true;

            setTimeout(() => {
                const lines = [
                    'Olá! Quero agendar uma avaliação.',
                    name ? `Nome: ${name}` : null,
                    email ? `Email: ${email}` : null,
                    objective ? `Objetivo: ${objective}` : null,
                    message ? `Mensagem: ${message}` : null
                ].filter(Boolean);

                const url = `https://wa.me/5561982352620?text=${encodeURIComponent(lines.join('\n'))}`;
                window.open(url, '_blank', 'noopener,noreferrer');

                contactForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }
});
