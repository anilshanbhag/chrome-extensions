function SafeMode ( ) {
    this.store = JSON.parse(localStorage["safeMode"]) || [];
    localStorage["safeMode"] = JSON.stringify(this.store);
}
// TODO : Check how to check array for this.store
SafeMode.prototype = {
    check : function (currentTab) {
        for (i in this.store) {
            if (RegExp( this.store[i] ).test(currentTab.url)) {
                return true;
            }
        }
        return false;
    },

    status : function (tab) {
        if (this.check(tab)) return "ON";
        return "OFF";
    },

    add : function ( r ) {
        var isP = false;
        for (i in this.store)
            if (this.store[i] == r) {
                isP = true; break;
            }

        if ( !isP ) {
            this.store.push(r);
            this.sync();
        }
    },

    delete : function ( r ) {
        this.store.remove(r);
    },

    sync : function ( ) {
        localStorage["safeMode"] = JSON.stringify(this.store);
    },

    getEntries : function ( ) {
        return this.store;
    },

    deleteUrl : function ( url ) {
        console.log ( "deleting " + url );
        chrome.history.deleteUrl( { "url" : url } );
    }
}

window.onload = init;
var safeMode = new SafeMode( );

function init(){
    chrome.tabs.getSelected(null,getCurrentTabURL);
    var entries = document.getElementById("entries");
    for ( i in safeMode.store ) {
        entries.innerHTML = "<div class='entry'>" + safeMode.store[i] + "</div>" + entries.innerHTML;
    }
}

function getCurrentTabURL(currentTab){
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
    document.getElementById("safeModeStatus").innerHTML = safeMode.status(currentTab);
}

function formHandler( ) {
    console.log(document.getElementById("regex").value);
    safeMode.add( document.getElementById("regex").value );
    return false;
}
