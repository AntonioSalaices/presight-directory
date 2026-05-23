import db from "./database";

const data = db.prepare("SELECT COUNT(*) as count FROM users").get() as {
  count: number;
};
const hasData = data.count > 0;

if (hasData) {
  console.log("Ya tiene data");
  process.exit(0);
}

//Insert data
console.log("Khalas");
