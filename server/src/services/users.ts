import db from "../db/database";
import { ESortDir, EUserFields } from "../enums/filters.enum";
import {
  IUser,
  IUsersQuery,
  IUsersResponse,
} from "../interfaces/users.interface";

export function getUsers(query: IUsersQuery): IUsersResponse {
  const {
    search = "",
    nationalities = [],
    hobbies = [],
    sortBy = EUserFields.FIRST_NAME,
    sortDir = ESortDir.ASC,
    page = 1,
    limit = 20,
  } = query;

  const offset = (page - 1) * limit;
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (search) {
    conditions.push(`(u.first_name LIKE ? OR u.last_name LIKE ?)`);
    params.push(`%${search}%`, `%${search}%`);
  }

  const where =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  const orderBy = `ORDER BY u.${sortBy} ${sortDir}, u.id ${ESortDir.ASC}`;

  const users = db
    .prepare(
      `
    SELECT u.*, GROUP_CONCAT(uh.hobby) as hobbies
    FROM users u
    LEFT JOIN user_hobbies uh ON uh.user_id = u.id
    ${where}
    GROUP BY u.id
    ${orderBy}
    LIMIT ? OFFSET ?
  `,
    )
    .all([...params, limit, offset]) as any[];

  const { total } = db
    .prepare(
      `
      SELECT COUNT(DISTINCT u.id) as total
      FROM users u
      ${where}
    `,
    )
    .get([...params]) as { total: number };

  return {
    data: users.map((u) => ({
      ...u,
      hobbies: u.hobbies ? u.hobbies.split(",") : [],
    })),
    total,
    hasMore: offset + limit < total,
    hobbies: [],
    nationalities: [],
  };
}
