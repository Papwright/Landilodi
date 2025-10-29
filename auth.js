document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            tabs.forEach(t => t.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));
            
            this.classList.add('active');
            
            if (targetTab === 'login') {
                document.getElementById('loginForm').classList.add('active');
            } else {
                document.getElementById('registerForm').classList.add('active');
            }
        });
    });
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
});

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    if (!email || !password) {
        showAlert('Please fill in all required fields', 'error');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('landlordi_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        const session = {
            userId: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            accountType: user.accountType,
            isVerified: user.isVerified || false,
            loginTime: new Date().toISOString()
        };
        
        if (rememberMe) {
            localStorage.setItem('landlordi_session', JSON.stringify(session));
        } else {
            sessionStorage.setItem('landlordi_session', JSON.stringify(session));
        }
        
        showAlert('Login successful! Redirecting to dashboard...', 'success');
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    } else {
        showAlert('Invalid email or password. Please try again.', 'error');
    }
}

function handleRegister(e) {
    e.preventDefault();
    
    const formData = {
        id: 'user_' + Date.now(),
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('registerEmail').value,
        phone: document.getElementById('phone').value,
        accountType: document.getElementById('accountType').value,
        password: document.getElementById('registerPassword').value,
        confirmPassword: document.getElementById('confirmPassword').value,
        location: document.getElementById('location').value,
        terms: document.getElementById('terms').checked,
        newsletter: document.getElementById('newsletter').checked,
        registrationDate: new Date().toISOString(),
        isVerified: false,
        properties: [],
        viewingRequests: []
    };
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || 
        !formData.accountType || !formData.password || !formData.location) {
        showAlert('Please fill in all required fields', 'error');
        return;
    }
    
    if (!validateEmail(formData.email)) {
        showAlert('Please enter a valid email address', 'error');
        return;
    }
    
    if (formData.password.length < 8) {
        showAlert('Password must be at least 8 characters long', 'error');
        return;
    }
    
    if (formData.password !== formData.confirmPassword) {
        showAlert('Passwords do not match', 'error');
        return;
    }
    
    if (!formData.terms) {
        showAlert('Please accept the Terms & Conditions', 'error');
        return;
    }
    
    // Check if email already exists
    const users = JSON.parse(localStorage.getItem('landlordi_users') || '[]');
    const emailExists = users.find(u => u.email === formData.email);
    
    if (emailExists) {
        showAlert('An account with this email already exists', 'error');
        return;
    }
    
    // Remove confirmPassword before storing
    delete formData.confirmPassword;
    
    // Add user to database
    users.push(formData);
    localStorage.setItem('landlordi_users', JSON.stringify(users));
    
    showAlert('Account created successfully! You can now login.', 'success');
    
    // Clear form
    document.getElementById('registerForm').reset();
    
    // Switch to login tab after 2 seconds
    setTimeout(() => {
        document.querySelector('[data-tab="login"]').click();
    }, 2000);
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show alert message
function showAlert(message, type) {
    const alertContainer = document.getElementById('alertContainer');
    const alertClass = type === 'success' ? 'alert-success' : 'alert-error';
    
    alertContainer.innerHTML = `
        <div class="alert ${alertClass}">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            ${message}
        </div>
    `;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        alertContainer.innerHTML = '';
    }, 5000);
}

// Check if user is logged in (for other pages)
function checkAuth() {
    const session = JSON.parse(localStorage.getItem('landlordi_session') || 
                               sessionStorage.getItem('landlordi_session') || 'null');
    return session;
}

// Logout function
function logout() {
    localStorage.removeItem('landlordi_session');
    sessionStorage.removeItem('landlordi_session');
    window.location.href = 'index.html';
}

// Get current user
function getCurrentUser() {
    const session = checkAuth();
    if (!session) return null;
    
    const users = JSON.parse(localStorage.getItem('landlordi_users') || '[]');
    return users.find(u => u.id === session.userId);
}
