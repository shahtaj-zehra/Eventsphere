// EventSphere JavaScript Functions

// Global variables
let currentUser = null;
let events = [];
let notifications = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadSampleData();
    setupEventListeners();
});

// Initialize application
function initializeApp() {
    // Check if user is logged in
    const userData = localStorage.getItem('currentUser');
    if (userData) {
        currentUser = JSON.parse(userData);
        updateNavigationForLoggedInUser();
    }
    
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
}

// Load sample data
function loadSampleData() {
    // Sample events data
    events = [
        {
            id: 1,
            title: "Tech Conference 2024",
            date: "2024-03-15",
            time: "09:00",
            endTime: "17:00",
            venue: "Convention Center",
            category: "Technology",
            organizer: "Tech Department",
            description: "Join us for the biggest technology conference of the year featuring industry leaders and innovative solutions.",
            status: "upcoming",
            maxParticipants: 200,
            currentParticipants: 45,
            image: "fas fa-laptop-code"
        },
        {
            id: 2,
            title: "Career Development Workshop",
            date: "2024-03-20",
            time: "14:00",
            endTime: "16:00",
            venue: "Library Auditorium",
            category: "Workshop",
            organizer: "Career Services",
            description: "Learn essential skills for career advancement and networking opportunities.",
            status: "upcoming",
            maxParticipants: 50,
            currentParticipants: 23,
            image: "fas fa-graduation-cap"
        },
        {
            id: 3,
            title: "Cultural Festival",
            date: "2024-03-25",
            time: "18:00",
            endTime: "22:00",
            venue: "Main Campus Ground",
            category: "Cultural",
            organizer: "Cultural Committee",
            description: "Celebrate diversity with music, dance, and cultural performances from around the world.",
            status: "upcoming",
            maxParticipants: 500,
            currentParticipants: 156,
            image: "fas fa-users"
        },
        {
            id: 4,
            title: "Research Symposium",
            date: "2024-03-10",
            time: "09:00",
            endTime: "18:00",
            venue: "Research Center",
            category: "Research",
            organizer: "Research Department",
            description: "Annual research symposium showcasing innovative projects and discoveries.",
            status: "ongoing",
            maxParticipants: 100,
            currentParticipants: 78,
            image: "fas fa-microscope"
        },
        {
            id: 5,
            title: "Sports Tournament",
            date: "2024-03-08",
            time: "08:00",
            endTime: "20:00",
            venue: "Sports Complex",
            category: "Sports",
            organizer: "Sports Committee",
            description: "Inter-departmental sports tournament with multiple events and competitions.",
            status: "ongoing",
            maxParticipants: 300,
            currentParticipants: 234,
            image: "fas fa-trophy"
        },
        {
            id: 6,
            title: "AI Workshop",
            date: "2024-02-28",
            time: "10:00",
            endTime: "15:00",
            venue: "Computer Lab",
            category: "Technology",
            organizer: "Computer Science Department",
            description: "Hands-on workshop on artificial intelligence and machine learning applications.",
            status: "completed",
            maxParticipants: 30,
            currentParticipants: 30,
            image: "fas fa-robot"
        }
    ];
    
    // Sample notifications
    notifications = [
        {
            id: 1,
            title: "New Event Available",
            message: "Tech Conference 2024 registration is now open!",
            type: "info",
            date: "2024-03-01",
            read: false
        },
        {
            id: 2,
            title: "Certificate Ready",
            message: "Your certificate for AI Workshop is ready for download.",
            type: "success",
            date: "2024-03-02",
            read: false
        },
        {
            id: 3,
            title: "Event Reminder",
            message: "Research Symposium starts tomorrow at 9:00 AM.",
            type: "warning",
            date: "2024-03-09",
            read: true
        }
    ];
}

// Setup event listeners
function setupEventListeners() {
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Registration form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegistration);
    }
    
    // Event registration
    const registerButtons = document.querySelectorAll('.register-event-btn');
    registerButtons.forEach(button => {
        button.addEventListener('click', handleEventRegistration);
    });
    
    // Star rating
    const stars = document.querySelectorAll('.star-rating .star');
    stars.forEach((star, index) => {
        star.addEventListener('click', () => setStarRating(index + 1));
        star.addEventListener('mouseenter', () => highlightStars(index + 1));
    });
    
    const starContainer = document.querySelector('.star-rating');
    if (starContainer) {
        starContainer.addEventListener('mouseleave', resetStarHighlight);
    }
    
    // Feedback form
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', handleFeedbackSubmission);
    }
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmission);
    }
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubscription);
    }
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simple validation
    if (!email || !password) {
        showAlert('Please fill in all fields', 'danger');
        return;
    }
    
    // Simulate login process
    const loginBtn = document.querySelector('#loginForm button[type="submit"]');
    const originalText = loginBtn.innerHTML;
    loginBtn.innerHTML = '<span class="loading"></span> Logging in...';
    loginBtn.disabled = true;
    
    setTimeout(() => {
        // Mock user data based on email
        const userRole = email.includes('admin') ? 'admin' : 
                        email.includes('organizer') ? 'organizer' : 'student';
        
        currentUser = {
            id: 1,
            name: email.split('@')[0].replace(/[._]/g, ' '),
            email: email,
            role: userRole,
            department: 'Computer Science',
            enrollmentNo: 'CS2024001'
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        showAlert('Login successful! Redirecting...', 'success');
        
        setTimeout(() => {
            // Redirect based on role
            switch(userRole) {
                case 'admin':
                    window.location.href = 'admin-dashboard.html';
                    break;
                case 'organizer':
                    window.location.href = 'organizer-dashboard.html';
                    break;
                default:
                    window.location.href = 'student-dashboard.html';
            }
        }, 1500);
        
        loginBtn.innerHTML = originalText;
        loginBtn.disabled = false;
    }, 2000);
}

// Handle registration
function handleRegistration(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData);
    
    // Validation
    if (!userData.name || !userData.email || !userData.password || !userData.department || !userData.enrollmentNo) {
        showAlert('Please fill in all required fields', 'danger');
        return;
    }
    
    if (userData.password !== userData.confirmPassword) {
        showAlert('Passwords do not match', 'danger');
        return;
    }
    
    if (userData.password.length < 6) {
        showAlert('Password must be at least 6 characters long', 'danger');
        return;
    }
    
    // Simulate registration process
    const registerBtn = document.querySelector('#registerForm button[type="submit"]');
    const originalText = registerBtn.innerHTML;
    registerBtn.innerHTML = '<span class="loading"></span> Creating account...';
    registerBtn.disabled = true;
    
    setTimeout(() => {
        currentUser = {
            id: Date.now(),
            name: userData.name,
            email: userData.email,
            role: 'student',
            department: userData.department,
            enrollmentNo: userData.enrollmentNo
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        showAlert('Registration successful! Redirecting to dashboard...', 'success');
        
        setTimeout(() => {
            window.location.href = 'student-dashboard.html';
        }, 1500);
        
        registerBtn.innerHTML = originalText;
        registerBtn.disabled = false;
    }, 2000);
}

// Handle event registration
function handleEventRegistration(e) {
    e.preventDefault();
    
    if (!currentUser) {
        showAlert('Please login to register for events', 'warning');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        return;
    }
    
    const eventId = e.target.dataset.eventId;
    const event = events.find(e => e.id == eventId);
    
    if (!event) {
        showAlert('Event not found', 'danger');
        return;
    }
    
    if (event.currentParticipants >= event.maxParticipants) {
        showAlert('Event is full', 'warning');
        return;
    }
    
    // Simulate registration
    const originalText = e.target.innerHTML;
    e.target.innerHTML = '<span class="loading"></span> Registering...';
    e.target.disabled = true;
    
    setTimeout(() => {
        event.currentParticipants++;
        e.target.innerHTML = '<i class="fas fa-check"></i> Registered';
        e.target.classList.remove('btn-primary');
        e.target.classList.add('btn-success');
        e.target.disabled = true;
        
        showAlert(`Successfully registered for ${event.title}`, 'success');
    }, 1500);
}

// Star rating functions
function setStarRating(rating) {
    const stars = document.querySelectorAll('.star-rating .star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
    
    // Update hidden input if exists
    const ratingInput = document.getElementById('rating');
    if (ratingInput) {
        ratingInput.value = rating;
    }
}

function highlightStars(rating) {
    const stars = document.querySelectorAll('.star-rating .star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.style.color = '#ffc107';
        } else {
            star.style.color = '#ddd';
        }
    });
}

function resetStarHighlight() {
    const stars = document.querySelectorAll('.star-rating .star');
    stars.forEach(star => {
        if (star.classList.contains('active')) {
            star.style.color = '#ffc107';
        } else {
            star.style.color = '#ddd';
        }
    });
}

// Handle feedback submission
function handleFeedbackSubmission(e) {
    e.preventDefault();
    
    if (!currentUser) {
        showAlert('Please login to submit feedback', 'warning');
        return;
    }
    
    const formData = new FormData(e.target);
    const feedback = Object.fromEntries(formData);
    
    if (!feedback.rating || !feedback.comment) {
        showAlert('Please provide both rating and comment', 'danger');
        return;
    }
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> Submitting...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showAlert('Feedback submitted successfully!', 'success');
        e.target.reset();
        setStarRating(0);
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Handle contact form submission
function handleContactSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const contactData = Object.fromEntries(formData);
    
    if (!contactData.name || !contactData.email || !contactData.message) {
        showAlert('Please fill in all fields', 'danger');
        return;
    }
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showAlert('Message sent successfully! We will get back to you soon.', 'success');
        e.target.reset();
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Handle newsletter subscription
function handleNewsletterSubscription(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (!email) {
        showAlert('Please enter your email address', 'danger');
        return;
    }
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span>';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showAlert('Successfully subscribed to newsletter!', 'success');
        e.target.reset();
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Update navigation for logged in user
function updateNavigationForLoggedInUser() {
    if (!currentUser) return;
    
    const navLinks = document.querySelector('.navbar-nav:last-child');
    if (navLinks) {
        navLinks.innerHTML = `
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                    <i class="fas fa-user me-1"></i>${currentUser.name}
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="${currentUser.role}-dashboard.html">
                        <i class="fas fa-tachometer-alt me-2"></i>Dashboard
                    </a></li>
                    <li><a class="dropdown-item" href="profile.html">
                        <i class="fas fa-user-edit me-2"></i>Profile
                    </a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" onclick="logout()">
                        <i class="fas fa-sign-out-alt me-2"></i>Logout
                    </a></li>
                </ul>
            </li>
        `;
    }
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    showAlert('Logged out successfully', 'info');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Show alert messages
function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());
    
    // Create new alert
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Filter events
function filterEvents() {
    const category = document.getElementById('categoryFilter')?.value;
    const status = document.getElementById('statusFilter')?.value;
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase();
    
    let filteredEvents = events;
    
    if (category && category !== 'all') {
        filteredEvents = filteredEvents.filter(event => event.category === category);
    }
    
    if (status && status !== 'all') {
        filteredEvents = filteredEvents.filter(event => event.status === status);
    }
    
    if (searchTerm) {
        filteredEvents = filteredEvents.filter(event => 
            event.title.toLowerCase().includes(searchTerm) ||
            event.description.toLowerCase().includes(searchTerm) ||
            event.organizer.toLowerCase().includes(searchTerm)
        );
    }
    
    displayEvents(filteredEvents);
}

// Display events
function displayEvents(eventsToShow) {
    const eventsContainer = document.getElementById('eventsContainer');
    if (!eventsContainer) return;
    
    if (eventsToShow.length === 0) {
        eventsContainer.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <h4 class="text-muted">No events found</h4>
                <p class="text-muted">Try adjusting your filters or search terms.</p>
            </div>
        `;
        return;
    }
    
    eventsContainer.innerHTML = eventsToShow.map(event => `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card event-card h-100">
                <div class="card-img-top bg-${getStatusColor(event.status)} text-white p-4 text-center">
                    <i class="${event.image} fs-1"></i>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${event.title}</h5>
                    <p class="card-text text-muted">
                        <i class="fas fa-calendar me-2"></i>${formatDate(event.date)}<br>
                        <i class="fas fa-clock me-2"></i>${event.time} - ${event.endTime}<br>
                        <i class="fas fa-map-marker-alt me-2"></i>${event.venue}
                    </p>
                    <p class="card-text">${event.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="badge bg-${getStatusColor(event.status)}">${event.category}</span>
                        <a href="event-detail.html?id=${event.id}" class="btn btn-outline-primary btn-sm">View Details</a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Get status color
function getStatusColor(status) {
    switch(status) {
        case 'upcoming': return 'primary';
        case 'ongoing': return 'warning';
        case 'completed': return 'secondary';
        default: return 'primary';
    }
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Download certificate
function downloadCertificate() {
    showAlert('Certificate download started!', 'success');
    // In a real application, this would trigger an actual download
}

// Generate QR code (placeholder)
function generateQRCode() {
    showAlert('QR code generated! Show this at the event entrance.', 'info');
    // In a real application, this would generate an actual QR code
}

// Mark attendance (placeholder)
function markAttendance() {
    showAlert('Attendance marked successfully!', 'success');
    // In a real application, this would update attendance records
}

// Utility functions
function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

function getTimeRemaining(eventDate, eventTime) {
    const eventDateTime = new Date(`${eventDate}T${eventTime}`);
    const now = new Date();
    const diff = eventDateTime - now;
    
    if (diff <= 0) return 'Event has started or ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days} days, ${hours} hours remaining`;
    if (hours > 0) return `${hours} hours, ${minutes} minutes remaining`;
    return `${minutes} minutes remaining`;
}
