const Router = require('koa-router');
const WinnerController = require('../controllers/winner');

const router = new Router({
  prefix: '/glory'
});

router.post('/winner/create', WinnerController.create)
router.post('/winner/get', WinnerController.get)

module.exports = router