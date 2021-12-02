import { Request, Response, Router } from 'express';

import passportAuth from './../middlewares/check-jwt.middlerare';

const router = Router();

router.get(
  '/private',

  // passport.authenticate('jwt', { session: false }),
  passportAuth,

  (req: Request, res: Response) => {
    res.status(200).json({ msg: 'Success!!!' });
  }
);

export default router;
