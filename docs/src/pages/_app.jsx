import { slugifyWithCounter } from '@sindresorhus/slugify'

import { Layout } from '@/components/Layout'
import { SEO, generateMetaDescription } from '@/components/SEO'

import 'focus-visible'
import '@/styles/tailwind.css'

function getNodeText(node) {
  let text = ''
  for (let child of node.children ?? []) {
    if (typeof child === 'string') {
      text += child
    }
    text += getNodeText(child)
  }
  return text
}

function collectHeadings(nodes, slugify = slugifyWithCounter()) {
  let sections = []

  // Ensure nodes is an array
  if (!nodes || !Array.isArray(nodes)) {
    return sections
  }

  for (let node of nodes) {
    if (!node) continue

    if (node.name === 'h2' || node.name === 'h3') {
      let title = getNodeText(node)
      if (title) {
        let id = slugify(title)
        node.attributes = node.attributes || {}
        node.attributes.id = id
        if (node.name === 'h3') {
          if (!sections[sections.length - 1]) {
            throw new Error(
              'Cannot add `h3` to table of contents without a preceding `h2`'
            )
          }
          sections[sections.length - 1].children.push({
            ...node.attributes,
            title,
          })
        } else {
          sections.push({ ...node.attributes, title, children: [] })
        }
      }
    }

    sections.push(...collectHeadings(node.children ?? [], slugify))
  }

  return sections
}

export default function App({ Component, pageProps }) {
  let title = pageProps.markdoc?.frontmatter.title
  let description = pageProps.markdoc?.frontmatter.description

  let content = pageProps.markdoc?.content
  let tableOfContents = Array.isArray(content)
    ? collectHeadings(content)
    : []

  const metaDescription = generateMetaDescription(title, description)

  return (
    <>
      <SEO title={title} description={metaDescription} />
      <Layout title={title} tableOfContents={tableOfContents}>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
