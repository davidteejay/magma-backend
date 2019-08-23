import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'welcome to barefoot-nomad'
  });
});
export default router;
