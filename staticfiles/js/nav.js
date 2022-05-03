const toggle_btn = document.getElementById('hamburger-icon')

toggle_btn.addEventListener('click', toggleMobileMenu)

function toggleMobileMenu() {

    toggle_btn.classList.toggle('open');
}