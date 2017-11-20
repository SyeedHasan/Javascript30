//Get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//Build out functions
function togglePlay(){
	if(video.paused) //Paused, play it.
		video.play();
	else  // Playing, pause it.
		video.pause();

}

//Change the play/pause icon
function updateButton(){
	//'this' refers to the video or called
	const icon = this.paused ? '►' : '❚ ❚';
	//toggle is the play/pause button
	toggle.textContent = icon;
}

//How much the video is to be skipped
function skip(){
	//'dataset' is the object returned with skip property
	// console.log(this.dataset.skip);
	video.currentTime += parseFloat(this.dataset.skip);
}

//Playback range handler
function handleRangeUpdate(){
	//this refers to the ranges
	//name - Returns either the volume or the playback rate
	//value - Updated to the next changed value
	video[this.name] = this.value;
}

//Change the progress bar of the video
function handleProgress(){
	//Handled in percentages
	const percent = (video.currentTime/video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

//Handles the progress bar updates
function scrub(e){
	//OffsetX- Relative position on the X axis on click
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;

	video.currentTime = scrubTime;
}

//Hook up event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => 
	range.addEventListener('change', handleRangeUpdate));

let mouseDown = false;

progress.addEventListener('click', scrub);
//If only mouseDown is true, it calls scrub
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);
