const SOCIAL_NETWORKS = [
    {'name': 'Facebook',
    'class image': 'facebook'},
    {'name':'Instagram',
    'class image': 'inst'},
    {'name':'YouTube',
    'class image': 'youtube'}
];
$(document).ready(function () {
    
    //формирование дефолта
    $(".select").html("<div class='def arrow-down select-item selected'>Select social networks</div>");

    // формирование всех элементов выбора, option
    $.each(SOCIAL_NETWORKS, function(i, obj) {
        $(".def").after(`<div class="option select-item"><span class="icon ${obj['class image']}"></span>
        <p>${obj.name}</p></div>`);
    });
    
    $(".option").hide();
    
    //функция разворачивания!  выбора и сворачивания
    $(".select-item").on( "click", function(){
        $(this).toggleClass("arrow-down arrow-up");
        // $(this).toggleClass("arrow-up");
        
        // if($(this).hasClass('selected')){
        //     $(".option").slideToggle();
        //     console.log('selected');
        // }

        if($(this).hasClass('option')){
            $(".selected").addClass("option");
            $(".selected").removeClass("selected");
            $(this).addClass("selected");
            $(this).removeClass("option");
            // console.log('option');
            // $(".option").slideToggle();
        }
        $(".option").slideToggle();
    });
   
});