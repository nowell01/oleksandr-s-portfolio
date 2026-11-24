export const profile = {
  name: 'Oleksandr Novytskyi',
  role: 'Full-Stack Developer',
  stack: ['C# / .NET', 'React'],
  location: 'Toronto, ON',
  email: 'alex22010762@gmail.com',
  github: {
    label: 'github.com/nowell01',
    url: 'https://github.com/nowell01',
  },
  linkedin: {
    label: 'linkedin.com/in/oleksandr-novytskyi',
    url: 'https://www.linkedin.com/in/oleksandr-novytskyi-928489201/',
  },
  cardSummary: {
    role: 'Junior Software Developer',
    experience: '2 years',
  },
  education: {
    program: 'Computer Programming & Analysis (Co-op)',
    school: 'Niagara College',
    graduation: 'December 2026',
  },
};

export const navLinks = [
  { id: 'top', label: 'Bio' },
  { id: 'work', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export const skillGroups = [
  {
    title: 'Backend',
    items: ['C#', '.NET 9', 'ASP.NET Core Web API', 'Python', 'FastAPI', 'Java'],
  },
  {
    title: 'Frontend',
    items: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Responsive design'],
  },
  {
    title: 'Cloud & Data',
    items: ['Azure Container Apps', 'PostgreSQL', 'EF Core', 'Docker', 'Vercel', 'SQL/NoSQL'],
  },
  {
    title: 'Tools/Tests',
    items: ['Git/GitHub', 'GitHub Actions', 'xUnit', 'MCTests', 'pytest', 'Telegram Bot API', 'Postman'],
  },
];

/* Shown as icon tiles in the hero; `icon` keys map to glyphs in Hero.jsx */
export const coreSkills = [
  { name: 'C#', icon: 'csharp' },
  { name: '.NET 9', icon: 'dotnet' },
  { name: 'ASP.NET Core', icon: 'api' },
  { name: 'React', icon: 'react' },
  { name: 'Python', icon: 'python' },
  { name: 'Azure', icon: 'cloud' },
  { name: 'SQL / NoSQL', icon: 'database' },
  { name: 'Docker', icon: 'container' },
];
