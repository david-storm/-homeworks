$('body').click(function (event) {
    $('body,html').stop();
});

$("a").click(function (event) {
    event.preventDefault();

    let id = $(this).attr('href');

    let height = $(id).height();
    let win = $(window).height();
    let top = $(id).offset().top;
    let final;

    if (height > win) {
        final = top;
    } else {
        final = top - (win - height ) / 2 ;
    }

    setTimeout(() => {
        $('body,html').animate({
            scrollTop: final
        }, 1500)
    }, 100);;

});