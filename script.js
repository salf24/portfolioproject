document.addEventListener("DOMContentLoaded", function () {
    // Greeting
    function updateGreeting() {
        const hour = new Date().getHours();
        let greeting = "Welcome!";
        if (hour  < 12) {
            greeting = "Good Morning!";
        } else if (hour < 18) {
            greeting = "Good Afternoon!";
        } else {
            greeting = "Good Evening!";
        }
        document.getElementById("greeting").innerText = greeting;
    }

    updateGreeting();

    // Accordion logic
    const headers = document.querySelectorAll(".accordion-header");

    headers.forEach(header => {
        header.addEventListener("click", () => {
            const content = header.nextElementSibling;
            const isOpen = content.style.display === "block";

            // Close all
            document.querySelectorAll(".accordion-content").forEach(c => {
                c.style.display = "none";
            });

            // Open clicked one if it was closed
            if (!isOpen) {
                content.style.display = "block";
            }
        });
    });

    // Blog fetch
    fetch("blog.json")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("blog-container");
            data.forEach(post => {
                const card = document.createElement("div");
                card.className = "blog-card";

                const title = document.createElement("h3");
                title.textContent = post.title;

                const desc = document.createElement("p");
                desc.textContent = post.description;

                card.appendChild(title);
                card.appendChild(desc);
                container.appendChild(card);
            });
        })
        .catch(error => console.error("Failed to load blog posts:", error));
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

// Live Clock
function updateClock() {
    const clockElement = document.getElementById('live-clock');
    const currentTime = new Date();

    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    const seconds = String(currentTime.getSeconds()).padStart(2, '0');

    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);
updateClock();

// Contact form validation
document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const errors = [];

    if (name.trim() === "") {
        errors.push("Name is required.");
    } else if (name.length < 3) {
        errors.push("Name must be at least 3 characters long.");
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (email.trim() === "") {
        errors.push("Email is required.");
    } else if (!emailPattern.test(email)) {
        errors.push("Please enter a valid email address.");
    }

    if (message.trim() === "") {
        errors.push("Message is required.");
    } else if (message.length < 10) {
        errors.push("Message must be at least 10 characters long.");
    }

    if (errors.length > 0) {
        alert(errors.join("\n"));
    } else {
        alert("Form submitted successfully!");
    }
});
