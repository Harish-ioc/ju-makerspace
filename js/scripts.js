// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    if (mainNav && mainNav.classList.contains('active')) {
                        mainNav.classList.remove('active');
                        if (menuToggle) {
                            menuToggle.classList.remove('active');
                        }
                    }
                }
            }
        });
    });

    // Form Submission Handler
    const form = document.getElementById('makerspace-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const messageDiv = document.getElementById('form-message');
            const formData = new FormData(form);
            
            // Get all form values
            const data = {};
            for (let [key, value] of formData.entries()) {
                if (key.includes('[]')) {
                    const cleanKey = key.replace('[]', '');
                    if (!data[cleanKey]) {
                        data[cleanKey] = [];
                    }
                    data[cleanKey].push(value);
                } else {
                    data[key] = value;
                }
            }
            
            // Validate required fields
            const fullName = form.querySelector('#full_name').value.trim();
            const email = form.querySelector('#email').value.trim();
            const phone = form.querySelector('#phone').value.trim();
            const membershipType = form.querySelector('#membership_type').value;
            const agreeTerms = form.querySelector('[name="agree_terms"]').checked;
            
            if (!fullName || !email || !phone || !membershipType || !agreeTerms) {
                showMessage('error', 'Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('error', 'Please enter a valid email address.');
                return;
            }
            
            // Since this is a static site, we'll show success and log data
            console.log('Form Data:', data);
            
            // Show success message
            showMessage('success', 'Thank you for your application! We will contact you soon.');
            
            // Reset form
            form.reset();
            
            // In a real implementation, you would send this data to a backend service
            // For GitHub Pages, you could integrate with services like:
            // - Formspree (https://formspree.io/)
            // - Netlify Forms
            // - Google Forms
            // - EmailJS (https://www.emailjs.com/)
        });
    }
    
    function showMessage(type, message) {
        const messageDiv = document.getElementById('form-message');
        if (messageDiv) {
            messageDiv.className = 'form-message ' + type;
            messageDiv.textContent = message;
            messageDiv.style.display = 'block';
            
            // Scroll to message
            messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Hide after 5 seconds
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }
    }

    // Add scroll effect to header
    let lastScroll = 0;
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scrolling down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scrolling up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
});