$(document).ready(function () {
    $("html").on("click", ".stop-prop", function (e) {
        e.stopPropagation();
    });
});