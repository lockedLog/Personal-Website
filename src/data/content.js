const articleModules = import.meta.glob('../content/articles/*.md', { eager: true });
const splunkModules = import.meta.glob('../content/splunk/*.md', { eager: true });

function mapModules(modules) {
  return Object.keys(modules).map((path) => {
    const mod = modules[path];
    const id = path.split('/').pop().replace('.md', '');
    return {
      id,
      ...mod.attributes,
      content: mod.html
    };
  }).filter(a => !a.draft).sort((a, b) => new Date(b.date) - new Date(a.date));
}

export const articles = mapModules(articleModules);

const splunkEntries = mapModules(splunkModules);

export const folders = [
  {
    id: "splunk-self-study",
    title: "Splunk Self-Study",
    description: "Teaching myself the fundamentals of Splunk and SIEM use.",
    status: "active",
    entries: splunkEntries,
  },
  {
    id: "ccna-prep",
    title: "CCNA Preparation",
    description: "Currently studying networking fundamentals and Cisco systems to take the CCNA (200-301) exam.",
    status: "active",
    entries: [
      { date: "Current", title: "In Progress", note: "Expected Summer 2026." },
    ],
  },
];
