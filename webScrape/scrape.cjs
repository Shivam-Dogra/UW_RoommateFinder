const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://www.visitwindsoressex.com/events/', { waitUntil: 'networkidle0' });

    let eventData = [];

    // Function to scrape current page
    async function scrapeCurrentPage() {
        const newEvents = await page.evaluate(() => {
            let events = [];
            let seenTitles = new Set(); // Redefine the set inside the browser context
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

    console.log(eventData.slice(0, 8)); 
    await browser.close();
})();
