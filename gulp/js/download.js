$(document).ready(function(){
    
    // Get all important values:
    let sidebar_category = $('#sidebar_category');
    let sidebar_subjects = $('#sidebar_subjects');
    let sidebar_courses = $('#sidebar_courses');
    let articles = $('.main__content__article');
    let upload = $('.main__content__article_upload');
    let upload_button = $('.footer__upload_text');
    let current_article = 0;
    let number_of_articles = articles.length;
    var upload_visible = false;


    // Show Articles
    $('.main__content').bind('mousewheel', function(event) {
        let next_article;
        if (event.originalEvent.wheelDelta >= 0) {
            if (current_article + 1 >= number_of_articles)
                next_article = 0;
            else
                next_article = current_article + 1;
            
        } else {
            if (current_article - 1 < 0)
                next_article = number_of_articles - 1;
            else
                next_article = current_article - 1;
        }

        $(articles[current_article]).fadeOut(250, () => {
            $(articles[next_article]).fadeIn(250);
            current_article = next_article;
        });

    });

    // Show Upload Page 
    upload_button.on("click", () => {
        if (upload_visible){
            upload.fadeOut(250, () => {
                $(articles[current_article]).fadeIn(250);
                upload_visible = false;
                $('.main__content').on("mousewheel", function(event) {
                    let next_article;
                    if (event.originalEvent.wheelDelta >= 0) {
                        if (current_article + 1 >= number_of_articles)
                            next_article = 0;
                        else
                            next_article = current_article + 1;
                        
                    } else {
                        if (current_article - 1 < 0)
                            next_article = number_of_articles - 1;
                        else
                            next_article = current_article - 1;
                    }
            
                    $(articles[current_article]).fadeOut(250, () => {
                        $(articles[next_article]).fadeIn(250);
                        current_article = next_article;
                    });
            
                });
            });
        } else{
            $(articles[current_article]).fadeOut(250, () => {
                upload.fadeIn(250);
                upload_visible = true;
                $('.main__content').off("mousewheel");
            });
        }
    });

    // Page is loaded, display it:
    initialize();

    // Sidebar Animation:
    sidebar_category.on("change", function(){
        if (sidebar_category.val() == 'subject'){
            sidebar_courses.fadeOut(250, () => sidebar_subjects.fadeIn());
        } else {
            sidebar_subjects.fadeOut(250, () => sidebar_courses.fadeIn());
        }
    });

    // File download animation
    var inputs = document.querySelectorAll( '.inputfile' );
    Array.prototype.forEach.call( inputs, function( input )
    {
        var label	 = input.nextElementSibling,
            labelVal = label.innerHTML;

        input.addEventListener( 'change', function( e )
        {
            var fileName = '';
            if( this.files && this.files.length > 1 )
                fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
            else
                fileName = e.target.value.split('\\').pop();

            if( fileName )
                label.innerHTML = fileName;
            else
                label.innerHTML = labelVal;
        });
    });

});

function initialize(){
    let sidebar_list;
    let articles;

    articles = $('.main__content__article');
    articles.hide(1, ()=>{
        $(articles[0]).fadeIn(1);
        $('.main__content__article_upload').hide();
    });

    if ($('#sidebar_category').val() == 'subject')
        sidebar_list = $('#sidebar_courses');
    else 
        sidebar_list = $('#sidebar_subjects');

        sidebar_list.hide(100, ()=>{
            $("#hider").fadeOut({
                duration: 400,
                easing: 'swing'
            });
        });

}