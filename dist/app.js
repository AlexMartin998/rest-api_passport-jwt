"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
require("./db/db");
console.clear();
models_1.app.listen(models_1.app.get('port'), () => {
    console.log('Server on port', models_1.app.get('port'));
});
