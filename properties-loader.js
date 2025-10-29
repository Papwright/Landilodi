document.addEventListener('DOMContentLoaded', function() {
    loadAllProperties();
    setupPropertyFilters();
});

function loadAllProperties() {
    const users = JSON.parse(localStorage.getItem('landlordi_users') || '[]');
    let allProperties = [];
    
    users.forEach(user => {
        if (user.properties && Array.isArray(user.properties)) {
            user.properties.forEach(property => {
                if (property.status === 'active' || property.status === 'verified') {
                    allProperties.push({
                        ...property,
                        ownerName: `${user.firstName} ${user.lastName}`,
                        ownerPhone: user.phone,
                        ownerEmail: user.email
                    });
                }
            });
        }
    });
    
    if (window.locationFilter && window.locationFilter.userLocation) {
        console.log('🗺️ Sorting properties by distance from your location...');
        allProperties = window.locationFilter.sortByDistance(allProperties);
    }
    
    displayProperties(allProperties);
    
    window.allPropertiesData = allProperties;
}

function displayProperties(properties) {
    const container = document.querySelector('.property-grid');
    if (!container) return;
    
    if (properties.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <i class="fas fa-home" style="font-size: 64px; color: #ddd; margin-bottom: 20px;"></i>
                <h3 style="color: #666; margin-bottom: 10px;">No properties available</h3>
                <p style="color: #999;">Check back soon for new listings!</p>
            </div>
        `;
        return;
    }
    
    // Add properties-grid class for proper styling
    container.className = 'property-grid properties-grid';
    container.innerHTML = properties.map(property => createPropertyCard(property)).join('');
}

function createPropertyCard(property) {
    // Create image HTML with proper styling
    let imageHTML = '';
    if (property.images && property.images.length > 0) {
        imageHTML = `
            <div class="property-image-container" id="prop-gallery-${property.id}">
                <img src="${property.images[0]}" alt="${property.title}" class="property-main-image">
                <div class="property-badge">${property.status === 'verified' ? 'Verified' : 'Active'}</div>
                ${property.images.length > 1 ? `
                    <button class="gallery-nav prev" onclick="navigatePropertyGallery('${property.id}', -1)">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="gallery-nav next" onclick="navigatePropertyGallery('${property.id}', 1)">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                    <div class="gallery-indicator">
                        ${property.images.map((_, idx) => `
                            <span class="gallery-dot ${idx === 0 ? 'active' : ''}" onclick="goToPropertyImage('${property.id}', ${idx})"></span>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    } else {
        imageHTML = `
            <div class="property-image-container">
                <div class="property-image-placeholder"></div>
                <div class="property-badge">${property.status === 'verified' ? 'Verified' : 'Active'}</div>
            </div>
        `;
    }
    
    const listingTypeLabel = property.listingType === 'sale' ? 'For Sale' : 
                            property.listingType === 'rent' ? 'For Rent' : 'For Lease';
    
    const priceDisplay = property.listingType === 'rent' || property.listingType === 'lease' ?
        `MWK ${Number(property.price).toLocaleString()}/${property.rentPeriod || 'month'}` :
        `MWK ${Number(property.price).toLocaleString()}`;
    
    // Calculate distance if location is available
    let distanceHTML = '';
    if (window.locationFilter && window.locationFilter.userLocation && property.latitude && property.longitude) {
        const distance = window.locationFilter.getDistanceToProperty(property);
        if (distance !== null) {
            distanceHTML = `
                <p class="property-distance">
                    <i class="fas fa-location-arrow"></i> ${window.locationFilter.formatDistance(distance)}
                </p>
            `;
        }
    }

    return `
        <div class="property-item" data-type="${property.type}" data-property-id="${property.id}">
            ${imageHTML}
            <div class="property-details">
                <div class="property-type-badge">${listingTypeLabel}</div>
                <h3>${property.title}</h3>
                <p class="property-location">
                    <i class="fas fa-map-marker-alt"></i> ${property.area}, ${property.city}
                </p>
                ${distanceHTML}
                <p class="property-price">${priceDisplay}</p>
                <div class="property-features">
                    ${property.bedrooms ? `<span><i class="fas fa-bed"></i> ${property.bedrooms} Beds</span>` : ''}
                    ${property.bathrooms ? `<span><i class="fas fa-bath"></i> ${property.bathrooms} Baths</span>` : ''}
                    <span><i class="fas fa-ruler-combined"></i> ${property.size} sqm</span>
                    ${property.parking ? `<span><i class="fas fa-car"></i> ${property.parking} Parking</span>` : ''}
                </div>
                <p class="property-description">${property.description.substring(0, 120)}...</p>
                ${property.amenities && property.amenities.length > 0 ? `
                    <div class="property-amenities">
                        ${property.amenities.slice(0, 3).map(amenity => `
                            <span class="amenity-badge"><i class="fas fa-check"></i> ${amenity}</span>
                        `).join('')}
                        ${property.amenities.length > 3 ? `<span class="amenity-badge">+${property.amenities.length - 3} more</span>` : ''}
                    </div>
                ` : ''}
                <div class="property-actions">
                    <button class="btn btn-outline" onclick="viewPropertyDetails('${property.id}')">Schedule Viewing</button>
                    <button class="btn btn-secondary" onclick="viewPropertyDetails('${property.id}')">View Details</button>
                </div>
            </div>
        </div>
    `;
}

// Property gallery navigation
let propertyCurrentImageIndex = {};

function navigatePropertyGallery(propertyId, direction) {
    const users = JSON.parse(localStorage.getItem('landlordi_users') || '[]');
    let property = null;
    
    for (const user of users) {
        if (user.properties) {
            property = user.properties.find(p => p.id === propertyId);
            if (property) break;
        }
    }
    
    if (!property || !property.images) return;
    
    if (!propertyCurrentImageIndex[propertyId]) {
        propertyCurrentImageIndex[propertyId] = 0;
    }
    
    propertyCurrentImageIndex[propertyId] += direction;
    
    if (propertyCurrentImageIndex[propertyId] < 0) {
        propertyCurrentImageIndex[propertyId] = property.images.length - 1;
    } else if (propertyCurrentImageIndex[propertyId] >= property.images.length) {
        propertyCurrentImageIndex[propertyId] = 0;
    }
    
    updatePropertyGalleryDisplay(propertyId, property.images);
}

function goToPropertyImage(propertyId, index) {
    const users = JSON.parse(localStorage.getItem('landlordi_users') || '[]');
    let property = null;
    
    for (const user of users) {
        if (user.properties) {
            property = user.properties.find(p => p.id === propertyId);
            if (property) break;
        }
    }
    
    if (!property || !property.images) return;
    
    propertyCurrentImageIndex[propertyId] = index;
    updatePropertyGalleryDisplay(propertyId, property.images);
}

function updatePropertyGalleryDisplay(propertyId, images) {
    const gallery = document.getElementById(`prop-gallery-${propertyId}`);
    if (!gallery) return;
    
    const img = gallery.querySelector('img');
    const dots = gallery.querySelectorAll('.gallery-dot');
    
    const currentIndex = propertyCurrentImageIndex[propertyId] || 0;
    
    img.src = images[currentIndex];
    
    dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
            dot.style.background = 'white';
            dot.classList.add('active');
        } else {
            dot.style.background = 'rgba(255,255,255,0.5)';
            dot.classList.remove('active');
        }
    });
}

function setupPropertyFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active to clicked button
            this.classList.add('active');
            
            const filterType = this.getAttribute('data-filter');
            filterProperties(filterType);
        });
    });
}

function filterProperties(type) {
    const allProperties = window.allPropertiesData || [];
    
    if (type === 'all') {
        displayProperties(allProperties);
    } else {
        // Map filter button values to property types
        const typeMap = {
            'houses': 'house',
            'apartments': 'apartment',
            'plots': 'plot',
            'commercial': 'commercial'
        };
        
        const propertyType = typeMap[type] || type;
        const filtered = allProperties.filter(prop => prop.type === propertyType);
        displayProperties(filtered);
    }
}

function viewPropertyDetails(propertyId) {
    // Store property ID for details page
    localStorage.setItem('viewingPropertyId', propertyId);
    
    // Get property and owner details
    const users = JSON.parse(localStorage.getItem('landlordi_users') || '[]');
    let property = null;
    let owner = null;
    
    for (const user of users) {
        if (user.properties) {
            property = user.properties.find(p => p.id === propertyId);
            if (property) {
                owner = user;
                break;
            }
        }
    }
    
    if (property && owner) {
        // Show detailed modal instead of simple alert
        showPropertyModal(property, owner);
        
        // Increment view count
        property.views = (property.views || 0) + 1;
        
        // Update in localStorage
        const userIndex = users.findIndex(u => u.id === owner.id);
        if (userIndex !== -1) {
            const propertyIndex = users[userIndex].properties.findIndex(p => p.id === propertyId);
            if (propertyIndex !== -1) {
                users[userIndex].properties[propertyIndex] = property;
                localStorage.setItem('landlordi_users', JSON.stringify(users));
            }
        }
    }
}

function showPropertyModal(property, owner) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'property-modal';
    modal.innerHTML = `
        <div class="property-modal-overlay" onclick="closePropertyModal()"></div>
        <div class="property-modal-content">
            <button class="modal-close" onclick="closePropertyModal()">
                <i class="fas fa-times"></i>
            </button>
            
            <div class="modal-header">
                <h2>${property.title}</h2>
                <p class="modal-location"><i class="fas fa-map-marker-alt"></i> ${property.area}, ${property.city}</p>
            </div>
            
            <div class="modal-body">
                <div class="modal-price">MWK ${Number(property.price).toLocaleString()}${property.listingType !== 'sale' ? `/${property.rentPeriod}` : ''}</div>
                
                <div class="modal-section">
                    <h3>Description</h3>
                    <p>${property.description}</p>
                </div>
                
                <div class="modal-section">
                    <h3>Property Features</h3>
                    <div class="modal-features">
                        ${property.bedrooms ? `<span><i class="fas fa-bed"></i> ${property.bedrooms} Bedrooms</span>` : ''}
                        ${property.bathrooms ? `<span><i class="fas fa-bath"></i> ${property.bathrooms} Bathrooms</span>` : ''}
                        <span><i class="fas fa-ruler-combined"></i> ${property.size} sqm</span>
                        ${property.parking ? `<span><i class="fas fa-car"></i> ${property.parking} Parking</span>` : ''}
                    </div>
                </div>
                
                ${property.amenities && property.amenities.length > 0 ? `
                    <div class="modal-section">
                        <h3>Amenities</h3>
                        <div class="modal-amenities">
                            ${property.amenities.map(amenity => `
                                <span class="amenity-tag"><i class="fas fa-check"></i> ${amenity}</span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <div class="modal-section">
                    <h3>Contact Owner</h3>
                    <div class="owner-info">
                        <p><strong>Name:</strong> ${owner.firstName} ${owner.lastName}</p>
                        <p><strong>Account Type:</strong> ${formatAccountTypePublic(owner.accountType)}</p>
                        ${property.contactPreference === 'phone' || property.contactPreference === 'both' ? 
                            `<p><strong>Phone:</strong> <a href="tel:${owner.phone}">${owner.phone}</a></p>` : ''}
                        ${property.contactPreference === 'email' || property.contactPreference === 'both' ? 
                            `<p><strong>Email:</strong> <a href="mailto:${owner.email}">${owner.email}</a></p>` : ''}
                    </div>
                </div>
                
                <div class="modal-section">
                    <h3>Request a Viewing</h3>
                    <form id="viewingRequestForm" onsubmit="submitViewingRequest(event, '${property.id}', '${owner.id}')">
                        <div class="form-group">
                            <input type="text" id="buyerName" placeholder="Your Name" required>
                        </div>
                        <div class="form-group">
                            <input type="email" id="buyerEmail" placeholder="Your Email" required>
                        </div>
                        <div class="form-group">
                            <input type="tel" id="buyerPhone" placeholder="Your Phone" required>
                        </div>
                        <div class="form-group">
                            <input type="date" id="preferredDate" placeholder="Preferred Viewing Date" required min="${new Date().toISOString().split('T')[0]}">
                        </div>
                        <div class="form-group">
                            <textarea id="buyerMessage" placeholder="Additional Message (Optional)" rows="3"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-calendar-check"></i> Request Viewing
                        </button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function closePropertyModal() {
    const modal = document.querySelector('.property-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

function formatAccountTypePublic(type) {
    const types = {
        'property-owner': 'Property Owner',
        'landlord': 'Landlord',
        'agent': 'Real Estate Agent',
        'developer': 'Property Developer'
    };
    return types[type] || type;
}

function submitViewingRequest(event, propertyId, ownerId) {
    event.preventDefault();
    
    const viewingRequest = {
        id: 'req_' + Date.now(),
        propertyId: propertyId,
        buyerName: document.getElementById('buyerName').value,
        buyerEmail: document.getElementById('buyerEmail').value,
        buyerPhone: document.getElementById('buyerPhone').value,
        preferredDate: document.getElementById('preferredDate').value,
        message: document.getElementById('buyerMessage').value || 'No additional message',
        requestDate: new Date().toISOString(),
        status: 'pending'
    };
    
    // Get users array
    const users = JSON.parse(localStorage.getItem('landlordi_users') || '[]');
    const ownerIndex = users.findIndex(u => u.id === ownerId);
    
    if (ownerIndex !== -1) {
        // Find the property
        const propertyIndex = users[ownerIndex].properties.findIndex(p => p.id === propertyId);
        
        if (propertyIndex !== -1) {
            // Initialize viewingRequests if not exists
            if (!users[ownerIndex].properties[propertyIndex].viewingRequests) {
                users[ownerIndex].properties[propertyIndex].viewingRequests = [];
            }
            
            // Add viewing request
            users[ownerIndex].properties[propertyIndex].viewingRequests.push(viewingRequest);
            
            // Increment inquiries count
            users[ownerIndex].properties[propertyIndex].inquiries = 
                (users[ownerIndex].properties[propertyIndex].inquiries || 0) + 1;
            
            // Save to localStorage
            localStorage.setItem('landlordi_users', JSON.stringify(users));
            
            // Show success message
            alert('Viewing request sent successfully! The property owner will contact you soon.');
            
            // Close modal
            closePropertyModal();
        }
    }
}

// Add modal styles
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .property-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .property-modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
    }
    
    .property-modal-content {
        position: relative;
        background: white;
        border-radius: 12px;
        max-width: 800px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: modalSlideIn 0.3s ease;
    }
    
    @keyframes modalSlideIn {
        from {
            opacity: 0;
            transform: translateY(-50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .modal-close {
        position: absolute;
        top: 20px;
        right: 20px;
        background: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        z-index: 10;
    }
    
    .modal-close:hover {
        background: #e74c3c;
        color: white;
        transform: rotate(90deg);
    }
    
    .modal-header {
        padding: 40px 40px 20px 40px;
        border-bottom: 1px solid #eee;
    }
    
    .modal-header h2 {
        margin: 0 0 10px 0;
        color: #2c3e50;
    }
    
    .modal-location {
        color: #7f8c8d;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .modal-body {
        padding: 30px 40px;
    }
    
    .modal-price {
        font-size: 32px;
        font-weight: 700;
        color: #e74c3c;
        margin-bottom: 30px;
    }
    
    .modal-section {
        margin-bottom: 30px;
    }
    
    .modal-section h3 {
        margin: 0 0 15px 0;
        color: #2c3e50;
        font-size: 20px;
    }
    
    .modal-features {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }
    
    .modal-features span {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #666;
    }
    
    .modal-amenities {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
    
    .amenity-tag {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: #f8f9fa;
        padding: 8px 15px;
        border-radius: 20px;
        font-size: 14px;
        color: #495057;
    }
    
    .amenity-tag i {
        color: #28a745;
    }
    
    .owner-info p {
        margin: 10px 0;
    }
    
    .owner-info a {
        color: #e74c3c;
        text-decoration: none;
    }
    
    .owner-info a:hover {
        text-decoration: underline;
    }
    
    #viewingRequestForm .form-group {
        margin-bottom: 15px;
    }
    
    #viewingRequestForm input,
    #viewingRequestForm textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-family: inherit;
        font-size: 14px;
    }
    
    #viewingRequestForm input:focus,
    #viewingRequestForm textarea:focus {
        outline: none;
        border-color: #e74c3c;
    }
    
    @media (max-width: 768px) {
        .property-modal-content {
            width: 95%;
            max-height: 95vh;
        }
        
        .modal-header,
        .modal-body {
            padding: 20px;
        }
        
        .modal-price {
            font-size: 24px;
        }
    }
`;
document.head.appendChild(modalStyles);
