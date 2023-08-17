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
    element = document.getElementById('phone-input');
    element.addEventListener('keydown', function(event) {
        if (event.key != 'Backspace' && (element.value.length === 3 || element.value.length === 7)){
            element.value += '-';
        }
    });

    setInputFilter(element, function(value) {
        return /^\d{0,3}\-{0,1}\d{0,3}\-{0,1}\d{0,4}$/.test(value);
    });
}

// https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input
function setInputFilter(textbox, inputFilter) {
    [ 'input', 'keydown', 'keyup', 'mousedown', 'mouseup', 'select', 'contextmenu', 'drop', 'focusout' ].forEach(function(event) {
        textbox.addEventListener(event, function(e) {
            if (inputFilter(this.value)) {
                // Accepted value.
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty('oldValue')) {
                // Rejected value: restore the previous one.
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                // Rejected value: nothing to restore.
                this.value = '';
            }
        });
    });
} 

function onSendContactUs() {
    const url = `${ROOT_URL}/api/contact-us`;
    const data = {
        name: 'John Doe',
        email: 'johndoe@example.com'
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