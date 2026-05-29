import db from "../db/database";
import { ESortDir, EUserFields } from "../enums/filters.enum";
import { IFilterOption } from "../interfaces/filters.interface";
import {
  ITotal,
  IUserRow,
  IUsersQueryParsed,
  IUsersResponse,
} from "../interfaces/users.interface";
import {
  sanitizeSortDir,
  sanitizeSortField,
  toSortColumn,
} from "../utils/query-validators";
import { sortByValue } from "../utils/sort.utils";

export const getUsers = (query: IUsersQueryParsed): IUsersResponse => {
  const {
    search = "",
    nationalities = [],
    hobbies = [],
    sortBy = EUserFields.FIRST_NAME,
    sortDir = ESortDir.ASC,
    page = 1,
    limit = 20,
  } = query;

  const hasHobbies = hobbies.length > 0;
  const hasNationalities = nationalities.length > 0;

  const offset = (page - 1) * limit;
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (search) {
    conditions.push(
      `(LOWER(u.first_name) LIKE LOWER(?) OR LOWER(u.last_name) LIKE LOWER(?))`,
    );
    params.push(`%${search}%`, `%${search}%`);
  }

  if (hasHobbies) {
    hobbies.forEach((hobby) => {
      conditions.push(`EXISTS(
        SELECT 1 FROM user_hobbies uh
        WHERE uh.user_id = u.id AND uh.hobby = ?
        )`);
      params.push(hobby);
    });
  }

  if (hasNationalities) {
    conditions.push(
      `u.nationality IN (${nationalities.map(() => "?").join(",")})`,
    );
    params.push(...nationalities);
  }

  const where =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const safeSortBy = sanitizeSortField(sortBy);
  const safeSortDir = sanitizeSortDir(sortDir);

  const sortColumn = toSortColumn(safeSortBy);
  const orderBy = `ORDER BY u.${sortColumn} ${safeSortDir}, u.id ${ESortDir.ASC}`;

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
    .all([...params, limit, offset]) as IUserRow[];

  const { total } = db
    .prepare(
      `
      SELECT COUNT(DISTINCT u.id) as total
      FROM users u
      ${where}
    `,
    )
    .get([...params]) as ITotal;

  const topHobbies = db
    .prepare(
      ` 
        SELECT uh.hobby as value, COUNT(*) as count
        FROM user_hobbies uh
        JOIN users u ON u.id = uh.user_id
        ${where}
        GROUP BY uh.hobby
        ORDER BY count DESC
        LIMIT 20
      `,
    )
    .all([...params]) as IFilterOption[];

  const topNationalities = db
    .prepare(
      `
      SELECT u.nationality as value, COUNT(*) as count
      FROM users u
      ${where}
      GROUP BY u.nationality
      ORDER BY count DESC
      LIMIT 20
    `,
    )
    .all([...params]) as IFilterOption[];

  return {
    data: users.map((u) => ({
      id: u.id,
      avatar: u.avatar,
      firstName: u.first_name,
      lastName: u.last_name,
      age: u.age,
      nationality: u.nationality,
      hobbies: u.hobbies ? u.hobbies.split(",") : [],
    })),
    total,
    hasMore: offset + limit < total,
    hobbies: topHobbies.sort(sortByValue),
    nationalities: topNationalities.sort(sortByValue),
  };
};
