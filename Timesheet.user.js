// ==UserScript==
// @name		TimeSheet reminders
// @author		James Clare
// @namespace		https://github.com/bluecombats/MediaCom/
// @updateURL		https://github.com/bluecombats/MediaCom/raw/master/Timesheet.user.js
// @downloadURL		https://github.com/bluecombats/MediaCom/raw/master/Timesheet.user.js
// @supportURL		https://github.com/bluecombats/MediaCom/issues
// @run-at		document-end
// @description		Sends notifications from the timesheet website at set time to remind to enter in work.
// @icon      		https://pub-resource-viewport.mediaocean.com/viewport/branding/rodick/2020.1.2/images/favicon.ico
// @grant		none
// @include		https://groupmuk-aura.mediaocean.com/*
// @include		http*groupmuk-aura.mediaocean.com/*
// @version		0.6
// ==/UserScript==
//https://www.tampermonkey.net/documentation.php?version=4.9&ext=dhdg
Notification.requestPermission().then(function(result) {
	if (result === 'denied') {
		console.log('Permission wasn\'t granted. Allow a retry.');
		return;
	}
	if (result === 'default') {
		console.log('The permission request was dismissed.');
		return;
	}
	//set reminders times here
	var reminderTimes=["17:20","15:50"];
	var MyVar=setInterval(function(){
		//get current time
		var d,h,m,s;
		d=new Date();
		h=d.getHours();
		m=d.getMinutes();
		s=d.getSeconds();
		var i=0;
		while(i<reminderTimes.length){
			var sh,sm;
			sh=reminderTimes[i].substring(0,reminderTimes[i].indexOf(":"));
			//console.log("hour:"+sh);
			sh=Number(sh);
			sm=reminderTimes[i].substring(reminderTimes[i].indexOf(":")+1,reminderTimes[i].length);
			//console.log("minute:"+sm);
			sm=Number(sm);
			//console.log(sh+":"+sm);
			if(sh == h && sm == m){
				var title="Aura Timesheet";
				var options ={
					renotify:true
					,requireInteraction: true
					,tag:sh+":"+sm
					,body:"https://groupmuk-aura.mediaocean.com/"
					,icon:"https://pub-resource-viewport.mediaocean.com/viewport/branding/rodick/2020.1.2/images/favicon.ico"
				}
				var notification=new Notification(title, options);
			}
			i+=1;
		}
	//every 30 seconds refresh
	},30000);
});
//console.log("end of loop");
