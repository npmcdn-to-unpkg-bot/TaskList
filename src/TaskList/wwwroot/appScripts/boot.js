"use strict";
const platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
const http_1 = require('@angular/http');
const app_1 = require('./app');
platform_browser_dynamic_1.bootstrap(app_1.AppComponent, http_1.HTTP_PROVIDERS);
