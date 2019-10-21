const SOCIAL_NETWORKS = [
    {'name': 'Facebook',
    'class image': 'facebook'},
    {'name':'Instagram',
    'class image': 'inst'},
    {'name':'YouTube',
    'class image': 'youtube'}
    
];
$(document).ready(function () {
    
    $(".select").html("<div class='def'>Select social networks</div>");

    $.each(SOCIAL_NETWORKS, function(i, obj) {
        $(".def").after(`<div class="option"><span class="icon ${obj['class image']}"></span>
        <p>${obj.name}</p></div>`);
    });
    
    $(".option").hide();
    $(".def").addClass("option");

    $(".option").click(function(){
        $(this).toggleClass("selected");
        $(this).toggleClass("option");
        $(".option").slideToggle();
        $(this).toggleClass("option");
    });

    $(".option").hover(function() {
        $( this ).addClass('hover');
    }, function() {
        $( this ).removeClass('hover');
    });

});