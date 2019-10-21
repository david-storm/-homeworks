
$('body').click(function(event){
    
    $('body,html').stop();
    
});

$(".menu a").click(function (event) {
    event.preventDefault();

    let id = $(this).attr('href');

       let height = $(id).height();

   let top = $(id).offset().top - (height / 2);



    setTimeout( () => {$('body,html').animate({
        scrollTop: top
    }, 1500)}, 100);;
    
});