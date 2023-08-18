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

function onSendContactUs() {
    console.log("aa");
    const url = `${ROOT_URL}/api/contact-us`;
    const data = {
        'first-name': document.getElementById('first-name-form').value,
        'last-name': document.getElementById('last-name-form').value,
        'phone-number': document.getElementById('phone-form').value,
        'email': document.getElementById('email-form').value,
        'pick-up': document.getElementById('pick-up-form').value,
        'drop-off': document.getElementById('drop-off-form').value,
        'flight': document.getElementById('flight-form').value,
        'isRideshare': document.getElementById('rideshare-checkbox').value,
        'body': ''
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
    })
    .catch(error => {
        console.error('Error:', error);
    });
}