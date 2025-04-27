// Handle form submission
const btn = document.getElementById('button');
const form = document.getElementById('contact-form');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    btn.textContent = 'Sending...';
    btn.disabled = true; // Disable button during sending

    const serviceID = 'service_6m2x21x'; // Your EmailJS service ID
    const templateID = 'template_rvmi0ko'; // Your EmailJS template ID

    // Send the form data using EmailJS
    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            btn.textContent = 'Success!';
            btn.classList.add('success-animation');
            
            // Create success message element
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Your message has been sent successfully!';
            form.appendChild(successMessage);
            
            // Remove message after delay
            setTimeout(() => {
                btn.textContent = 'Send Message';
                btn.classList.remove('success-animation');
                btn.disabled = false;
                successMessage.remove();
                form.reset();
            }, 3000);
        })
        .catch((err) => {
            btn.textContent = 'Try Again';
            btn.disabled = false;
            
            // Create error message element
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'Failed to send. Please try again.';
            form.appendChild(errorMessage);
            
            // Remove message after delay
            setTimeout(() => {
                btn.textContent = 'Send Message';
                errorMessage.remove();
            }, 3000);
            
            console.error('EmailJS Error:', err);
        });
});

// Add input animations
const inputs = document.querySelectorAll('#contact-form input, #contact-form textarea');

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.querySelector('label').style.color = 'var(--primary-color)';
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.querySelector('label').style.color = 'var(--text-light)';
        }
    });
});