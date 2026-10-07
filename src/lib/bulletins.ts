// Bulletins are Markdown files in src/content/bulletins, one per week.
// Parish staff add them through the editor at /admin/ (see public/admin/config.yml).

export interface Bulletin {
  slug: string;
  title: string;
  date: Date;
  file: string;
}

interface BulletinFrontmatter {
  title: string;
  date: string;
  file: string;
}

const modules = import.meta.glob<{ frontmatter: BulletinFrontmatter }>('../content/bulletins/*.md', { eager: true });

export const bulletins: Bulletin[] = Object.entries(modules)
  .map(([path, mod]) => ({
    slug: path.split('/').pop()!.replace(/\.md$/, ''),
    title: mod.frontmatter.title,
    date: new Date(mod.frontmatter.date),
    file: mod.frontmatter.file,
  }))
  .sort((a, b) => b.date.getTime() - a.date.getTime());

export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}
