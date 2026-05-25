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
      page: Number(req.query.page),
      limit: Number(req.query.limit),
    });

    res.json(result);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
