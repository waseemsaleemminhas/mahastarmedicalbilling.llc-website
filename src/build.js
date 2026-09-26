import { mkdir, writeFile, cp, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, services } from './data.js';
import { page } from './layout.js';
import * as P from './pages.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'dist');

const routes = [
  { path: '/', title: `Medical Billing Services | ${site.name}`, description: 'Medical billing, coding, denial management and credentialing for US healthcare practices. Percentage-of-collections pricing and a dedicated account manager.', body: P.home() },
  { path: '/services/', title: `Medical Billing Services | ${site.name}`, description: 'Billing, coding, RCM, denial management, A/R recovery, credentialing and practice audits for healthcare providers.', body: P.servicesIndex() },
  { path: '/specialties/', title: `Specialty Medical Billing | ${site.name}`, description: 'Specialty-specific medical billing for primary care, behavioral health, orthopedics, cardiology, physical therapy and more.', body: P.specialtiesPage() },
  { path: '/pricing/', title: `Medical Billing Pricing | ${site.name}`, description: 'Transparent percentage-of-collections pricing with no setup fee, no monthly minimum and no long-term contract.', body: P.pricingPage() },
  { path: '/about/', title: `About Us | ${site.name}`, description: `${site.name} is a US medical billing company serving independent practices and clinics nationwide.`, body: P.aboutPage() },
  { path: '/contact/', title: `Contact Us | ${site.name}`, description: 'Book a free consultation and billing review with Mahastar Medical Billing LLC.', body: P.contactPage() },
  { path: '/privacy/', title: `Privacy Policy | ${site.name}`, description: `How ${site.name} handles information collected through this website.`, body: P.privacyPage() },
  ...services.map((s) => ({
    path: `/services/${s.slug}/`,
    title: `${s.title} Services | ${site.name}`,
    description: s.short,
    body: P.servicePage(s),
  })),
];

const fileFor = (path) => join(out, path === '/' ? 'index.html' : `${path.replace(/^\/|\/$/g, '')}/index.html`);

async function build() {
  await rm(out, { recursive: true, force: true });
  await mkdir(out, { recursive: true });

  for (const r of routes) {
    const file = fileFor(r.path);
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, page(r));
  }

  // Cloudflare Pages serves /404.html for unmatched routes.
  await writeFile(join(out, '404.html'), page({
    path: '/404',
    title: `Page Not Found | ${site.name}`,
    description: 'The page you are looking for could not be found.',
    body: P.notFoundPage(),
  }).replace('<head>', '<head>\n<meta name="robots" content="noindex">'));

  const urls = routes.map((r) => `  <url><loc>${site.domain}${r.path}</loc><changefreq>monthly</changefreq></url>`).join('\n');
  await writeFile(join(out, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);

  await cp(join(root, 'public'), out, { recursive: true });
  console.log(`Built ${routes.length + 1} pages into dist/`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
