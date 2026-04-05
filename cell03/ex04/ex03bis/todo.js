var $list_box = $("#ft_list");

$(window).on("load", function() {
    load_cookie();
});

$("#new_btn").on("click", function() {
    var user_text = prompt("What do you want to do?");

    if (user_text != null && user_text != "") {
        make_box(user_text);
        save_cookie();
    }
});

function make_box(text) {
    var $box = $("<div>").addClass("todo-box").text(text);

    $box.on("click", function() {
        var check = confirm("Do you want to delete this task?");
        if (check == true) {
            $box.remove();
            save_cookie();
        }
    });

    $list_box.prepend($box);
}

function save_cookie() {
    var all_text = "";

    $(".todo-box").each(function(i, el) {
        all_text += $(el).text() + ",";
    });

    document.cookie = "list_data=" + encodeURIComponent(all_text) + "; path=/; max-age=86400;";
}

function load_cookie() {
    var my_cookies = document.cookie.split(";");
    var data = "";

    for (var i = 0; i < my_cookies.length; i++) {
        var c = my_cookies[i].trim();
        if (c.indexOf("list_data=") == 0) {
            data = decodeURIComponent(c.substring(10));
            break;
        }
    }

    if (data != "") {
        var arr = data.split(",");
        for (var j = 0; j < arr.length; j++) {
            if (arr[j] != "") {
                make_box(arr[j]);
            }
        }
    }
}