import { faker } from "@faker-js/faker";

import db from "./database";

const TOTAL_USERS = 1000;

const HOBBIES = [
  "padel",
  "reading",
  "gaming",
  "cooking",
  "hiking",
  "painting",
  "photography",
  "music",
  "traveling",
  "gardening",
  "cycling",
  "yoga",
  "swimming",
  "writing",
  "dancing",
  "fishing",
  "chess",
  "knitting",
  "running",
  "surfing",
  "coding",
];

const NATIONALITIES = [
  "Mexican",
  "Colombian",
  "Russian",
  "Mauritian",
  "Spanish",
  "Brazilian",
  "British",
  "Canadian",
  "Aussie",
  "French",
  "German",
  "Italian",
  "Japanese",
  "Indian",
  "Chinese",
  "Korean",
  "Dutch",
];

const data = db.prepare("SELECT COUNT(*) as count FROM users").get() as {
  count: number;
};
const hasData = data.count > 0;

if (hasData) {
  console.log("Database is already seeded");
  process.exit(0);
}

//Insert data
const insertUser = db.prepare(
  `INSERT INTO users (avatar, first_name, last_name, age, nationality)
   VALUES (?, ?, ?, ?, ?) 
`,
);

const insertHobby = db.prepare(
  `INSERT INTO user_hobbies (user_id, hobby) VALUES (?, ?)`,
);

const implementSeed = db.transaction(() => {
  for (let i = 0; i < TOTAL_USERS; i++) {
    const result = insertUser.run(
      faker.image.avatar(),
      faker.person.firstName(),
      faker.person.lastName(),
      faker.number.int({ min: 18, max: 80 }),
      faker.helpers.arrayElement(NATIONALITIES),
    );

    const userId = result.lastInsertRowid;
    const numHobbies = faker.number.int({ min: 0, max: 10 });
    const userHobbies = faker.helpers.arrayElements(HOBBIES, numHobbies);

    for (const hobby of userHobbies) {
      insertHobby.run(userId, hobby);
    }
  }
});

implementSeed();
console.log(`Seeded ${TOTAL_USERS} users successfully, khalas.`);
