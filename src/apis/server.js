import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import puppeteer from "puppeteer"; // Import Puppeteer
import mongoose from "mongoose";

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/roommateFinder", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const port = 5000;

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Function to generate an 8-character unique key
const generateUniqueKey = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

// Route to generate a unique key
app.get("/uniquekey", (req, res) => {
  const uniqueKey = generateUniqueKey();
  res.json({ uniqueKey });
});

// Function to perform web scraping
async function scrapeEvents() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://www.visitwindsoressex.com/events/", {
    waitUntil: "networkidle0",
  });

  let eventData = [];

  // Function to scrape current page
  async function scrapeCurrentPage() {
    const newEvents = await page.evaluate(() => {
      let events = [];
      let seenTitles = new Set();
      const items = document.querySelectorAll(".type-tribe_events");

      items.forEach((item) => {
        const img = item.querySelector(
          ".excerpt-thumbnail-container img.wp-post-image"
        );
        const titleLink = item.querySelector("h3.excerpt-title > a");
        const title = titleLink ? titleLink.innerText : null;
        const description = item.querySelector(".excerpt-content p");
        const eventMeta = item.querySelector(".excerpt-event-meta");

        if (title && !seenTitles.has(title)) {
          seenTitles.add(title);
          events.push({
            imgSrc: img ? img.src : null,
            title: title,
            eventDate: eventMeta ? eventMeta.innerText : null,
            description: description ? description.innerText : null,
          });
        }
      });
      return events;
    });

    eventData = eventData.concat(newEvents);
  }

  // Initial scrape
  await scrapeCurrentPage();

  // Continue scraping until we have at least 8 entries
  while (eventData.length < 8) {
    const hasNext = await page.evaluate(() => {
      const nextButton = document.querySelector("a.next");
      return nextButton && !nextButton.classList.contains("disabled");
    });

    if (!hasNext || eventData.length >= 8) break;

    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle0" }),
      page.click("a.next"),
    ]);

    await scrapeCurrentPage();
  }

  await browser.close();
  return eventData.slice(0, 8);
}

// Route to get events
app.get("/events", async (req, res) => {
  try {
    const events = await scrapeEvents();
    res.json(events);
  } catch (error) {
    console.error("Error during event scraping:", error);
    res.status(500).json({ error: "Failed to scrape data" });
  }
});

// Define the schema
const personSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  gender: { type: String, required: true },
  graduationYear: { type: String, required: true },
  enrolledCourse: { type: String, required: true },
  profileImage: { type: String, required: false }, // URL or path to the image
  plannedNeighbourhood: { type: String, required: true },
  currentLivingIn: { type: String, required: true },
  major: { type: String, required: true },
  hometown: { type: String, required: true },
  budget: { type: String, required: true },
  accommodationFound: { type: String, required: true },
  leaseDuration: { type: String, required: true },
  email: { type: String, required: true },
  wantsToFormGroup: { type: String, required: true },
  interests: { type: [String], required: false },
  uniqueKey: { type: String, unique: true, required: true },
});

// Create the model
const Person = mongoose.model("Person", personSchema);

// Initialize Express app

// Define a GET endpoint to fetch all people
app.get("/api/people", async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (error) {
    res.status(500).json({ message: "Error fetching people", error });
  }
});

// post roomatefinder data

app.post("/api/people", async (req, res) => {
  try {
    const uniqueKey = generateUniqueKey();
    const newPerson = new Person({ ...req.body, uniqueKey });
    const savedPerson = await newPerson.save();
    res.status(201).json({ person: savedPerson, uniqueKey: uniqueKey });
  } catch (error) {
    res.status(400).json({ message: "Error creating person", error });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
