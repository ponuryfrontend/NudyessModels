const burgerBtn = document.querySelector('.burger-btn');
const mobileNav = document.querySelector('.nav');
const closeMenuBtn = document.querySelector('.nav__close-btn');
const fixedHeader = document.querySelector('.fixed-top-header');
const dimensionsBtn = document.querySelector('.dimensions__button');
const dimensionsBox = document.querySelector('.dimensions__box');
const footerYear = document.querySelector('.footer__year');

const whiteningHeader = () => {
	const scrollListener = window.scrollY;

	if (scrollListener >= 70) {
		fixedHeader.classList.add('white-background');
	} else if (scrollListener < 70) {
		fixedHeader.classList.remove('white-background');
	}
}

const showMobileMenu = () => {
	mobileNav.classList.add('nav--active');
	document.body.classList.add('lock-scroll');
}

const closeMobileMenu = () => {
	mobileNav.classList.remove('nav--active');
	document.body.classList.remove('lock-scroll');
}

// MAIN MODEL PAIGE 

const runDimensionsBox = () => {
	dimensionsBox.classList.toggle('dimensions__box--active');
}

const handleCurrentYear = () => {
	const year = new Date().getFullYear();
	footerYear.innerText = year;
}

handleCurrentYear()
window.addEventListener('scroll', whiteningHeader)
burgerBtn.addEventListener('click', showMobileMenu)
closeMenuBtn.addEventListener('click', closeMobileMenu)
dimensionsBtn.addEventListener('click', runDimensionsBox)