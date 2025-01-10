import { Connection, EntityManager, IDatabaseDriver } from '@mikro-orm/core';
import { Request, Response } from 'express';

export type MyContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
  req: Request & {
    session?: any /*dovrebbe essere Express.Session ma non funziona*/;
  };
  res: Response;
};
