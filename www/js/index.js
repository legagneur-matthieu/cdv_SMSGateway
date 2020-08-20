document.addEventListener('deviceready', function () {
    $dwf.init();
    localStorage.setItem("log", "");
//        webserver = cordova.plugins.webserver;
    function checkPerm() {
        var permissions = cordova.plugins.permissions;
        var list = [
            permissions.INTERNET,
            permissions.SEND_SMS,
            permissions.READ_PHONE_STATE
        ];
        permissions.checkPermission(list, function (status) {
            if (!status.hasPermission) {
                permissions.requestPermissions(list, function (status) {
                    if (!status.hasPermission) {
                        checkPerm();
                    }
                }, function () {
                    if (!status.hasPermission) {
                        checkPerm();
                    }
                });
            }
        }, function () {
            if (!status.hasPermission) {
                checkPerm();
            }
        });
    }
    ;
    checkPerm();
    function QueryStringToJSON(queryString) {
        var pairs = explode("&", queryString);
        var result = {};
        pairs.forEach(function (pair) {
            pair = explode("=", pair);
            result[pair[0]] = decodeURIComponent(pair[1] || '');
        });
        return JSON.parse(JSON.stringify(result));
    }
    function sendResponse(request, body) {
        webserver.sendResponse(
                request.requestId,
                {
                    status: 200,
                    body: body,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
        );
    }
    function addLog(line) {
        localStorage.setItem("log",
                "[" + date("Y-m-d H:i:s") + "] " + line + "\n" +
                localStorage.getItem("log"));
        $("#log").val(localStorage.getItem("log"));

    }

    function checkRuning(logIt = false) {
        $.get("http://127.0.0.1:8080/run", {}, function (data) {
            $("#status").text(data.runing ? "On" : "Off");
            logIt ? addLog(data.runing ? "OK" : "Error") : false;
        }, "JSON");
    }
    function main() {
//define server
        webserver.onRequest(
                function (request) {
                    if (!empty(request.query)) {
                        data = QueryStringToJSON(request.query);
                    } else {
                        data = [];
                    }
                    switch (request.path) {
                        case "/sendsms":
                            if (isset(data["phone"]) && isset(data["text"])) {
                                if (localStorage.getItem("psw")) {
                                    checkPsw = (localStorage.getItem("psw") == data["psw"]);
                                } else {
                                    checkPsw = true;
                                }
                                if (checkPsw) {
                                    //envois de SMS
                                    sms.send(data["phone"], data["text"],
                                            {replaceLineBreaks: true, android: {intent: ''}},
                                            function () {
                                                addLog("SMS send to " + data["phone"]);
                                                sendResponse(request, '{"send":true}');
                                            },
                                            function () {
                                                addLog("Error SMS to " + data["phone"]);
                                                sendResponse(request, '{"send":false, "msg":"Send error !"}');
                                            });
                                } else {
                                    addLog("Error SMS : Bad Password !");
                                    sendResponse(request, '{"send":false, "msg":"Bad Password !"}');
                                }
                            } else {
                                addLog("Error SMS : No phone or text !");
                                sendResponse(request, '{"send":false, "msg":"No phone or text !"}');
                            }
                            break;
                        case"/run":
                        default:
                            sendResponse(request, '{"runing":true}');
                            break;
                    }
                });
        //Run server
        addLog("Demarage du serveur")
        webserver.start();
        checkRuning(true);
        setInterval(function () {
            checkRuning();
        }, 60 * 1000);
    }
    $(document).ready(function () {
        main();
        (function () {
            form = $dwf.form("form_psw");
            form.input("Mot de passe", "psw", "password", (localStorage.getItem("psw") ? localStorage.getItem("psw") : ""));
            form.submit("btn-sm btn-primary", "(Re)Definir");
            $("#form_psw").submit(function (e) {
                e.preventDefault();
                form.get_post();
                localStorage.setItem("psw", $_post["psw"]);
                addLog("Mot de passe (re)défini")
                alert("Mot de passe (re)defini !")
            });
            $("#del_psw").click(function (e) {
                e.preventDefault();
                localStorage.removeItem("psw");
                $("#psw").val("");
                addLog("Mot de passe supprimé")
                alert("Mot de passe supprimé !");
            });
        })();
    })
}, false);
/**
 * libs:
 * https://github.com/bykof/cordova-plugin-webserver
 * 
 */