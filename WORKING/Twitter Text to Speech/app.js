window.onload = init;
function init(){
	setTimeout(appInit,3000);
}

function strip(html){
	var tmp = document.createElement('DIV');
	tmp.innerHTML = html;
	return tmp.textContent||tmp.innerText;
}

function read(gid){
	var id = gid - 1000;
	var tweet = document.getElementById(id);
	var text = tweet.getElementsByClassName('tweet-text')[0];
	var contentP = strip(text.innerHTML);
	var content = contentP.replace('-','');
	var parts = content.replace(/ /gi,'+');
	var encodedP = escape(parts);
	var encoded = encodedP.slice(0,100);
	var url = 'http://translate.google.com/translate_tts?tl=en&q=' + encoded;
	console.log(url);
	chrome.extension.sendRequest({param: url}, function(response) {
    console.log(response.farewell);
    });
}

function appInit(){
	var tweetBox = document.getElementsByClassName("stream-items");
	var tweets;
	if(tweetBox.length > 0){
		tweets = tweetBox[0].getElementsByClassName("stream-item");
	}
	for(var i=0;i<tweets.length;i++){
		var tweet = tweets[i];
		var tweetId = i;
		tweet.setAttribute('id',i);
		var place = tweet.getElementsByClassName("tweet-user-name");
		var link = document.createElement("a");
		var callback = "read(" + tweetId + ");";
		link.setAttribute("id",1000+tweetId);
		link.setAttribute("href","#");
		link.innerHTML = "<img src='" + chrome.extension.getURL('speech.png') + "'>";
		link.addEventListener("click",function(){read(this.id);},false);
		place[0].appendChild(link);
	}
}
