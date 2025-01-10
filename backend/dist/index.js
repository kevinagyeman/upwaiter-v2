"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@mikro-orm/core");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const JobPost_1 = require("./resolvers/JobPost");
const user_1 = require("./resolvers/user");
const redis_1 = __importDefault(require("redis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const costants_1 = require("./costants");
const main = async () => {
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    orm.getMigrator().up();
    const app = express_1.default();
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redisClient = redis_1.default.createClient({
        host: '127.0.0.1',
        port: 6379,
    });
    app.use(express_session_1.default({
        name: 'qid',
        store: new RedisStore({ client: redisClient, disableTouch: true }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: 'lax',
            secure: costants_1.__prod__,
        },
        saveUninitialized: false,
        secret: 'uyggiggyugyuguiygui',
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await type_graphql_1.buildSchema({
            resolvers: [JobPost_1.JobPostResolver, user_1.UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ em: orm.em, req, res }),
    });
    apolloServer.applyMiddleware({ app });
    app.get('/', (_, res) => {
        res.send('hello');
    });
    app.listen(4000, () => {
        console.log('server alla porta 4000');
    });
};
main().catch((err) => console.error(err));
//# sourceMappingURL=index.js.map