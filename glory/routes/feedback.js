const Router = require('koa-router');
const feedbackController = require('../controllers/feedback');

const router = new Router({
  prefix: '/glory'
});

router.post('/feedback', feedbackController.create);

module.exports = router