// Wait for the NUI message from the Lua script
window.addEventListener('message', function(event) {
    var item = event.data;
    if (item.type === "ui") {
        if (item.status) {
            document.getElementById('container').classList.add('active');
        } else {
            document.getElementById('container').classList.remove('active');
        }
    }
});

// Close button functionality
document.getElementById('close-btn').addEventListener('click', function() {
    closeMenu();
});

// Close the menu when ESC key is pressed
document.addEventListener('keyup', function(event) {
    if (event.key === "Escape") {
        closeMenu();
    }
});

// Function to close the menu
function closeMenu() {
    fetch(`https://${GetParentResourceName()}/close`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({})
    }).then(response => response.json()).then(data => {
        console.log(data);
    });
}

// Tab switching functionality
const sidebarItems = document.querySelectorAll('.sidebar-item');
const tabContents = document.querySelectorAll('.tab-content');

sidebarItems.forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all sidebar items
        sidebarItems.forEach(i => i.classList.remove('active'));

        // Add active class to clicked item
        this.classList.add('active');

        // Get the tab to show
        const tabToShow = this.getAttribute('data-tab');

        // Hide all tab contents
        tabContents.forEach(tab => tab.classList.remove('active'));

        // Show the selected tab content
        document.getElementById(tabToShow).classList.add('active');
    });
});

// Accordion functionality for FAQ section
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');

    header.addEventListener('click', function() {
        // Toggle active class on the clicked item
        item.classList.toggle('active');

        // Close other accordion items
        accordionItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
    });
});

// Initialize the first tab as active
document.querySelector('.sidebar-item').classList.add('active');
document.querySelector('.tab-content').classList.add('active');
