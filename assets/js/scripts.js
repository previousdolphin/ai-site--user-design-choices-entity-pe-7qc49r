document.addEventListener('DOMContentLoaded', () => {
    // --- CUSTOM CURSOR LOGIC ---
    const cursor = document.getElementById('custom-cursor');
    
    // Only activate custom cursor on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Add hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, video, .placeholder-box');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover-active');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover-active');
            });
        });
    } else {
        // Hide cursor element on touch devices
        cursor.style.display = 'none';
    }

    // --- VIDEO UNMUTE TOGGLE ---
    const video = document.getElementById('hero-vid');
    const unmuteBtn = document.getElementById('unmute-btn');

    if (video && unmuteBtn) {
        unmuteBtn.addEventListener('click', () => {
            if (video.muted) {
                video.muted = false;
                unmuteBtn.innerHTML = 'MUTE [ M ]';
                unmuteBtn.style.backgroundColor = 'var(--neon-pink)';
                unmuteBtn.style.color = 'var(--bg)';
            } else {
                video.muted = true;
                unmuteBtn.innerHTML = 'UNMUTE [ M ]';
                unmuteBtn.style.backgroundColor = 'var(--neon-green)';
            }
        });

        // Keyboard shortcut for muting/unmuting
        document.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 'm') {
                unmuteBtn.click();
            }
        });
    }

    // --- SCROLL REVEAL ANIMATIONS ---
    const revealElements = document.querySelectorAll('.reveal-item');
    
    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});