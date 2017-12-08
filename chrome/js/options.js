document.addEventListener('DOMContentLoaded', () => {
  var nodes = document.querySelectorAll('[data-i18n]');
  Array.prototype.forEach.call(nodes, node => {
    node.childNodes[0].nodeValue = chrome.i18n.getMessage(node.dataset.i18n);
  });

  chrome.storage.local.get('whitelist', function(items) {
    document.querySelector('#urlWhiteList').value = items.whitelist;
  });

  document.querySelector('#save').addEventListener('click', () => {
    const urlWhiteList = document.querySelector('#urlWhiteList').value;
    chrome.storage.local.set({urlWhiteList}, () =>{
      alert('Saved');
    });
  });
});
