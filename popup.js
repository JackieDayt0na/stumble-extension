// ==============================================
// FEED SOURCES
// Each feed has a name and a function that
// returns a URL to open in a new tab.
// ==============================================

const FEEDS = [
  {
    name: 'Wiby',
    description: 'Retro & personal websites',
    enabled: true,
    stumble: async () => {
      // Wiby's /surprise/ returns a 302 redirect to a random site.
      // We fetch it and grab the redirect URL.
      try {
        const response = await fetch('https://wiby.me/surprise/', {
          redirect: 'follow',
        });
        return response.url;
      } catch (err) {
        // Fallback: just open the surprise page directly
        // and let the browser handle the redirect
        return 'https://wiby.me/surprise/';
      }
    },
  },
];

// ==============================================
// STUMBLE LOGIC
// ==============================================

async function doStumble() {
  const btn = document.getElementById('stumble-btn');
  const badge = document.getElementById('feed-badge');

  // Show loading state
  btn.classList.add('loading');

  try {
    // Pick a random enabled feed
    const enabledFeeds = FEEDS.filter((f) => f.enabled);
    if (enabledFeeds.length === 0) {
      badge.innerHTML = 'No feeds enabled!';
      return;
    }

    const feed = enabledFeeds[Math.floor(Math.random() * enabledFeeds.length)];

    // Get a random URL from the feed
    const url = await feed.stumble();

    // Show which feed it came from
    badge.innerHTML = `via <span class="source">${feed.name}</span>`;

    // Open in a new tab
    chrome.tabs.create({ url: url });
  } catch (err) {
    console.error('Stumble failed:', err);
    badge.innerHTML = 'Something went wrong. Try again!';
  } finally {
    btn.classList.remove('loading');
  }
}

// ==============================================
// EVENT LISTENERS
// ==============================================

document.getElementById('stumble-btn').addEventListener('click', doStumble);

// Keyboard shortcut: Enter to stumble
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    doStumble();
  }
});
