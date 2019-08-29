import express from 'express';
import api from './api';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    body: 'Welcome to Barefoot Nomad API'
  });
});
router.use('/api', api);

export default router;
