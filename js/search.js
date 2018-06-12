jQuery(function() {
    function adjust_search_box_width() {
        var searchbar_width = $("#site_search").width();
        $("#search_box").width(searchbar_width - 15);
    }

    adjust_search_box_width();

    $(window).on("resize", function() {
        adjust_search_box_width();
    });
});
