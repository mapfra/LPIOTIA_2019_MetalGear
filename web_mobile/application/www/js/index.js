/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

const app = {
    form : {
        id : "#order_create",
        containerId : "#controller",
        valid : false,
        url : "http://linserv-info-03.iutnice.unice.fr/m314/mvc-core/index.php?service=1&model=order&action=",
        method : "POST",

        validate : () => {
            app.form.valid = false;
            let n = 0;

            $(app.form.id + ' :required').each(function() {
                if (! this.checkValidity()) {
                    n++;
                    $(this).parent().before("<div class='warning'>" + this.validationMessage + "</div>");
                    $(this).parent().addClass("ui-error");
                    /*
                        if (n===1) {
                            $(this).focus();
                        }
                     */
                }
            });

            if (n === 0) {
                $("#create").parent().addClass("ui-state-persist");
                app.form.valid = true;
            }

            console.log('Form is valid : ' + app.form.valid + ', with ' + n + " error(s).");

            return app.form.valid;
        },

        submit : (e) => {
            e.preventDefault();
            console.log("loading : " + e.data.action + " ...");
            let $form = $(app.form.id);

            $.ajax({
                url: app.form.url + e.data.action,
                method: app.form.method,
                dataType: "html",
                data: $form.serialize(),
                success: function (body) {
                    $(app.form.containerId).html(body).trigger("create");
                },
                error : function(e) {
                    console.log("... loading error during process" + e)
                },
                complete: function () {
                    console.log("... form loading complete");
                    if (app.form.validate()) {
                        $("#create").on("click", function (e) {
                            e.preventDefault();
                        });
                        $("#persist").prop("disabled", false).on("click", {action : 'persist'}, app.form.submit);
                    } else {
                        $("#create").on("click", {action: "create"}, app.form.submit);
                        $("#persist").prop("disabled", true).off("click");
                    }
                    // #order_create input, #order_create select, #order_create textarea
                    $(app.form.id + " input, " + app.form.id+" select, " + app.form.id + " textarea").on("change", {action: "create"}, app.form.submit);
                },
                cache: false
            });
        }
    },

    // Application Constructor
    initialize : function() {
        console.log("Initialization ...", Date.now().toLocaleString());

        // deviceready Event Handler
        document.addEventListener('deviceready', this.onDeviceReady, false);
        console.log("... Device is ready", Date.now().toLocaleString());
    },

    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady : function() {
        /* Sample Event Listener :
        document.addEventListener("volumeupbutton", callbackFunction, false);
        function callbackFunction() {
            alert('Volume Up Button is pressed!')
        }

        // Handling Back Button
        document.addEventListener("backbutton", onBackKeyDown, false);
        function onBackKeyDown(e) {
            e.preventDefault();
            alert('Back Button is Pressed!');
        }

        // Battery Status
        window.addEventListener("batterystatus", onBatteryStatus, false);
        function onBatteryStatus(info) {
            alert("BATTERY STATUS\nCharge: " + info.level + "%\nPlugged: "
                + info.isPlugged);
        }*/

        console.log("loading form ...");
        $(app.form.containerId).load(app.form.url + "create", function() {
            console.log("... form loaded");
            $("#persist").prop("disabled", false);
            // #order_create input, #order_create select, #order_create textarea
            $(app.form.id + " input, " + app.form.id+" select, " + app.form.id + " textarea").on("change", {action : "create"}, app.form.submit);
        });

        // Take a Picture
        $("#cameraTakePicture").on("click",
            function () {
            navigator.camera.getPicture(function (imageData) {
                // document.getElementById('myImage').src = imageData;
                $('#myImage').attr("src", imageData);
            }, function (message) {
                alert('Failed because: ' + message);
            }, {
                quality : 90,
                destinationType : Camera.DestinationType.FILE_URI
            });
        });
    }
};

app.initialize();
