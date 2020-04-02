/*

    An event 'typing:done' is dispatched within the element when the string has been fully typed.

*/

function timeout(mills) {
    return new Promise(resolve => setTimeout(resolve, mills));
}

$.fn.typeHtml = async function(html, millsPerChar) {
    var temp = '';

    for(var i = 0; html.length > 0; i++) {
        var appTarg = html.charAt(0);

        if(appTarg == '<') {
            var nextBracket = html.indexOf('>');
            appTarg = html.slice(0, nextBracket+1);
        } else if(appTarg == '&') {
            var nextSemicolon = html.indexOf(';');
            appTarg = html.slice(0, nextSemicolon+1);
        }

        temp = temp + appTarg;

        this.html(temp);
        html = html.slice(appTarg.length, html.length);
        await timeout(millsPerChar);
    }

    this.trigger('typing:done');
}