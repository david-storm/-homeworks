const SOCIAL_NETWORKS = [
    {'name': 'Facebook',
        'class image': 'facebook' },
    {'name': 'Instagram',
        'class image': 'inst' },
    {'name': 'YouTube',
        'class image': 'youtube'},
    {'name': 'Telergam',
        'class image': 'telegram'}
];
$(document).ready(function () {

    //create select
    $(".select").html('<div class="end-border arrow-down selected"></div>');
    $(".selected").append('<div class="def select-item default">Select social networks</div>');
    $(".selected").after('<div class="option "></div>');
    $.each(SOCIAL_NETWORKS, function (i, obj) {
        $(".option").append(`<div class="select-item"><span class="icon ${obj['class image']}"></span>
        <p>${obj.name}</p></div>`);
    });

    $(".option").hide();
    let optionHide = true;

    //expand the list of options
    const expandOption = () => {
        $(".option").slideToggle('fast');
        $(".selected").toggleClass("end-border");
        $(".selected").toggleClass("arrow-down arrow-up");
        optionHide = false;
    };
    //collapse options list
    const collapseOption = () => {
        $(".option").slideToggle('fast');
        setTimeout( () => {
            $(".selected").toggleClass("end-border")
        }, 200); 
        $(".selected").toggleClass("arrow-down arrow-up");
        optionHide=true;
    };

    $(document).on("click", ".selected", function () {
        $(".option").stop(true);
        if(optionHide){
            expandOption();
        } else {
            collapseOption();
        }
    });

    //handle click with the choice of a new option
    $(document).on("click", ".option div", function () {
        $(".option").stop();
        $(".selected div").remove();
        $(".option div").show();
        $(this).clone().prependTo($(".selected"));
        $('.option').find($(this)).hide();
        collapseOption();
    });
});