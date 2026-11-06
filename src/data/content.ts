// All copy comes from Palmares-Portfolio-Sitemap.pdf.
// TODO markers = placeholders the sitemap did not specify. Replace with real info.

export const profile = {
  name: 'Neptali Palmares',
  tagline: 'Writing code, one line at a time.',
  email: 'npalmares@usa.edu.ph',
  github: 'https://github.com/', // TODO: your GitHub profile URL
  linkedin: 'https://www.linkedin.com/', // TODO: your LinkedIn profile URL
  resume: '/resume.pdf', // TODO: drop your resume at public/resume.pdf
  bio: 'I build software one line at a time. I care about clean structure, honest logic, and shipping things that work.', // TODO: replace with your bio
}

export const languageGroups: { title: string; items: string[]; wide?: boolean }[] = [
  {
    title: 'Front End',
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS', 'Framer Motion', 'React Router'],
  },
  { title: 'Back End', items: ['Python', 'Java', 'C++', 'PHP'] },
  { title: 'Tools & Hosting', items: ['Vite', 'GitHub', 'Vercel'], wide: true },
]

export const credentials = [
  { level: 'Senior High School', school: 'Passi National High School', from: '2020', to: '2022' },
  { level: 'High School', school: 'Assumption', from: '2010', to: '2019' },
]

export type Term = 'Prelims' | 'Midterm' | 'Finals'
export const terms: Term[] = ['Prelims', 'Midterm', 'Finals']

export type Project = {
  slug: string
  title: string
  term: Term
  summary: string
  problem: string
  role: string
  timeline: string
  tools: string[]
  process: string[]
  results: string[]
}

export const projects: Project[] = [
  {
    slug: 'ride-sentinel',
    title: 'Ride Sentinel',
    term: 'Finals', // TODO: confirm which term this project belongs to
    summary: 'Project case study.', // TODO
    problem: 'TODO: Describe the problem Ride Sentinel solves and give a short overview.',
    role: 'TODO: Your role',
    timeline: 'TODO: Timeline',
    tools: ['TODO'],
    process: ['TODO: Process notes, wireframes, code snippets and visuals go here.'],
    results: ['TODO: Results and deliverables.'],
  },
]

// Hardcoded FAQs. Every answer comes from the sitemap content only; nothing invented.
export const faqs = [
  {
    q: 'Who is Neptali Palmares?',
    a: `${profile.name} is a developer. His tagline says it best: "${profile.tagline}"`,
  },
  {
    q: 'What programming languages do you use?',
    a: 'Front end: HTML, CSS and JavaScript. Back end: Python, Java, C++ and PHP.',
  },
  {
    q: 'What was this website built with?',
    a: 'TypeScript and React, bundled with Vite. Styling is Tailwind CSS, animation is Framer Motion, and page routing is React Router. The code lives on GitHub and the site is deployed with Vercel.',
  },
  {
    q: 'What projects can I see?',
    a: 'The Work section holds project case studies, sorted into Prelims, Midterm and Finals. Ride Sentinel is the first case study, and more projects are on the way.',
  },
  {
    q: 'What does a case study include?',
    a: 'Each one covers the problem statement and overview, the role, timeline and tools used, the process with wireframes, code and visuals, and the results and deliverables. You can also jump to the previous or next project from the bottom of the page.',
  },
  {
    q: 'Where did you study?',
    a: 'Senior High School at Passi National High School (2020–2022), and High School at Assumption (2010–2019).',
  },
  {
    q: 'How can I get in touch?',
    a: `Email ${profile.email}, or use the GitHub and LinkedIn links on the Contact page and in the footer.`,
  },
  {
    q: 'Where can I find your resume?',
    a: 'Click Resume in the footer. It opens the resume as a PDF.',
  },
]
