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
