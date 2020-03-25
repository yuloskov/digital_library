$(document).ready(function(){
    
    // Get all important values:
    let sidebar_category = $('#sidebar_category');
    let sidebar_subjects = $('#sidebar_subjects');
    let sidebar_courses = $('#sidebar_courses');
    let articles = $('.main__content__article');
    let current_article = 0;
    let number_of_articles = articles.length;

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

        $(articles[current_article]).fadeOut(200, () => {
            $(articles[next_article]).fadeIn(200);
            current_article = next_article;
        });

    });

    // Page is loaded, display it:
    initialize();

    // Sidebar Animation:
    sidebar_category.on("change", function(){
        if (sidebar_category.val() == 'subject'){
            sidebar_courses.fadeOut(400, () => sidebar_subjects.fadeIn());
        } else {
            sidebar_subjects.fadeOut(400, () => sidebar_courses.fadeIn());
        }
    });

});

function initialize(){
    let sidebar_list;
    let articles;

    articles = $('.main__content__article');
    articles.hide(1, ()=>{
        $(articles[0]).fadeIn(1);
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