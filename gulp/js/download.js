$(document).ready(function() {

    if ($("#list_of_requests").text().trim().length === 0)
        $("#list_of_requests").html("<h1 class=\"main__content__article__header\">There are no requested books!</h1>");

    // Get all important values:
    let sidebar_category = $('#sidebar_category');
    let sidebar_subjects = $('#sidebar_subjects');
    let sidebar_courses = $('#sidebar_courses');
    let articles = $('.main__content__article');
    let upload_button = $('.footer__upload_text');
    let rules_button = $('.footer__rules_text');
    let request_button = $('.header__upload_text');
    let current_article = 0;
    let number_of_articles = articles.length;
    let new_tag_button = $("#newTag_one");

    let buttons = [upload_button, rules_button, request_button];
    let visible = [false, false, false];
    let articles_buttons = [$('.main__content__article_upload'), $('.main__content__article_rules'), $('.main__content__article_upload_request')];

    let delete_request_buttons = $('.delete_request');

    // delete requests
    delete_request_buttons.on('click', (event) => {
        innerHtml = $($(event.target).siblings()[0]).text();
        $(event.target).parent().fadeOut(100, () => {
            // TODO: Make AJAX Query to delete it from server!
            // $.ajax();
        }).detach();

        if ($("#list_of_requests").text().trim().length === 0)
            $("#list_of_requests").html("<h1 class=\"main__content__article__header\">There are no requested books!</h1>");
    });

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

        $(articles[current_article]).fadeOut(150, () => {
            $(articles[next_article]).fadeIn(150);
            current_article = next_article;
        });

    });

    // Add new Course tag:
    /**
     * Do not try to understand this code.
     * It is written under mushrooms and other types of drugs.
     * */
    $(new_tag_button).on("click", () => {
            $(" <div class=\"main__content__article_upload__input_wrapper\" id='tags_two'>\n" +
                "<p>Course Tag (II): </p>\n" +
                "<select class=\"main__sidebar__choose_subject\">\n" +
                "<option value=\"Calculus\">Calculus</option>\n" +
                "<option value=\"ProbabilityAndStatistics\">Probability and Statistics</option>\n" +
                "<option value=\"ComputerArchitecture\">Computer Architecture</option>\n" +
                "<option value=\"OperatingSystems\">Operating Systems</option>\n" +
                "<option value=\"ComputerNetworks\">Computer Networks</option>\n" +
                "<option value=\"Philosophy\">Philosophy</option>\n" +
                "<option value=\"Calculus\">Calculus</option>\n" +
                "<option value=\"Data ModellingAndDatabases\">Data Modelling and Databases</option>\n" +
                "<option value=\"DigitalSignalProcessing\">Digital Signal Processing</option>\n" +
                "</select>\n" +
                "<button class=\"main__content__article_upload_newTag\" id=\"newTag_two\">Add new tag</button>\n" +
                "</div>").insertAfter('#tags_one');
            $("#newTag_one").fadeOut(0);
            new_tag_button = $("#newTag_two");
            new_tag_button.on("click", () => {
                $(" <div class=\"main__content__article_upload__input_wrapper\" id='tags_three'>\n" +
                    "<p>Course Tag (III): </p>\n" +
                    "<select class=\"main__sidebar__choose_subject\">\n" +
                    "<option value=\"Calculus\">Calculus</option>\n" +
                    "<option value=\"ProbabilityAndStatistics\">Probability and Statistics</option>\n" +
                    "<option value=\"ComputerArchitecture\">Computer Architecture</option>\n" +
                    "<option value=\"OperatingSystems\">Operating Systems</option>\n" +
                    "<option value=\"ComputerNetworks\">Computer Networks</option>\n" +
                    "<option value=\"Philosophy\">Philosophy</option>\n" +
                    "<option value=\"Calculus\">Calculus</option>\n" +
                    "<option value=\"Data ModellingAndDatabases\">Data Modelling and Databases</option>\n" +
                    "<option value=\"DigitalSignalProcessing\">Digital Signal Processing</option>\n" +
                    "</select>\n" +
                    "</div>").insertAfter('#tags_one');
                $("#newTag_two").fadeOut(0);
            });
    });



    // Show Rules Page
    for (let b in buttons) {
        $(buttons[b]).on("click", () => {
            $(articles[current_article]).fadeOut(150, () => {
                let found_visible = false;
                for (arb in articles_buttons) {
                    if (visible[arb] && arb !== b) {
                        $(articles_buttons[arb]).fadeOut(150, () => {
                            visible[arb] = false;
                            visible[b] = true;
                            $(articles_buttons[b]).fadeIn(150);
                            $('.main__content').off("mousewheel");
                        });
                        found_visible = true;
                        break;
                    } else if (visible[arb] && arb === b) {
                        $(articles_buttons[arb]).fadeOut(150, () => {
                            visible[arb] = false;
                            $(articles[current_article]).fadeIn(150);
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

                                $(articles[current_article]).fadeOut(150, () => {
                                    $(articles[next_article]).fadeIn(150);
                                    current_article = next_article;
                                });

                            });
                        });
                        found_visible = true;
                        break;
                    }
                }
                if (!found_visible) {
                    $(articles[current_article]).fadeOut(150, () => {
                        $(articles_buttons[b]).fadeIn(150);
                        visible[b] = true;
                        $('.main__content').off("mousewheel");
                    });
                }
            });
        });
    }
    // Page is loaded, display it:
    initialize();

    // Sidebar Animation:
    sidebar_category.on("change", function() {
        if (sidebar_category.val() == 'subject') {
            sidebar_courses.fadeOut(150, () => sidebar_subjects.fadeIn());
        } else {
            sidebar_subjects.fadeOut(150, () => sidebar_courses.fadeIn());
        }
    });

    // File download animation
    var inputs = document.querySelectorAll('.inputfile');
    Array.prototype.forEach.call(inputs, function(input) {
        var label = input.nextElementSibling,
            labelVal = label.innerHTML;

        input.addEventListener('change', function(e) {
            var fileName = '';
            if (this.files && this.files.length > 1)
                fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
            else
                fileName = e.target.value.split('\\').pop();

            if (fileName)
                label.innerHTML = fileName;
            else
                label.innerHTML = labelVal;
        });
    });

});

function initialize() {
    let sidebar_list;
    let articles;

    articles = $('.main__content__article');
    articles.hide(1, () => {
        $(articles[0]).fadeIn(1);
        $('.main__content__article_upload').hide();
        $('.main__content__article_upload_request').hide();

    });

    $("#main__content__article_rules").hide();

    if ($('#sidebar_category').val() === 'subject')
        sidebar_list = $('#sidebar_courses');
    else
        sidebar_list = $('#sidebar_subjects');

    sidebar_list.hide(100, () => {
        $("#hider").fadeOut({
            duration: 400,
            easing: 'swing'
        });
    });

}