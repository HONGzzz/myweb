$(document).ready(function () {
    $('#search_input').on('keyup', function () {
        $('#search_suggest').css({
            top:$('.search-form').offset().top+$('.search-form').outerHeight(),
            left:$('.search-form').offset().left
        }).show();
        if($('#search_input').val()==""){
            $('#search_suggest').hide();
        }
    });
});