


$(function () {


    function useEverywehreAjax(options, $form) {
        $.ajax(options).done(function (data) {
            var $target = $($form.attr("data-search-target"));
            var $newHtml = $(data);
            $target.replaceWith($newHtml);// we repalced whatever data is already in the div with the new data
            $newHtml.effect("highlight"); // this adds yellow when searching 
        });
    }


    var ajaxFormSubmitReset = function () {
        var $form = $(this);// this puts the form in a variable
        
        // this captures the url, type, data
        var options = {
            url: $form.attr("action"),
            type: "get",
            data: $form.serialize()
        };

        useEverywehreAjax(options, $form)

        return true;
    };
    //function reseting() {
    //    var $resetInput = $('#inputReset').val("");
    //}

    var ajaxFormSubmitTab = function () {
        var $form = $(this);// this puts the form in a variable
        // this captures the url, type, data
        var options = {
            url: $form.attr("action"),
            type: "get",
            data: $form.serialize()
        };

        useEverywehreAjax(options, $form)

        return false;
    };


    var ajaxFormSubmit = function () {
        var $form = $(this);// this puts the form in a variable
        // this captures the url, type, data
        var options = {
            url: $form.attr("action"),
            type: $form.attr("method"),
            data: $form.serialize()
        };
        useEverywehreAjax(options, $form)

        return false;
    };
    // search input fild; this auto submits when select from the drop down or when entered is cliked
    var submitAutocompleteForm = function (event, ui) {

        var $input = $(this);
        //if ($input == null) {
        //    $form.submit();
        //}

        $input.val(ui.item.label);

        var $form = $input.parents("form:first");
        $form.submit();
    };
    // this is used in the search input field to autocomplete from the database. there is a css to customize the look
    var createAutocomplete = function () {
        var $input = $(this);
        
        var options = {
            source: $input.attr("data-search-autocomplete"),
            select: submitAutocompleteForm
        };

        $input.autocomplete(options);
    };

    // this is use to display the pager
    var getPage = function () {
        var $a = $(this);

        var options = {
            url: $a.attr("href"),
            data: $("form").serialize(),
            type: "get"
        };
        // this is use to display the pager
        $.ajax(options).done(function (data) {
            var target = $a.parents("div.pagedList").attr("data-search-target");
            var $newHtmlPage = $(data);
            $(target).replaceWith($newHtmlPage);
            $newHtmlPage.effect("highlight");// this adds the yellow effect when changing to the new page
        });
        return false;

    };

    $("form[data-search-ajax='true']").submit(ajaxFormSubmit);// data - atrribure is added to the input tag for the search this will start the ajax
    $("input[data-search-autocomplete]").each(createAutocomplete);
    //$("input[data-search-autocomplete]").change(submitAutocompleteForm);
    $(".main-content").on("click", ".pagedList a", getPage);// this event helps to display new page.. using a plugin called PagedList NugetPacg 
    $("a[data-tab-ajax='true']").click(ajaxFormSubmitTab);// ajax request for the tabs 
    $("button[data-searchReset-ajax='true']").click(ajaxFormSubmitReset);

});

