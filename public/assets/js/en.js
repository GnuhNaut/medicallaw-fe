// Extracted scripts from en.html
document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', () => {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollableHeight) * 100;
        document.getElementById('progress-bar').style.width = scrolled + '%';
    });

    particlesJS('particles-js', {"particles":{"number":{"value":50,"density":{"enable":true,"value_area":800}},"color":{"value":["#0a2540","#14b8a6"]},"shape":{"type":"circle"},"opacity":{"value":0.6,"random":true},"size":{"value":3,"random":true},"line_linked":{"enable":true,"distance":150,"color":"#0d3b66","opacity":0.2,"width":1},"move":{"enable":true,"speed":1.5,"direction":"none","random":true,"straight":false,"out_mode":"out","bounce":false}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"grab"},"onclick":{"enable":false},"resize":true},"modes":{"grab":{"distance":140,"line_linked":{"opacity":0.4}}}},"retina_detect":true});

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => { mobileMenu.classList.toggle('hidden'); });
    mobileMenu.addEventListener('click', () => { mobileMenu.classList.add('hidden'); });

    const countdownDate = new Date("Nov 21, 2025 07:30:00").getTime();
    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        document.getElementById('days').innerText = Math.floor(distance / 864e5).toString().padStart(2, '0');
        document.getElementById('hours').innerText = Math.floor((distance % 864e5) / 36e5).toString().padStart(2, '0');
        document.getElementById('minutes').innerText = Math.floor((distance % 36e5) / 6e4).toString().padStart(2, '0');
        document.getElementById('seconds').innerText = Math.floor((distance % 6e4) / 1000).toString().padStart(2, '0');
        if (distance < 0) {
            clearInterval(timer);
            document.getElementById('countdown').innerHTML = "<div class='col-span-4 text-2xl font-bold text-brand-navy'>The event has already taken place!</div>";
        }
    }, 1000);

    const form = document.getElementById('registration-form');
    const formMessage = document.getElementById('form-message');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const loader = submitBtn.querySelector('.loader');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        submitBtn.disabled = true;
        btnText.classList.add('opacity-50');
        loader.classList.remove('hidden');
        const inputs = form.querySelectorAll('input, select');
        const [nameInput, positionInput, emailInput, phoneInput, addressInput, questionInput, typeSelect, needSelect] = inputs;
        const data = { name: nameInput.value.trim(), position: positionInput.value.trim(), email: emailInput.value.trim(), phone: phoneInput.value.trim(), address: addressInput.value.trim(), question: questionInput.value.trim(), type: typeSelect.options[typeSelect.selectedIndex].text, need: needSelect.options[needSelect.selectedIndex].text };
        try {
            const res = await fetch('https://api.xuan.media/send_mail', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
            if (res.ok) {
                formMessage.textContent = 'Thank you for registering! Redirecting to payment page...';
                formMessage.className = 'block text-center p-3 rounded-md bg-green-100 text-green-800';
                form.reset();
                setTimeout(() => { window.location.href = 'payment-en.html'; }, 1000);
            } else {
                formMessage.textContent = 'Registration failed. Please try again or contact the organizers.';
                formMessage.className = 'block text-center p-3 rounded-md bg-red-100 text-red-800';
            }
        } catch (err) {
            formMessage.textContent = 'Could not connect to the server. Please try again later.';
            formMessage.className = 'block text-center p-3 rounded-md bg-red-100 text-red-800';
        } finally {
            submitBtn.disabled = false;
            btnText.classList.remove('opacity-50');
            loader.classList.add('hidden');
        }
    });

    class IntegratedSlideshow {
        constructor() { this.slides = document.querySelectorAll('.slide'); this.indicators = document.querySelectorAll('.slideshow-indicators .indicator'); this.prevBtn = document.getElementById('slideshowPrevBtn'); this.nextBtn = document.getElementById('slideshowNextBtn'); this.currentSlide = 0; this.totalSlides = this.slides.length; this.autoSlideInterval = null; this.init(); }
        init() { this.bindEvents(); this.startAutoSlide(); this.updateSlide(); }
        bindEvents() { this.prevBtn.addEventListener('click', () => this.prevSlide()); this.nextBtn.addEventListener('click', () => this.nextSlide()); this.indicators.forEach((indicator, index) => { indicator.addEventListener('click', () => this.goToSlide(index)); }); const slideshow = document.querySelector('.integrated-slideshow'); slideshow.addEventListener('mouseenter', () => this.stopAutoSlide()); slideshow.addEventListener('mouseleave', () => this.startAutoSlide()); }
        updateSlide() { this.slides.forEach(slide => { slide.classList.remove('active'); }); this.slides[this.currentSlide].classList.add('active'); this.indicators.forEach((indicator, index) => { indicator.classList.toggle('active', index === this.currentSlide); }); }
        nextSlide() { this.currentSlide = (this.currentSlide + 1) % this.totalSlides; this.updateSlide(); }
        prevSlide() { this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides; this.updateSlide(); }
        goToSlide(index) { this.currentSlide = index; this.updateSlide(); }
        startAutoSlide() { this.stopAutoSlide(); this.autoSlideInterval = setInterval(() => { this.nextSlide(); }, 4000); }
        stopAutoSlide() { if (this.autoSlideInterval) { clearInterval(this.autoSlideInterval); this.autoSlideInterval = null; } }
    }
    new IntegratedSlideshow();

    let resizeTimer;
    window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { location.reload(); }, 250); });

    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll('section h2').forEach(h => { gsap.from(h, { opacity: 0, y: 20, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: h, start: 'top 85%', once: true } }); });
    gsap.set('.hero-content > *', { autoAlpha: 1 });
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTimeline.fromTo('.hero-content > h1', { y: -20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 })
        .fromTo('.hero-content p.timetable', { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1 }, "-=0.4")
        .fromTo('.hero-content > p:nth-of-type(2)', { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, "-=0.6")
        .fromTo('#countdown > div', { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1 }, "-=0.5")
        .fromTo('.hero-content > a', { scale: 0.95, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.6 }, "-=0.4");

    const animatedGrids = ['#key-info > div','#agenda .space-y-4 > div','#speakers .grid > div','.integrated-slideshow','#benefits .grid > div','#tickets .grid > div','#sponsors .grid > div'];
    animatedGrids.forEach(selector => { gsap.set(selector, { autoAlpha: 0, y: 40 }); ScrollTrigger.create({ trigger: selector, start: 'top 90%', onEnter: () => gsap.to(selector, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }), once: true }); });
});


