// Main JavaScript for Vamsidhar Menthem's Portfolio
// Author: Manus AI
// Date: April 2025

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initThemeToggle();
    initNavigation();
    initTypingEffect();
    initParticles();
    initScrollAnimations();
    initCalendar();
    initFormHandling();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeSwitch.checked = true;
    }
    
    // Theme switch event listener
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Navigation Functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Active link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Typing Effect for Hero Section
function initTypingEffect() {
    const options = {
        strings: [
            'Software Engineer specializing in Microservices &amp; Distributed Systems',
            'Java and Spring Boot Developer',
            'AWS Cloud Solutions Architect',
            'Database Performance Optimizer'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    };
    
    if (document.querySelector('.typing-text')) {
        new Typed('.typing-text', options);
    }
}

// Particles Background for Hero Section
function initParticles() {
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#1E3A8A'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#0D9488',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('.section');
    
    const fadeInOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        });
    }, fadeInOptions);
    
    sections.forEach(section => {
        section.classList.add('fade-out'); // Initial state
        fadeInObserver.observe(section);
    });
    
    // Add slide-in animation to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const slideInOptions = {
        threshold: 0.2
    };
    
    const slideInObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            entry.target.classList.add('slide-in');
            observer.unobserve(entry.target);
        });
    }, slideInOptions);
    
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
        item.classList.add('slide-out'); // Initial state
        slideInObserver.observe(item);
    });
    
    // Add pop-in animation to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    
    const popInOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const popInObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            const item = entry.target;
            setTimeout(() => {
                item.classList.add('pop-in');
            }, Math.random() * 500); // Random delay for staggered effect
            
            observer.unobserve(item);
        });
    }, popInOptions);
    
    skillItems.forEach(item => {
        item.classList.add('pop-out'); // Initial state
        popInObserver.observe(item);
    });
    
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });
}

// Calendar Initialization
function initCalendar() {
    if (document.getElementById('calendar')) {
        const calendarEl = document.getElementById('calendar');
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek'
            },
            businessHours: {
                daysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday
                startTime: '09:00',
                endTime: '17:00'
            },
            selectConstraint: 'businessHours',
            selectable: true,
            select: function(info) {
                // Fill the booking form with the selected date
                document.getElementById('date').value = info.startStr;
                
                // Scroll to booking form
                document.querySelector('.booking-form').scrollIntoView({
                    behavior: 'smooth'
                });
            },
            events: [
                // Sample available slots (would be dynamically generated in a real implementation)
                {
                    title: 'Available',
                    start: '2025-04-10T09:00:00',
                    end: '2025-04-10T12:00:00',
                    color: '#0D9488'
                },
                {
                    title: 'Available',
                    start: '2025-04-12T13:00:00',
                    end: '2025-04-12T17:00:00',
                    color: '#0D9488'
                },
                {
                    title: 'Available',
                    start: '2025-04-15T10:00:00',
                    end: '2025-04-15T15:00:00',
                    color: '#0D9488'
                },
                {
                    title: 'Booked',
                    start: '2025-04-08T14:00:00',
                    end: '2025-04-08T16:00:00',
                    color: '#F97316'
                }
            ]
        });
        
        calendar.render();
    }
}

// Form Handling
function initFormHandling() {
    // Booking form submission
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Processing...';
            
            // Simulate API call
            setTimeout(() => {
                // Show success message
                const formContainer = this.parentElement;
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h3>Interview Request Sent!</h3>
                    <p>Thank you for your interest. Your interview request has been received. I'll get back to you shortly to confirm the appointment.</p>
                `;
                
                formContainer.innerHTML = '';
                formContainer.appendChild(successMessage);
                
                // Reset form state
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 2000);
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Simulate API call
            setTimeout(() => {
                // Show success message
                const formContainer = this.parentElement;
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h3>Message Sent!</h3>
                    <p>Thank you for your message. I'll get back to you as soon as possible.</p>
                `;
                
                formContainer.innerHTML = '';
                formContainer.appendChild(successMessage);
                
                // Reset form state
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 2000);
        });
    }
}

// Add CSS animations
document.head.insertAdjacentHTML('beforeend', `
<style>
    /* Animation Classes */
    .fade-out {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .slide-out {
        opacity: 0;
        transform: translateX(-50px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .slide-in {
        opacity: 1;
        transform: translateX(0);
    }
    
    .pop-out {
        opacity: 0;
        transform: scale(0.8);
        transition: opacity 0.4s ease, transform 0.4s ease;
    }
    
    .pop-in {
        opacity: 1;
        transform: scale(1);
    }
    
    .project-card.hover {
        transform: translateY(-10px);
    }
    
    .success-message {
        text-align: center;
        padding: 2rem;
    }
    
    .success-message i {
        font-size: 3rem;
        color: #0D9488;
        margin-bottom: 1rem;
    }
</style>
`);
