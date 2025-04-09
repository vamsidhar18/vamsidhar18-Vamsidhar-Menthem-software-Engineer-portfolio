// Calendar and Availability API Integration
// Author: Manus AI
// Date: April 2025

class AvailabilityScheduler {
    constructor(calendarElementId, formElementId) {
        this.calendarElement = document.getElementById(calendarElementId);
        this.formElement = document.getElementById(formElementId);
        this.availableSlots = [];
        this.bookedSlots = [];
        this.calendar = null;
        
        // Default business hours
        this.businessHours = {
            daysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday
            startTime: '09:00',
            endTime: '17:00'
        };
        
        // Default time slots (1 hour each)
        this.timeSlots = [
            '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'
        ];
        
        this.init();
    }
    
    init() {
        // Initialize the calendar if the element exists
        if (this.calendarElement) {
            this.initCalendar();
            this.loadAvailability();
        }
        
        // Initialize the form if it exists
        if (this.formElement) {
            this.initForm();
        }
    }
    
    initCalendar() {
        this.calendar = new FullCalendar.Calendar(this.calendarElement, {
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek'
            },
            businessHours: this.businessHours,
            selectConstraint: 'businessHours',
            selectable: true,
            select: (info) => this.handleDateSelect(info),
            eventClick: (info) => this.handleEventClick(info),
            events: [],
            eventTimeFormat: {
                hour: '2-digit',
                minute: '2-digit',
                meridiem: 'short'
            }
        });
        
        this.calendar.render();
    }
    
    loadAvailability() {
        // In a real implementation, this would fetch data from a backend API
        // For demo purposes, we'll generate some sample availability
        
        // Generate available slots for the next 30 days
        const today = new Date();
        const nextMonth = new Date(today);
        nextMonth.setDate(today.getDate() + 30);
        
        // Generate random available slots
        this.generateSampleAvailability(today, nextMonth);
        
        // Add events to calendar
        this.updateCalendarEvents();
    }
    
    generateSampleAvailability(startDate, endDate) {
        // Clear existing slots
        this.availableSlots = [];
        this.bookedSlots = [];
        
        // Loop through each day
        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            // Skip weekends
            const dayOfWeek = currentDate.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                // Add 2-3 random available slots per day
                const numSlots = Math.floor(Math.random() * 2) + 2;
                const shuffledSlots = [...this.timeSlots].sort(() => 0.5 - Math.random());
                const selectedSlots = shuffledSlots.slice(0, numSlots);
                
                selectedSlots.forEach(timeSlot => {
                    const slotDate = new Date(currentDate);
                    const [hours, minutes] = timeSlot.split(':').map(Number);
                    slotDate.setHours(hours, minutes, 0, 0);
                    
                    // 20% chance of slot being already booked
                    const isBooked = Math.random() < 0.2;
                    
                    const slot = {
                        start: new Date(slotDate),
                        end: new Date(slotDate.getTime() + 60 * 60 * 1000), // 1 hour duration
                        title: isBooked ? 'Booked' : 'Available',
                        color: isBooked ? '#F97316' : '#0D9488',
                        extendedProps: {
                            status: isBooked ? 'booked' : 'available'
                        }
                    };
                    
                    if (isBooked) {
                        this.bookedSlots.push(slot);
                    } else {
                        this.availableSlots.push(slot);
                    }
                });
            }
            
            // Move to next day
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }
    
    updateCalendarEvents() {
        if (!this.calendar) return;
        
        // Remove all events
        this.calendar.removeAllEvents();
        
        // Add available and booked slots
        [...this.availableSlots, ...this.bookedSlots].forEach(slot => {
            this.calendar.addEvent(slot);
        });
    }
    
    handleDateSelect(info) {
        // Fill the booking form with the selected date
        const dateInput = document.getElementById('date');
        if (dateInput) {
            dateInput.value = info.startStr;
        }
        
        // Update available time slots for the selected date
        this.updateTimeSlotOptions(info.start);
        
        // Scroll to booking form
        if (this.formElement) {
            this.formElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
    
    handleEventClick(info) {
        const event = info.event;
        const status = event.extendedProps.status;
        
        if (status === 'booked') {
            // Show message that slot is already booked
            alert('This time slot is already booked. Please select an available slot.');
            return;
        }
        
        // Fill the booking form with the selected date and time
        const dateInput = document.getElementById('date');
        const timeInput = document.getElementById('time');
        
        if (dateInput && timeInput) {
            const eventDate = event.start;
            const dateStr = eventDate.toISOString().split('T')[0];
            const hours = eventDate.getHours();
            const minutes = eventDate.getMinutes();
            const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            
            dateInput.value = dateStr;
            
            // Find and select the matching time option
            const timeOptions = timeInput.options;
            for (let i = 0; i < timeOptions.length; i++) {
                if (timeOptions[i].value === timeStr) {
                    timeInput.selectedIndex = i;
                    break;
                }
            }
        }
        
        // Scroll to booking form
        if (this.formElement) {
            this.formElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
    
    updateTimeSlotOptions(selectedDate) {
        const timeInput = document.getElementById('time');
        if (!timeInput) return;
        
        // Clear existing options except the first placeholder
        while (timeInput.options.length > 1) {
            timeInput.remove(1);
        }
        
        // Get available time slots for the selected date
        const availableTimesForDate = this.availableSlots
            .filter(slot => {
                const slotDate = slot.start;
                return slotDate.getFullYear() === selectedDate.getFullYear() &&
                       slotDate.getMonth() === selectedDate.getMonth() &&
                       slotDate.getDate() === selectedDate.getDate();
            })
            .map(slot => {
                const hours = slot.start.getHours();
                const minutes = slot.start.getMinutes();
                return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            });
        
        // If no available times, add a message
        if (availableTimesForDate.length === 0) {
            const option = document.createElement('option');
            option.value = "";
            option.text = "No available slots on this date";
            timeInput.add(option);
            timeInput.disabled = true;
        } else {
            // Add available time options
            availableTimesForDate.forEach(timeStr => {
                const option = document.createElement('option');
                option.value = timeStr;
                
                // Format time for display (e.g., "9:00 AM")
                const [hours, minutes] = timeStr.split(':').map(Number);
                const period = hours >= 12 ? 'PM' : 'AM';
                const displayHours = hours % 12 || 12;
                option.text = `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
                
                timeInput.add(option);
            });
            timeInput.disabled = false;
        }
    }
    
    initForm() {
        this.formElement.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission();
        });
        
        // Add date input change listener
        const dateInput = document.getElementById('date');
        if (dateInput) {
            dateInput.addEventListener('change', () => {
                const selectedDate = new Date(dateInput.value);
                if (!isNaN(selectedDate.getTime())) {
                    this.updateTimeSlotOptions(selectedDate);
                }
            });
        }
    }
    
    handleFormSubmission() {
        // Get form data
        const formData = new FormData(this.formElement);
        const bookingData = {
            name: formData.get('name'),
            email: formData.get('email'),
            company: formData.get('company'),
            date: formData.get('date'),
            time: formData.get('time'),
            timezone: formData.get('timezone'),
            message: formData.get('message')
        };
        
        // Validate form data
        if (!this.validateBookingData(bookingData)) {
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.formElement.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing...';
        
        // In a real implementation, this would send data to a backend API
        // For demo purposes, we'll simulate a successful submission
        setTimeout(() => {
            // Mark the slot as booked in our local data
            this.markSlotAsBooked(bookingData.date, bookingData.time);
            
            // Show success message
            const formContainer = this.formElement.parentElement;
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Interview Request Confirmed!</h3>
                <p>Thank you for your interest, ${bookingData.name}. Your interview has been scheduled for:</p>
                <p class="booking-details">
                    <strong>Date:</strong> ${this.formatDate(bookingData.date)}<br>
                    <strong>Time:</strong> ${this.formatTime(bookingData.time)} ${bookingData.timezone}<br>
                    <strong>Company:</strong> ${bookingData.company}
                </p>
                <p>A confirmation email has been sent to ${bookingData.email}. I look forward to speaking with you!</p>
                <button class="btn btn-primary new-booking-btn">Schedule Another Interview</button>
            `;
            
            formContainer.innerHTML = '';
            formContainer.appendChild(successMessage);
            
            // Add event listener to "Schedule Another Interview" button
            const newBookingBtn = formContainer.querySelector('.new-booking-btn');
            if (newBookingBtn) {
                newBookingBtn.addEventListener('click', () => {
                    formContainer.innerHTML = '';
                    formContainer.appendChild(this.formElement);
                    this.formElement.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                });
            }
            
            // Update calendar to reflect the new booking
            this.updateCalendarEvents();
        }, 2000);
    }
    
    validateBookingData(data) {
        // Basic validation
        if (!data.name || !data.email || !data.company || !data.date || !data.time) {
            alert('Please fill in all required fields.');
            return false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return false;
        }
        
        // Date validation
        const selectedDate = new Date(data.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (isNaN(selectedDate.getTime()) || selectedDate < today) {
            alert('Please select a valid future date.');
            return false;
        }
        
        return true;
    }
    
    markSlotAsBooked(dateStr, timeStr) {
        // Find the slot in availableSlots
        const date = new Date(dateStr);
        const [hours, minutes] = timeStr.split(':').map(Number);
        date.setHours(hours, minutes, 0, 0);
        
        const slotIndex = this.availableSlots.findIndex(slot => {
            const slotStart = slot.start;
            return slotStart.getFullYear() === date.getFullYear() &&
                   slotStart.getMonth() === date.getMonth() &&
                   slotStart.getDate() === date.getDate() &&
                   slotStart.getHours() === date.getHours() &&
                   slotStart.getMinutes() === date.getMinutes();
        });
        
        if (slotIndex !== -1) {
            // Remove from available slots
            const slot = this.availableSlots.splice(slotIndex, 1)[0];
            
            // Update slot properties
            slot.title = 'Booked';
            slot.color = '#F97316';
            slot.extendedProps.status = 'booked';
            
            // Add to booked slots
            this.bookedSlots.push(slot);
        }
    }
    
    formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    formatTime(timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    }
}

// Initialize the availability scheduler when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the availability scheduler
    const scheduler = new AvailabilityScheduler('calendar', 'booking-form');
    
    // Add to window object for debugging
    window.availabilityScheduler = scheduler;
});
