document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmission);
    }
});

function handleContactSubmission(event) {
    event.preventDefault();
    
    const formData = {
        id: 'inquiry_' + Date.now(),
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        propertyType: document.getElementById('property-type').value,
        budget: document.getElementById('budget').value,
        message: document.getElementById('message').value,
        date: new Date().toISOString(),
        status: 'new'
    };
    
    let inquiries = JSON.parse(localStorage.getItem('landlordi_inquiries') || '[]');
    
    inquiries.push(formData);
    
    localStorage.setItem('landlordi_inquiries', JSON.stringify(inquiries));
    
    showContactAlert('Thank you for your inquiry! Our team will contact you within 24 hours.', 'success');
    
    event.target.reset();
    
    console.log('New inquiry received:', formData);
}

function showContactAlert(message, type) {
    const existingAlert = document.querySelector('.contact-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `contact-alert contact-alert-${type}`;
    alert.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="alert-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Insert alert at top of form
    const contactForm = document.getElementById('contactForm');
    contactForm.insertBefore(alert, contactForm.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alert.parentElement) {
            alert.remove();
        }
    }, 5000);
    
    // Scroll to alert
    alert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Function to view inquiries (for admin/testing)
function viewInquiries() {
    const inquiries = JSON.parse(localStorage.getItem('landlordi_inquiries') || '[]');
    console.table(inquiries);
    return inquiries;
}

// Function to clear inquiries (for testing)
function clearInquiries() {
    localStorage.removeItem('landlordi_inquiries');
    console.log('All inquiries cleared');
}
