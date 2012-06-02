window.onload = init;
    
function init(){
   	document.getElementById("manager").onclick = openPage;
   	chrome.tabs.getSelected(null,getCurrentTabURL);
}

function openPage(){
  	chrome.tabs.create({url:"history.html"});
}
    
function getCurrentTabURL(currentTab){
	//document.write(currentTab.url);
	document.getElementById("url").innerHTML += currentTab.url;
	chrome.history.getVisits({
      'url': currentTab.url             
    }, 
    function(visitItems){
    	document.getElementById("visitCount").innerHTML = visitItems.length;
		if(visitItems.length == 1){document.getElementById("lastVisit").innerHTML = "This is the first visit";}
		else if(visitItems.length > 1){visittime = new Date(parseInt(visitItems[visitItems.length-2].visitTime)) ; 
			document.getElementById("lastVisit").innerHTML = visittime;}
		else {document.getElementById("lastVisit").innerHTML = "No recorded history";}
	})

}
