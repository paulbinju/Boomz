/// <reference path="Tost/jquery.tostie.js" />
/// <reference path="Tost/jquery.tostie.js" />


var WSURL = "http://127.0.0.1:4020/BoomzWebService.asmx/";

function checkConnection() {

    var networkState = navigator.connection.type;
    if (networkState == Connection.NONE) {

        navigator.notification.confirm('Internet connection not available!',
                                         function onConfirm(index) {
                                             if (index == 1) {
                                                 checkConnection();
                                             }
                                         },
                                       'Offline',
                                       ['Retry', 'Cancel']
                                       );
    }
    else {
        window.location = window.location;
    }
}



var pushNotification = "";

function onNotificationGCM(e) {
   // alert('json:' + JSON.stringify(e));
    switch (e.event) {
        case 'registered':

            if (e.regid.length > 0) {
                AddUserGCM(e.regid);
                localStorage.setItem('regid', e.regid);
                console.log("regID = " + e.regid);
            }

            break;
        case 'message':

            HandleAndroidPush(e, 'index.html');
            break;

        case 'error':
            alert("GCM not registered");
            alert('Error:' + e.msg);
            //$('#btnLogin').removeClass('ui-disabled');
            //$('#btnLogin').trigger('refresh');
            //if ($('#btnLogin').length > 0) {
            //    $('#btnLogin').removeClass('ui-disabled');
            //    $('#btnLogin').trigger('refresh');
            //}
            break;

        default:
            break;
    }
}


function AddUserGCM(regid) {
   
    var reg = new Registration();
    reg.EmailAddress = "support@boomzbahrain.com";
    reg.GCMID = regid;
    reg.Type = device.platform;
    reg.Key = "B@@MZ_KEY";


    if (localStorage.getItem("isRegistered") != "true") {

        if (reg.GCMID != "") {
            var email = localStorage.getItem('email');
            request = JSON.stringify(reg);
            
            $.ajax({
                beforeSend: function (xhr) {
                    //ShowLoading('Please wait...');
                    //xhr.setRequestHeader("SOAPAction", SoapAction + "IService/SignIn");
                }, //Show spinner
                complete: function () {
                    // HideLoading();
                }, //Hide spinner
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "http://www.boomzbahrain.com/boomzwebservice.asmx/AddUserGCM",
                data: request,//'{"test":"' + test + '"}',
                dataType: "json",
                success: function (data) {
                    //alert("success");
                    if (data.d.split("|")[0] == "true") {
                        //alert(data.d.split("|")[0]);
                        localStorage.setItem("isRegistered", "true");
                        //window.location = "index.html";
                    }
                },
                error: function (error) {
                    //alert("Error Occured");
                    alert(JSON.stringify(error));
                }
            });
        }
    }

}



function Registration() {
    this.EmailAddress = "";
    this.GCMID = "";
    this.Type = "";
    this.Key = "";
}
function includeJS(jsFile) {
    $('head').append($('<script>').attr('type', 'text/javascript').attr('src', jsFile));
}

function includeCSS(href) {
    var cssLink = $("<link rel='stylesheet' type='text/css' href='" + href + "'>");
    $("head").append(cssLink);
}


function HandleAndroidPush(e, loca) {


    if (e.foreground) {

        //var my_media = new Media("/android_asset/www/beep.wav");
        //my_media.play();
        Notify(e.payload.message, loca);
    }
    else {
        window.location = loca;
    }

}

function HideLoading() {
    $("div[data-role='page']").removeClass('ui-disabled');
    $.mobile.loading('hide');
}

function ShowLoading(msg) {

    $.mobile.loading('show', {
        text: msg,
        textVisible: true,
        theme: 'a',
        textonly: false,
        html: "<span class='loaderback ui-bar ui-overlay-c ui-corner-all'><img src='js/jQMobile/css/images/ajax-loader.gif' style='width:100%'/><center><h2 class='ui-li-heading'>Please wait...</h2></center></span>"
    });
    $("div[data-role='page']").addClass('ui-disabled');

}

$(function () {

    includeCSS('js/Tost/jquery.notifyBar.css');
    //includeJS('js/jquery-1.11.1.min.js');
    includeJS('js/Tost/jquery.notifyBar.js');
    includeJS('js/PushNotification.js');

});

function Notify(msg, loca) {


    //$.notifyBar({
    //    cssClass: "notificationdiv1", html: "<div style='margin:5px;'\"><span class='e'>" + msg + "</span></div>", delay: 8000,
    //    animationSpeed: "normal"
    //});

    // alert(msg);

    $.notifyBar({
        cssClass: "notificationdiv1", html: "<div class='jquery-notify-bar.top'\"><span class='e'>" + msg + "</span></div>", delay: 3000,
        animationSpeed: "normal"
    });
    $('div.notificationdiv1').on('click', function () {
        window.location = loca;
    });

    // $().tostie({ type: "success", inOutType: "fade", loc: loca, message: msg });



}

function successHandler(result) {
    //alert('successHandler:' + result);
}

function errorHandler(error) {

    alert('errorHandler:' + error);
}