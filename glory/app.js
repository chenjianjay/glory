const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa-cors');

app.use(cors());

const user = require('./routes/user')
const skim = require('./routes/skim')
const order = require('./routes/order')
const feedback = require('./routes/feedback')
const task = require('./routes/task')
const winner = require('./routes/winner')

const { dailySchedule, weeklySchedule } = require('./schedule/schedule')
dailySchedule()
weeklySchedule()

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(user.routes(), user.allowedMethods())
app.use(skim.routes(), user.allowedMethods())
app.use(order.routes(), user.allowedMethods())
app.use(feedback.routes(), user.allowedMethods())
app.use(task.routes(), user.allowedMethods())
app.use(winner.routes(), user.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
