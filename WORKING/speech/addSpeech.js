window.onload = addSpeech;
window.onunload = addSpeech;
document.addEventListener("DOMContentLoaded",addSpeech, false );

function addSpeech(){
	var textinputs = document.getElementsByTagName("input");
	for(var i=0;i<textinputs.length;i++){
		if(textinputs[i].type == "text"){
			textinputs[i].setAttribute('x-webkit-speech');
		}
	}
}


