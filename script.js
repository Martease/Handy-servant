const calendarGrid = document.getElementById('calendarGrid');
const monthYear = document.getElementById('monthYear');
const prevMonth = document.getElementById('prevMonth');
const nextMonth = document.getElementById('nextMonth');
const selectedDateDisplay = document.getElementById('selectedDate');
const bookSlotButton = document.getElementById('bookSlot');
const bookingMessage = document.getElementById('bookingMessage');
const nameInput = document.getElementById('name');

let currentDate = new Date();
let bookings = {}; // Store bookings in { 'YYYY-MM-DD': 'Name' } format
let selectedDate = null;

// Render Calendar
function renderCalendar() {
    calendarGrid.innerHTML = '';
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    monthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        calendarGrid.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayCell = document.createElement('div');
        dayCell.classList.add('calendar-day');
        dayCell.textContent = day;

        if (bookings[date]) {
            dayCell.classList.add('booked');
            dayCell.title = `Booked by: ${bookings[date]}`;
        }

        dayCell.addEventListener('click', () => selectDate(date, dayCell));

        calendarGrid.appendChild(dayCell);
    }
}

// Select a date
function selectDate(date, dayCell) {
    if (bookings[date]) return; // Don't allow booking on already booked dates

    document.querySelectorAll('.calendar-day').forEach(day => day.classList.remove('selected'));
    dayCell.classList.add('selected');
    selectedDate = date;
    selectedDateDisplay.textContent = date;
}

// Book a slot
bookSlotButton.addEventListener('click', () => {
    if (!selectedDate) {
        bookingMessage.textContent = 'Please select a date first!';
        bookingMessage.style.color = 'red';
        return;
    }
    if (!nameInput.value.trim()) {
        bookingMessage.textContent = 'Please enter your name!';
        bookingMessage.style.color = 'red';
        return;
    }

    // Save booking locally
    bookings[selectedDate] = nameInput.value.trim();

    // Prepare email details
    const email = "handyservant864@gmail.com";
    const subject = encodeURIComponent("New Booking Confirmation");
    const body = encodeURIComponent(
        `Booking Details:\n\nName: ${nameInput.value.trim()}\nDate: ${selectedDate}`
    );

    // Open email client
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

    // Clear fields and refresh
    bookingMessage.textContent = `Slot booked successfully for ${selectedDate} by ${nameInput.value}!`;
    bookingMessage.style.color = 'green';
    selectedDateDisplay.textContent = 'None';
    selectedDate = null;
    nameInput.value = '';
    renderCalendar();
});

// Change Month
prevMonth.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonth.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Initialize Calendar
renderCalendar();