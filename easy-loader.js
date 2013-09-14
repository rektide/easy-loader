/** kill one tab */
function killTab(tab){
	chrome.processes.getProcessIdForTab(tab.id, function (processId) {
		if (!isNaN(parseFloat(processId)) && isFinite(processId)) {
			chrome.experimental.processes.terminate(processId)
		}
	})
}

/** start killing new tabs */
function startKilling(){
	chrome.tabs.onCreated.addListener(killTab)
}

/** stop killing new tabs */
function stopKilling(){
	chrome.tabs.onCreated.removeListener(killTab)
}

/** kill everything underneath the passed in, or everything if nothing was passed
  @param winOrTab an array of Windows or Tabs, a Window, or a Tab. Whatever processes hosting the winOrTab target are killed.
*/
function gouranga(winOrTab){
	if(!winOrTab){
		chrome.windows.getAll({populate:true}, gouranga)
	}else if(winOrTab instanceof Tab){
		killTab(winOrTab)
	}else if(winOrTab instanceof Window){
		if(!winOrTab.tabs)
			throw "No Tabs were populated"
		winOrTab.tabs.forEach(gouranga)
	}else if(winOrTab instanceof Array){
		winOrTab.forEach(gouranga)
	}
}

// GO

startKilling()

// UNTIL

setTimeout(function(){
	stopKilling()
}, 5000)
