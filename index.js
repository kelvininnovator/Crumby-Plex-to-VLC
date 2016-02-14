var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");



const { Cc, Ci, Cu } = require('chrome');


var button = buttons.ActionButton({
  id: "vlc-plex-link",
  label: "Plex to VLC",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});





function handleClick(state) {


//Linux Checkbox
var isLinux = require("sdk/simple-prefs").prefs.crumblyLinuxOption;
console.log("Linux options is: "+isLinux);






	var mainVideoFile ="";

	var tab = require("sdk/tabs").activeTab.attach({
  contentScript: "self.postMessage(document.body.querySelector('.download-btn.secondary-only').href);",
  
  onMessage: function(data)
  {
  
	mainVideoFile=data+"";
    console.log("Tab data received: " + data);
		console.log("Main video file at selector find: " + mainVideoFile)
		
			var exeFile = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
			
		

		if (isLinux==true){
			console.log("True up in here");
			exeFile.initWithPath("/usr/bin/vlc");
			
			}	else {
			console.log("False up in here");
			exeFile.initWithPath("C:\\Program Files (x86)\\VideoLAN\\VLC\\vlc.exe");
			}
			
	//exeFile.initWithPath("C:\\Program Files (x86)\\VideoLAN\\VLC\\vlc.exe");
	//var parameter="http://192.168.0.20:32400/library/parts/3471/file.avi?stripTags=0";
	
	console.log("Main video file at VLC: " + mainVideoFile);
	
	if(exeFile.exists()){
		var process = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);  
		process.init(exeFile);
		process.run(false,[mainVideoFile],1);
}
  }
});

}