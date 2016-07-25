(function () {
  'use strict';
  var app;
  app = {
    oldTableRows: {},
    newTableRows: {},
    /**
     * @description Getting the table row id
     */
    getTableRows: function() {
      var tempTableRows = [];
      $('#issuetable>tbody').children('tr').each(function(idx, elm) {
        if (elm.id) tempTableRows.push(elm.id);
      });
      return tempTableRows;
    },
    /**
     * @description Attach events
     */
    delegate: function() {
      // Drag and drop
      $('#issuetable>tbody>tr').css('cursor', '-webkit-grab');
      $('#issuetable>tbody').sortable({
        placeholder: 'ui-state-highlight',
        opacity: 0.65,
        start: function() {
          app.oldTableRows = app.getTableRows();
        },
        stop: function(event, ui) {
          app.newTableRows = app.getTableRows();
          for (var i = 0; i <= app.newTableRows.length; i++) {
            if (ui.item[0].id == app.oldTableRows[i]) var oldRowId = i;
            if (ui.item[0].id == app.newTableRows[i]) var newRowId = i;
          }

          // Reorder for current page
          var tempNumber = 1;
          $('#issuetable>tbody').children('tr').each(function(idx, elm) {
            var withTick = $(elm).find('td.stsequence>div');
            var withOutTick = $(elm).find('td.stsequence');

            // Checking icon
            if ($(withTick).length > 0){
              $(withTick).text(tempNumber+'.');
            } else {
              $(withOutTick).text(tempNumber+'.');
            }
            tempNumber++;
          });

          // Reorder for database
          $.get('/secure/MoveIssueLink.jspa?id='+$('#key-val').attr('rel')+'&currentSubTaskSequence='+oldRowId+'&subTaskSequence='+newRowId);
        }
      });
      $('#issuetable>tbody').disableSelection();
    },
    /**
     * @description Initialize background page
     */
    init: function() {
      if (document.body.hasAttribute('id') && document.body.getAttribute('id') == 'jira') {
        app.delegate();
      }
    }
  };
  app.init();
}());

