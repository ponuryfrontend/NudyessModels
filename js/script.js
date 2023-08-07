const mobileMenuBtn = document.querySelector('.header__burger-btn')
const mobileNav = document.querySelector('.nav-mobile')
const closeMenuBtn = document.querySelector('.nav-mobile__close-btn')
const header = document.querySelector('.header')

const mobileMenuToggle = () => {
	mobileNav.classList.add('nav-mobile--active')
	header.style.filter = 'blur(12.5px)'
}

const closingMobileMenu = () => {
	mobileNav.classList.remove('nav-mobile--active')
	header.style.filter = 'none'
}

mobileMenuBtn.addEventListener('click', mobileMenuToggle)
closeMenuBtn.addEventListener('click', closingMobileMenu)
