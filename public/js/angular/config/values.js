'use strict';

app
    .constant('config', {
        BASE_URL: "http://URL",
        COOKIR_DURATION: '7',
        UNAUTHORIZED: [
            "/login",
            "/register"
        ]
    });