
//Listening for key presses in Window
window.addEventListener('keydown', function(event){
	const audio = document.querySelector('audio[data-key="${e.keyCode}"]')

	if(!audio)
		return //Stop the function from running on non-existing keys

	audio.play()


}) 