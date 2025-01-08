"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const costants_1 = require("./costants");
const JobPost_1 = require("./entities/JobPost");
const path_1 = __importDefault(require("path"));
const User_1 = require("./entities/User");
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [JobPost_1.JobPost, User_1.User],
    dbName: 'upwaiter',
    type: 'postgresql',
    debug: !costants_1.__prod__,
};
//# sourceMappingURL=mikro-orm.config.js.map