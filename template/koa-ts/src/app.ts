import path from 'path';
import Koa from 'koa';
import koaStatic from 'koa-static';
import cors from 'koa2-cors';
import logger from 'koa-logger';
import BodyParser from 'koa-bodyparser';
import router from './router';
import toolRouter from './router/tool';
import config from './config';

const app: Koa = new Koa();

app.use(cors());
app.use(BodyParser());
app.use(logger());
app.use(koaStatic(path.join(__dirname, '../public/uploads')));

app.use(router.routes());
app.use(toolRouter.routes());

app.listen(config.port);
