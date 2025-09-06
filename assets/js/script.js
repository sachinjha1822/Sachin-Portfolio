document.addEventListener('DOMContentLoaded', function() {
        // Preloader
        const preloader = document.querySelector('.preloader');
        
        window.addEventListener('load', function() {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });

        // Dark/Light Mode Toggle
        const darkModeIcon = document.getElementById('darkMode-icon');
        const themeToggle = document.querySelector('.theme-toggle');
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            darkModeIcon.classList.toggle('fa-sun');
            darkModeIcon.classList.toggle('fa-moon');
            
            // Save theme preference to localStorage
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
        });
        
        // Check for saved theme preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            darkModeIcon.classList.add('fa-sun');
            darkModeIcon.classList.remove('fa-moon');
        } else {
            document.body.classList.remove('dark-mode');
            darkModeIcon.classList.add('fa-moon');
            darkModeIcon.classList.remove('fa-sun');
        }

        // Mobile Menu Toggle
        const menuIcon = document.getElementById('menu-icon');
        const navbar = document.querySelector('.navbar');
        
        menuIcon.addEventListener('click', () => {
            menuIcon.classList.toggle('fa-times');
            navbar.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a nav link
        document.querySelectorAll('.navbar a').forEach(link => {
            link.addEventListener('click', () => {
                menuIcon.classList.remove('fa-times');
                navbar.classList.remove('active');
            });
        });

        // Sticky Header on Scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            header.classList.toggle('scrolled', window.scrollY > 100);
            
            // Show/hide back to top button
            const backToTop = document.querySelector('.back-to-top');
            backToTop.classList.toggle('active', window.scrollY > 300);
        });

        // Back to Top Button
        document.querySelector('.back-to-top').addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Portfolio Filter
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // Testimonial Slider
        const testimonialSlider = new Swiper('.testimonial-slider', {
            loop: true,
            grabCursor: true,
            spaceBetween: 30,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 1,
                },
                992: {
                    slidesPerView: 1,
                },
            }
        });

        // Animate elements on scroll
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });

        // Form submission
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(this);
                const submitButton = this.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.innerHTML;
                
                // Change button text to loading
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitButton.disabled = true;
                
                fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Network response was not ok');
                    }
                })
                .then(data => {
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'alert alert-success';
                    successMessage.textContent = 'Message sent successfully!';
                    contactForm.insertBefore(successMessage, contactForm.firstChild);
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Remove message after 5 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                })
                .catch(error => {
                    // Show error message
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'alert alert-error';
                    errorMessage.textContent = 'There was a problem sending your message. Please try again later.';
                    contactForm.insertBefore(errorMessage, contactForm.firstChild);
                    
                    // Remove message after 5 seconds
                    setTimeout(() => {
                        errorMessage.remove();
                    }, 5000);
                })
                .finally(() => {
                    // Reset button
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                });
            });
        }

        // Tooltip for tech icons
        const techIcons = document.querySelectorAll('.icon[data-tooltip]');
        techIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = icon.getAttribute('data-tooltip');
                document.body.appendChild(tooltip);
                
                const rect = icon.getBoundingClientRect();
                tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
                tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
                
                icon.addEventListener('mouseleave', () => {
                    tooltip.remove();
                });
            });
        });

        // Smooth scrolling for all links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Animate skill bars on scroll
        const skillBars = document.querySelectorAll('.progress');
        const animateSkillBars = () => {
            skillBars.forEach(bar => {
                const width = bar.parentElement.previousElementSibling.querySelector('span:last-child').textContent;
                bar.style.width = width;
            });
        };

        // Use Intersection Observer to animate skill bars when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const skillsSection = document.querySelector('.skills');
        if (skillsSection) {
            observer.observe(skillsSection);
        }

        // Policy Popup Functionality
        const policyLinks = document.querySelectorAll('.policy-link');
        const policyPopup = document.querySelector('.policy-popup');
        const closePopup = document.querySelector('.close-popup');
        const popupTitle = document.querySelector('.popup-title');
        const popupText = document.querySelector('.popup-text');

        // Sample content - replace with your actual policies
        const policyContent = {
            privacy: `
                <h3>1. Information We Collect</h3>
                <p>We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us.</p>
                
                <h3>2. How We Use Your Information</h3>
                <p>We use the information we collect to provide, maintain, and improve our services, to develop new services, and to protect our users.</p>
                
                <h3>3. Information Sharing</h3>
                <p>We do not share your personal information with third parties except as described in this policy.</p>
                
                <h3>4. Security</h3>
                <p>We implement reasonable security measures to protect your information from unauthorized access.</p>
                
                <h3>5. Changes to This Policy</h3>
                <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
            `,
            terms: `
                <h3>1. Terms of Use</h3>
                <p>By accessing this website, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
                
                <h3>2. User Responsibilities</h3>
                <p>You agree to use the website only for lawful purposes and in a way that does not infringe the rights of others.</p>
                
                <h3>3. Intellectual Property</h3>
                <p>All content on this website is the property of the website owner and is protected by copyright laws.</p>
                
                <h3>4. Limitation of Liability</h3>
                <p>The website owner will not be liable for any damages arising from the use or inability to use this website.</p>
                
                <h3>5. Governing Law</h3>
                <p>These terms shall be governed by and construed in accordance with the laws of your country.</p>
            `
        };

        // Open popup when policy links are clicked
        if (policyLinks.length > 0 && policyPopup) {
            policyLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const policyType = this.getAttribute('data-type');
                    
                    // Set title and content based on which link was clicked
                    if (policyType === 'privacy') {
                        popupTitle.textContent = 'Privacy Policy';
                        popupText.innerHTML = policyContent.privacy;
                    } else {
                        popupTitle.textContent = 'Terms of Service';
                        popupText.innerHTML = policyContent.terms;
                    }
                    
                    // Show the popup
                    policyPopup.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                });
            });

            // Close popup when X is clicked
            closePopup.addEventListener('click', function() {
                policyPopup.classList.remove('active');
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            });

            // Close popup when clicking outside content
            policyPopup.addEventListener('click', function(e) {
                if (e.target === policyPopup) {
                    policyPopup.classList.remove('active');
                    document.body.style.overflow = 'auto'; // Re-enable scrolling
                }
            });

            // Close popup with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && policyPopup.classList.contains('active')) {
                    policyPopup.classList.remove('active');
                    document.body.style.overflow = 'auto'; // Re-enable scrolling
                }
            });
        }

        // Newsletter Subscription
        const newsletterForm = document.querySelector('.newsletter-form');
        const newsletterInput = newsletterForm ? newsletterForm.querySelector('input[type="email"]') : null;
        const newsletterMessage = document.querySelector('.newsletter-message');

        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = newsletterInput.value.trim();

                // Validate email
                if (!email) {
                    showNewsletterMessage('Please enter your email address', 'error');
                    newsletterForm.classList.add('error');
                    return;
                }

                if (!validateEmail(email)) {
                    showNewsletterMessage('Please enter a valid email address', 'error');
                    newsletterForm.classList.add('error');
                    return;
                }

                // Remove error state if valid
                newsletterForm.classList.remove('error');
                
                // Show loading state
                showNewsletterMessage('Subscribing...', 'loading');
                
                // Disable button during submission
                const submitBtn = newsletterForm.querySelector('button');
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

                // Simulate API call (replace with actual fetch/AJAX)
                setTimeout(() => {
                    // This is just for demonstration - replace with real API call
                    const isSuccess = Math.random() > 0.2; // 80% success rate for demo
                    
                    if (isSuccess) {
                        showNewsletterMessage('Thank you for subscribing!', 'success');
                        newsletterForm.reset();
                    } else {
                        showNewsletterMessage('Subscription failed. Please try again.', 'error');
                    }
                    
                    // Reset button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
                    
                    // Clear message after 5 seconds
                    if (isSuccess) {
                        setTimeout(() => {
                            newsletterMessage.textContent = '';
                        }, 5000);
                    }
                }, 1500);
            });

            // Clear error state when typing
            newsletterInput.addEventListener('input', function() {
                if (newsletterForm.classList.contains('error')) {
                    newsletterForm.classList.remove('error');
                    newsletterMessage.textContent = '';
                }
            });
        }

        function showNewsletterMessage(text, type) {
            if (newsletterMessage) {
                newsletterMessage.textContent = text;
                newsletterMessage.className = 'newsletter-message'; // Reset classes
                if (type) newsletterMessage.classList.add(type);
            }
        }

        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        // Form Submission with Success Message
        const successPopup = document.querySelector('.success-popup');
        const closeSuccess = document.querySelector('.close-success');

        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            
            // Submit form using Fetch API
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                // Show success message
                successPopup.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Reset form
                contactForm.reset();
                } else {
                throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was a problem sending your message. Please try again.');
            });
            });
        }

        // Close success popup
        if (closeSuccess) {
            closeSuccess.addEventListener('click', function() {
            successPopup.classList.remove('active');
            document.body.style.overflow = 'auto';
            });
        }

        // Close when clicking outside
        if (successPopup) {
            successPopup.addEventListener('click', function(e) {
            if (e.target === successPopup) {
                successPopup.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            });
        }

        const aiAssistant = document.querySelector('.ai-assistant');
        const aiButton = document.querySelector('.ai-button');
        const aiChatbox = document.querySelector('.ai-chatbox');
        const closeAI = document.querySelector('.close-ai');
        const minimizeAI = document.querySelector('.ai-minimize');
        const aiMessages = document.querySelector('.ai-messages');
        const aiQuery = document.querySelector('.ai-query');
        const aiSend = document.querySelector('.ai-send');
        const aiVoice = document.querySelector('.ai-voice');
        const quickReplies = document.querySelectorAll('.quick-reply');
        const suggestions = document.querySelectorAll('.ai-suggestion');

        // Enhanced responses with Markdown-like formatting
        const aiResponses = {
            greeting: `👋 Hi there! I'm Sachin's AI assistant. I can help you with information about his skills, projects, services, and how to contact him. Feel free to ask me anything!`,
            
            skills: `### Sachin's Key Skills:
            
        - **Frontend Development**: HTML5, CSS3, JavaScript, React, Vue.js
        - **Backend Development**: Node.js, Python (Django), Java
        - **Mobile Development**: Flutter, React Native
        - **Database**: MySQL, MongoDB, Firebase
        - **UI/UX Design**: Figma, Adobe XD, responsive design
        - **Other**: Git, Docker, AWS basics
            
        He's currently enhancing his skills in cloud computing and machine learning.`,
            
            projects: `### Featured Projects:
            
        <div class="project-card">
            <h4>Online Quiz Master</h4>
            <p>Interactive quiz platform with real-time scoring and admin dashboard. Built with React and Node.js.</p>
            <a href="https://github.com/sachinjha1822/online_quiz" target="_blank">View Project →</a>
        </div>

        <div class="project-card">
            <h4>Online Voting System</h4>
            <p>Secure digital voting platform with voter authentication. Developed using Django and PostgreSQL.</p>
            <a href="https://github.com/sachinjha1822/Online-Voting-System" target="_blank">View Project →</a>
        </div>

        <div class="project-card">
            <h4>Weather Application</h4>
            <p>Real-time weather forecasts with location detection. Built with Flutter and OpenWeather API.</p>
            <a href="https://github.com/sachinjha1822/Wheather" target="_blank">View Project →</a>
        </div>

        Would you like details about any specific project?`,
            
            services: `### Services Offered:
            
        **1. Web Development** (₹5,999 - ₹24,999)
        - Custom responsive websites
        - E-commerce solutions
        - Web applications
            
        **2. Mobile App Development** (Premium)
        - Cross-platform iOS/Android apps
        - Hybrid apps with Flutter/React Native
            
        **3. UI/UX Design**
        - User interface design
        - Wireframing & prototyping
        - User experience optimization
            
        **4. Backend Development** (Premium)
        - API development
        - Database design
        - Server management
            
        You can ask about specific service packages or pricing.`,
            
            packages: `### Website Development Packages:
            
        **Basic Package - ₹5,999** (One-time fee)
        - 5 Custom Pages
        - Responsive Design
        - Basic SEO Setup
        - Contact Form
        - 1 Month Support

        **Standard Package - ₹12,999** (One-time fee) - *Most Popular*
        - 10 Custom Pages
        - CMS Integration
        - Advanced SEO
        - E-commerce Functionality
        - 3 Months Support

        **Premium Package - ₹24,999** (One-time fee)
        - Unlimited Pages
        - Custom Web Application
        - Full SEO Optimization
        - Advanced E-commerce
        - 6 Months Support

        <a href="https://website-requirements.wuaze.com/" target="_blank" style="color: #ff4a57; font-weight: bold;">👉 Click here to get started with your project</a>`,
            
            contact: `### Contact Sachin:
            
        📧 **Email**: sjha83413@gmail.com  
        📞 **Phone**: +91 7033192746  
        📍 **Location**: Mathura, Uttar Pradesh, India  
            
        **Social Media**:
        - <a href="https://www.linkedin.com/in/sachin-jha-3a5400234/" target="_blank">LinkedIn</a>
        - <a href="https://github.com/sachinjha1822" target="_blank">GitHub</a>
        - <a href="https://x.com/Sachinjha1822" target="_blank">Twitter</a>
            
        For quickest response, please email or connect on LinkedIn.`,
            
            technologies: `### Technologies Sachin Works With:
            
        - **Frontend**: HTML5, CSS3, JavaScript, React, Vue.js, Bootstrap, Tailwind CSS
        - **Backend**: Node.js, Express, Django, Flask
        - **Mobile**: Flutter, React Native
        - **Database**: MySQL, MongoDB, Firebase, PostgreSQL
        - **Tools**: Git, Docker, VS Code, Figma, Postman`,
            
            experience: `### Sachin's Experience:
            
        🎓 Currently pursuing **MCA (Master of Computer Applications)** at GLA University with focus on full-stack development.
            
        💻 Has completed multiple academic and personal projects demonstrating skills in web and mobile development.
            
        🛠️ Continuously learning new technologies through online courses and hands-on projects.
            
        Would you like details about any specific project experience?`,
            
            default: `I'm sorry, I didn't quite understand that. I can help with:
            
        - Information about Sachin's **skills** and technologies
        - Details about his **projects** and portfolio work
        - Overview of **services** he offers
        - How to **contact** him
            
        Try asking something like: "What projects have you worked on?" or "What services do you offer?"`
        };

        // Toggle chatbox visibility
        aiButton.addEventListener('click', function() {
            aiAssistant.classList.toggle('active');
            aiAssistant.classList.remove('minimized');
            
            // Add greeting message if first time opening
            if (aiMessages.children.length === 1) { // Only has welcome message
            setTimeout(() => {
                addAIMessage(aiResponses.greeting);
            }, 500);
            }
        });

        // Close chatbox
        closeAI.addEventListener('click', function() {
            aiAssistant.classList.remove('active');
        });

        // Minimize chatbox
        minimizeAI.addEventListener('click', function() {
            aiAssistant.classList.add('minimized');
        });

        // Enable/disable send button based on input
        aiQuery.addEventListener('input', function() {
            aiSend.disabled = aiQuery.value.trim() === '';
        });

        // Send message function
        function sendMessage() {
            const message = aiQuery.value.trim();
            if (message) {
            addUserMessage(message);
            aiQuery.value = '';
            aiSend.disabled = true;
            showTypingIndicator();
            
            // Simulate AI response after delay
            setTimeout(() => {
                removeTypingIndicator();
                const response = generateAIResponse(message);
                addAIMessage(response);
            }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
            }
        }

        // Handle send button click
        aiSend.addEventListener('click', sendMessage);

        // Handle Enter key
        aiQuery.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
            sendMessage();
            }
        });

        // Quick reply buttons
        quickReplies.forEach(button => {
            button.addEventListener('click', function() {
            const query = this.getAttribute('data-query');
            addUserMessage(query);
            showTypingIndicator();
            
            setTimeout(() => {
                removeTypingIndicator();
                const response = generateAIResponse(query);
                addAIMessage(response);
            }, 800);
            });
        });

        // Suggestion buttons
        suggestions.forEach(button => {
            button.addEventListener('click', function() {
            const query = this.getAttribute('data-query');
            aiQuery.value = query;
            aiSend.disabled = false;
            aiQuery.focus();
            });
        });

        // Voice recognition (simulated for demo)
        let voiceRecognitionActive = false;
        aiVoice.addEventListener('click', function() {
            if (voiceRecognitionActive) {
            stopVoiceRecognition();
            } else {
            startVoiceRecognition();
            }
        });

        function startVoiceRecognition() {
            voiceRecognitionActive = true;
            aiVoice.classList.add('listening');
            aiVoice.innerHTML = '<i class="fas fa-stop"></i>';
            aiQuery.placeholder = "Listening... Speak now";
            
            // Simulate voice recognition with sample questions
            const sampleQuestions = [
            "Tell me about Sachin's skills",
            "What projects has he worked on",
            "What services does he offer",
            "How can I contact him",
            "Tell me about website packages"
            ];
            
            // After 2 seconds, pick a random question
            setTimeout(() => {
            const randomQuestion = sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)];
            stopVoiceRecognition();
            aiQuery.value = randomQuestion;
            aiSend.disabled = false;
            setTimeout(() => {
                sendMessage();
            }, 500);
            }, 2000);
        }

        function stopVoiceRecognition() {
            voiceRecognitionActive = false;
            aiVoice.classList.remove('listening');
            aiVoice.innerHTML = '<i class="fas fa-microphone"></i>';
            aiQuery.placeholder = "Ask me anything about Sachin's portfolio...";
        }

        // Add user message to chat
        function addUserMessage(message) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('ai-message', 'user-message');
            
            const contentDiv = document.createElement('div');
            contentDiv.classList.add('message-content');
            contentDiv.textContent = message;
            
            const timeDiv = document.createElement('div');
            timeDiv.classList.add('message-time');
            timeDiv.textContent = getCurrentTime();
            
            messageDiv.appendChild(contentDiv);
            messageDiv.appendChild(timeDiv);
            aiMessages.appendChild(messageDiv);
            scrollToBottom();
        }

        // Add AI message to chat
        function addAIMessage(message) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('ai-message', 'ai-response');
            
            const contentDiv = document.createElement('div');
            contentDiv.classList.add('message-content');
            contentDiv.innerHTML = formatMessage(message);
            
            const timeDiv = document.createElement('div');
            timeDiv.classList.add('message-time');
            timeDiv.textContent = getCurrentTime();
            
            messageDiv.appendChild(contentDiv);
            messageDiv.appendChild(timeDiv);
            aiMessages.appendChild(messageDiv);
            scrollToBottom();
        }

        // Format message with Markdown-like syntax
        function formatMessage(message) {
            // Convert **bold** to <strong>
            message = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            
            // Convert ### headings to <h4>
            message = message.replace(/^### (.*$)/gm, '<h4>$1</h4>');
            
            // Convert lists
            message = message.replace(/^- (.*$)/gm, '<li>$1</li>');
            message = message.replace(/<li>.*<\/li>/g, '<ul>$&</ul>');
            
            // Convert line breaks to <br>
            message = message.replace(/\n/g, '<br>');
            
            return message;
        }

        // Show typing indicator
        function showTypingIndicator() {
            const typingDiv = document.createElement('div');
            typingDiv.classList.add('typing-indicator');
            typingDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            `;
            typingDiv.style.display = 'flex';
            aiMessages.appendChild(typingDiv);
            scrollToBottom();
        }

        // Remove typing indicator
        function removeTypingIndicator() {
            const typing = document.querySelector('.typing-indicator');
            if (typing) {
            typing.remove();
            }
        }

        // Generate AI response based on user input
        function generateAIResponse(message) {
            const lowerMsg = message.toLowerCase();
            
            if (lowerMsg.includes('skill') || lowerMsg.includes('technolog') || lowerMsg.includes('expert')) {
            return aiResponses.skills;
            } else if (lowerMsg.includes('project') || lowerMsg.includes('portfolio') || lowerMsg.includes('work')) {
            return aiResponses.projects;
            } else if (lowerMsg.includes('service') || lowerMsg.includes('offer') || lowerMsg.includes('do')) {
            return aiResponses.services;
            } else if (lowerMsg.includes('contact') || lowerMsg.includes('reach') || lowerMsg.includes('email') || lowerMsg.includes('phone')) {
            return aiResponses.contact;
            } else if (lowerMsg.includes('technolog') || lowerMsg.includes('stack') || lowerMsg.includes('tool')) {
            return aiResponses.technologies;
            } else if (lowerMsg.includes('experience') || lowerMsg.includes('background') || lowerMsg.includes('education')) {
            return aiResponses.experience;
            } else if (lowerMsg.includes('package') || lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('rate')) {
            return aiResponses.packages;
            } else {
            return aiResponses.default;
            }
        }

        // Get current time in HH:MM format
        function getCurrentTime() {
            const now = new Date();
            return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }

        // Scroll to bottom of chat
        function scrollToBottom() {
            aiMessages.scrollTop = aiMessages.scrollHeight;
        }

        // Add animation to AI button on page load
        setTimeout(() => {
            aiButton.style.animation = 'bounce 2s infinite';
            
            // Add CSS for bounce animation
            const style = document.createElement('style');
            style.textContent = `
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
                40% {transform: translateY(-10px);}
                60% {transform: translateY(-5px);}
            }
            `;
            document.head.appendChild(style);
        }, 3000);
    });
