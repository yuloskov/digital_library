$(document).ready(function(){ 

    // Make the page visible:
    $("#hider").fadeOut({
        duration: 700,
        easing: 'swing'
    });
    // Send AJAX Request to the server with login information
    let form = $("#login_form");
    $('#login_button').on('click' ,function(e){

        $.post("login", form.serialize(), function(data){
            document.reload();
        });
    });

});