import { db } from "./index.js";
import { userdata } from "./schema.js";

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pad(n) {
  return n.toString().padStart(2, "0");
}

function randomName() {
  const first = [
    "Aarav",
    "Vivaan",
    "Aditya",
    "Arjun",
    "Rohan",
    "Karan",
    "Siddharth",
    "Vikram",
    "Ravi",
    "Mohan",
    "Pooja",
    "Anjali",
    "Neha",
    "Sonia",
    "Priya",
    "Kavya",
  ];
  const last = [
    "Sharma",
    "Verma",
    "Singh",
    "Kumar",
    "Joshi",
    "Mehra",
    "Pandey",
    "Gupta",
    "Thakur",
    "Reddy",
  ];
  return `${first[randInt(0, first.length - 1)]} ${
    last[randInt(0, last.length - 1)]
  }`;
}

function randomEmail(name) {
  const n = name.toLowerCase().replace(/[^a-z]/g, ".");
  return `${n}${randInt(1000, 9999)}@example.com`;
}

function randomBirthdateFromAge(age) {
  const year = new Date().getFullYear() - age;
  const month = pad(randInt(1, 12));
  const day = pad(randInt(1, 28));
  return `${year}-${month}-${day}`;
}

function randomMobile() {
  let s = "";
  for (let i = 0; i < 10; i++) s += String(randInt(0, 9));
  return s;
}

const BLOOD_GROUPS = ["A+", "B+", "B-", "A-", "AB+", "O+", "O-", "AB-"];

function generateDummyEntries(count = 100) {
  const out = [];
  for (let i = 0; i < count; i++) {
    const name = randomName();
    const age = randInt(20, 40);
    out.push({
      name: name,
      usermail: randomEmail(name),
      birthdate: randomBirthdateFromAge(age),
      mobile: randomMobile(),
      bloodgroup: BLOOD_GROUPS[randInt(0, BLOOD_GROUPS.length - 1)],
      country: "India",
      state: "Uttarakhand",
      city: "Champawat",
      age: age,
    });
  }
  return out;
}

// Generate 200 entries (original 100 + next 100 requested)
const data = generateDummyEntries(100);

export async function seedAll() {
  try {
    if (!db || !userdata) {
      throw new Error("Database or schema not imported correctly");
    }
    // Insert all records in a single batch if supported by the adapter
    await db.insert(userdata).values(data);
    console.log(`Seeded ${data.length} users`);
  } catch (err) {
    console.error("Seeding failed:", err);
    throw err;
  }
}

export default data;

// If this file is executed directly (`node config/seed.js`), run seedAll()
import { fileURLToPath } from "url";
if (fileURLToPath(import.meta.url) === process.argv[1]) {
  try {
    await seedAll();
    process.exit(0);
  } catch (err) {
    process.exit(1);
  }
}
