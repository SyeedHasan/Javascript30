//Template literals
//Arrow functions
//---

function playSound(e){
	const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
	const key = document.querySelector(`.key[data-key="${e.keyCode}"]`)

	//Stop the function from running on non-existing keys
	if(!audio){
		return ;
	}

	//Set the currentTime to Zero when the key is pressed mutliple times
	audio.currentTime = 0;
	audio.play();

	key.classList.add('playing');
	// key.addClass('playing') jQuery

}

function removeTransition(e){
	//Because we loop through all,
	//Not every key has this property
	//6 properties but 'transform' is the main one
	if(e.propertyName !== 'transform')
		return; //Skip it if it isn't transform

	//Refers to the calling object ie 'key'
	this.classList.remove('playing');

}

// Select all keys
const keys = document.querySelectorAll(".key");
//Returns a node list

//Add listeners
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

//Listening for key presses in Window
window.addEventListener('keydown', playSound);