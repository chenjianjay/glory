const Router = require('koa-router');
const UserController = require('../controllers/user');

const router = new Router({
  prefix: '/glory'
});

router.post('/user/register', UserController.create);
router.post('/user/update', UserController.update)

module.exports = router