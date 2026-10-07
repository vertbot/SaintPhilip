// Sacrament pages are Markdown files in src/content/sacraments, editable at /admin/.

export interface Sacrament {
  slug: string;
  title: string;
  summary: string;
  order: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Content: any;
}

const modules = import.meta.glob<any>('../content/sacraments/*.md', { eager: true });

export const sacraments: Sacrament[] = Object.entries(modules)
  .map(([path, mod]) => ({
    slug: path.split('/').pop()!.replace(/\.md$/, ''),
    title: mod.frontmatter.title,
    summary: mod.frontmatter.summary,
    order: mod.frontmatter.order ?? 99,
    Content: mod.Content,
  }))
  .sort((a, b) => a.order - b.order);
