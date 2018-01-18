function ajax(type, url, data, success, failed) {
    // 创建 XMLHttpRequest对象
    var xhr = null;
    if (window.XMLHttpRequest) {
        // IE7+, Firefox, Chrome, Opera, Safari
        xhr = new XMLHttpRequest();
    } else {
        // IE6, IE5
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    var type = type.toUpperCase();
    // GET或者POST方法
    if (type == 'GET') {
        xhr.open('GET', url + '?' + 'data', true);
        xhr.send();

    } else if (type == 'POST') {
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }

    // 处理返回函数
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                success(xhr.responseText);
            } else {
                if (failed) {
                    failed(xhr.status);
                }
            }
        }
    }
}

function success(right) {
    console.log(JSON.parse(right));
    var code = JSON.parse(right).code;
    var message = JSON.parse(right).message;
    if ((code === -5003) || (code === -5004)) {
        $('#error').text(message);
        setTimeout(function () { $('#error').text(''); }, 2000);
        console.log(message);
    }
    else if (code === 0) {
        console.log(message);
    }
}

function failed(error) {
    console.log(error);
}

$('#submit').click(
    function () {
        var data = $('form').serialize();
        ajax('post', '/carrots-admin-ajax/a/login', data, success, failed);
    }
);