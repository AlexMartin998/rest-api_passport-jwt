import { Request, Response, Router } from 'express';
import passport from 'passport';

const router = Router();

router.get(
  '/private',
  passport.authenticate('jwt', { session: false }),
  (req: Request, res: Response) => {
    res.status(200).json({ msg: 'Success!' });
  }
);

export default router;
