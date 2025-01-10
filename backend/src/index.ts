import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import microConfig from './mikro-orm.config';
import { JobPostResolver } from './resolvers/JobPost';
import { UserResolver } from './resolvers/user';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { __prod__ } from './costants';
import { MyContext } from './types';

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  orm.getMigrator().up();

  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient({
    host: '127.0.0.1', // Assicurati che sia '127.0.0.1'
    port: 6379, // Porta predefinita di Redis
  });

  app.use(
    session({
      name: 'qid',
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: 'lax',
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: 'uyggiggyugyuguiygui',
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [JobPostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
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
