import { Router, Request, Response, NextFunction } from "express";

import { getUsers } from "../services/users";
import { toStringArray } from "../utils/utils";
import { IUsersQuery } from "../interfaces/users.interface";

const router = Router();

router.get(
  "/",
  (
    req: Request<{}, {}, {}, IUsersQuery>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = getUsers({
        search: req.query.search,
        nationalities: toStringArray(req.query.nationality),
        hobbies: toStringArray(req.query.hobby),
        sortBy: req.query.sortBy,
        sortDir: req.query.sortDir,
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 20,
      });

      res.json(result);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
