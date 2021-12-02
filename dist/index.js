"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./models/app");
require("./db/db");
console.clear();
app_1.app.listen(app_1.app.get('port'), () => {
    console.log('Server on port', app_1.app.get('port'));
});
