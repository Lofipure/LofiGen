import Router from 'koa-router';
import Multer from 'koa-multer';
import path from 'path';
import fs from 'fs';
import config from '../config';
import { resBuilder } from '../utils';
import { IFile } from './types';

const toolRouter = new Router();
toolRouter.prefix('/tools');

const storage = Multer.diskStorage({
  destination(_, __, callback) {
    callback(null, path.join(__dirname, '../../public/uploads'));
  },
  filename(_, file, callback) {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = Multer({ storage });

toolRouter.post(
  '/upload',
  upload.single('file'),
  async (ctx) =>
    (ctx.body = {
      url: `${config.domain}:${config.port}/${
        (ctx.req as any)?.file?.filename
      }`,
    }),
);

toolRouter.get('/static_file_list', async (ctx) => {
  const dirPath = path.join(__dirname, '../../public/uploads');
  const list = await new Promise<IFile[]>((resolve, reject) => {
    fs.readdir(dirPath, (_, files) => {
      Promise.all(
        files.map(
          async (file) =>
            await new Promise<IFile>((resolve, reject) => {
              fs.stat(path.join(dirPath, file), (error, stats) =>
                error
                  ? reject(error)
                  : resolve({
                      filename: file,
                      url: `${config.domain}:${config.port}/${file}`,
                      ...stats,
                    }),
              );
            }),
        ),
      )
        .then((list) => resolve(list))
        .catch((reason) => reject(reason));
    });
  });
  ctx.body = resBuilder({ list });
});

export default toolRouter;
