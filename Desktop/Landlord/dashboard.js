document.addEventListener('DOMContentLoaded', function() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    initializeDashboard(user);
    setupTabs();
    
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        logout();
    });
    
    setupPropertyForm();
    setupImageUpload();
    loadUserProperties(user);
    loadViewingRequests(user);
});

function initializeDashboard(user) {
    document.getElementById('userName').textContent = user.firstName;
    
    const statusBadge = document.getElementById('verificationStatus');
    if (user.isVerified) {
        statusBadge.innerHTML = '<i class="fas fa-check-circle"></i> Verified Seller';
        statusBadge.className = 'status-badge verified';
    } else {
        statusBadge.innerHTML = '<i class="fas fa-clock"></i> Pending Verification';
        statusBadge.className = 'status-badge pending';
    }
    
    loadProfileInfo(user);
    updateDashboardStats(user);
}

function setupTabs() {
    const tabs = document.querySelectorAll('.dashboard-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            showTab(targetTab);
        });
    });
}

function showTab(tabName) {
    document.querySelectorAll('.dashboard-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

function loadProfileInfo(user) {
    const profileInfo = document.getElementById('profileInfo');
    profileInfo.innerHTML = `
        <div class="profile-info-item">
            <strong>Full Name:</strong>
            <span>${user.firstName} ${user.lastName}</span>
        </div>
        <div class="profile-info-item">
            <strong>Email:</strong>
            <span>${user.email}</span>
        </div>
        <div class="profile-info-item">
            <strong>Phone:</strong>
            <span>${user.phone}</span>
        </div>
        <div class="profile-info-item">
            <strong>Account Type:</strong>
            <span>${formatAccountType(user.accountType)}</span>
        </div>
        <div class="profile-info-item">
            <strong>Location:</strong>
            <span>${capitalizeFirst(user.location)}</span>
        </div>
        <div class="profile-info-item">
            <strong>Member Since:</strong>
            <span>${formatDate(user.registrationDate)}</span>
        </div>
    `;
}

function formatAccountType(type) {
    const types = {
        'property-owner': 'Property Owner',
        'landlord': 'Landlord',
        'agent': 'Real Estate Agent',
        'developer': 'Property Developer'
    };
    return types[type] || type;
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function setupPropertyForm() {
    const form = document.getElementById('addPropertyForm');
    const listingType = document.getElementById('listingType');
    const rentPeriodGroup = document.getElementById('rentPeriodGroup');
    
    // Show/hide rent period based on listing type
    listingType.addEventListener('change', function() {
        if (this.value === 'rent' || this.value === 'lease') {
            rentPeriodGroup.style.display = 'block';
        } else {
            rentPeriodGroup.style.display = 'none';
        }
    });
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        addProperty();
    });
}

// Global array to store image data
let propertyImages = [];

function setupImageUpload() {
    const imageInput = document.getElementById('propertyImages');
    const previewContainer = document.getElementById('imagePreviewContainer');
    
    imageInput.addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        
        // Check if adding these files would exceed the limit
        if (propertyImages.length + files.length > 8) {
            alert('You can only upload a maximum of 8 images per property');
            return;
        }
        
        files.forEach(file => {
            // Check file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert(`${file.name} is too large. Maximum file size is 2MB.`);
                return;
            }
            
            // Check file type
            if (!file.type.startsWith('image/')) {
                alert(`${file.name} is not an image file.`);
                return;
            }
            
            // Read file and convert to base64
            const reader = new FileReader();
            reader.onload = function(event) {
                const imageData = {
                    id: Date.now() + Math.random(),
                    data: event.target.result,
                    name: file.name
                };
                
                propertyImages.push(imageData);
                displayImagePreview(imageData);
            };
            reader.readAsDataURL(file);
        });
        
        // Clear input so same file can be selected again
        imageInput.value = '';
    });
}

function displayImagePreview(imageData) {
    const previewContainer = document.getElementById('imagePreviewContainer');
    
    const previewItem = document.createElement('div');
    previewItem.className = 'image-preview-item';
    previewItem.dataset.imageId = imageData.id;
    
    previewItem.innerHTML = `
        <img src="${imageData.data}" alt="${imageData.name}">
        <button type="button" class="image-preview-remove" onclick="removeImage(${imageData.id})">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    previewContainer.appendChild(previewItem);
}

function removeImage(imageId) {
    // Remove from array
    propertyImages = propertyImages.filter(img => img.id !== imageId);
    
    // Remove from DOM
    const previewItem = document.querySelector(`[data-image-id="${imageId}"]`);
    if (previewItem) {
        previewItem.remove();
    }
}

function addProperty() {
    const user = getCurrentUser();
    if (!user) return;
    
    const form = document.getElementById('addPropertyForm');
    const editingId = form.dataset.editingId;
    
    // Get amenities
    const amenities = Array.from(document.querySelectorAll('input[name="amenity"]:checked'))
        .map(cb => cb.value);
    
    // Get users array
    const users = JSON.parse(localStorage.getItem('landlordi_users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex === -1) return;
    
    if (editingId) {
        // UPDATE existing property
        const propertyIndex = users[userIndex].properties.findIndex(p => p.id === editingId);
        
        if (propertyIndex !== -1) {
            // Keep existing data like views, inquiries, etc.
            const existingProperty = users[userIndex].properties[propertyIndex];
            
            users[userIndex].properties[propertyIndex] = {
                ...existingProperty,
                title: document.getElementById('propertyTitle').value,
                type: document.getElementById('propertyType').value,
                listingType: document.getElementById('listingType').value,
                description: document.getElementById('propertyDescription').value,
                city: document.getElementById('propertyCity').value,
                area: document.getElementById('propertyArea').value,
                address: document.getElementById('propertyAddress').value,
                bedrooms: document.getElementById('bedrooms').value || 0,
                bathrooms: document.getElementById('bathrooms').value || 0,
                size: document.getElementById('propertySize').value,
                parking: document.getElementById('parking').value || 0,
                price: document.getElementById('propertyPrice').value,
                rentPeriod: document.getElementById('rentPeriod').value,
                amenities: amenities,
                contactPreference: document.getElementById('contactPreference').value,
                images: propertyImages.map(img => img.data),
                updatedDate: new Date().toISOString()
            };
            
            localStorage.setItem('landlordi_users', JSON.stringify(users));
            
            alert('Property updated successfully!');
        }
    } else {
        // CREATE new property
        const property = {
            id: 'prop_' + Date.now(),
            userId: user.id,
            title: document.getElementById('propertyTitle').value,
            type: document.getElementById('propertyType').value,
            listingType: document.getElementById('listingType').value,
            description: document.getElementById('propertyDescription').value,
            city: document.getElementById('propertyCity').value,
            area: document.getElementById('propertyArea').value,
            address: document.getElementById('propertyAddress').value,
            bedrooms: document.getElementById('bedrooms').value || 0,
            bathrooms: document.getElementById('bathrooms').value || 0,
            size: document.getElementById('propertySize').value,
            parking: document.getElementById('parking').value || 0,
            price: document.getElementById('propertyPrice').value,
            rentPeriod: document.getElementById('rentPeriod').value,
            amenities: amenities,
            contactPreference: document.getElementById('contactPreference').value,
            images: propertyImages.map(img => img.data),
            status: 'active',
            views: 0,
            inquiries: 0,
            createdDate: new Date().toISOString(),
            viewingRequests: []
        };
        
        // Add property to user's properties array
        if (!users[userIndex].properties) {
            users[userIndex].properties = [];
        }
        users[userIndex].properties.push(property);
        
        localStorage.setItem('landlordi_users', JSON.stringify(users));
        
        alert('Property submitted successfully! It will be reviewed by our team before going live.');
    }
    
    // Update session
    const session = checkAuth();
    if (session) {
        if (localStorage.getItem('landlordi_session')) {
            localStorage.setItem('landlordi_session', JSON.stringify(session));
        } else {
            sessionStorage.setItem('landlordi_session', JSON.stringify(session));
        }
    }
    
    // Reset form
    document.getElementById('addPropertyForm').reset();
    delete form.dataset.editingId;
    
    // Reset button text
    const submitBtn = document.querySelector('#addPropertyForm button[type="submit"]');
    submitBtn.innerHTML = '<i class="fas fa-plus"></i> Submit Property';
    
    // Clear images
    propertyImages = [];
    document.getElementById('imagePreviewContainer').innerHTML = '';
    
    // Switch to properties tab
    showTab('properties');
    
    // Reload properties
    loadUserProperties(getCurrentUser());
    updateDashboardStats(getCurrentUser());
}

function loadUserProperties(user) {
    const propertiesList = document.getElementById('propertiesList');
    
    if (!user.properties || user.properties.length === 0) {
        propertiesList.innerHTML = `
            <p class="empty-state">
                <i class="fas fa-home"></i>
                You haven't listed any properties yet. Click "Add New Property" to get started!
            </p>
        `;
        return;
    }
    
    propertiesList.innerHTML = user.properties.map(property => {
        // Create image gallery HTML
        let imageHTML = '';
        if (property.images && property.images.length > 0) {
            imageHTML = `
                <div class="property-image-gallery" id="gallery-${property.id}">
                    <img src="${property.images[0]}" alt="${property.title}">
                    ${property.images.length > 1 ? `
                        <button class="gallery-nav prev" onclick="navigateGallery('${property.id}', -1)">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <button class="gallery-nav next" onclick="navigateGallery('${property.id}', 1)">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                        <div class="gallery-indicator">
                            ${property.images.map((_, idx) => `
                                <span class="gallery-dot ${idx === 0 ? 'active' : ''}" onclick="goToImage('${property.id}', ${idx})"></span>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        } else {
            imageHTML = `
                <div class="property-image-thumb">
                    <i class="fas fa-home"></i>
                </div>
            `;
        }
        
        return `
        <div class="property-card" data-property-id="${property.id}">
            ${imageHTML}
            <div class="property-details">
                <h3>${property.title}</h3>
                <p>${property.description.substring(0, 150)}...</p>
                <div class="property-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${property.area}, ${property.city}</span>
                    <span><i class="fas fa-ruler-combined"></i> ${property.size} sqm</span>
                    ${property.bedrooms ? `<span><i class="fas fa-bed"></i> ${property.bedrooms} Beds</span>` : ''}
                </div>
                <div class="property-price">MWK ${Number(property.price).toLocaleString()}</div>
                <div class="property-meta">
                    <span><i class="fas fa-eye"></i> ${property.views} views</span>
                    <span><i class="fas fa-comments"></i> ${property.inquiries} inquiries</span>
                    <span class="request-status ${property.status}">${capitalizeFirst(property.status)}</span>
                </div>
                <div class="property-actions">
                    <button class="btn btn-secondary btn-small" onclick="editProperty('${property.id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-outline btn-small" onclick="deleteProperty('${property.id}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
        `;
    }).join('');
}

// Image gallery navigation
let currentImageIndex = {};

function navigateGallery(propertyId, direction) {
    const user = getCurrentUser();
    const property = user.properties.find(p => p.id === propertyId);
    if (!property || !property.images) return;
    
    if (!currentImageIndex[propertyId]) {
        currentImageIndex[propertyId] = 0;
    }
    
    currentImageIndex[propertyId] += direction;
    
    if (currentImageIndex[propertyId] < 0) {
        currentImageIndex[propertyId] = property.images.length - 1;
    } else if (currentImageIndex[propertyId] >= property.images.length) {
        currentImageIndex[propertyId] = 0;
    }
    
    updateGalleryDisplay(propertyId, property.images);
}

function goToImage(propertyId, index) {
    const user = getCurrentUser();
    const property = user.properties.find(p => p.id === propertyId);
    if (!property || !property.images) return;
    
    currentImageIndex[propertyId] = index;
    updateGalleryDisplay(propertyId, property.images);
}

function updateGalleryDisplay(propertyId, images) {
    const gallery = document.getElementById(`gallery-${propertyId}`);
    if (!gallery) return;
    
    const img = gallery.querySelector('img');
    const dots = gallery.querySelectorAll('.gallery-dot');
    
    const currentIndex = currentImageIndex[propertyId] || 0;
    
    img.src = images[currentIndex];
    
    dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function loadViewingRequests(user) {
    const requestsList = document.getElementById('viewingRequestsList');
    
    // Collect all viewing requests from all properties
    let allRequests = [];
    if (user.properties) {
        user.properties.forEach(property => {
            if (property.viewingRequests) {
                property.viewingRequests.forEach(request => {
                    allRequests.push({
                        ...request,
                        propertyTitle: property.title,
                        propertyId: property.id
                    });
                });
            }
        });
    }
    
    if (allRequests.length === 0) {
        requestsList.innerHTML = `
            <p class="empty-state">
                <i class="fas fa-calendar"></i>
                No viewing requests yet. They will appear here when buyers are interested in your properties.
            </p>
        `;
        return;
    }
    
    requestsList.innerHTML = allRequests.map(request => `
        <div class="viewing-request-card">
            <div class="request-header">
                <div class="request-info">
                    <h4>${request.propertyTitle}</h4>
                    <p><strong>From:</strong> ${request.buyerName}</p>
                    <p><strong>Phone:</strong> ${request.buyerPhone}</p>
                    <p><strong>Email:</strong> ${request.buyerEmail}</p>
                    <p><strong>Preferred Date:</strong> ${formatDate(request.preferredDate)}</p>
                    <p><strong>Message:</strong> ${request.message}</p>
                    <p><strong>Requested:</strong> ${formatDate(request.requestDate)}</p>
                </div>
                <span class="request-status ${request.status}">${capitalizeFirst(request.status)}</span>
            </div>
            ${request.status === 'pending' ? `
                <div class="request-actions">
                    <button class="btn btn-primary btn-small" onclick="respondToRequest('${request.propertyId}', '${request.id}', 'approved')">
                        <i class="fas fa-check"></i> Approve
                    </button>
                    <button class="btn btn-outline btn-small" onclick="respondToRequest('${request.propertyId}', '${request.id}', 'declined')">
                        <i class="fas fa-times"></i> Decline
                    </button>
                </div>
            ` : ''}
        </div>
    `).join('');
}

function respondToRequest(propertyId, requestId, status) {
    const user = getCurrentUser();
    if (!user) return;
    
    const users = JSON.parse(localStorage.getItem('landlordi_users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex !== -1) {
        const propertyIndex = users[userIndex].properties.findIndex(p => p.id === propertyId);
        if (propertyIndex !== -1) {
            const requestIndex = users[userIndex].properties[propertyIndex].viewingRequests.findIndex(r => r.id === requestId);
            if (requestIndex !== -1) {
                users[userIndex].properties[propertyIndex].viewingRequests[requestIndex].status = status;
                users[userIndex].properties[propertyIndex].viewingRequests[requestIndex].responseDate = new Date().toISOString();
                
                localStorage.setItem('landlordi_users', JSON.stringify(users));
                
                alert(`Viewing request ${status}!`);
                loadViewingRequests(getCurrentUser());
            }
        }
    }
}

function updateDashboardStats(user) {
    let totalProperties = 0;
    let totalViews = 0;
    let totalInquiries = 0;
    let viewingRequests = 0;
    
    if (user.properties) {
        totalProperties = user.properties.length;
        user.properties.forEach(property => {
            totalViews += property.views || 0;
            totalInquiries += property.inquiries || 0;
            if (property.viewingRequests) {
                viewingRequests += property.viewingRequests.filter(r => r.status === 'pending').length;
            }
        });
    }
    
    document.getElementById('totalProperties').textContent = totalProperties;
    document.getElementById('totalViews').textContent = totalViews;
    document.getElementById('totalInquiries').textContent = totalInquiries;
    document.getElementById('viewingRequests').textContent = viewingRequests;
}

function editProperty(propertyId) {
    const user = getCurrentUser();
    if (!user) return;
    
    // Find the property
    const property = user.properties.find(p => p.id === propertyId);
    if (!property) {
        alert('Property not found!');
        return;
    }
    
    // Switch to Add Property tab
    showTab('add-property');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Pre-fill the form with existing property data
    document.getElementById('propertyTitle').value = property.title || '';
    document.getElementById('propertyType').value = property.type || '';
    document.getElementById('listingType').value = property.listingType || '';
    document.getElementById('propertyDescription').value = property.description || '';
    document.getElementById('propertyCity').value = property.city || '';
    document.getElementById('propertyArea').value = property.area || '';
    document.getElementById('propertyAddress').value = property.address || '';
    document.getElementById('bedrooms').value = property.bedrooms || '';
    document.getElementById('bathrooms').value = property.bathrooms || '';
    document.getElementById('propertySize').value = property.size || '';
    document.getElementById('parking').value = property.parking || '';
    document.getElementById('propertyPrice').value = property.price || '';
    document.getElementById('rentPeriod').value = property.rentPeriod || 'month';
    document.getElementById('contactPreference').value = property.contactPreference || 'both';
    
    // Show/hide rent period based on listing type
    const rentPeriodGroup = document.getElementById('rentPeriodGroup');
    if (property.listingType === 'rent' || property.listingType === 'lease') {
        rentPeriodGroup.style.display = 'block';
    }
    
    // Check amenities
    document.querySelectorAll('input[name="amenity"]').forEach(checkbox => {
        checkbox.checked = property.amenities && property.amenities.includes(checkbox.value);
    });
    
    // Load existing images
    if (property.images && property.images.length > 0) {
        propertyImages = property.images.map((data, index) => ({
            id: Date.now() + index,
            data: data,
            name: `image_${index + 1}.jpg`
        }));
        
        // Display image previews
        const previewContainer = document.getElementById('imagePreviewContainer');
        previewContainer.innerHTML = '';
        propertyImages.forEach(imageData => {
            displayImagePreview(imageData);
        });
    }
    
    // Store the property ID for updating instead of creating new
    document.getElementById('addPropertyForm').dataset.editingId = propertyId;
    
    // Change button text
    const submitBtn = document.querySelector('#addPropertyForm button[type="submit"]');
    submitBtn.textContent = 'Update Property';
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Update Property';
}

function deleteProperty(propertyId) {
    if (!confirm('Are you sure you want to delete this property?')) return;
    
    const user = getCurrentUser();
    if (!user) return;
    
    const users = JSON.parse(localStorage.getItem('landlordi_users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex !== -1) {
        users[userIndex].properties = users[userIndex].properties.filter(p => p.id !== propertyId);
        localStorage.setItem('landlordi_users', JSON.stringify(users));
        
        alert('Property deleted successfully!');
        loadUserProperties(getCurrentUser());
        updateDashboardStats(getCurrentUser());
    }
}

function enableProfileEdit() {
    const profileInfo = document.getElementById('profileInfo');
    const user = getCurrentUser();
    if (!user) return;
    
    // Create edit form
    profileInfo.innerHTML = `
        <form id="profileEditForm" onsubmit="saveProfileEdit(event)">
            <div class="profile-info-item">
                <strong>First Name:</strong>
                <input type="text" id="editFirstName" value="${user.firstName}" required class="edit-input">
            </div>
            <div class="profile-info-item">
                <strong>Last Name:</strong>
                <input type="text" id="editLastName" value="${user.lastName}" required class="edit-input">
            </div>
            <div class="profile-info-item">
                <strong>Email:</strong>
                <input type="email" id="editEmail" value="${user.email}" required class="edit-input">
            </div>
            <div class="profile-info-item">
                <strong>Phone:</strong>
                <input type="tel" id="editPhone" value="${user.phone}" required class="edit-input">
            </div>
            <div class="profile-info-item">
                <strong>Location:</strong>
                <select id="editLocation" class="edit-input" required>
                    <option value="lilongwe" ${user.location === 'lilongwe' ? 'selected' : ''}>Lilongwe</option>
                    <option value="blantyre" ${user.location === 'blantyre' ? 'selected' : ''}>Blantyre</option>
                    <option value="mzuzu" ${user.location === 'mzuzu' ? 'selected' : ''}>Mzuzu</option>
                    <option value="zomba" ${user.location === 'zomba' ? 'selected' : ''}>Zomba</option>
                    <option value="mangochi" ${user.location === 'mangochi' ? 'selected' : ''}>Mangochi</option>
                    <option value="kasungu" ${user.location === 'kasungu' ? 'selected' : ''}>Kasungu</option>
                </select>
            </div>
            <div class="profile-info-item">
                <strong>Account Type:</strong>
                <span>${formatAccountType(user.accountType)}</span>
            </div>
            <div class="profile-info-item">
                <strong>Member Since:</strong>
                <span>${formatDate(user.registrationDate)}</span>
            </div>
            <div class="profile-actions" style="margin-top: 20px; display: flex; gap: 10px;">
                <button type="submit" class="btn btn-primary">Save Changes</button>
                <button type="button" class="btn btn-outline" onclick="cancelProfileEdit()">Cancel</button>
            </div>
        </form>
    `;
}

function saveProfileEdit(event) {
    event.preventDefault();
    
    const user = getCurrentUser();
    if (!user) return;
    
    // Get updated values
    const updatedUser = {
        ...user,
        firstName: document.getElementById('editFirstName').value,
        lastName: document.getElementById('editLastName').value,
        email: document.getElementById('editEmail').value,
        phone: document.getElementById('editPhone').value,
        location: document.getElementById('editLocation').value
    };
    
    // Update in localStorage
    const users = JSON.parse(localStorage.getItem('landlordi_users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('landlordi_users', JSON.stringify(users));
        
        // Update session
        const session = {
            userId: updatedUser.id,
            email: updatedUser.email,
            loginDate: new Date().toISOString()
        };
        
        if (localStorage.getItem('landlordi_session')) {
            localStorage.setItem('landlordi_session', JSON.stringify(session));
        } else {
            sessionStorage.setItem('landlordi_session', JSON.stringify(session));
        }
        
        alert('Profile updated successfully!');
        
        // Refresh display
        loadProfileInfo(updatedUser);
        document.getElementById('userName').textContent = updatedUser.firstName;
    }
}

function cancelProfileEdit() {
    const user = getCurrentUser();
    if (user) {
        loadProfileInfo(user);
    }
}
