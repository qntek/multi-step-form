import '../scss/style.scss';
import '../index.html';

let step = 1;
const btnNext = document.querySelector('.buttons-next');
const btnBack = document.querySelector('.buttons-back');

btnNext.addEventListener('click', btnNextHandler);
btnBack.addEventListener('click', btnBackHandler);

function btnNextHandler() {
	switch (step) {
		case 1:
			let name = stepOneNameValidate();
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
			name, email, (phone = null);
			break;
	}
}

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

function stepOneNameValidate() {
	const name = document.getElementById('user-name');
	const errorMsg = name.closest('div').querySelector('.error-name');
	const regName = /^[a-zA-Z]+ [a-zA-Z]+$/; // validates the name field if it's constructed with a two words made only from letters (with one space between).
	const regNameSingle = /^[a-zA-Z]+$/; // single word
	if (regName.test(name.value) || regNameSingle.test(name.value)) {
		errorMsg.classList.add('invisible');
		name.classList.remove('error-border');
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
		return true;
	} else {
		errorPhone.classList.remove('invisible');
		phone.classList.add('error-border');
		return false;
	}
}
