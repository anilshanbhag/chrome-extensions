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


chrome.history.onVisited.addListener(
    function (result) {
        var safeMode = new SafeMode( );
        console.log(result);
        if (safeMode.check( result )) {
            safeMode.deleteUrl( result.url );
        }
    }
);
