function itemer(id, code, date, likes) {
var newitem = $('.item.hide').clone().insertAfter('.feed .item:last').removeClass('hide').attr('data-id', id).attr('data-code', code);
var c1 = code.substring(0,6); var c2 = code.substring(6,12); var c3 = code.substring(12,18); var c4 = code.substring(18,24);
newitem.find('.canvas a').attr('href', '/c/'+id);
newitem.find('.c1').css('background-color', '#'+c1).find('span').text('#'+c1);
newitem.find('.c2').css('background-color', '#'+c2).find('span').text('#'+c2);
newitem.find('.c3').css('background-color', '#'+c3).find('span').text('#'+c3);
newitem.find('.c4').css('background-color', '#'+c4).find('span').text('#'+c4);
newitem.find('.count').text(likes);
newitem.find('a.like').attr('onclick','like('+id+')');
if ( localStorage.getItem(code) != null ) { $('.item[data-id=' + id +']').addClass('liked'); }
newitem.find('.date').text(moment(date, "MM/DD/YYYY").fromNow(true)); 
}

function heroItemer(id, code, date, likes) {
var newitem = $('.item.hide').clone().insertAfter('.feed .item:last').removeClass('hide').attr('data-id', id).attr('data-code', code);
var c1 = code.substring(0,6); var c2 = code.substring(6,12); var c3 = code.substring(12,18); var c4 = code.substring(18,24);
newitem.find('.canvas a').attr('href', '/c/'+id);
newitem.find('.c1').css('background-color', '#'+c1).find('span').text('#'+c1);
newitem.find('.c2').css('background-color', '#'+c2).find('span').text('#'+c2);
newitem.find('.c3').css('background-color', '#'+c3).find('span').text('#'+c3);
newitem.find('.c4').css('background-color', '#'+c4).find('span').text('#'+c4);
newitem.find('.count').text(likes);
newitem.find('a.like').attr('onclick','like('+id+')');
if ( localStorage.getItem(code) != null ) { $('.item[data-id=' + id +']').addClass('liked'); }
newitem.find('.date').text(moment(date, "MM/DD/YYYY").fromNow(true)); 
}

function taker(step, sort) { 
    $.ajax({ type: 'POST', url: '/get', dataType: "html", data: { step: step, sort: sort }, 
        success: function(data) { $("#jscode").html(data); $('.loader').hide(); }
    }); 
}

function CapFirstChar(string) { return string.charAt(0).toUpperCase() + string.slice(1); }

function like(id) {  
    var code = $('.item[data-id=' + id + ']').attr('data-code');
     if ( localStorage.getItem(code) == null ) { 
         localStorage.setItem(code, id); 
         $('.item[data-id=' + id +']').addClass('liked'); 
         $.post("/like",  { act: 'addlike', id: id }, function(data, status){  });
         var curlikes = $('.item[data-id=' + id + ']:last').find('.count').text().replace(',',''); 
         curlikes++; 
         $('.item[data-id=' + id + ']').find('.count').text(curlikes); 
         ga('send', 'event', id, 'like');
         $('.item[data-id=' + id + ']').find('a.like').attr('onclick','').css('cursor','default');
        }
    else { 
        localStorage.removeItem(code); 
        $('.item[data-id=' + id +']').removeClass('liked'); 
        ga('send', 'event', id, 'unlike');
    }
    $('.likeslength').html(localStorage.length);
}
