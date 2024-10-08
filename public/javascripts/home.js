
    document.addEventListener('DOMContentLoaded', () => {
        const video = document.querySelector('video');

        // Play video on hover
        video.addEventListener('mouseenter', () => {
            video.play();
        });

        // Pause video when hover ends
        video.addEventListener('mouseleave', () => {
            video.pause();
        });
    });


    const homeFunction = () => {
        // Select the video element
        const video = document.querySelector('marketing');
    
        // Optional: Pause the video if needed
        if (video) {
            video.pause();
        }
    
        // Redirect to the home page
        window.location.href = '/'; // This will reload the page to the home route
    };
    // document.querySelector('marketing').addEventListener('click', homeFunction);


    //this is for menu bar
    // JavaScript to toggle the menu on smaller screens
// JavaScript to toggle the sidebar menu
const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const sidebarMenu = document.getElementById('sidebar-menu');

// Show the sidebar when the toggle button is clicked
menuToggle.addEventListener('click', () => {
    sidebarMenu.classList.remove('-translate-x-full');
});

// Hide the sidebar when the close button is clicked
menuClose.addEventListener('click', () => {
    sidebarMenu.classList.add('-translate-x-full');
});

//for handling the cookies
document.addEventListener('DOMContentLoaded', () => {
    const cookieConsent = document.cookie.split('; ').find(row => row.startsWith('cookieConsent='));

    if (!cookieConsent) {
        document.getElementById('cookie-banner').classList.remove('hidden');
    }

    document.getElementById('accept-cookies').addEventListener('click', () => {
        fetch('/accept-cookies', { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                document.getElementById('cookie-banner').classList.add('hidden');
            });
    });

    document.getElementById('reject-cookies').addEventListener('click', () => {
        fetch('/reject-cookies', { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                document.getElementById('cookie-banner').classList.add('hidden');
            });
    });
});
