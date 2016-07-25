chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  //console.log('Tabid:'+tabId);
  //console.log('changeInfo:'+JSON.stringify(changeInfo));
  //console.log('tab:'+JSON.stringify(tab));
  if (tab.url == undefined) {
    return;
  } else if(tab.url.search('/*\/browse\/*/') > 0) {
    chrome.tabs.executeScript(tabId, {file: 'js/content.js'});
  }
});