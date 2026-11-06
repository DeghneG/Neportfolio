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

export const languageGroups = [
  { title: 'Front End', items: ['HTML', 'CSS', 'JavaScript'] },
  { title: 'Back End', items: ['Python', 'Java', 'C++'] },
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
