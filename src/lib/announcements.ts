// Announcements are short, dated notices ("Chicken Parm Dinner this Saturday!").
// Each has a start and end date. Expired ones are dropped at build time, and a
// small script on the page hides any that expire between builds, so nothing goes stale.

export interface Announcement {
  slug: string;
  title: string;
  details: string;
  link: string;
  linkLabel: string;
  showFrom: string; // YYYY-MM-DD
  showUntil: string; // YYYY-MM-DD, last day shown
  banner: boolean;
}

const modules = import.meta.glob<{ frontmatter: Record<string, unknown> }>('../content/announcements/*.md', { eager: true });

function ymd(v: unknown): string {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v ?? '').slice(0, 10);
}

const today = new Date().toISOString().slice(0, 10);

export const announcements: Announcement[] = Object.entries(modules)
  .map(([path, mod]) => {
    const f = mod.frontmatter;
    return {
      slug: path.split('/').pop()!.replace(/\.md$/, ''),
      title: String(f.title ?? ''),
      details: String(f.details ?? ''),
      link: String(f.link ?? ''),
      linkLabel: String(f.linkLabel || 'Learn more'),
      showFrom: ymd(f.showFrom),
      showUntil: ymd(f.showUntil),
      banner: Boolean(f.banner),
    };
  })
  .filter((a) => a.title && a.showUntil >= today)
  .sort((a, b) => a.showUntil.localeCompare(b.showUntil));

export const bannerAnnouncements = announcements.filter((a) => a.banner);
