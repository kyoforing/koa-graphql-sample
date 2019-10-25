const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router'); // koa-router@7.x
const graphqlHTTP = require('koa-graphql');
const dotenv = require('dotenv');

const env = process.env.NODE_ENV || 'development';

if (env === 'development') dotenv.config({ path: '.env.development' });
else dotenv.config({ path: '.env.production' });

const schema = require('./resolver/AuthorResolver');

const app = new Koa();
const router = new Router();

app.use(bodyParser());

router.get('/', async (ctx, next) => {
  ctx.status = 200;
  ctx.body = 'Hello World';

  await next();
});

router.all(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.use(router.routes());

app.listen(3000, () => {
  console.log('==> 🌎  Listening on port 3000');
});
