// STATE

var hippieKill= true
function stopHippieKilling(){
	hippieKill= false
}

// GO

chrome.tabs.onCreated.addListener(function(tab) {
	chrome.experimental.processes.getProcessIdForTab(tab.id, function (processId) {
		if (!isNaN(parseFloat(processId)) && isFinite(processId)) {
			chrome.experimental.processes.terminate(processId)
		}
	})
})

// UNTIL

setTimeout(function(){
	stopHippieKilling()
}, 5000)
