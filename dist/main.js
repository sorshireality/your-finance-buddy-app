"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_serverless_express_1 = require("aws-serverless-express");
const middleware_1 = require("aws-serverless-express/middleware");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const binaryMimeTypes = [];
let cachedServer;
process.on('unhandledRejection', (reason) => {
    console.error(reason);
});
process.on('uncaughtException', (reason) => {
    console.error(reason);
});
function bootstrapServer() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!cachedServer) {
            try {
                const expressApp = require('express')();
                const nestApp = yield core_1.NestFactory.create(app_module_1.AppModule, expressApp);
                nestApp.use(middleware_1.eventContext());
                yield nestApp.init();
                cachedServer = aws_serverless_express_1.createServer(expressApp, undefined, binaryMimeTypes);
            }
            catch (error) {
                return Promise.reject(error);
            }
        }
        return Promise.resolve(cachedServer);
    });
}
exports.handler = (event, context) => __awaiter(void 0, void 0, void 0, function* () {
    cachedServer = yield bootstrapServer();
    return aws_serverless_express_1.proxy(cachedServer, event, context, 'PROMISE').promise;
});
//# sourceMappingURL=main.js.map