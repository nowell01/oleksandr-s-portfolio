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
    'A .NET 9 background service checks 21 trading pairs on 5 centralized and 2 decentralized exchanges. When the price gap passes 3%, it sends the alert to a React dashboard over SignalR and to Telegram subscribers. Every scan and alert is stored in PostgreSQL, and an AI summary turns the alert log into a short report on demand. The API ships as a Docker image to Azure Container Apps through GitHub Actions.',
  links: [
    { label: 'Live', text: 'cryptoscan.tech', url: 'https://cryptoscan.tech' },
    {
      label: 'Code',
      text: 'github.com/nowell01/CryptoScan',
      url: 'https://github.com/nowell01/CryptoScan',
    },
  ],
  role: 'Solo · design, backend, frontend, DevOps',
  cover: {
    src: 'images/dashboard.webp',
    width: 1700,
    height: 1062,
    alt: 'CryptoScan dashboard showing BTC, ETH, SOL and XRP price cards ranked by exchange, with an alerts sidebar on the right.',
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
    { verb: 'Stores', text: 'every price scan and alert in PostgreSQL, served through a REST API' },
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
      { name: 'PostgreSQL stores', detail: 'EF Core · prices · alerts · subscribers' },
      { name: 'REST API', detail: '/api/prices · /api/alerts · /api/insights' },
    ],
    clients: [
      { name: 'React + Vite dashboard', detail: 'Vercel · @microsoft/signalr' },
      { name: 'Telegram bot', detail: 'webhook · /start subscribers' },
    ],
    hosting:
      'Backend: Docker image → Azure Container Apps (Linux), deployed by GitHub Actions · Database: Azure Database for PostgreSQL · Frontend: Vercel',
  },
  challenges: [
    {
      title: 'Cross-origin real-time connection',
      text: 'Set up the CORS policy with credentials so the Vercel frontend can open a SignalR WebSocket to the Azure backend.',
    },
    {
      title: 'From JSON files to PostgreSQL',
      text: 'Replaced flat-file storage with PostgreSQL and EF Core migrations behind store interfaces, and wrote a one-time importer to move the existing history.',
    },
    {
      title: 'Database access from a singleton',
      text: 'The stores use IDbContextFactory to create a short-lived context per operation, so the background worker and singletons can use the database safely.',
      code: 'IDbContextFactory',
    },
    {
      title: 'From App Service to containers',
      text: 'Containerized the API and moved it from Windows App Service to Azure Container Apps, with a GitHub Actions pipeline that builds, pushes and deploys on every push to main.',
    },
    {
      title: 'Many Telegram subscribers',
      text: 'Added a webhook controller that saves subscribers with INSERT … ON CONFLICT DO NOTHING, so anyone who sends /start is added exactly once and gets every alert. A cooldown per coin stops spam.',
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
    { method: 'GET', path: '/health', description: 'Health check for the container platform' },
  ],
  overviewTags: ['.NET 9', 'ASP.NET Core', 'PostgreSQL', 'SignalR', 'React', 'Docker', 'Azure'],
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
    'PostgreSQL',
    'Entity Framework Core 9',
    'Npgsql',
    'React 18',
    'Vite',
    '@microsoft/signalr',
    'Docker',
    'Azure Container Apps',
    'Azure Container Registry',
    'Azure Database for PostgreSQL',
    'GitHub Actions',
    'Vercel',
    'REST APIs',
    'Git',
  ],
};

export const todoApp = {
  id: 'todo-app',
  index: '02',
  category: 'Full-stack',
  badge: 'Personal',
  theme: 'gold',
  title: 'Todo App: FastAPI + React',
  subtitle: 'A full-stack task manager with user accounts, a typed REST API and a one-command Docker setup',
  summary:
    'A todo application with accounts, built to learn FastAPI end to end: a typed REST API with JWT login, PostgreSQL with Alembic migrations, a React + TypeScript frontend, and a Docker Compose setup that starts everything with one command.',
  links: [
    {
      label: 'Code',
      text: 'github.com/nowell01/todo-app',
      url: 'https://github.com/nowell01/todo-app',
    },
  ],
  role: 'Solo · backend, frontend, tests, DevOps',
  cover: {
    src: 'images/todo-app.webp',
    width: 979,
    height: 671,
    alt: 'Todo app showing an add form with a priority dropdown, All / Active / Done tabs, a title search box, and four todos with High, Normal and Low priority badges and Edit and Delete buttons.',
    caption:
      'The app after login: add a todo with a priority, filter by status, search titles, and edit or delete inline.',
  },
  stats: [
    { value: '8', label: 'REST endpoints for auth and todos, documented in Swagger' },
    { value: '16', label: 'pytest tests on an isolated in-memory database' },
    { value: '3', label: 'containers (PostgreSQL, API, nginx) started by Docker Compose' },
    { value: '2', label: 'CI jobs on every push: backend tests, frontend type-check and build' },
  ],
  brief: [
    'I wanted to learn Python web development by building a complete product, not by following a single tutorial: accounts, a real database, migrations, tests and a reproducible setup.',
    'A todo app keeps the domain simple, so all the attention goes to the engineering around it: authentication, data ownership, validation and tooling.',
  ],
  goal: 'Goal: anyone can clone the repo, run one command, and get the same working app and API docs.',
  features: [
    { verb: 'Accounts:', text: 'register and log in; passwords hashed with Argon2, sessions as JWT bearer tokens' },
    { verb: 'Per-user data:', text: 'every query is scoped to the logged-in user, so nobody sees another user’s todos' },
    { verb: 'Todos:', text: 'create, edit, complete and delete, with high, normal and low priority' },
    { verb: 'Filtering:', text: 'by status and title search, with pagination and a “Load more” button' },
    { verb: 'Validation:', text: 'bad input is rejected with clear 422 errors before it reaches the database' },
  ],
  technical: [
    {
      verb: 'SQLModel models',
      text: 'shared by the database table and the request and response schemas, so the API and the data stay in sync',
    },
    {
      verb: 'Dependency injection:',
      text: 'the database session and the current user are FastAPI dependencies, reused by every route',
    },
    {
      verb: 'Ownership check:',
      text: 'one helper loads a todo only if it belongs to the user, and returns 404 instead of revealing that it exists',
    },
    {
      verb: 'Alembic migrations',
      text: 'run automatically when the backend container starts; the priority field arrived as a second migration',
    },
    {
      verb: 'Typed API client:',
      text: 'one TypeScript module owns every request, attaches the token, and turns FastAPI errors into readable messages',
    },
    {
      verb: 'Frontend details:',
      text: 'search is debounced by 300 ms, outdated responses are ignored, and a 401 sends the user back to the login screen',
    },
  ],
  testing: [
    {
      verb: 'pytest + TestClient:',
      text: 'each test gets a fresh in-memory SQLite database through dependency overrides, so tests never touch real data or need Docker',
    },
    {
      verb: 'Auth tests',
      text: 'cover the real register → login → token flow, garbage tokens, and one user trying to read another user’s todo',
    },
    {
      verb: 'Docker Compose:',
      text: 'PostgreSQL 17 with a health check, the API, and a multi-stage build that serves the React app from nginx',
    },
    {
      verb: 'GitHub Actions',
      text: 'runs the backend tests on Python 3.14, and type-checks and builds the frontend on Node 22',
    },
  ],
  endpoints: [
    { method: 'POST', path: '/auth/register', description: 'Create an account' },
    { method: 'POST', path: '/auth/token', description: 'Log in and receive a JWT' },
    { method: 'GET', path: '/auth/me', description: 'The logged-in user' },
    { method: 'GET', path: '/todos', description: 'My todos: filter by status, search, paginate' },
    { method: 'POST', path: '/todos', description: 'Create a todo' },
    { method: 'GET', path: '/todos/{id}', description: 'One of my todos' },
    { method: 'PUT', path: '/todos/{id}', description: 'Replace a todo' },
    { method: 'DELETE', path: '/todos/{id}', description: 'Delete a todo' },
  ],
  outcome: [
    'I learned a second backend stack end to end, and saw how FastAPI’s ideas (dependency injection, typed models, middleware) map to the ASP.NET Core I use in CryptoScan.',
    'The project is built to be checked: clone it, run docker compose up, and the app, the database and the Swagger docs are all running.',
  ],
  overviewTags: ['FastAPI', 'PostgreSQL', 'React', 'TypeScript', 'Docker'],
  stack: [
    'Python',
    'FastAPI',
    'SQLModel',
    'Pydantic',
    'PostgreSQL 17',
    'Alembic',
    'JWT (PyJWT)',
    'Argon2 (pwdlib)',
    'OAuth2 password flow',
    'pytest',
    'React 19',
    'TypeScript',
    'Vite',
    'Docker',
    'Docker Compose',
    'nginx',
    'GitHub Actions',
    'Git',
  ],
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

export const projects = [cexDex, todoApp, snowRemoval];
