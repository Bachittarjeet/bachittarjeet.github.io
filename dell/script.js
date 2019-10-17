$(document).ready(function() {
    previous = ''
    previousTag = null
    current = ''

    function selectionFun() {
        if (previous != window.getSelection().toString() && previousTag != getSelectionParents()['start'])
            previous = window.getSelection().toString()
        current = window.getSelection().toString()
        $(getSelectionParents()['start'] + ":contains('" + window.getSelection().toString() + "')").html(function(_, html) {
            return html.replace(window.getSelection().toString(), '<a target="_blank" href="https://pilot.search.dell.com/' + window.getSelection().toString() + '" class="smallcaps">' + window.getSelection().toString() + '</a>')
        });

    }


    var getSelectionParents = function() {
        var selection = document.getSelection();
        if (!selection.toString().length)
            return false;
        else
            return {
                start: selection.anchorNode.parentNode.nodeName,
                end: selection.focusNode.parentNode
            };
    }
    $(document).mouseup(function() {
        selectionFun()
    });

});