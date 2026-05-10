document.addEventListener('DOMContentLoaded', () => {
    
    // Preloader
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000);

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Animate Hamburger
            const lines = hamburger.querySelectorAll('.line');
            if(navLinks.classList.contains('active')) {
                lines[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                lines[1].style.opacity = '0';
                lines[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu on link click
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const lines = hamburger.querySelectorAll('.line');
            lines[0].style.transform = 'none';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'none';
        });
    });

    // Stats Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200; 

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.parentElement.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class for fade-up animation
                entry.target.classList.add('visible');

                // Trigger stats counter if it's the stats section
                if (entry.target.classList.contains('stats') || entry.target.querySelector('.counter')) {
                    animateCounters();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animate-on-scroll class
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));
    
    // Also observe stats section specifically if not already covered
    const statsSection = document.querySelector('.stats');
    if(statsSection && !statsSection.classList.contains('animate-on-scroll')) {
        observer.observe(statsSection);
    }

    // Form Submission (WhatsApp)
    const simForm = document.querySelector('.sim-form');
    if(simForm) {
        simForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = simForm.querySelector('button');
            const originalText = btn.innerText;
            const name = simForm.querySelector('input[type="text"]')?.value?.trim() || '';
            const preferredTime = simForm.querySelectorAll('input')[1]?.value?.trim() || '';
            
            btn.innerText = 'Abrindo WhatsApp...';
            btn.style.opacity = '0.8';
            
            setTimeout(() => {
                const lines = [
                    'Olá! Quero agendar uma avaliação.',
                    name ? `Nome: ${name}` : null,
                    preferredTime ? `Melhor horário: ${preferredTime}` : null
                ].filter(Boolean);

                const url = `https://wa.me/5561982352620?text=${encodeURIComponent(lines.join('\n'))}`;
                window.open(url, '_blank', 'noopener,noreferrer');
                simForm.reset();
                btn.innerText = originalText;
                btn.style.opacity = '1';
            }, 300);
        });
    }
});
