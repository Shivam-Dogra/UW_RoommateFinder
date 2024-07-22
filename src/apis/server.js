import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import puppeteer from 'puppeteer';  // Import Puppeteer
import { users } from '../assets/profile.js'

const app = express();
const port = 5000;

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Function to generate an 8-character unique key
const generateUniqueKey = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

// Route to generate a unique key
app.get('/uniquekey', (req, res) => {
  const uniqueKey = generateUniqueKey();
  res.json({ uniqueKey });
});

// Function to perform web scraping
async function scrapeEvents() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://www.visitwindsoressex.com/events/', { waitUntil: 'networkidle0' });

    let eventData = [];

    // Function to scrape current page
    async function scrapeCurrentPage() {
        const newEvents = await page.evaluate(() => {
            let events = [];
            let seenTitles = new Set();
            const items = document.querySelectorAll('.type-tribe_events');

            items.forEach(item => {
                const img = item.querySelector('.excerpt-thumbnail-container img.wp-post-image');
                const titleLink = item.querySelector('h3.excerpt-title > a');
                const title = titleLink ? titleLink.innerText : null;
                const description = item.querySelector('.excerpt-content p');
                const eventMeta = item.querySelector('.excerpt-event-meta');

                if (title && !seenTitles.has(title)) {
                    seenTitles.add(title);
                    events.push({
                        imgSrc: img ? img.src : null,
                        title: title,
                        eventDate: eventMeta ? eventMeta.innerText : null,
                        description: description ? description.innerText : null
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
            const nextButton = document.querySelector('a.next');
            return nextButton && !nextButton.classList.contains('disabled');
        });

        if (!hasNext || eventData.length >= 8) break;

        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle0' }),
            page.click('a.next')
        ]);

        await scrapeCurrentPage();
    }

    await browser.close();
    return eventData.slice(0, 8);
}

// Route to get events
app.get('/events', async (req, res) => {
    try {
        const events = await scrapeEvents();
        res.json(events);
    } catch (error) {
        console.error('Error during event scraping:', error);
        res.status(500).json({ error: 'Failed to scrape data' });
    }
});

app.get('/viewgroups', (req, res) => {
  const groups = users
      .filter(user => user.groupFormed)
      .map(user => ({
          emailID: user.emailID,
          groupName: user.groupName,
          groupAdmin: user.name
      }));
  res.json(groups);
});

app.get('/profile', (req, res) => {
  const email = req.query.email;
  const user = users.find(user => user.emailID === email);
  
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
