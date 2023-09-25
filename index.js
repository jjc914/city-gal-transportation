const ROOT_URL = 'https://city-gal-transportation.vercel.app';
var navOpen = false;

function toggleNav() {
    if (!navOpen) {
        document.getElementById('nav-overlay').style.height = '100%';
        document.body.style.height = '100%';
        document.body.style.overflowY = 'hidden';
        document.getElementById('nav-overlay').style.paddingTop = '100px';

    } else {
        document.getElementById('nav-overlay').style.height = '0%';
        document.body.style.height = null;
        document.body.style.overflowY = null;
        document.getElementById('nav-overlay').style.paddingTop = '0px';
    }

    Array.prototype.slice.call(document.getElementById('hamburger-nav').children).forEach(element => {
        if (element.classList.contains('hidden')) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    });
    navOpen = !navOpen;
}

window.onload = function() {
    phoneForm = document.getElementById('phone-form');
    phoneForm.addEventListener('input', () => {
        onPhoneInput(phoneForm);
    });
}

var lastPhone = '';
function onPhoneInput(e) {
    const phoneDigits = e.value.replace(/\D/g, '');
    e.value = formatPhone(phoneDigits);
    lastPhone = e.value;
}

function formatPhone(digits) {
    if (digits.length < 1) {
        return '';
    } else if (digits.length < 3) {
        return '(' + digits;
    } else if (digits.length < 6) {
        return '(' + digits.slice(0, 3) + ') ' + digits.slice(3);
    } else if (digits.length < 11) {
        return '(' + digits.slice(0, 3) + ') ' + digits.slice(3, 6) + '-' + digits.slice(6);
    }
    return '(' + digits.slice(0, 3) + ') ' + digits.slice(3, 6) + '-' + digits.slice(6, 10);
}

function getContactUsFormStatus() {
    let forms = [];

    const firstNameForm = document.getElementById('first-name-form');
    const lastNameForm = document.getElementById('last-name-form');
    const phoneForm = document.getElementById('phone-form');
    const emailForm = document.getElementById('email-form');
    const pickUpForm = document.getElementById('pick-up-form');
    const dropOffForm = document.getElementById('drop-off-form');
    const flightForm = document.getElementById('flight-form');
    const commentsForm = document.getElementById('comments-form');

    if (firstNameForm.value.trim() === '') {
        forms.push({
            'passed': false,
            'form': firstNameForm,
            'reason': 'empty'
        });
    } else {
        forms.push({
            'passed': true,
            'form': firstNameForm
        });
    }
    if (lastNameForm.value.trim() === '') {
        forms.push({
            'passed': false,
            'form': lastNameForm,
            'reason': 'empty'
        });
    } else {
        forms.push({
            'passed': true,
            'form': lastNameForm
        });
    }
    if (phoneForm.value.trim() === '') {
        forms.push({
            'passed': false,
            'form': phoneForm,
            'reason': 'empty',
            'errorText': document.getElementById('phone-incomplete-error')
        });
    } else if (phoneForm.value.trim().length != 14) {
        forms.push({
            'passed': false,
            'form': phoneForm,
            'reason': 'incomplete',
            'errorText': document.getElementById('phone-incomplete-error')
        });
    } else {
        forms.push({
            'passed': true,
            'form': phoneForm,
            'errorText': document.getElementById('phone-incomplete-error')
        });
    }
    if (emailForm.value.trim() === '') {
        forms.push({
            'passed': false,
            'form': emailForm,
            'reason': 'empty',
            'errorText': document.getElementById('email-incomplete-error')
        });
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailForm.value)) {
        forms.push({
            'passed': false,
            'form': emailForm,
            'reason': 'incomplete',
            'errorText': document.getElementById('email-incomplete-error')
        });
    } else {
        forms.push({
            'passed': true,
            'form': emailForm,
            'errorText': document.getElementById('email-incomplete-error')
        });
    }
    if (pickUpForm.value.trim() === '') {
        forms.push({
            'passed': false,
            'form': pickUpForm,
            'reason': 'empty'
        });
    } else {
        forms.push({
            'passed': true,
            'form': pickUpForm
        });
    }
    if (dropOffForm.value.trim() === '') {
        forms.push({
            'passed': false,
            'form': dropOffForm,
            'reason': 'empty'
        });
    } else {
        forms.push({
            'passed': true,
            'form': dropOffForm
        });
    }
    forms.push({
        'passed': true,
        'form': flightForm
    });
    forms.push({
        'passed': true,
        'form': commentsForm
    });
    
    return forms;
}

function onSendContactUs() {
    const requiredFormsError = document.getElementById('required-forms-error');

    let hasEmpty = false;
    let hasPassed = true;
    getContactUsFormStatus().forEach((status) => {
        if (status.passed) {
            status.form.classList.remove('incomplete-form');
            status.errorText?.classList.add('hidden');
        } else {
            status.form.classList.add('incomplete-form');
            hasPassed = false;
        }
        if (status.reason === 'empty') {
            requiredFormsError.classList.remove('hidden');
            hasEmpty = true;
        }
        if (status.reason === 'incomplete') {
            status.errorText.classList.remove('hidden');
        }
    });
    if (!hasEmpty) {
        requiredFormsError.classList.add('hidden');
    }
    if (!hasPassed) return;

    document.getElementById('contact-submit-button').classList.add('disabled');
    document.getElementById('contact-loader').classList.remove('hidden');

    const url = `${ROOT_URL}/api/contact-us`;
    const data = {
        'first-name': document.getElementById('first-name-form').value.trim(),
        'last-name': document.getElementById('last-name-form').value.trim(),
        'phone-number': document.getElementById('phone-form').value.trim(),
        'email': document.getElementById('email-form').value.trim(),
        'pick-up': document.getElementById('pick-up-form').value.trim(),
        'drop-off': document.getElementById('drop-off-form').value.trim(),
        'flight': document.getElementById('airline-form').value.trim() + ' ' + document.getElementById('flight-form').value.trim(),
        'is-rideshare': document.getElementById('rideshare-checkbox').checked,
        'body': document.getElementById('comments-form').value.trim()
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(responseData => {
        console.log('Response:', responseData);
        document.getElementById('contact-submit-button').classList.remove('disabled');
        document.getElementById('contact-loader').classList.add('hidden');
        alert('An email has been sent. Thanks for reaching out!');
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('contact-submit-button').classList.remove('disabled');
        document.getElementById('contact-loader').classList.add('hidden');
        alert('An error has occurred. Please try again.');
    });
}