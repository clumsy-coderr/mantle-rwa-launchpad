import { writeFileSync, readFileSync } from 'fs'
import { globby } from 'globby'
import matter from 'gray-matter'

const parseHeading = (content) => {
  const [heading, ...body] = content.split('\n')
  const parsedHeading = heading.trim()
  const parsedBody = body.join(' ').trim()

  return { heading: parsedHeading, body: parsedBody }
}

/*
"content": "string",
"hierarchy": {
    "lvl0": "string",
    "lvl1": "string",
    "lvl2": "string"
},
"type": "lvl2",
"url": "string"
*/
const pages = await globby(['src/pages/**/*.mdx', 'src/pages/**/*.md'])

const objects = pages.flatMap((page) => {
  const {
    data: { title, description },
    content
  } = matter(readFileSync(page, 'utf8'))
  const path = page
    .replace('src/pages/', '/')
    .replace('index', '')
    .replace('.md', '')
    .replace('.mdx', '')

  const parsed = content
    .split('#')
    .map(parseHeading)
    .filter((content) => content.heading !== '' && content.body !== '')

  return parsed.map((block) => ({
    url: path,
    hierarchy: {
      lvl0: title,
      lvl1: block.heading
    },
    content: block.body,
    type: 'lvl1'
  }))
})

writeFileSync('public/agolia.json', JSON.stringify(objects))
