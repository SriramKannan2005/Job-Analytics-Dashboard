// Suppress Tableau permission policy warnings (cosmetic only - doesn't affect functionality)
(function() {
    const originalError = console.error;
    console.error = function(...args) {
        if (args[0] && typeof args[0] === 'string' && args[0].includes('Permissions policy violation: unload')) {
            return; // Suppress this specific warning
        }
        originalError.apply(console, args);
    };
})();

// Developer Mode (Keyboard Shortcut: Ctrl+Shift+D)
let devMode = false;

document.addEventListener('keydown', function(e) {
    // Check for Ctrl+Shift+D (Windows/Linux) or Cmd+Shift+D (Mac)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        devMode = !devMode;
        
        const notification = document.getElementById('devNotification');
        notification.textContent = devMode ? '🔧 Developer Mode Activated' : '🔒 Developer Mode Deactivated';
        notification.style.background = devMode ? 'rgba(88, 86, 214, 0.9)' : 'rgba(236, 64, 122, 0.9)';
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
        
        const dashboardPage = document.getElementById('dashboardPage');
        if (dashboardPage.classList.contains('show')) {
            updateDashboardDisplay();
        }
    }
});

// Get IST time
function getISTTime() {
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istOffset = 5.5 * 60 * 60000;
    const istTime = new Date(utcTime + istOffset);
    return istTime;
}

// Format time as 12-hour format with AM/PM
function formatTime12Hour(date) {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    hours = String(hours).padStart(2, '0');
    
    return {
        time: `${hours}:${minutes}:${seconds}`,
        period: period
    };
}

// Format date
function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Update welcome clock
function updateWelcomeClock() {
    const istTime = getISTTime();
    const timeData = formatTime12Hour(istTime);
    document.getElementById('welcomeClock').textContent = timeData.time;
    document.getElementById('welcomePeriod').textContent = timeData.period;
    document.getElementById('currentDate').textContent = formatDate(istTime);
}

// Update status bar time
function updateStatusTime() {
    const istTime = getISTTime();
    const timeData = formatTime12Hour(istTime);
    const statusTimeEl = document.getElementById('statusTime');
    if (statusTimeEl) {
        statusTimeEl.textContent = `${timeData.time} ${timeData.period}`;
    }
    const statusDateEl = document.getElementById('statusDate');
    if (statusDateEl) {
        statusDateEl.textContent = formatDate(istTime);
    }
}

// Check if current time is in access window
function isInAccessWindow() {
    if (devMode) return true;
    
    const istTime = getISTTime();
    const hours = istTime.getHours();
    return hours >= 15 && hours < 17; // 3 PM to 5 PM
}

// Calculate time until next access window
function getTimeUntilNextWindow() {
    const istTime = getISTTime();
    const currentHours = istTime.getHours();

    let targetTime = new Date(istTime);
    
    if (currentHours < 15) {
        targetTime.setHours(15, 0, 0, 0);
    } else {
        targetTime.setDate(targetTime.getDate() + 1);
        targetTime.setHours(15, 0, 0, 0);
    }

    const diff = targetTime - istTime;
    
    let hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return {
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0')
    };
}

// Update countdown timer
function updateCountdown() {
    const time = getTimeUntilNextWindow();
    document.getElementById('countdownTimer').textContent = 
        `${time.hours}:${time.minutes}:${time.seconds}`;
}

// Update dashboard display
function updateDashboardDisplay() {
    const waitingScreen = document.getElementById('waitingScreen');
    const mainDashboard = document.getElementById('mainDashboard');

    if (isInAccessWindow()) {
        waitingScreen.style.display = 'none';
        mainDashboard.style.display = 'block';
        updateStatusTime();
    } else {
        waitingScreen.style.display = 'block';
        mainDashboard.style.display = 'none';
        updateCountdown();
    }
}

// Refresh only the iframe (chart section)
function refreshChart() {
    const iframe = document.getElementById('tableauIframe');
    const container = iframe.parentElement;
    
    // Create a new iframe to avoid permission policy violations
    const newIframe = iframe.cloneNode(false);
    const timestamp = new Date().getTime();
    
    // Clean the base URL and add refresh parameter
    let baseUrl = iframe.src.split('?')[0] + '?:showVizHome=no&:embed=true&:device=desktop';
    newIframe.src = baseUrl + '&refresh=' + timestamp;
    
    // Replace old iframe with new one
    container.removeChild(iframe);
    container.appendChild(newIframe);
}

// Access button click handler
document.getElementById('accessButton').addEventListener('click', function() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const dashboardPage = document.getElementById('dashboardPage');
    const backButton = document.getElementById('backButton');
    
    welcomeScreen.style.display = 'none';
    dashboardPage.classList.add('show');
    backButton.classList.add('show');
    
    updateDashboardDisplay();
    
    setInterval(() => {
        updateDashboardDisplay();
    }, 1000);
});

// Back button click handler
document.getElementById('backButton').addEventListener('click', function() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const dashboardPage = document.getElementById('dashboardPage');
    const backButton = document.getElementById('backButton');
    
    dashboardPage.classList.remove('show');
    backButton.classList.remove('show');
    
    setTimeout(() => {
        dashboardPage.style.display = 'none';
        welcomeScreen.style.display = 'flex';
    }, 300);
});

// Refresh button click handler - only refreshes the chart
document.getElementById('refreshButton').addEventListener('click', function() {
    refreshChart();
});

// Start welcome clock and status updates
setInterval(updateWelcomeClock, 1000);
setInterval(updateStatusTime, 1000);
updateWelcomeClock();