import { Router, Request, Response } from "express";

import { getUsers } from "../services/users";
import { toStringArray } from "../utils/utils";
import { IUsersQuery } from "../interfaces/users.interface";

const router = Router();

router.get("/", (req: Request<{}, {}, {}, IUsersQuery>, res: Response) => {
  try {
    const result = getUsers({
      search: req.query.search,
      nationalities: toStringArray(req.query.nationalities),
      hobbies: toStringArray(req.query.hobbies),
      sortBy: req.query.sortBy,
      sortDir: req.query.sortDir,
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 20,
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
