const Router = require('koa-router');
const TaskController = require('../controllers/task');

const router = new Router({
  prefix: '/glory'
});

router.post('/task/update', TaskController.update)
router.post('/task/get', TaskController.get)
router.post('/task/clear', TaskController.clear)

module.exports = router