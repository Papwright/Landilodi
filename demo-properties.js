// Demo Properties Generator for Landlordi Real Estate
// This script adds sample properties with images for testing

function generateDemoProperties() {
    console.log('🏠 Generating demo properties...');
    
    // Create demo users with properties
    const demoUsers = [
        {
            id: 'demo-user-1',
            firstName: 'Chifundo',
            lastName: 'Banda',
            email: 'chifundo.banda@landlordi.mw',
            phone: '+265 888 123 456',
            location: 'Lilongwe',
            accountType: 'agent',
            verified: true,
            properties: []
        },
        {
            id: 'demo-user-2',
            firstName: 'Thandiwe',
            lastName: 'Phiri',
            email: 'thandiwe.phiri@landlordi.mw',
            phone: '+265 999 234 567',
            location: 'Blantyre',
            accountType: 'landlord',
            verified: true,
            properties: []
        },
        {
            id: 'demo-user-3',
            firstName: 'Mphatso',
            lastName: 'Mwale',
            email: 'mphatso.mwale@landlordi.mw',
            phone: '+265 888 345 678',
            location: 'Mzuzu',
            accountType: 'developer',
            verified: true,
            properties: []
        }
    ];

    // Demo property data
    const demoProperties = [
        {
            userId: 'demo-user-1',
            title: 'Luxury 4-Bedroom Villa in Area 43',
            type: 'house',
            listingType: 'sale',
            description: 'Stunning modern villa with spacious rooms, fitted kitchen, secure compound with perimeter wall, borehole water, backup generator, and servants quarters. Located in the prestigious Area 43 neighborhood. Perfect for families seeking luxury and comfort.',
            city: 'Lilongwe',
            area: 'Area 43',
            latitude: -13.9626,
            longitude: 33.7741,
            price: 185000000,
            size: 320,
            bedrooms: 4,
            bathrooms: 3,
            parking: 2,
            amenities: ['Swimming Pool', 'Security', 'Borehole', 'Generator', 'Garden', 'Servants Quarters'],
            images: [
                'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
            ],
            status: 'verified',
            views: 145,
            inquiries: 12,
            viewingRequests: []
        },
        {
            userId: 'demo-user-1',
            title: 'Modern 3-Bedroom Apartment City Centre',
            type: 'apartment',
            listingType: 'rent',
            rentPeriod: 'month',
            description: 'Beautiful modern apartment in the heart of Lilongwe City Centre. Features open-plan living, modern kitchen, secure building with 24/7 security, elevator access, and backup power. Walking distance to shops, restaurants, and business district.',
            city: 'Lilongwe',
            area: 'City Centre',
            latitude: -13.9833,
            longitude: 33.7833,
            price: 850000,
            size: 145,
            bedrooms: 3,
            bathrooms: 2,
            parking: 1,
            amenities: ['Security', 'Elevator', 'Backup Power', 'Water Supply', 'Parking'],
            images: [
                'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'
            ],
            status: 'active',
            views: 89,
            inquiries: 8,
            viewingRequests: []
        },
        {
            userId: 'demo-user-2',
            title: 'Prime Commercial Plot in Kanengo',
            type: 'plot',
            listingType: 'sale',
            description: 'Excellent commercial plot along Kanengo main road with high traffic. Perfect for warehouse, factory, or shopping complex. All utilities available including water, electricity, and road access. Clean title deed ready for transfer.',
            city: 'Lilongwe',
            area: 'Kanengo',
            latitude: -13.9167,
            longitude: 33.7333,
            price: 125000000,
            size: 2800,
            bedrooms: 0,
            bathrooms: 0,
            parking: 0,
            amenities: ['Title Deed', 'Main Road', 'Water', 'Electricity', 'Commercial Zone'],
            images: [
                'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop'
            ],
            status: 'verified',
            views: 67,
            inquiries: 5,
            viewingRequests: []
        },
        {
            userId: 'demo-user-2',
            title: 'Spacious 5-Bedroom House in Namiwawa',
            type: 'house',
            listingType: 'rent',
            rentPeriod: 'month',
            description: 'Large family home in quiet Namiwawa neighborhood. Features include master ensuite, fitted wardrobes, large garden, covered parking for 3 cars, borehole water, and solar backup. Perfect for expat families or large households.',
            city: 'Blantyre',
            area: 'Namiwawa',
            latitude: -15.7861,
            longitude: 35.0058,
            price: 1200000,
            size: 380,
            bedrooms: 5,
            bathrooms: 4,
            parking: 3,
            amenities: ['Garden', 'Borehole', 'Solar Power', 'Security', 'Ensuite', 'Wardrobes'],
            images: [
                'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop'
            ],
            status: 'active',
            views: 102,
            inquiries: 15,
            viewingRequests: []
        },
        {
            userId: 'demo-user-3',
            title: 'New 2-Bedroom Apartments - Off Plan',
            type: 'apartment',
            listingType: 'sale',
            description: 'Brand new development in Mzuzu. Modern 2-bedroom apartments with fitted kitchens, tiled throughout, secure complex with perimeter wall and gate. Ready for occupation in 3 months. Payment plan available.',
            city: 'Mzuzu',
            area: 'Katoto',
            latitude: -11.4529,
            longitude: 34.0154,
            price: 45000000,
            size: 95,
            bedrooms: 2,
            bathrooms: 2,
            parking: 1,
            amenities: ['New Build', 'Payment Plan', 'Security', 'Tiled', 'Modern Finishes'],
            images: [
                'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop'
            ],
            status: 'verified',
            views: 78,
            inquiries: 9,
            viewingRequests: []
        },
        {
            userId: 'demo-user-3',
            title: 'Executive Office Space - City Centre Blantyre',
            type: 'commercial',
            listingType: 'rent',
            rentPeriod: 'month',
            description: 'Premium office space in prime Blantyre City Centre location. Modern building with elevator, 24/7 security, backup generator, high-speed internet ready, ample parking. Perfect for corporate offices, NGOs, or professional services.',
            city: 'Blantyre',
            area: 'City Centre',
            latitude: -15.7866,
            longitude: 35.0120,
            price: 2500000,
            size: 220,
            bedrooms: 0,
            bathrooms: 2,
            parking: 4,
            amenities: ['Elevator', 'Security', 'Generator', 'Parking', 'Internet Ready', 'Air Conditioning'],
            images: [
                'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop'
            ],
            status: 'active',
            views: 56,
            inquiries: 7,
            viewingRequests: []
        },
        {
            userId: 'demo-user-1',
            title: 'Residential Plot in Area 49',
            type: 'plot',
            listingType: 'sale',
            description: 'Prime residential plot in developing Area 49. Freehold title deed, water and electricity nearby. Quiet neighborhood, perfect for building your dream home. Easy access to main roads and amenities.',
            city: 'Lilongwe',
            area: 'Area 49',
            latitude: -13.9450,
            longitude: 33.7550,
            price: 38000000,
            size: 800,
            bedrooms: 0,
            bathrooms: 0,
            parking: 0,
            amenities: ['Title Deed', 'Water Nearby', 'Electricity Nearby', 'Residential Zone', 'Quiet Area'],
            images: [
                'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'
            ],
            status: 'active',
            views: 43,
            inquiries: 4,
            viewingRequests: []
        },
        {
            userId: 'demo-user-2',
            title: 'Cozy 2-Bedroom Cottage in Zomba',
            type: 'house',
            listingType: 'rent',
            rentPeriod: 'month',
            description: 'Charming cottage with mountain views in Zomba. Features small garden, covered patio, secure yard, water tank, and solar lights. Perfect for couples or small families seeking peace and nature.',
            city: 'Zomba',
            area: 'Chinamwali',
            latitude: -15.3850,
            longitude: 35.3188,
            price: 450000,
            size: 85,
            bedrooms: 2,
            bathrooms: 1,
            parking: 1,
            amenities: ['Mountain Views', 'Garden', 'Solar Lights', 'Water Tank', 'Patio'],
            images: [
                'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1523217505248-f7e4f4c85a54?w=800&h=600&fit=crop'
            ],
            status: 'active',
            views: 34,
            inquiries: 3,
            viewingRequests: []
        }
    ];

    // Assign properties to users
    demoProperties.forEach(propData => {
        const user = demoUsers.find(u => u.id === propData.userId);
        if (user) {
            const property = {
                id: `prop-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                ...propData,
                createdDate: new Date().toISOString(),
                updatedDate: new Date().toISOString()
            };
            delete property.userId;
            user.properties.push(property);
        }
    });

    // Get existing users from localStorage
    let existingUsers = JSON.parse(localStorage.getItem('landlordi_users') || '[]');
    
    // Remove old demo users if they exist
    existingUsers = existingUsers.filter(u => !u.id.startsWith('demo-user-'));
    
    // Add demo users
    const updatedUsers = [...existingUsers, ...demoUsers];
    
    // Save to localStorage
    localStorage.setItem('landlordi_users', JSON.stringify(updatedUsers));
    
    console.log('✅ Demo properties added successfully!');
    console.log(`📊 Total properties: ${demoProperties.length}`);
    console.log(`👥 Total users: ${updatedUsers.length}`);
    console.log('\n🏠 Property Types:');
    console.log(`   - Houses: ${demoProperties.filter(p => p.type === 'house').length}`);
    console.log(`   - Apartments: ${demoProperties.filter(p => p.type === 'apartment').length}`);
    console.log(`   - Plots: ${demoProperties.filter(p => p.type === 'plot').length}`);
    console.log(`   - Commercial: ${demoProperties.filter(p => p.type === 'commercial').length}`);
    console.log('\n💰 Listing Types:');
    console.log(`   - For Sale: ${demoProperties.filter(p => p.listingType === 'sale').length}`);
    console.log(`   - For Rent: ${demoProperties.filter(p => p.listingType === 'rent').length}`);
    console.log('\n🌍 Locations:');
    console.log(`   - Lilongwe: ${demoProperties.filter(p => p.city === 'Lilongwe').length}`);
    console.log(`   - Blantyre: ${demoProperties.filter(p => p.city === 'Blantyre').length}`);
    console.log(`   - Mzuzu: ${demoProperties.filter(p => p.city === 'Mzuzu').length}`);
    console.log(`   - Zomba: ${demoProperties.filter(p => p.city === 'Zomba').length}`);
    
    return {
        success: true,
        propertiesAdded: demoProperties.length,
        usersCreated: demoUsers.length
    };
}

// Helper function to clear demo data
function clearDemoProperties() {
    let users = JSON.parse(localStorage.getItem('landlordi_users') || '[]');
    users = users.filter(u => !u.id.startsWith('demo-user-'));
    localStorage.setItem('landlordi_users', JSON.stringify(users));
    console.log('✅ Demo properties cleared!');
}

// Helper function to view all properties
function viewAllProperties() {
    const users = JSON.parse(localStorage.getItem('landlordi_users') || '[]');
    const allProperties = [];
    users.forEach(user => {
        if (user.properties) {
            user.properties.forEach(prop => {
                allProperties.push({
                    title: prop.title,
                    type: prop.type,
                    city: prop.city,
                    price: `MWK ${prop.price.toLocaleString()}`,
                    owner: `${user.firstName} ${user.lastName}`,
                    images: prop.images ? prop.images.length : 0
                });
            });
        }
    });
    console.table(allProperties);
    return allProperties;
}

// Auto-generate on page load if on properties page
if (window.location.pathname.includes('properties.html')) {
    console.log('🏠 Demo properties script loaded!');
    console.log('Run generateDemoProperties() in console to add demo data');
    console.log('Run clearDemoProperties() to remove demo data');
    console.log('Run viewAllProperties() to see all properties');
}
