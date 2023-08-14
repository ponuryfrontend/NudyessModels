const burgerBtn = document.querySelector('.burger-btn')
const mobileNav = document.querySelector('.nav-mobile')
const closeMenuBtn = document.querySelector('.nav-mobile__close-btn')
const fixedHeader = document.querySelector('.fixed-top-header')
const footerYear = document.querySelector('.footer__year')

const showMobileMenu = () => {
	mobileNav.classList.add('nav-mobile--active')
	document.body.classList.add('scroll-lock')
}

const closeMobileMenu = () => {
	mobileNav.classList.remove('nav-mobile--active')
	document.body.classList.remove('scroll-lock')
}

const whiteningHeader = () => {
	const scrollListener = window.scrollY

	if (scrollListener >= 50) {
		fixedHeader.classList.add('white-background')
	} else if (scrollListener < 50) {
		fixedHeader.classList.remove('white-background')
	}
}

const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}

handleCurrentYear()
window.addEventListener('scroll', whiteningHeader)
burgerBtn.addEventListener('click', showMobileMenu)
closeMenuBtn.addEventListener('click', closeMobileMenu)
