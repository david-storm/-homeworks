const SOCIAL_NETWORKS = [
    {'name': 'Facebook',
        'class image': 'facebook' },
    {'name': 'Instagram',
        'class image': 'inst' },
    {'name': 'YouTube',
        'class image': 'youtube'}
];
$(document).ready(function () {

    $(".select").html("<div class='def arrow-down select-item selected'>Select social networks</div>");

    $.each(SOCIAL_NETWORKS, function (i, obj) {
        $(".def").after(`<div class="option select-item"><span class="icon ${obj['class image']}"></span>
        <p>${obj.name}</p></div>`);
    });

    $(".option").hide();

    $(".select-item").on("click", function () {
        if ($(this).hasClass('selected')) {
            $(this).toggleClass("arrow-down arrow-up");
        }
        if ($(this).hasClass('option')) {
            $(".selected").addClass("option");
            $(".selected").removeClass("arrow-up");
            $(".selected").removeClass("selected");
            $(this).addClass("selected");
            $(this).addClass("arrow-down");
            $(this).removeClass("option");
        }
        $(".option").slideToggle();
    });
});