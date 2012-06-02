var lFrame = frames[0].document,
	rFrame = frames[1].document;

// Left Frame
var lStyles = document.createElement('style'),	
	lBody = '.body{color:#EEE;font-family:arial,sans-serif;background:#000;} ',
	lLink = '.a{color:#EEE!important;font-weight:bold;} ',
	lFont = '.font{color:#EEE} ';
lStyles.innerHTML = lBody + lLink + lFont;
lFrame.body.appendChild(lStyles);
// Body
lFrame.body.setAttribute('class','body');
// Rest
var sets = ['a','font'];
for(i in sets){
	var elements = lFrame.querySelectorAll(sets[i]);
	for(j in elements){
		elements[j].setAttribute('class',sets[i]);
	}
}

// Right Frame
var rStyles = document.createElement('style'),
	rButton = ".rbutton{-webkit-border-radius:2px;color:#ccc;font-size:11px;font-weight:bold;padding:8px;width:72px;height:29px;background-color:#000}",
	rSelect = ".rselect{-webkit-border-radius:2px;color:#ccc;font-size:11px;font-weight:bold;padding:8px;width:105px;height:29px;background-color:#000}";
// Buttons
var rButtons = rFrame.querySelectorAll('input[type="SUBMIT"]'),
	rSelects = rFrame.querySelectorAll('select');
for(i in rButtons){rButtons[i].setAttribute('class','rbutton');}
for(i in rSelects){rSelects[i].setAttribute('class','rselect');}
