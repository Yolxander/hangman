const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];


// Show hidden word
function displayWord() {
	wordEl.innerHTML = `
    ${selectedWord
			.split('')
			.map(
				(letter) => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
			)
			.join('')}
  `;

	const innerWord = wordEl.innerText.replace(/\n/g, '');

	if (innerWord === selectedWord && selectedWord != '') {
		finalMessage.innerText = 'Congratulations! You won! 😃';
		popup.style.display = 'flex';
	}
}

// Update the wrong letters
function updateWrongLettersEl() {
	// Display wrong letters
	wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

	// Display parts
	figureParts.forEach((part, index) => {
		const errors = wrongLetters.length;

		if (index < errors) {
			part.style.display = 'block';
		} else {
			part.style.display = 'none';
		}
	});

	// Check if lost
	if (wrongLetters.length === figureParts.length) {
		finalMessage.innerText = 'Unfortunately you lost. 😕';
		popup.style.display = 'flex';
	}
}

// Show notification
function showNotification() {
	notification.classList.add('show');

	setTimeout(() => {
		notification.classList.remove('show');
	}, 2000);
}

function keyEvent(e) {
	// console.log(e.keyCode);
	if (e.keyCode >= 65 && e.keyCode <= 90) {
		const letter = e.key;

		if (selectedWord.includes(letter)) {
			if (!correctLetters.includes(letter)) {
				correctLetters.push(letter);

				displayWord();
			} else {
				showNotification();
			}
		} else {
			if (!wrongLetters.includes(letter)) {
				wrongLetters.push(letter);

				updateWrongLettersEl();
			} else {
				showNotification();
			}
		}
	}
}
// Keydown letter pres
window.addEventListener('keydown', keyEvent);

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
	//  Empty arrays
	correctLetters.splice(0);
	wrongLetters.splice(0);

	selectedWord = words[Math.floor(Math.random() * words.length)];

	displayWord();

	updateWrongLettersEl();

	popup.style.display = 'none';
});

displayWord();


function removeHandler() {
	window.removeEventListener('keydown', keyEvent);
}

document.getElementById('example').addEventListener('focus', function () {
	removeHandler();
});

function NewWord() {
	var x = document.getElementById('frm1');
	var newword = '';
	var i;
	for (i = 0; i < x.length; i++) {
		newword += x.elements[i].value;
	}
  return selectedWord = newword;
}

function resetValue(){
  var x = document.getElementById('example')
  x.value = ''
}

// inserting word on click
document.getElementById('insertWord').addEventListener('click', function () {
  NewWord()
  displayWord();
  window.addEventListener('keydown', keyEvent);
  resetValue()
});

//inserting word with submit 
window.addEventListener("submit", function(evt) {
  NewWord()
  displayWord();
  resetValue()
  window.addEventListener('keydown', keyEvent);
  evt.preventDefault();
}, true);
