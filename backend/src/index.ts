import { MikroORM } from '@mikro-orm/core';
import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { __prod__, COOKIE_NAME } from './costants';
import microConfig from './mikro-orm.config';
import { JobPostResolver } from './resolvers/JobPost';
import { UserResolver } from './resolvers/user';
import { MyContext } from './types';
import { sendEmail } from './utils/send-email';
import { User } from './entities/User';

const main = async () => {
  // sendEmail('kevinagyemann@gmail.com', 'bar');
  const orm = await MikroORM.init(microConfig);
  // await orm.em.nativeDelete(User, {});
  await orm.getMigrator().up();

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis({
    host: '127.0.0.1', // Assicurati che sia '127.0.0.1'
    port: 6379, // Porta predefinita di Redis
  });

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redis, disableTouch: true }),
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
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res, redis }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.get('/', (_, res) => {
    res.send('server is running');
  });

  app.listen(4000, () => {
    console.log('server is running on port 4000');
  });
};

main().catch((err) => console.error(err));
