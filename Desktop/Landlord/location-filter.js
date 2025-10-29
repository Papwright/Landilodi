const MALAWI_CITIES = {
    'Lilongwe': { latitude: -13.9833, longitude: 33.7833, name: 'Lilongwe (Capital)' },
    'Blantyre': { latitude: -15.7861, longitude: 35.0058, name: 'Blantyre' },
    'Mzuzu': { latitude: -11.4529, longitude: 34.0154, name: 'Mzuzu' },
    'Zomba': { latitude: -15.3850, longitude: 35.3188, name: 'Zomba' },
    'Kasungu': { latitude: -13.0333, longitude: 33.4833, name: 'Kasungu' },
    'Mangochi': { latitude: -14.4783, longitude: 35.2642, name: 'Mangochi' },
    'Salima': { latitude: -13.7833, longitude: 34.4500, name: 'Salima' },
    'Mzimba': { latitude: -11.9000, longitude: 33.6000, name: 'Mzimba' },
    'Karonga': { latitude: -9.9333, longitude: 33.9333, name: 'Karonga' },
    'Dedza': { latitude: -14.3778, longitude: 34.3333, name: 'Dedza' }
};

class LocationFilter {
    constructor() {
        this.userLocation = null;
        this.locationPermission = false;
        this.maxDistance = null; // km, null = show all
        this.locationType = null; // 'gps' or 'manual'
    }

    async getUserLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                console.warn('Geolocation is not supported by this browser');
                reject(new Error('Geolocation not supported'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.userLocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy
                    };
                    this.locationPermission = true;
                    console.log('📍 User location obtained:', this.userLocation);
                    resolve(this.userLocation);
                },
                (error) => {
                    console.warn('Location permission denied or error:', error.message);
                    this.locationPermission = false;
                    reject(error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 300000 // 5 minutes cache
                }
            );
        });
    }

    // Calculate distance between two coordinates using Haversine formula
    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in kilometers
        const dLat = this.toRadians(lat2 - lat1);
        const dLon = this.toRadians(lon2 - lon1);
        
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        
        return distance; // in kilometers
    }

    // Convert degrees to radians
    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    // Calculate distance from user to property
    getDistanceToProperty(property) {
        if (!this.userLocation || !property.latitude || !property.longitude) {
            return null;
        }

        return this.calculateDistance(
            this.userLocation.latitude,
            this.userLocation.longitude,
            property.latitude,
            property.longitude
        );
    }

    // Format distance for display
    formatDistance(distanceKm) {
        if (distanceKm === null || distanceKm === undefined) {
            return '';
        }

        if (distanceKm < 1) {
            return `${Math.round(distanceKm * 1000)}m away`;
        } else if (distanceKm < 10) {
            return `${distanceKm.toFixed(1)} km away`;
        } else {
            return `${Math.round(distanceKm)} km away`;
        }
    }

    // Filter properties by distance
    filterByDistance(properties, maxDistanceKm) {
        if (!this.userLocation || maxDistanceKm === null) {
            return properties;
        }

        return properties.filter(property => {
            const distance = this.getDistanceToProperty(property);
            return distance !== null && distance <= maxDistanceKm;
        });
    }

    // Set location manually by city name
    setManualLocation(cityName) {
        const city = MALAWI_CITIES[cityName];
        if (city) {
            this.userLocation = {
                latitude: city.latitude,
                longitude: city.longitude,
                accuracy: 0, // Manual location has perfect accuracy
                cityName: cityName,
                displayName: city.name
            };
            this.locationType = 'manual';
            console.log('📍 Manual location set:', cityName);
            return true;
        }
        return false;
    }

    // Get list of available cities
    getCities() {
        return Object.keys(MALAWI_CITIES).map(key => ({
            value: key,
            label: MALAWI_CITIES[key].name
        }));
    }

    // Sort properties by distance (nearest first)
    sortByDistance(properties) {
        if (!this.userLocation) {
            return properties;
        }

        // Add distance to each property
        const propertiesWithDistance = properties.map(property => ({
            ...property,
            distance: this.getDistanceToProperty(property)
        }));

        // Sort by distance (null values at the end)
        return propertiesWithDistance.sort((a, b) => {
            if (a.distance === null) return 1;
            if (b.distance === null) return -1;
            return a.distance - b.distance;
        });
    }

    // Get location label for UI
    getLocationLabel() {
        if (!this.userLocation) {
            return 'Location not available';
        }

        if (this.locationType === 'manual') {
            return `📍 ${this.userLocation.displayName || this.userLocation.cityName}`;
        }

        return `📍 Your Location (±${Math.round(this.userLocation.accuracy)}m accuracy)`;
    }

    // Set maximum distance filter
    setMaxDistance(distanceKm) {
        this.maxDistance = distanceKm;
    }

    // Clear location data
    clearLocation() {
        this.userLocation = null;
        this.locationPermission = false;
        this.maxDistance = null;
        this.locationType = null;
    }
}

// Global instance
window.locationFilter = new LocationFilter();

// Initialize location on page load
document.addEventListener('DOMContentLoaded', () => {
    // Don't auto-request location, let user choose
    console.log('📍 Location filter ready. User can choose GPS or manual location.');
});
