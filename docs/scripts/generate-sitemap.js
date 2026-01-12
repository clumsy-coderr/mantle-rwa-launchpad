const fs = require('fs')
const path = require('path')

const SITE_URL = 'https://rwa-sdk.com'

// Get all markdown files from the docs directory
function getDocPages() {
  const docsDir = path.join(__dirname, '../src/pages/docs')
  const files = fs.readdirSync(docsDir)

  return files
    .filter(file => file.endsWith('.md'))
    .map(file => `/docs/${file.replace('.md', '')}`)
}

// Generate sitemap XML
function generateSitemap() {
  const staticPages = ['/']
  const docPages = getDocPages()
  const allPages = [...staticPages, ...docPages]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
      .map(page => {
        const priority = page === '/' ? '1.0' : page.includes('/docs/') ? '0.8' : '0.6'
        const changefreq = page === '/' ? 'weekly' : 'monthly'

        return `  <url>
    <loc>${SITE_URL}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
      })
      .join('\n')}
</urlset>`

  const publicDir = path.join(__dirname, '../public')
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap)

  console.log(`✅ Sitemap generated with ${allPages.length} pages`)
}

generateSitemap()
