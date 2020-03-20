const Router = require('koa-router');
const OrderController = require('../controllers/order');

const router = new Router({
  prefix: '/glory'
});

router.post('/order/create', OrderController.create);
router.post('/order/get7', OrderController.getSevenByPeriod);
router.post('/order/getOrderByPeriod', OrderController.getOrderByPeriod);
router.post('/order/getRecordList', OrderController.getRecordList);

module.exports = router