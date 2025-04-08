document.addEventListener("DOMContentLoaded", function () {
    function updateGreeting() {
        const hour = new Date().getHours();
        let greeting = "Welcome!";
        if (hour>5 && hour < 12) {
            greeting = "Good Morning!";
        } else if (hour >13 && hour < 18) {
            greeting = "Good Afternoon!";
        } else {
            greeting = "Good Evening!";
        }
        document.getElementById("greeting").innerText = greeting;
    }

    updateGreeting(); 
});

// Dark Mode Toggle
let darkmode = localStorage.getItem('darkmode');
const themeToggle = document.getElementById('theme-toggle');

const enableDarkmode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
};

const disableDarkmode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', null);
};

if (darkmode === "active") enableDarkmode();

themeToggle.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode');
    darkmode !== "active" ? enableDarkmode() : disableDarkmode();
});

//Form validation
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();  

    // Get form values
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    var errors = [];

    // Validate Name (check if it's empty and length)
    if (name.trim() === "") {
        errors.push("Name is required.");
    } else if (name.length < 3) {
        errors.push("Name must be at least 3 characters long.");
    }

    // Validate Email 
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (email.trim() === "") {
        errors.push("Email is required.");
    } else if (!emailPattern.test(email)) {
        errors.push("Please enter a valid email address.");
    }

    // Validate Message 
    if (message.trim() === "") {
        errors.push("Message is required.");
    } else if (message.length < 10) {
        errors.push("Message must be at least 10 characters long.");
    }

    // Show errors if any
    if (errors.length > 0) {
        alert(errors.join("\n"));
    } else {
        alert("Form submitted successfully!");
        
    }
});
