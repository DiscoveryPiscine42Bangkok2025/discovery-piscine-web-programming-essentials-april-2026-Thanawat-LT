var list_box = document.getElementById("ft_list");
var add_btn = document.getElementById("new_btn");

window.onload = function() {
    load_cookie();
};

add_btn.onclick = function() {
    var user_text = prompt("What do you want to do?");
    
    if (user_text != null && user_text != "") {
        make_box(user_text);
        save_cookie();
    }
};

function make_box(text) {
    var box = document.createElement("div");
    box.className = "todo-box";
    box.innerText = text;
      
    box.onclick = function() {
        var check = confirm("Do you want to delete this task?");
        if (check == true) {
            box.remove();
            save_cookie();
        }
    };
     
    list_box.prepend(box);
}

function save_cookie() {
    var items = document.getElementsByClassName("todo-box");
    var all_text = "";
    
    for (var i = items.length - 1; i >= 0; i--) {
        all_text += items[i].innerText + ",";
    }   
    
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