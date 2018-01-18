$('#submit').click(
    function () {
        var formData = $('form').serialize();
        $.ajax({
            type: 'post',
            url: '/carrots-admin-ajax/a/login',
            async: true,
            contentType: 'application/x-www-form-urlencoded',
            data: formData,
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if ((data.code === -5003) || (data.code === -5004)) {
                    $('#error').text(data.message);
                    setTimeout(function () { $('#error').text(''); }, 2000);
                    console.log(data.message);
                }
                else if (data.code === 0) {
                    console.log(data.message);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            },
        });
    }
);
