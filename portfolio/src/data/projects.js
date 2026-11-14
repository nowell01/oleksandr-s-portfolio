/**
 * Content for all three case studies. Components stay presentational;
 * all copy, figures and links live here.
 */

export const cexDex = {
  id: 'cex-dex',
  index: '01',
  category: 'Full-stack',
  badge: 'Personal',
  theme: 'royal',
  title: 'CryptoScan',
  subtitle: 'Real-time price and arbitrage monitoring across 7 crypto exchanges, with AI summaries of alert activity',
  summary:
    'A .NET 9 background service checks 21 trading pairs on 5 centralized and 2 decentralized exchanges. When the price gap passes 3%, it sends the alert to a React dashboard over SignalR and to Telegram subscribers. An AI summary turns the alert log into a short report on demand.',
  links: [
    { label: 'Live', text: 'cex-dex-client.vercel.app', url: 'https://cex-dex-client.vercel.app' },
    {
      label: 'Code',
      text: 'github.com/nowell01/CEX-DEX-PriceParser',
      url: 'https://github.com/nowell01/CEX-DEX-PriceParser',
    },
  ],
  role: 'Solo · design, backend, frontend, DevOps',
  cover: {
    src: 'images/dashboard.webp',
    width: 1700,
    height: 1062,
    alt: 'CEX·DEX dashboard showing BTC, ETH, SOL and XRP price cards ranked by exchange, with an alerts sidebar on the right.',
    caption:
      'Live dashboard (desktop). Each pair card ranks exchanges by price and shows the spread. The sidebar lists arbitrage alerts as SignalR pushes them in.',
  },
  stats: [
    { value: '7', label: 'exchanges: 5 centralized, 2 decentralized' },
    { value: '21', label: 'trading pairs checked in every cycle' },
    { value: '5 min', label: 'polling interval, all exchanges queried in parallel' },
    { value: '3000+', label: 'alerts logged in production since Aug 2026' },
  ],
  problem: [
    'The same coin often trades at slightly different prices on different exchanges. Checking seven exchanges by hand is too slow to catch these gaps, and on decentralized exchanges they can be large but short-lived.',
    'I wanted one system that collects prices from every exchange, finds the gaps that matter, and alerts me right away, both in the browser and on my phone.',
  ],
  features: [
    { verb: 'Collects', text: 'prices from Binance, Coinbase, KuCoin, Bybit, OKX, PancakeSwap and Hyperliquid' },
    { verb: 'Compares', text: 'every exchange pair for each coin and flags spreads above 3%' },
    { verb: 'Pushes', text: 'alerts to the dashboard over WebSockets, so there is no page refresh' },
    { verb: 'Messages', text: 'every Telegram subscriber, with a 4-minute cooldown per coin' },
    { verb: 'Keeps', text: 'alert and price history behind a REST API' },
    { verb: 'Summarizes', text: 'alert activity from the last hour up to 14 days with an LLM, on demand' },
  ],
  aiSummary: {
    intro: [
      'After a few months the system had logged thousands of alerts, too many to read one by one. I added an AI report to the dashboard: pick a window from 1 hour to 14 days, and it explains what happened, which routes were busiest, and which alerts are probably not real opportunities.',
    ],
    steps: [
      {
        verb: 'Digest first:',
        text: 'C# groups the alerts by coin and route, computes average and maximum spreads, and keeps the 10 largest. The model gets a small JSON digest, not thousands of rows.',
      },
      {
        verb: 'Risk flags in code:',
        text: 'routes are tagged before the model sees them: extreme spreads (likely bad data), perpetual vs spot prices, DEX liquidity, and gaps that never close.',
      },
      {
        verb: 'Grounded prompt:',
        text: 'the model may only use numbers from the digest, must explain flagged routes, and must reply in one fixed JSON shape: headline, activity level, highlights and warnings.',
      },
      {
        verb: 'Safe parsing:',
        text: 'the backend extracts and validates the JSON, and falls back to plain text instead of failing.',
      },
      {
        verb: 'Cost control:',
        text: 'each result is cached for 30 minutes, requests are limited to 2 per minute, and calls retry with timeouts and a circuit breaker.',
      },
      {
        verb: 'Swappable provider:',
        text: 'an ILlmClient interface over any OpenAI-compatible API. It runs on Groq with gpt-oss-120b, set in configuration.',
      },
    ],
    image: {
      src: 'images/ai-summary.webp',
      width: 1440,
      height: 450,
      alt: 'AI Alert Summary panel marked "busy": the headline says TRX/USDT shows persistent spreads above 5% across CEX-DEX routes, followed by a paragraph, five route highlights and four risk warnings.',
      caption:
        'AI summary of the last 14 days from production data: 649 alerts reduced to a headline, five route highlights and four risk warnings.',
    },
  },
  architecture: {
    sources: [
      { name: 'Binance' },
      { name: 'Coinbase' },
      { name: 'KuCoin' },
      { name: 'Bybit' },
      { name: 'OKX' },
      { name: 'PancakeSwap', note: 'via DexScreener', dex: true },
      { name: 'Hyperliquid', dex: true },
    ],
    fetchNote: 'IHttpClientFactory named clients · Task.WhenAll',
    pipeline: [
      { name: 'PriceMonitorService', detail: '.NET BackgroundService · every 5 min' },
      { name: 'ArbitrageDetector', detail: 'spread > 3% → alert' },
      { name: 'AlertService', detail: 'log · broadcast · notify' },
    ],
    outputs: [
      { name: 'SignalR AlertHub', detail: '/hubs/alerts' },
      { name: 'TelegramNotifier', detail: 'all /start subscribers' },
      { name: 'JsonStorageService', detail: 'alerts · price history' },
      { name: 'REST API', detail: '/api/prices · /api/alerts · /api/insights' },
    ],
    clients: [
      { name: 'React + Vite dashboard', detail: 'Vercel · @microsoft/signalr' },
      { name: 'Telegram bot', detail: 'webhook · ChatIdStore' },
    ],
    hosting: 'Backend: Azure App Service (Windows), WebSockets enabled · Frontend: Vercel',
  },
  challenges: [
    {
      title: 'Cross-origin real-time connection',
      text: 'Set up the CORS policy with credentials so the Vercel frontend can open a SignalR WebSocket to the Azure backend.',
    },
    {
      title: 'Deadlock in file storage',
      text: 'Found and fixed a SemaphoreSlim deadlock in the file-based storage service, so concurrent writes stay thread-safe.',
      code: 'SemaphoreSlim',
    },
    {
      title: 'Storage on Azure',
      text: 'Moved data to a persistent writable path on Azure App Service, with an automatic fallback when that path is not available.',
    },
    {
      title: 'Many Telegram subscribers',
      text: 'Added a webhook controller and a subscriber store, so anyone who sends /start gets every alert. A cooldown per coin stops spam.',
      code: '/start',
    },
    {
      title: 'Pricing on a decentralized exchange',
      text: 'Mapped 18 tokens to verified BSC contract addresses, used the highest-volume pool, and skipped tokens with no real liquidity.',
    },
    {
      title: 'Handling failures',
      text: 'If one exchange fails, the cycle continues with the others. Scoped services are resolved safely inside the singleton background worker.',
    },
  ],
  alertsImage: {
    src: 'images/alerts.webp',
    width: 480,
    height: 1260,
    alt: 'Alert feed listing TRX/USDT arbitrage alerts with buy and sell exchanges, prices and spread percentages.',
    caption: 'Alert feed: buy/sell exchange, prices, spread %',
  },
  endpoints: [
    { method: 'GET', path: '/api/prices', description: 'Latest prices from every exchange' },
    { method: 'GET', path: '/api/prices/{symbol}', description: 'Prices for one trading pair' },
    { method: 'GET', path: '/api/alerts/history', description: 'Every alert logged so far' },
    { method: 'POST', path: '/api/telegram/webhook', description: 'Adds subscribers when they send /start' },
    { method: 'GET', path: '/api/insights/summary?hours=24', description: 'AI summary of alerts in a 1 h – 14 day window' },
    { method: 'WS', path: '/hubs/alerts', description: 'SignalR stream of new alerts' },
  ],
  overviewTags: ['.NET 9', 'ASP.NET Core', 'SignalR', 'React', 'LLM API', 'Azure'],
  stack: [
    'C#',
    '.NET 9',
    'ASP.NET Core Web API',
    'SignalR',
    'BackgroundService',
    'IHttpClientFactory',
    'Telegram.Bot',
    'LLM API (Groq, OpenAI-compatible)',
    'IMemoryCache',
    'Rate limiting',
    'Http.Resilience',
    'React 18',
    'Vite',
    '@microsoft/signalr',
    'Azure App Service',
    'Vercel',
    'REST APIs',
    'Git',
  ],
};

export const yummyCakee = {
  id: 'yummy-cakee',
  index: '02',
  category: 'Front-end',
  badge: 'Real client',
  theme: 'gold',
  title: 'Yummy Cakee — Bakery Website',
  subtitle: 'A website for a home bakery in Ontario',
  summary:
    'A responsive marketing site for a home bakery in Ontario. It presents the menu, prices and a gallery of past cakes, and every call to action sends visitors to the Instagram DMs where the client takes orders.',
  links: [
    { label: 'Live', text: 'yummy-cakee.vercel.app', url: 'https://yummy-cakee.vercel.app' },
    {
      label: 'Code',
      text: 'github.com/nowell01/yummy-cakee-website',
      url: 'https://github.com/nowell01/yummy-cakee-website',
    },
  ],
  role: 'Freelance · design, build, deployment',
  cover: {
    src: 'images/cakee-hero.webp',
    width: 1700,
    height: 1062,
    alt: 'Yummy Cakee homepage hero with the headline "Cakes that define the moment" and photos of a tiered birthday cake and a strawberry cake.',
    caption: 'Homepage hero (desktop): a premium look, a clear value statement, and two calls to action.',
  },
  stats: [
    { value: '8', label: 'sections: flavours, occasions, gallery, reviews, ordering' },
    { value: '0', label: 'frameworks or JS dependencies, just hand-written HTML, CSS and JS' },
    { value: '~48 KB', label: 'for the whole page before images, which load lazily' },
    { value: '6', label: 'responsive breakpoints, from phone to wide desktop' },
  ],
  brief: [
    'The client runs a home bakery and takes orders through Instagram. She needed one place to show the full menu, prices and past work. She wanted a site that looked as refined as her cakes and made ordering simple.',
  ],
  goal: 'Goal: turn visitors into Instagram DMs. Every section ends with one clear next step.',
  deliverables: [
    { verb: 'Visual identity:', text: 'an ivory, graphite and gold palette with Cormorant Garamond and Inter type' },
    { verb: 'Menu:', text: 'five signature cakes with layers, tasting notes and prices' },
    { verb: 'Occasions:', text: 'wedding cakes, custom cakes and dessert tables, each with pricing' },
    { verb: 'Gallery, reviews', text: 'and a 3-step “How to order” section' },
    { verb: 'Deployment', text: 'on Vercel from a GitHub repository' },
  ],
  gallery: [
    {
      src: 'images/cakee-signature.webp',
      width: 1400,
      height: 840,
      alt: 'Signature compositions section showing the Kinder Bueno cake with its layers and an order link.',
      caption: '“Signature compositions”: cake cards that alternate sides, each with layers, price and an order link',
    },
    {
      src: 'images/cakee-mobile.webp',
      width: 600,
      height: 1298,
      alt: 'Yummy Cakee homepage on a phone-width screen.',
      caption: 'Mobile layout (390 px)',
      portrait: true,
    },
  ],
  stepsImage: {
    src: 'images/cakee-steps.webp',
    width: 1400,
    height: 612,
    alt: 'Ordering section titled "Three simple steps": send a message, confirm the details, pickup or delivery.',
    caption: 'The 3-step ordering flow sends every visitor to the client’s Instagram',
  },
  technical: [
    { verb: 'Responsive layout', text: 'with CSS Grid, Flexbox and fluid clamp() type, plus a mobile menu' },
    { verb: 'Scroll-reveal animations', text: 'using IntersectionObserver, with no animation libraries' },
    { verb: 'Accessibility:', text: 'descriptive alt text, ARIA labels, and support for prefers-reduced-motion' },
    {
      verb: 'Performance & SEO:',
      text: 'lazy-loaded images, one self-contained page, and a title and meta description written for local search',
    },
  ],
  outcome: [
    'I managed a real client from start to finish: gathered the requirements, designed and built the site, and launched it in production.',
    'I kept the build framework-free on purpose, so the page stays fast and the client can host and update it for free.',
  ],
  overviewTags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive', 'Vercel'],
  stack: ['HTML5', 'CSS3', 'Vanilla JavaScript', 'IntersectionObserver', 'Responsive design', 'Vercel', 'Git'],
};

export const snowRemoval = {
  id: 'brilliant-snow',
  index: '03',
  category: 'Front-end',
  badge: 'Real client',
  theme: 'royal',
  title: 'Brilliant Snow Removal',
  subtitle: 'A multi-page website for a Toronto snow removal company',
  summary:
    'A React website for a snow clearing business in Toronto. It explains the services and seasonal plans, shows the coverage area on an interactive map, checks postal codes, and sends quote requests straight to the company inbox.',
  links: [
    { label: 'Live', text: 'brilliantsnow.ca', url: 'https://brilliantsnow.ca' },
    {
      label: 'Code',
      text: 'github.com/nowell01/brilliantsnowremoval',
      url: 'https://github.com/nowell01/brilliantsnowremoval',
    },
  ],
  role: 'Freelance · design, build, deployment',
  cover: {
    src: 'images/snow-home.webp',
    width: 1424,
    height: 890,
    alt: 'Brilliant Snow Removal homepage with the headline "Cleared, salted, and photographed. Every visit." next to a photo of a worker clearing a sidewalk with a snowblower.',
    caption: 'Homepage (desktop): one promise in the headline, and two calls to action: call now or request a quote.',
  },
  stats: [
    { value: '8', label: 'pages, with client-side routing' },
    { value: '8', label: 'service areas drawn on an interactive map' },
    { value: '4-step', label: 'quote form that emails the company directly' },
    { value: '1', label: 'custom domain successfully configured' },
  ],
  brief: [
    'The client clears driveways and sidewalks across Toronto and Markham. Most customers call, but some want to see prices and coverage first and send a request outside business hours.',
    'They needed a site that answers the common questions (what is included, how much it costs, do you cover my street) and turns a visit into a phone call or a quote request.',
  ],
  goal: 'Goal: every page ends in one action: call, or request a quote. A call bar stays pinned on phones.',
  features: [
    { verb: 'Services and plans:', text: 'five services with what is included, and three plans with price ranges' },
    { verb: 'Coverage map:', text: 'eight areas drawn as polygons on an OpenStreetMap map with Leaflet' },
    { verb: 'Postal code check:', text: 'tells a visitor right away whether their street is in the service area' },
    { verb: 'Quote form:', text: 'plan, services, property and contact in four steps, with a live summary' },
    { verb: 'Contact, FAQ and About', text: 'pages, plus Vercel Analytics to see where visitors come from' },
  ],
  gallery: [
    {
      src: 'images/snow-areas.webp',
      width: 1424,
      height: 890,
      alt: 'Service areas page: a postal code checker and list of areas on the left, and a map of Toronto with full-coverage areas in solid navy and select-street areas in dashed blue.',
      caption: 'Service areas: hovering an area in the list highlights it on the map, and the other way round',
    },
    {
      src: 'images/snow-mobile.webp',
      width: 375,
      height: 844,
      alt: 'Brilliant Snow Removal homepage on a phone, with a call button pinned to the bottom of the screen.',
      caption: 'Mobile, with the pinned call bar',
      portrait: true,
    },
  ],
  quoteImage: {
    src: 'images/snow-quote.webp',
    width: 1424,
    height: 890,
    alt: 'Request a quote page: a form with plan buttons, service chips, property and contact fields, and a side panel showing the phone number and the selected plan.',
    caption: 'Quote form: choices are buttons and chips instead of dropdowns, and the side panel updates with the selected plan',
  },
  technical: [
    { verb: 'React 19 + React Router 7', text: 'for eight pages, with scroll-to-top on every route change' },
    {
      verb: 'Leaflet map',
      text: 'with one shared state for the hovered area, so the list and the map highlight together',
    },
    {
      verb: 'Postal code logic:',
      text: 'Toronto codes start with M; Markham is matched against its own list of L-prefixed areas',
    },
    {
      verb: 'Serverless email:',
      text: 'forms post to Web3Forms with the key in an environment variable, and fall back to the phone number on error',
    },
    { verb: 'All content in one data file,', text: 'so prices, areas and FAQs change without touching components' },
  ],
  outcome: [
    'I delivered a production site for a second real client, this time with routing, a map and working forms instead of a single page.',
    'The business runs it on its own domain with no server to maintain, and every form lands in the owner’s inbox.',
  ],
  overviewTags: ['React 19', 'React Router', 'Leaflet', 'Web3Forms', 'Vercel'],
  stack: [
    'React 19',
    'React Router 7',
    'Vite',
    'Leaflet',
    'react-leaflet',
    'OpenStreetMap',
    'Web3Forms',
    'Vercel Analytics',
    'Responsive design',
    'Vercel',
    'Git',
  ],
};

export const projects = [cexDex, yummyCakee, snowRemoval];
