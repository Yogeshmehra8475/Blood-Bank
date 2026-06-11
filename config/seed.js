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
    "Aditya",
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
    "Shankar",
    "Dinesh",
    "Anurag",
    "Mohit",
    "Himanshu",
    "Deepa",
    "Santosh",
    "Harsh"
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
    "Joshi"
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

// District-specific mobile prefixes to make numbers look realistic and regionally grouped
const DISTRICT_PREFIXES = [
  "98",
  "97",
  "96",
  "95",
  "94",
  "93",
  "92",
  "91",
  "89",
  "88",
  "87",
  "86",
  "85",
];

function mobileForDistrict(districtIndex, seq) {
  const prefix = DISTRICT_PREFIXES[districtIndex % DISTRICT_PREFIXES.length];
  // create an 8-digit suffix using seq and a random offset to reduce collisions
  const suffixNum = (seq + randInt(1000, 99999999)) % 100000000;
  const suffix = suffixNum.toString().padStart(8, "0");
  return `${prefix}${suffix}`;
}

const BLOOD_GROUPS = ["A+", "B+", "B-", "A-", "AB+", "O+", "O-", "AB-"];

// Uttarakhand districts (13 total)
const DISTRICTS = [
  "Almora",
  "Bageshwar",
  "Chamoli",
  "Champawat",
  "Dehradun",
  "Haridwar",
  "Nainital",
  "Pauri Garhwal",
  "Pithoragarh",
  "Rudraprayag",
  "Tehri Garhwal",
  "Udham Singh Nagar",
  "Uttarkashi",
];

function generateDummyEntries(count = 100, city = "Champawat", districtIndex = 0) {
  const out = [];
  for (let i = 0; i < count; i++) {
    const name = randomName();
    const age = randInt(20, 60);
    out.push({
      name: name,
      usermail: randomEmail(name),
      birthdate: randomBirthdateFromAge(age),
      mobile: mobileForDistrict(districtIndex, i),
      bloodgroup: BLOOD_GROUPS[randInt(0, BLOOD_GROUPS.length - 1)],
      country: "India",
      state: "Uttarakhand",
      city: city,
      age: age,
    });
  }
  return out;
}

function mobileFromPrefix(prefix, counter) {
  // prefix length may be 2-4; we need total 10 digits
  const needed = 10 - prefix.length;
  const suffix = (counter + randInt(0, 999999)).toString().padStart(needed, "0");
  return `${prefix}${suffix}`.slice(0, 10);
}

// Generate 200 donors per district -> 13 * 200 = 2600 entries

export async function seedAll() {
  try {
    if (!db || !userdata) {
      throw new Error("Database or schema not imported correctly");
    }
    // Try to collect real mobile prefixes from existing Pithoragarh and Champawat records
    let realPrefixes = [];
    let existing = [];
    try {
      existing = await db.select().from(userdata);
      const filtered = existing.filter(
        (r) => r.city && (r.city.toLowerCase().includes("pithoragarh") || r.city.toLowerCase().includes("champawat")) && r.mobile
      );
      const prefixSet = new Set();
      for (const r of filtered) {
        const m = String(r.mobile).replace(/[^0-9]/g, "");
        if (m.length >= 4) prefixSet.add(m.slice(0, 4));
        else if (m.length >= 3) prefixSet.add(m.slice(0, 3));
      }
      realPrefixes = Array.from(prefixSet);
    } catch (e) {
      console.warn("Could not read existing mobiles from DB, falling back to generated prefixes", e);
    }

    // Build set of existing usermails to avoid unique constraint violations
    const existingEmails = new Set(existing.map((r) => String(r.usermail).toLowerCase()));

    const usedMobiles = new Set();
    const usedEmails = new Set();
    const out = [];
    for (let idx = 0; idx < DISTRICTS.length; idx++) {
      const district = DISTRICTS[idx];
      for (let i = 0; i < 200; i++) {
        const name = randomName();
        const age = randInt(20, 60);
        let mobile = null;
        if (realPrefixes.length > 0) {
          const prefix = realPrefixes[(idx + i) % realPrefixes.length];
          let counter = i;
          mobile = mobileFromPrefix(prefix, counter);
          // avoid collisions
          while (usedMobiles.has(mobile)) {
            counter++;
            mobile = mobileFromPrefix(prefix, counter);
          }
        } else {
          // fallback to district generated mobiles
          mobile = mobileForDistrict(idx, i);
          while (usedMobiles.has(mobile)) {
            mobile = mobileForDistrict(idx, i + randInt(1, 1000));
          }
        }
        usedMobiles.add(mobile);

        // generate a deterministic but unique usermail for seeding to avoid collisions
        const base = name.toLowerCase().replace(/[^a-z]/g, ".");
        let candidate = `${base}.${idx}.${i}@example.com`;
        let k = 0;
        while (existingEmails.has(candidate) || usedEmails.has(candidate)) {
          k++;
          candidate = `${base}.${idx}.${i}.${k}@example.com`;
        }
        usedEmails.add(candidate);

        out.push({
          name: name,
          usermail: candidate,
          birthdate: randomBirthdateFromAge(age),
          mobile: mobile,
          bloodgroup: BLOOD_GROUPS[randInt(0, BLOOD_GROUPS.length - 1)],
          country: "India",
          state: "Uttarakhand",
          city: district,
          age: age,
        });
      }
    }

    // Insert all records in a single batch if supported by the adapter
    await db.insert(userdata).values(out);
    console.log(`Seeded ${out.length} users across ${DISTRICTS.length} districts`);
  } catch (err) {
    console.error("Seeding failed:", err);
    throw err;
  }
}


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
