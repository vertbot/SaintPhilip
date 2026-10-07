# St. Philip the Apostle website

The website for St. Philip the Apostle Catholic Church in Ashford, Connecticut. It is a static site built with [Astro](https://astro.build), hosted on Netlify, with a staff editor at `/admin/` (Decap CMS) for weekly bulletins, Mass times and page text.

## Where things live

| What | File |
|---|---|
| Mass and Confession times, phone, email, office hours, staff, mission | `src/data/settings.json` |
| Weekly bulletins (one file per week, PDF in `public/uploads/bulletins/`) | `src/content/bulletins/` |
| About, Parish Life, Learn About the Faith, New Here, Give | `src/content/pages/` |
| Sacrament pages | `src/content/sacraments/` |
| Staff editor setup | `public/admin/config.yml` |

Parish staff should not need to touch these files directly: everything above can be edited by signing in at `/admin/`.

## Posting the weekly bulletin

1. Go to `https://<your site>/admin/` and sign in.
2. Open **Bulletins** and click **New Bulletin**.
3. Pick the Sunday date, type the title, choose the PDF, and click **Publish**.

The site rebuilds automatically, and the new bulletin shows on the homepage within a couple of minutes.

## One-time Netlify setup

1. In Netlify, choose **Add new site → Import an existing project**, and pick this GitHub repository. The build settings come from `netlify.toml`.
2. In the site's settings, enable **Identity**, set registration to **Invite only**, and under **Services** enable **Git Gateway**.
3. Invite each staff member who will post bulletins (Identity → Invite users). They get an email to set a password.
4. Point the parish domain at Netlify when you're ready to switch over from the old site.

## Working on the code

```sh
npm install
npm run dev      # local preview at http://localhost:4321
npm run build    # production build into dist/
```
