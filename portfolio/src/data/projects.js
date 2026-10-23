/**
 * Content for both case studies. Components stay presentational;
 * all copy, figures and links live here.
 */

export const cexDex = {
  id: 'cex-dex',
  index: '01',
  category: 'Full-stack',
  badge: 'Personal',
  theme: 'violet',
  title: 'CEX·DEX Arbitrage Dashboard',
  subtitle: 'Real-time price and arbitrage monitoring across 7 crypto exchanges',
  summary:
    'A .NET 9 background service checks 21 trading pairs on 5 centralized and 2 decentralized exchanges. When the price gap passes 3%, it sends the alert to a React dashboard over SignalR and to Telegram subscribers.',
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
    { value: '2,600+', label: 'alerts logged in production since Aug 2026' },
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
  ],
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
      { name: 'REST API', detail: '/api/prices · /api/alerts' },
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
    { method: 'WS', path: '/hubs/alerts', description: 'SignalR stream of new alerts' },
  ],
  overviewTags: ['.NET 9', 'ASP.NET Core', 'SignalR', 'React', 'Azure'],
  stack: [
    'C#',
    '.NET 9',
    'ASP.NET Core Web API',
    'SignalR',
    'BackgroundService',
    'IHttpClientFactory',
    'Telegram.Bot',
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
  subtitle: 'A website for a home bakery in Ontario, built for a real client',
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

export const projects = [cexDex, yummyCakee];
