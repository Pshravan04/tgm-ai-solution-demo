document.addEventListener('DOMContentLoaded', () => {

    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500); // Wait for fade out transition
            }, 1500); // Keep visual for at least 1.5s
        });
    }

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Toggle icon
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    // icon.classList.remove('fa-bars');
                    // icon.classList.add('fa-times');
                    // Keep hamburger as is if we have a separate close button, OR hide hamburger when open?
                    // For now, let's keep basic toggle behavior but rely on the close button which is better
                }
            }
        });

        // Close button logic
        const closeBtn = document.querySelector('.menu-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        }

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // --- Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle ? themeToggle.querySelector('i') : null;

    // Check local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.setAttribute('data-theme', 'light');
        if (icon) { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (body.getAttribute('data-theme') === 'light') {
                body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
                icon.classList.remove('fa-sun'); icon.classList.add('fa-moon');
            } else {
                body.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                icon.classList.remove('fa-moon'); icon.classList.add('fa-sun');
            }
        });
    }

    // --- Solution Section Interactive Showcase ---
    const solutionItems = document.querySelectorAll('.solution-item');
    const previewContents = document.querySelectorAll('.preview-content');

    if (solutionItems.length > 0) {
        solutionItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                // Remove active class from all
                solutionItems.forEach(i => i.classList.remove('active'));
                previewContents.forEach(p => p.classList.remove('active'));

                // Add active to current
                item.classList.add('active');

                // Show matching preview
                const targetId = item.getAttribute('data-target');
                const targetPreview = document.getElementById(targetId);
                if (targetPreview) {
                    targetPreview.classList.add('active');
                }
            });
        });
    }

    // --- Before/After Comparison Slider ---
    const slider = document.querySelector('.comparison-slider');
    const beforeImage = document.querySelector('.image-wrapper.before');
    const handle = document.querySelector('.handle');

    if (slider && beforeImage && handle) {
        let isDragging = false;

        const updateSlider = (x) => {
            const rect = slider.getBoundingClientRect();
            let pos = ((x - rect.left) / rect.width) * 100;

            // Clamp value between 0 and 100
            if (pos < 0) pos = 0;
            if (pos > 100) pos = 100;

            beforeImage.style.width = `${pos}%`;
            handle.style.left = `${pos}%`;
        };

        slider.addEventListener('mousedown', () => isDragging = true);
        window.addEventListener('mouseup', () => isDragging = false);
        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            updateSlider(e.clientX);
        });

        // Touch support
        slider.addEventListener('touchstart', () => isDragging = true);
        window.addEventListener('touchend', () => isDragging = false);
        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            updateSlider(e.touches[0].clientX);
        });
    }

    // --- Accordion for FAQ ---
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            // Close others (optional - standard accordion behavior)
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.accordion-body').style.display = 'none';
                    otherItem.querySelector('.icon').innerText = '+';
                }
            });

            // Toggle current
            const body = item.querySelector('.accordion-body');
            const icon = item.querySelector('.icon');

            if (body.style.display === 'block') {
                body.style.display = 'none';
                icon.innerText = '+';
            } else {
                body.style.display = 'block';
                icon.innerText = '-';
            }
        });
    });

    // --- Scroll Animation Observer ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before element is fully visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Select elements to animate
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // --- Mouse Follower for Glass Cards ---
    document.querySelectorAll('.glass-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    // --- Custom Cursor & Particles ---
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', function (e) {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot follows instantly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Outline follows with CSS transition
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;

            // Create Particle
            createParticle(posX, posY);
        });

        // Interactive Hover Effect
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .glass-card, .wave-step');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    }

    function createParticle(x, y) {
        if (Math.random() > 0.5) return; // Limit particles

        const particle = document.createElement('div');
        particle.classList.add('gold-particle');
        document.body.appendChild(particle);

        const destinationX = (Math.random() - 0.5) * 60;
        const destinationY = (Math.random() - 0.5) * 60;

        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.setProperty('--tx', `${destinationX}px`);
        particle.style.setProperty('--ty', `${destinationY}px`);

        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }

});
