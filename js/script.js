const burgerBtn = document.querySelector('.burger-btn')
const mobileNav = document.querySelector('.nav-mobile')
const closeMenuBtn = document.querySelector('.nav-mobile__close-btn')

const showMobileMenu = () => {
	mobileNav.classList.add('nav-mobile--active')
	document.body.classList.add('scroll-lock')
}

const closeMobileMenu = () => {
	mobileNav.classList.remove('nav-mobile--active')
	document.body.classList.remove('scroll-lock')
}

burgerBtn.addEventListener('click', showMobileMenu)
closeMenuBtn.addEventListener('click', closeMobileMenu)
