document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Email validation function
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Password validation function (at least 8 characters, 1 uppercase, 1 lowercase, 1 number)
    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return passwordRegex.test(password);
    };

    // Show error message
    const showError = (element, message) => {
        const inputGroup = element.parentElement;
        const errorDiv = inputGroup.querySelector('.error-message') || document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#ff3333';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = message;
        
        if (!inputGroup.querySelector('.error-message')) {
            inputGroup.appendChild(errorDiv);
        }
    };

    // Remove error message
    const removeError = (element) => {
        const inputGroup = element.parentElement;
        const errorDiv = inputGroup.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    };

    // Add input event listeners for real-time validation
    emailInput.addEventListener('input', () => {
        removeError(emailInput);
        if (emailInput.value && !isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
        }
    });

    passwordInput.addEventListener('input', () => {
        removeError(passwordInput);
        if (passwordInput.value && !isValidPassword(passwordInput.value)) {
            showError(passwordInput, 'Password must be at least 8 characters long and contain uppercase, lowercase, and numbers');
        }
    });

    // Form submission handler
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Clear previous error messages
        removeError(emailInput);
        removeError(passwordInput);

        // Validate email
        if (!emailInput.value) {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate password
        if (!passwordInput.value) {
            showError(passwordInput, 'Password is required');
            isValid = false;
        } else if (!isValidPassword(passwordInput.value)) {
            showError(passwordInput, 'Password must be at least 8 characters long and contain uppercase, lowercase, and numbers');
            isValid = false;
        }

        if (isValid) {
            // Here you would typically send the data to a server
            console.log('Form submitted successfully', {
                email: emailInput.value,
                password: passwordInput.value,
                remember: document.getElementById('remember').checked
            });
            
            // Show success message (in a real application, this would happen after server validation)
            alert('Login successful!');
        }
    });
}); 