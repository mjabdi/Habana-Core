import express from 'express';
// import testService from '../services/test-service'
// import priceOracleService from '../services/price-oracle-service'
// import habanaInfoService from '../services/habana-info-service'

import emailService from '../services/email-service'


const router = express.Router();


// router.use('/test', testService);
// router.use('/price', priceOracleService);
// router.use('/habana', habanaInfoService);

router.use('/email', emailService);



export default router;
