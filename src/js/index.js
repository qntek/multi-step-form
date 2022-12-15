import '../scss/style.scss';
import '../index.html';

let step = 1;
const user = {};
const btnNext = document.querySelector('.buttons-next');
const btnBack = document.querySelector('.buttons-back');
const stepTwoOptions = document.querySelector('.content-two-options');

btnNext.addEventListener('click', btnNextHandler);
btnBack.addEventListener('click', btnBackHandler);
stepTwoOptions.addEventListener('click', (e) => stepTwoSelectPlanHandler(e));

function btnNextHandler() {
	switch (step) {
		case 1:
			let name = nameValidate();
			let email = emailValidate();
			let phone = phoneValidate();
			if (name && email && phone) {
				step = 2;
				btnBack.classList.remove('invisible');
				document.getElementById('content-one').classList.add('off');
				document.getElementById('content-two').classList.remove('off');
			} else {
				step = 1;
				btnBack.classList.add('invisible');
			}
			break;
	}
}
// form first step logic start here:
function btnBackHandler() {
	switch (step) {
		case 2:
			step--;
			btnBack.classList.add('invisible');
			document.getElementById('content-one').classList.remove('off');
			document.getElementById('content-two').classList.add('off');
			break;
	}
}

function nameValidate() {
	const name = document.getElementById('user-name');
	const errorMsg = name.closest('div').querySelector('.error-name');
	const regName = /^[a-zA-Z]+ [a-zA-Z]+$/; // validates the name field if it's constructed with a two words made only from letters (with one space between).
	const regNameSingle = /^[a-zA-Z]+$/; // single word
	if (regName.test(name.value) || regNameSingle.test(name.value)) {
		errorMsg.classList.add('invisible');
		name.classList.remove('error-border');
		user.name = name.value.trim();
		return true;
	} else {
		errorMsg.classList.remove('invisible');
		name.classList.add('error-border');
		return false;
	}
}

function emailValidate() {
	const email = document.getElementById('user-email');
	const errorEmail = email.closest('div').querySelector('.error-mail');
	const regEmail =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	if (regEmail.test(email.value)) {
		errorEmail.classList.add('invisible');
		email.classList.remove('error-border');
		user.email = email.value.trim();
		return true;
	} else {
		errorEmail.classList.remove('invisible');
		email.classList.add('error-border');
		return false;
	}
}

function phoneValidate() {
	const phone = document.getElementById('user-phone');
	const errorPhone = phone.closest('div').querySelector('.error-phone');
	const countryCodeRegex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
	if (countryCodeRegex.test(phone.value)) {
		errorPhone.classList.add('invisible');
		phone.classList.remove('error-border');
		user.phone = phone.value.trim();
		return true;
	} else {
		errorPhone.classList.remove('invisible');
		phone.classList.add('error-border');
		return false;
	}
}
// form first step logic ends here

// form second step logic starts here
function stepTwoSelectPlanHandler(e) {
	const options = stepTwoOptions.querySelectorAll('.content-two-option');
	const clickedOption = e.target.closest('div.content-two-option');
	console.log(clickedOption);
	if (clickedOption) {
		options.forEach((option) => option.classList.remove('content-selected'));
		clickedOption.classList.add('content-selected');
	}
}
