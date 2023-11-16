const burgerBtn = document.querySelector('.burger-btn')
const mobileNav = document.querySelector('.nav')
const closeMenuBtn = document.querySelector('.nav__close-btn')
const fixedHeader = document.querySelector('.fixed-top-header')
const footerYear = document.querySelector('.footer__year')
const firstNameInput = document.querySelector('#name')
const emailInput = document.querySelector('#email')
const phoneInput = document.querySelector('#phone')
const ageInput = document.querySelector('#age')
const heightInput = document.querySelector('#height')
const cityInput = document.querySelector('#city')
const instagramInput = document.querySelector('#instagram')
const inputBox = document.querySelectorAll('.application__input-box')
const input = document.querySelectorAll('.application__input')
const error = document.querySelector('.error')
const clearFormBtn = document.querySelector('.application__clear-btn')
const sendFormBtn = document.querySelector('.application__apply-btn')
const uploadFiles = document.querySelector('#file')
const closePopupBtn = document.querySelector('.application__close-btn')
const popup = document.querySelector('.application__pop-up')
const popupText = document.querySelector('.application__pop-up-text')

const whiteningHeader = () => {
	const scrollListener = window.scrollY

	if (scrollListener >= 70) {
		fixedHeader.classList.add('white-background')
	} else if (scrollListener < 70) {
		fixedHeader.classList.remove('white-background')
	}
}

const showMobileMenu = () => {
	mobileNav.classList.add('nav--active')
	document.body.classList.add('lock-scroll')
}

const closeMobileMenu = () => {
	mobileNav.classList.remove('nav--active')
	document.body.classList.remove('lock-scroll')
}

// APPLICATION FORM

const createFormData = () => {
	const formData = new FormData()

	formData.append('name', firstNameInput.value)
	formData.append('email', emailInput.value)
	formData.append('phone', phoneInput.value)
	formData.append('age', ageInput.value)
	formData.append('height', heightInput.value)
	formData.append('city', cityInput.value)
	formData.append('instagram', instagramInput.value)

	// Dodaj przesyłane pliki
	for (const file of uploadFiles.files) {
		formData.append('file[]', file)
	}

	return formData
}

const showApplicationError = (input, msg) => {
	const applicationBox = input.parentElement
	const errorMsg = applicationBox.querySelector('.application__error-text')

	applicationBox.classList.add('error')
	errorMsg.textContent = msg
}

const clearApplicationError = input => {
	const applicationBox = input.parentElement
	applicationBox.classList.remove('error')
}

const checkApplication = input => {
	input.forEach(el => {
		if (el.value === '') {
			showApplicationError(el, `you must ${el.placeholder}`)
		} else {
			clearApplicationError(el)
		}
	})
}

const checkLengthAndLetters = (input, min) => {
	const onlyLetters = /^[\s\p{L}]+$/u

	if (input.value.length < min) {
		showApplicationError(
			input,
			`${input.previousElementSibling.innerText.slice(0, -1)} must consist of at least ${min} letters.`
		)
	} else if (!onlyLetters.test(input.value)) {
		showApplicationError(input, `${input.previousElementSibling.innerText.slice(0, -1)} must consist only of letters.`)
	} else {
		clearApplicationError(input)
	}
}

const checkEmail = email => {
	const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	if (re.test(emailInput.value)) {
		clearApplicationError(email)
	} else {
		showApplicationError(email, `The given email is incorrect.`)
	}
}

const checkPhoneNumber = (input, min) => {
	const onlyNumbers = /^[0-9]+$/

	if (input.value.length < min) {
		showApplicationError(
			input,
			`${input.previousElementSibling.innerText.slice(0, -1)} number must consist of ${min} numbers (xxx xxx xxx)`
		)
	} else if (!onlyNumbers.test(input.value)) {
		showApplicationError(
			input,
			`${input.previousElementSibling.innerText.slice(0, -1)} number must consist only of numbers.`
		)
	} else {
		clearApplicationError(input)
	}
}

const checkAge = () => {
	const age = parseInt(ageInput.value, 10)

	if (isNaN(age)) {
		showApplicationError(ageInput, 'Please enter a valid age.')
	} else if (age < 18) {
		showApplicationError(ageInput, 'You must be at least 18 years old.')
	} else if (age >= 71) {
		showApplicationError(ageInput, 'Age cannot exceed 70 years.')
	} else {
		clearApplicationError(ageInput)
	}
}
const checkHeight = () => {
	const height = parseFloat(heightInput.value)

	if (isNaN(height)) {
		showApplicationError(heightInput, 'Please enter a valid height (for example 165 cm)')
	} else if (height < 160) {
		showApplicationError(heightInput, 'The height must be at least 160 cm.')
	} else if (height >= 201) {
		showApplicationError(heightInput, 'The height cannot exceed 200 cm.')
	} else {
		clearApplicationError(heightInput)
	}
}

const clearErrorClass = () => {
	inputBox.forEach(el => {
		el.classList.remove('error')
	})
}

const checkErrors = mailStatus => {
	const allInputs = document.querySelectorAll('.application__input-box')
	let errorCount = 0

	allInputs.forEach(el => {
		if (el.classList.contains('error')) {
			errorCount++
		}
	})

	const urlParams = new URLSearchParams(window.location.search)
	const queryMailStatus = urlParams.get('mail_status')

	if (mailStatus === 'sent' || queryMailStatus === 'sent') {
		popup.classList.add('application__pop-up--active')
		popupText.textContent = 'Your application has been sent! We will contact you as soon as possible. Thank You!'
		document.body.classList.add('lock-scroll')
	}

	if (mailStatus === 'error' || queryMailStatus === 'error' || errorCount > 0) {
		popup.classList.add('application__pop-up--active')
		popupText.textContent = 'Error! Your application has not been sent! Contact us at casting@nudyess.com !'
		document.body.classList.add('lock-scroll')
	}
}

const handleFormSubmission = async () => {
    const formData = createFormData();

    console.log('Dane formularza:', formData);

    const options = {
        method: 'POST',
        body: formData,
    };

    try {
        const response = await fetch('./mailTwo.php', options);
        const data = await response.json(); // Oczekuj odpowiedzi w formie JSON

        console.log('Odpowiedź serwera:', data);

        checkErrors(data.status);
    } catch (error) {
        console.error('Błąd podczas wysyłania formularza:', error);

        // Obsłuż błąd i poinformuj użytkownika
        checkErrors('error');
    }
};

sendFormBtn.addEventListener('click', e => {
	e.preventDefault()

	checkApplication([
		firstNameInput,
		emailInput,
		phoneInput,
		ageInput,
		heightInput,
		cityInput,
		instagramInput,
		uploadFiles,
	])

	checkLengthAndLetters(firstNameInput, 3)
	checkEmail(emailInput.value)
	checkPhoneNumber(phoneInput, 9)
	checkAge()
	checkHeight()
	checkLengthAndLetters(cityInput, 2)

	handleFormSubmission()
})

const scrollToTheTop = () => {
	window.scrollTo({ top: 0, behavior: 'smooth' })
}

const closeSentPopup = () => {
	document.body.classList.add('lock-scroll')
	popup.classList.remove('application__pop-up--active')
	scrollToTheTop()
	setTimeout(function () {
		location.reload()
	}, 800)
}

const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}

handleCurrentYear()
window.addEventListener('scroll', whiteningHeader)
burgerBtn.addEventListener('click', showMobileMenu)
closeMenuBtn.addEventListener('click', closeMobileMenu)
closePopupBtn.addEventListener('click', closeSentPopup)
