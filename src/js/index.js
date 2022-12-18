import '../scss/style.scss';
import '../index.html';

let step = 1;
const user = {
	name: '',
	email: '',
	phone: '',
	period: 'mo',
	plans: {
		// place to store prices, so this is the only place that needs to be updated if price changes
		// month period
		arcade: '9',
		advanced: '12',
		pro: '15',
	},
	addons: {
		// same as plans section
		// month period
		onlineService: 1,
		largerStorage: 2,
		customizableProfile: 2,
	},
	selectedPlan: 'arcade',
	selectedAddons: [],
	totalPaid: 0,
};

const btnNext = document.querySelector('.buttons-next');
const btnBack = document.querySelector('.buttons-back');
const progressBar = document.querySelectorAll('.progress-step');
const stepTwoOptions = document.querySelector('.content-two-options');

btnNext.addEventListener('click', btnNextHandler);
btnBack.addEventListener('click', btnBackHandler);
stepTwoOptions.addEventListener('click', (e) => stepTwoSelectPlanHandler(e));

async function btnNextHandler() {
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
			settingListenersForAddonsInThirdStep();
			break;
		case 3:
			step = 4;
			document.getElementById('content-three').classList.add('off');
			document.getElementById('content-four').classList.remove('off');
			progressAdjust();
			summaryGenerator();
			btnNext.style.backgroundColor = 'hsl(243, 100%, 62%)';
			btnNext.textContent = 'Confirm';
			break;
		case 4:
			document.getElementById('content-four').classList.add('off');
			document.getElementById('content-five').classList.remove('off');
			btnNext.classList.add('off');
			btnBack.classList.add('off');
			await pageReload();
			window.location.reload();
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
			break;
		case 4:
			step = 3;
			document.getElementById('content-three').classList.remove('off');
			document.getElementById('content-four').classList.add('off');
			progressAdjust();
			btnNext.textContent = 'Next Step';
			btnNext.style.backgroundColor = '';
			break;
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
	if (
		(regName.test(name.value) || regNameSingle.test(name.value)) &&
		name.value.length >= 5
	) {
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
	const regEmail = new RegExp(
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
		'gm'
	);
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
		options.forEach((option) => option.classList.remove('content-selected'));
		clickedOption.classList.add('content-selected');
		user.selectedPlan = clickedOption
			.querySelector('h3')
			.textContent.toLowerCase();
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
		const toggleMo = document.getElementById('toggle-mo');
		const toggleYr = document.getElementById('toggle-yr');
		stepTwoToggle.checked ? (user.period = 'yr') : (user.period = 'mo');

		document
			.querySelectorAll('.mo-yr')
			.forEach((p) => (p.textContent = user.period));
		document
			.getElementById('content-three')
			.querySelectorAll('.mo-yr')
			.forEach((p) => (p.textContent = user.period));
		if (user.period == 'mo') {
			planNoOne.textContent = user.plans.arcade;
			planNoTwo.textContent = user.plans.advanced;
			planNoThree.textContent = user.plans.pro;
			addonOne.textContent = user.addons.onlineService;
			addonTwo.textContent = user.addons.largerStorage;
			addonThree.textContent = user.addons.customizableProfile;
			toggleYr.classList.remove('toggle-active');
			toggleMo.classList.add('toggle-active');
		} else {
			planNoOne.textContent = +user.plans.arcade * 10;
			planNoTwo.textContent = +user.plans.advanced * 10;
			planNoThree.textContent = +user.plans.pro * 10;
			addonOne.textContent = +user.addons.onlineService * 10;
			addonTwo.textContent = +user.addons.largerStorage * 10;
			addonThree.textContent = +user.addons.customizableProfile * 10;
			toggleYr.classList.add('toggle-active');
			toggleMo.classList.remove('toggle-active');
		}
	}
}
// form second step logic ends here

// form third step logic starts here

function settingListenersForAddonsInThirdStep() {
	const addons = document.querySelectorAll('.content-three-option');

	addons.forEach((addon) => {
		addon.addEventListener('click', (event) => {
			event.stopPropagation();
			let option = addon.querySelector('input');
			if (option.checked) {
				option.checked = false;
				addon.closest('.content-three-option').style.borderColor = '';
				if (user.selectedAddons.indexOf(option.id) !== -1) {
					user.selectedAddons.splice(user.selectedAddons.indexOf(option.id), 1);
				}
			} else {
				option.checked = true;
				addon.closest('.content-three-option').style.borderColor = 'hsl(243, 100%, 62%)';
				if (user.selectedAddons.indexOf(option.id) === -1) {
					// because of the bubbling, Array.push section launches two times when clicked directly on input checkbox. I didn't find solution to this problem (thot that event.stopPropagation() will help, but no) so for now I just test if element's id is already in array.
					user.selectedAddons.push(option.id);
				}
			}
		});
	});
}

// form third step logic ends here

// form fourth step logic starts here

function summaryGenerator() {
	const changePlanBtn = document.getElementById('step-four-change-plan');
	changePlanBtn.addEventListener('click', goBackToChangePlan);
	summaryPlanDetailsGenerator();
	summaryAddonListGenerator();
	summaryTotalPrice();
}

function goBackToChangePlan() {
	document.getElementById('content-four').classList.add('off');
	document.getElementById('content-two').classList.remove('off');
	step = 2;
	progressAdjust();
	btnNext.textContent = 'Next Step';
	btnNext.style.backgroundColor = '';
}

function summaryPlanDetailsGenerator() {
	let planPrice = document.getElementById('step-four-plan-price');
	let planName =
		user.selectedPlan.slice(0, 1).toUpperCase() +
		user.selectedPlan.slice(1).toLowerCase();
	document.getElementById('step-four-plan').textContent = planName;

	if (user.period === 'mo') {
		document.getElementById('step-four-period').textContent = 'Monthly';
		document.getElementById(
			'step-four-plan-price'
		).nextElementSibling.textContent = 'mo';
	} else {
		document.getElementById('step-four-period').textContent = 'Yearly';
		document.getElementById(
			'step-four-plan-price'
		).nextElementSibling.textContent = 'yr';
	}
	if (user.period == 'mo') {
		planPrice.textContent = user.plans[user.selectedPlan];
	} else {
		planPrice.textContent = +user.plans[user.selectedPlan] * 10;
	}
}

function summaryAddonListGenerator() {
	const addonsList = document.querySelector('.content-four-addons-container');
	addonsList.innerHTML = '';
	user.totalPaid = +user.plans[user.selectedPlan]; // when user go back and change plan or addons, totalPaid has to be recalculated.
	if (user.period == 'yr') {
		user.totalPaid *= 10;
	}
	if (user.selectedAddons.length > 0) {
		for (let i = 0; i < user.selectedAddons.length; i++) {
			summaryAddonListElementGenerator(i);
		}
	}
}

function summaryAddonListElementGenerator(n) {
	const addonsList = document.querySelector('.content-four-addons-container');
	const addonName = document.createElement('div');
	const addonPrice = document.createElement('div');

	let name = document
		.getElementById(user.selectedAddons[n])
		.closest('.content-three-option')
		.querySelector('h3').textContent;
	let price = user.addons[user.selectedAddons[n]];
	if (user.period === 'yr') price = +price * 10;
	user.totalPaid += +price;
	addonName.setAttribute('class', 'content-four-addon-name');
	addonName.innerHTML = `
	<p><span class="text"></span></p>
	`;
	addonsList.appendChild(addonName);
	addonName.querySelector('.text').textContent = `${name}`;

	addonPrice.setAttribute('class', 'content-four-addon-price');
	addonPrice.innerHTML = `
	<p>+$<span class="step-four-addon-price"></span>/<span class="mo-yr"></span></p>
	`;
	addonsList.appendChild(addonPrice);
	addonPrice.querySelector('.step-four-addon-price').textContent = price;
	addonPrice.querySelector('.mo-yr').textContent = user.period;
}

function summaryTotalPrice() {
	const period = document.getElementById('step-four-total-period');
	const price = document.getElementById('content-four-total-price');

	if (user.period == 'mo') {
		period.textContent = 'month';
	} else period.textContent = 'year';
	price.textContent = user.totalPaid;
}
// form fourth step logic ends here

async function pageReload() {
	return new Promise((resolve) => {
		setTimeout(resolve, 5000);
	});
}
