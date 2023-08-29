const burgerBtn = document.querySelector('.burger-btn')
const mobileNav = document.querySelector('.nav')
const closeMenuBtn = document.querySelector('.nav__close-btn')
const fixedHeader = document.querySelector('.fixed-top-header')
const dimensionsBtn = document.querySelector('.buttons__dimensions')
const dimensionsBox = document.querySelector('.main-model')
const closeDimensionsBtn = document.querySelector('.main-model__close-btn')
const footerYear = document.querySelector('.footer__year')

const showMobileMenu = () => {
	mobileNav.classList.add('nav--active')
	document.body.classList.add('lock-scroll')
}

const closeMobileMenu = () => {
	mobileNav.classList.remove('nav--active')
	document.body.classList.remove('lock-scroll')
}

const whiteningHeader = () => {
	const scrollListener = window.scrollY

	if (scrollListener >= 80) {
		fixedHeader.classList.add('white-background')
	} else if (scrollListener < 80) {
		fixedHeader.classList.remove('white-background')
	}
}

const showDimensions = () => {
	dimensionsBox.classList.add('main-model--active')
	document.body.classList.add('lock-scroll')
}

const hideDimensions = () => {
	dimensionsBox.classList.remove('main-model--active')
	document.body.classList.remove('lock-scroll')
}

const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}

handleCurrentYear()
window.addEventListener('scroll', whiteningHeader)
burgerBtn.addEventListener('click', showMobileMenu)
closeMenuBtn.addEventListener('click', closeMobileMenu)
dimensionsBtn.addEventListener('click', showDimensions)
closeDimensionsBtn.addEventListener('click', hideDimensions)