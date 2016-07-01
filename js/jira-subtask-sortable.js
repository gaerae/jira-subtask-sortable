$.noConflict();
jQuery(document).ready(function($) {
  // Getting the table row id
  function getTableRows(){
    tableRows = [];
    $('#issuetable>tbody').children('tr').each(function(idx,elm) {
      if (elm.id) tableRows.push(elm.id);
    });
    return tableRows;
  }

  // Drang and drop
  $('#issuetable>tbody>tr').css('cursor', '-webkit-grab');
  $('#issuetable>tbody').sortable({
    placeholder: 'ui-state-highlight',
    opacity: 0.65,
    start: function() {
      oldTableRows = getTableRows();
    },
    stop: function(event, ui) {
      newTableRows = getTableRows();
      for (i = 0; i <= newTableRows.length; i++) {
        if (ui.item[0].id == oldTableRows[i]) oldRowId = i;
        if (ui.item[0].id == newTableRows[i]) newRowId = i;
      }

      // Reorder for current page
      tempNumber = 1;
      $('#issuetable>tbody').children('tr').each(function(idx, elm) {
        withTick = $(elm).find('td.stsequence>div');
        withOutTick = $(elm).find('td.stsequence');

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
});
