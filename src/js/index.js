import '../scss/style.scss';
import '../index.html';

let step = 1;
const user = {
	name: '',
	email: '',
	phone: '',
	period: 'mo',
	plan: '',
	plans: {
		// month period
		Arcade: '9',
		Advanced: '12',
		Pro: '15',
	},
	addons: {
		// month period
		onlineService: 1,
		largerStorage: 2,
		customizableProfile: 2,
	},
};
const btnNext = document.querySelector('.buttons-next');
const btnBack = document.querySelector('.buttons-back');
const progressBar = document.querySelectorAll('.progress-step');
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
				progressAdjust();
			} else {
				step = 1;
				btnBack.classList.add('invisible');
				progressAdjust();
			}
			break;
		case 2:
			step = 3;
			document.getElementById('content-two').classList.add('off');
			document.getElementById('content-three').classList.remove('off');
			progressAdjust();
			break;
	}
}

function btnBackHandler() {
	switch (step) {
		case 2:
			step = 1;
			btnBack.classList.add('invisible');
			document.getElementById('content-one').classList.remove('off');
			document.getElementById('content-two').classList.add('off');
			progressAdjust();
			break;
		case 3:
			step = 2;
			document.getElementById('content-two').classList.remove('off');
			document.getElementById('content-three').classList.add('off');
			progressAdjust();
	}
}
function progressAdjust() {
	progressBar.forEach((progressIcon) => {
		progressIcon.classList.remove('progress-active');
	});
	progressBar[step - 1].classList.add('progress-active');
}
// form first step logic start here:
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
	e.stopPropagation();
	if (clickedOption) {
		if (clickedOption.classList.contains('content-selected')) {
			clickedOption.classList.remove('content-selected');
			user.plan = '';
			return;
		}
		options.forEach((option) => option.classList.remove('content-selected'));
		clickedOption.classList.add('content-selected');
		user.plan = clickedOption.querySelector('h3').textContent;
	}
	selectPeriod(e);
}

function selectPeriod(e) {
	if (e.target.classList.contains('toggle-checkbox')) {
		const stepTwoToggle = document.getElementById('toggle-checkbox');
		const planNoOne = document.getElementById('step-two-one-price');
		const planNoTwo = document.getElementById('step-two-two-price');
		const planNoThree = document.getElementById('step-two-three-price');
		const addonOne = document.getElementById('step-three-one-price');
		const addonTwo = document.getElementById('step-three-two-price');
		const addonThree = document.getElementById('step-three-three-price');
		stepTwoToggle.checked ? (user.period = 'yr') : (user.period = 'mo');

		document
			.querySelectorAll('.mo-yr')
			.forEach((p) => (p.textContent = user.period));
		document
			.getElementById('content-three')
			.querySelectorAll('.mo-yr')
			.forEach((p) => (p.textContent = user.period));
		if (user.period == 'mo') {
			planNoOne.textContent = user.plans.Arcade;
			planNoTwo.textContent = user.plans.Advanced;
			planNoThree.textContent = user.plans.Pro;
			addonOne.textContent = user.addons.onlineService;
			addonTwo.textContent = user.addons.largerStorage;
			addonThree.textContent = user.addons.customizableProfile;
		} else {
			planNoOne.textContent = +user.plans.Arcade * 10;
			planNoTwo.textContent = +user.plans.Advanced * 10;
			planNoThree.textContent = +user.plans.Pro * 10;
			addonOne.textContent = +user.addons.onlineService * 10;
			addonTwo.textContent = +user.addons.largerStorage * 10;
			addonThree.textContent = +user.addons.customizableProfile * 10;
		}
	}
}
