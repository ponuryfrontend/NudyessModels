const burgerBtn = document.querySelector('.burger-btn')
const mobileNav = document.querySelector('.nav-mobile')
const mainBanner = document.querySelector('.main-banner')
const closeMenuBtn = document.querySelector('.nav-mobile__close-btn')

const showMobileMenu = () => {
	mobileNav.classList.add('nav-mobile--active')
	mainBanner.style.filter = 'blur(10.5px)'
	document.body.style.overflowY = 'hidden'
}

const closeMobileMenu = () => {
	mobileNav.classList.remove('nav-mobile--active')
	mainBanner.style.filter = 'none'
	document.body.style.overflowY = 'visible';
}

burgerBtn.addEventListener('click', showMobileMenu)
closeMenuBtn.addEventListener('click', closeMobileMenu)
