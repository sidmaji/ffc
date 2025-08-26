document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()
            const target = document.querySelector(this.getAttribute('href'))
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                })
            }
        })
    })

    // Navbar background on scroll
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar')
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)'
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)'
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)'
            navbar.style.boxShadow = 'none'
        }
    })

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    }

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible')
            }
        })
    }, observerOptions)

    // Add scroll animation classes to elements
    document.querySelectorAll('.section-title, .section-description, .chapter-card').forEach((el) => {
        el.classList.add('fade-in-scroll')
        observer.observe(el)
    })

    // Chapter carousel auto-scroll (subtle)
    const carousel = document.querySelector('.chapters-carousel')
    let isUserScrolling = false
    let scrollTimeout

    carousel.addEventListener('scroll', function () {
        isUserScrolling = true
        clearTimeout(scrollTimeout)
        scrollTimeout = setTimeout(() => {
            isUserScrolling = false
        }, 3000)
    })

    // Auto-scroll chapters every 8 seconds if user isn't scrolling
    setInterval(() => {
        if (!isUserScrolling && carousel) {
            const scrollAmount = carousel.scrollLeft + 320
            const maxScroll = carousel.scrollWidth - carousel.clientWidth

            if (scrollAmount >= maxScroll) {
                carousel.scrollTo({ left: 0, behavior: 'smooth' })
            } else {
                carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' })
            }
        }
    }, 8000)
})
