$(function(){
    var url = new URL(window.location.href);

    var id = url.searchParams.get('id');

    if(!id){
        id = 0;
    }

    id = parseInt(id);

    $.getJSON('dialogs.json?v=29', function(data){
        var dialogs = data.dialogs;

        $('#content').html('');
        $('#choices').html('');

        $('#content').typeHtml(dialogs[id].text, 30);

        $('#content').on('typing:done', function() {
            $.each(dialogs[id].response, function(index, response) {
                $('#choices').append('<a href="?id=' + response.goto + '">' + response.text + '</a>'
                + (index < dialogs[id].response.length - 1 ? '<br><span style="font-size:0.5em;"> </span><br>' : ''));
            });
        })

        $('#dialogue').css('display', 'table-cell');
    });
});