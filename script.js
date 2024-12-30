// Initialize EmailJS
(function() {
    emailjs.init('HhcxKoOImXexNN1Jr'); // Replace with your EmailJS User ID
})();

// Handle Form Submission
document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload

    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const service = document.getElementById('service').value;

    if (!date || !time || !service) {
        alert('Please fill out all fields before submitting.');
        return;
    }

    // Prepare EmailJS template parameters
    const templateParams = {
        date: date,
        time: time,
        service: service,
        email_to: 'handyservant864@gmail.com'
    };

    emailjs.send('service_gn2697b', 'template_y0qf5ro', templateParams)
        .then(function(response) {
            alert('Booking successfully sent!');
            document.getElementById('booking-form').reset();
        }, function(error) {
            alert('Failed to send booking: ' + error.text);
        });
});

// Google Calendar Integration
function addToGoogleCalendar() {
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const service = document.getElementById('service').value;

    if (!date || !time || !service) {
        alert('Please select a date, time, and service before adding to your calendar.');
        return;
    }

    const startDateTime = `${date}T${time}:00`;
    const endDateTime = `${date}T${(parseInt(time.split(':')[0]) + 1).toString().padStart(2, '0')}:${time.split(':')[1]}:00`;

    const eventTitle = "Handy Service Appointment";
    const eventDescription = `Service: ${service}`;
    const eventLocation = "123 Main St, Anytown, USA";

    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&details=${encodeURIComponent(eventDescription)}&location=${encodeURIComponent(eventLocation)}&dates=${startDateTime.replace(/[-:]/g, '')}/${endDateTime.replace(/[-:]/g, '')}`;

    console.log("Google Calendar URL:", googleCalendarUrl);
    window.open(googleCalendarUrl, '_blank');
}

// Apple Calendar Integration
function addToAppleCalendar() {
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const service = document.getElementById('service').value;

    if (!date || !time || !service) {
        alert('Please select a date, time, and service before adding to your calendar.');
        return;
    }

    const startDateTime = `${date}T${time.replace(':', '')}00`;
    const endDateTime = `${date}T${(parseInt(time.split(':')[0]) + 1).toString().padStart(2, '0')}${time.split(':')[1]}00`;

    const eventTitle = "Handy Service Appointment";
    const eventDescription = `Service: ${service}`;
    const eventLocation = "123 Main St, Anytown, USA";

    const appleCalendarUrl = `data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0D%0AVERSION:2.0%0D%0ABEGIN:VEVENT%0D%0ASUMMARY:${encodeURIComponent(eventTitle)}%0D%0ADESCRIPTION:${encodeURIComponent(eventDescription)}%0D%0ALOCATION:${encodeURIComponent(eventLocation)}%0D%0ADTSTART:${startDateTime}%0D%0ADTEND:${endDateTime}%0D%0AEND:VEVENT%0D%0AEND:VCALENDAR`;

    console.log("Apple Calendar URL:", appleCalendarUrl);
    window.open(appleCalendarUrl, '_blank');
}