function queryChromeStorageData(){
    chrome.storage.sync.get('confluenceNotifyWatchers',
        function(data){
            if(data !== null){
                $('input[name="myRadio"][value="' + data.confluenceNotifyWatchers + '"]').prop('checked', true);
                $("#editPageLink").click(function(){
                    console.log(data.confluenceNotifyWatchers);
                    if (data.confluenceNotifyWatchers === 'Notify'){
                        $("#notifyWatchers").attr("checked", true);
                    }else{
                        $("#notifyWatchers").attr("checked", false);
                    }
                });
            }else{
                $('input[name="myRadio"][value="DonotNotify"]').prop('checked', true);
                saveChanges();
                $("#editPageLink").click(function(){
                    $("#notifyWatchers").attr("checked", false)});
            }
        }
    );

}

function saveChanges() {
    // Get a value saved in a form.
    var theValue = $('input[name="myRadio"]:checked').val();
    // Check that there's some code there.
    if (!theValue) {
        alert('Error: No value specified');
        return;
    }
    // Save it using the Chrome extension storage API.
    chrome.storage.sync.set({'confluenceNotifyWatchers': theValue}, function() {
        // Notify that we saved.
        console.log('Settings saved: ' + theValue);
    });

    tryTorestartChrome();
}


function tryTorestartChrome(){
    chrome.storage.sync.get({
        confirmRestart: true
    }, function(key) {
        try{
            var RestartURI = "chrome://restart";
            if (key.confirmRestart === true){
                if (confirm("Changes will take effect after restarting Chrome. \nDo you want to restart Chrome?")){
                    chrome.tabs.create({ url: RestartURI });
                }
            }else{
//                chrome.tabs.create({ url: RestartURI });
            }
        }catch (e){
            alert("An error was encountered while attempting to restart browser! " + e);
        }

    });
}

///////// INIT /////////////
$(document).ready(function() {
    $('#myForm input').on('change', function() {
        saveChanges();
    });

    queryChromeStorageData();
});
