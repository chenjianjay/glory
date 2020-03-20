const Router = require('koa-router');
const SkimController = require('../controllers/skim');

const router = new Router({
  prefix: '/glory'
});

router.post('/skim/create', SkimController.create);
router.post('/skim/update', SkimController.update);
router.post('/skim/getSkims', SkimController.getSkims);

module.exports = router