document.addEventListener('DOMContentLoaded', () => {
    const starsBg = document.getElementById('starsBg');
    const heroMascot = document.getElementById('earthyHero');
    
    // Parallax effect for stars and hero mascot
    window.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 25;
        const y = (window.innerHeight / 2 - e.pageY) / 25;
        
        if (starsBg) {
            starsBg.style.transform = `translate(${x / 2}px, ${y / 2}px) scale(1.1)`;
        }
        
        if (heroMascot) {
            heroMascot.style.transform = `translate(${x}px, ${y}px) scale(1.2)`;
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.glass-card, .section-title, .mascot-card').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
        observer.observe(el);
    });

    // Custom visible class added via JS
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Global toggle for copy function
    window.copyCA = function() {
        const caText = document.getElementById('ca-text').innerText;
        navigator.clipboard.writeText(caText).then(() => {
            const successMsg = document.getElementById('copy-success');
            successMsg.classList.add('show');
            setTimeout(() => {
                successMsg.classList.remove('show');
            }, 2000);
        });
    };
});
