$(document).ready(function(){

    $("#hider").fadeOut({
        duration: 700,
        easing: 'swing'
    });

    if ($('#sidebar_category').val() == 'subject'){
        $('#sidebar_courses').fadeOut();
    } else {
        $('#sidebar_subjects').fadeOut();
    }

    $('#sidebar_category').on("change", function(){
        if ($('#sidebar_category').val() == 'subject'){
            $('#sidebar_courses').fadeOut(400, () => $('#sidebar_subjects').fadeIn());
        } else {
            $('#sidebar_subjects').fadeOut(400, () => $('#sidebar_courses').fadeIn());
        }
    });

});