$(document).ready(function() {

    // Page is loaded, display it:
    initialize();

    function mousewheel_articles(event) {
        let next_article;
        if (articles !== null){
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
        }
    }

    let listOfRequests = $("#list_of_requests");

    if (listOfRequests.text().trim().length === 0)
        listOfRequests.html("<h1 class=\"main__content__article__header\">There are no requested books!</h1>");

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
        innerHtml = $($(event.target).siblings()[1]).text();
        $(event.target).parent().fadeOut(100).detach();

        // Artem, you should change delete_request.py to the URL of the request handler
        // On the backend site, you will get the name of the request to be deleted.
        $.post('/delete_request', {
            data: innerHtml
        });

        if (listOfRequests.text().trim().length === 0)
            listOfRequests.html("<h1 class=\"main__content__article__header\">There are no requested books!</h1>");
    });

    // Search

    let search_input = $(".main__sidebar__search_input");
    let main_content = $(".main__content");

    search_input.on('keypress', (e) => {
        if (e.which === 13 && $(search_input).val().length !== 0){

            $(articles).detach();
            articles = null;
            number_of_articles = 0;


            // change search_article on url of handler

            $.post('/search_article', {
                data: search_input.val()
            }, (result) => {
                let full_content = "";
                for (let i in result){
                    let content = "<article class=\"main__content__article\" id=\"" + result[i]._id + "\">\n" +
                                  "<div class=\"main__content__article_wrapper\">\n";

                    content += result[i].img === undefined ? '' : "<img src=\"/static/books/covers/" + result[i].img + "\" alt=\"\" class=\"main__content__article__image\">\n"
                    content += "<h1 class=\"main__content__article__header\">" + result[i].title + "</h1>\n";
                    content += result[i].description === undefined ? '' : "<div class=\"main__content__article__description\">\n" + result[i].description + "\n</div>\n"
                    content += "</div>\n";
                    content += "<div class=\"main__content__article__buttons\">\n" +
                        "<a class=\"main__content__article__download\" href=\"/static/books/" + result[i].filename + "\" download=\"" + result[i].filename + "\">Download</a>\n" + "</div>\n"
                    content += "<h3 class=\"main__content__article__pageNum\"></h3>";
                    content += "</article>";

                    full_content += content;
                }
                $(main_content).append(full_content);
                articles = $(".main__content__article");
                number_of_articles = articles.length;
                $(articles).fadeOut(0);
                $(articles[0]).fadeIn(0);
                current_article = 0;
                $(".main__content").bind('mousewheel', mousewheel_articles);
                let article_numbers = $('.main__content__article__pageNum');
                $.each(article_numbers, (ind, obj) => {
                    $(obj).html(ind + 1 + " / " + article_numbers.length);
                });
            });
        }
    });


    let category_choose = $(".choose_category");
    category_choose.on('click', (e) => {
        $(articles).detach();
        articles = null;
        number_of_articles = 0;

        // change choose_article on url of handler
        $.post('/choose_article', {
            data: $(e.target).text().replace(/\s/g, '')
        }, (result) => {
            let full_content = "";
            for (let i in result){
                let content = "<article class=\"main__content__article\" id=\"" + result[i]._id + "\">\n" +
                    "<div class=\"main__content__article_wrapper\">\n";

                content += result[i].img === undefined ? '' : "<img src=\"/static/books/covers/" + result[i].img + "\" alt=\"\" class=\"main__content__article__image\">\n"
                content += "<h1 class=\"main__content__article__header\">" + result[i].title + "</h1>\n";
                content += result[i].description === undefined ? '' : "<div class=\"main__content__article__description\">\n" + result[i].description + "\n</div>\n"
                content += "</div>\n";
                content += "<div class=\"main__content__article__buttons\">\n" +
                    "<a class=\"main__content__article__download\" href=\"/static/books/" + result[i].filename + "\" download=\"" + result[i].filename + "\">Download</a>\n" + "</div>\n"
                content += "<h3 class=\"main__content__article__pageNum\"></h3>";
                content += "</article>";

                full_content += content;
            }
            $(main_content).append(full_content);
            articles = $(".main__content__article");
            number_of_articles = articles.length;
            $(articles).fadeOut(0);
            $(articles[0]).fadeIn(0);
            current_article = 0;
            $(".main__content").bind('mousewheel', mousewheel_articles);
            let article_numbers = $('.main__content__article__pageNum');
            $.each(article_numbers, (ind, obj) => {
                $(obj).html(ind + 1 + " / " + article_numbers.length);
            });
        });
    });

    // Show Uploaded Materials
    let show_uploaded = $(".header__upload_text_approval");
    show_uploaded.on('click', (e) => {
        $(articles).detach();
        articles = null;
        number_of_articles = 0;
        // change to_approve on url of handler which will return articles to be approved
        $.post('/to_approve', {
            data: $(e.target).text().replace(/\s/g, '')
        }, (result) => {
            let full_content = "";
            for (let i in result){
                let content = "<article class=\"main__content__article\" id=\"" + result[i]._id + "\">\n" +
                    "<div class=\"main__content__article_wrapper\">\n";

                content += result[i].img === undefined ? '' : "<img src=\"/static/books/covers/" + result[i].img + "\" alt=\"\" class=\"main__content__article__image\">\n"
                content += "<h1 class=\"main__content__article__header\">" + result[i].title + "</h1>\n";
                content += result[i].description === undefined ? '' : "<div class=\"main__content__article__description\">\n" + result[i].description + "\n</div>\n"
                content += "</div>\n";
                content += "<div class=\"main__content__article__buttons\">\n" +
                    "<a class=\"main__content__article__download\" href=\"/static/books/" + result[i].filename + "\" download=\"" + result[i].filename + "\">Download</a>\n";
                content += "<div class=\"approve\">\n" +
                    "          <p href=\"\" class=\"main__content__article__download approve_btn\">Approve</p>\n" +
                    "          <p href=\"\" class=\"main__content__article__download approve_btn\">Decline</p>\n" +
                    "        </div>"
                content += "</div>\n";
                content += "<h3 class=\"main__content__article__pageNum\"></h3>";
                content += "</article>";

                full_content += content;
            }
            $(main_content).append(full_content);
            articles = $(".main__content__article");
            number_of_articles = articles.length;
            $(articles).fadeOut(0);
            $(articles[0]).fadeIn(0);
            current_article = 0;
            $(".main__content").bind('mousewheel', mousewheel_articles);
            let article_numbers = $('.main__content__article__pageNum');
            $.each(article_numbers, (ind, obj) => {
                $(obj).html(ind + 1 + " / " + article_numbers.length);
            });
            let approve_buttons = $(".approve_btn");
            approve_buttons.on("click", (e) => {
                let action = $(e.target).html();
                let article_name = $($($(e.target).parent().parent().parent().children()[0]).children()[1]).html();
                $(e.target).parent().parent().parent().html(
                    "<h1 class='main__content__article__header' style='text-align: center'> " + action + "d </h1>"
                );
                // Change /approvals here to the URL of approvals handler (which will handle action of approval/decline)
                $.post("/approvals", {
                    action: action,
                    article_name: article_name
                });
            });
        });
    });



    // Show Articles

    $('.main__content').bind('mousewheel', mousewheel_articles);

    // Add new Course tag:
    /**
     * Do not try to understand this code.
     * It is written under mushrooms and other types of drugs.
     * */

    $(new_tag_button).on("click", () => {
            $(" <div class=\"main__content__article_upload__input_wrapper\" id='tags_two'>\n" +
                "<p>Course Tag (II): </p>\n" +
                "<div  class=\"main__content__article_select\"><select name='course_tag2' class=\"main__sidebar__choose_subject\">\n" +
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
                "<button class=\"main__content__article_upload_newTag\" id=\"newTag_two\">Add new tag</button></div>\n" +
                "</div>").insertAfter('#tags_one');
            $("#newTag_one").fadeOut(0);
            new_tag_button = $("#newTag_two");
            new_tag_button.on("click", () => {
                $(" <div class=\"main__content__article_upload__input_wrapper\" id='tags_three'>\n" +
                    "<p>Course Tag (III): </p>\n" +
                    "<div  class=\"main__content__article_select\"><select name='course_tag3' class=\"main__sidebar__choose_subject\">\n" +
                    "<option value=\"Calculus\">Calculus</option>\n" +
                    "<option value=\"ProbabilityAndStatistics\">Probability and Statistics</option>\n" +
                    "<option value=\"ComputerArchitecture\">Computer Architecture</option>\n" +
                    "<option value=\"OperatingSystems\">Operating Systems</option>\n" +
                    "<option value=\"ComputerNetworks\">Computer Networks</option>\n" +
                    "<option value=\"Philosophy\">Philosophy</option>\n" +
                    "<option value=\"Calculus\">Calculus</option>\n" +
                    "<option value=\"Data ModellingAndDatabases\">Data Modelling and Databases</option>\n" +
                    "<option value=\"DigitalSignalProcessing\">Digital Signal Processing</option>\n" +
                    "</select></div>\n" +
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
                                $('.main__content').on("mousewheel", mousewheel_articles);
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
    if (articles.length !== 0) {
        let article_numbers = $('.main__content__article__pageNum');
        $.each(article_numbers, (ind, obj) => {
            $(obj).html(ind + 1 + " / " + article_numbers.length);
        });
        articles.hide(1, () => {
            $(articles[0]).fadeIn(1);
        });
    } else {
        $(".main__content").append("<article class=\"main__content__article main__content__article_rules\" id=\"main__content__article\">\n" +
            "                <div class=\"main__content__article_wrapper\">\n" +
            "                    <h1 class=\"main__content__article__header\">The Library Pirate Code</h1>\n" +
            "                    <div class=\"main__content__article__description\">\n" +
            "                        <p style=\"text-indent: 1em\">This is Pirate Code: set of rules of Book Harbour. Following this rules will lead you to successful contribution to our website.\n" +
            "                            Important: this rules should be followed by contributors only, if you use website and don’t contribute you are allowed not to read this.\n" +
            "\n" +
            "                        </p>\n" +
            "                        <br>\n" +
            "                        <p style=\"text-indent: 1em\">\n" +
            "                            When you try to Contribute to our project, you create an upload request, which is not necessarily will be accepted by administrator, it can also be declined in case if you do not follow next rules:\n" +
            "                        </p>\n" +
            "                        <div class=\"main__content__article__description_rules\">\n" +
            "                            <ul>\n" +
            "                                <li>Our site is based on anonymous work, when you contribute to project, you are not allowed to specify your credentials, organization or something that can threat your anonymity.</li>\n" +
            "                                <li>We do not accept descriptions or pictures that have potentially offensive to any group of people content.</li>\n" +
            "                                <li>Materials uploaded to the site should match with their title and description, don’t waste time of people, who search for needed materials and find there something that doesn’t match their expectations.</li>\n" +
            "                                <li>Don’t upload short versions of books: either full or nothing.</li>\n" +
            "                                <li>(optional, but preferred) Add tags to your book, that will simplify search for the others.</li>\n" +
            "                            </ul>\n" +
            "                        </div>\n" +
            "                    </div>\n" +
            "                </div>\n" +
            "<a class=\"download_rules\" href=\"${PirateCode}\" download=\"${PirateCode}\">How to Use</a>" +
            "            </article>");
        $(".footer__rules").fadeOut(0);
    }
// On Line 297 you need to change ${PirateCode} to the link to the document with usage rules
    $("#main__content__article_rules").hide();
    $('.main__content__article_upload').hide();
    $('.main__content__article_upload_request').hide();

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