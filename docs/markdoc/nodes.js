import { nodes as defaultNodes, Tag } from '@markdoc/markdoc'
import { Fence } from '@/components/Fence'
import { Heading } from '@/components/Heading'

function generateID(children, attributes) {
  if (attributes.id && typeof attributes.id === 'string') {
    return attributes.id
  }
  return children
    .filter((child) => typeof child === 'string')
    .join(' ')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim()
}

const nodes = {
  document: {
    ...defaultNodes.document,
  },
  heading: {
    render: Heading,
    attributes: {
      level: { type: Number, required: true },
      id: { type: String },
    },
    transform(node, config) {
      const attributes = node.transformAttributes(config)
      const children = node.transformChildren(config)
      const id = generateID(children, attributes)

      return new Tag(this.render, { ...attributes, id }, children)
    },
  },
  th: {
    ...defaultNodes.th,
    attributes: {
      ...defaultNodes.th?.attributes,
      scope: {
        type: String,
        default: 'col',
      },
    },
  },
  fence: {
    render: Fence,
    attributes: {
      language: {
        type: String,
      },
      content: {
        type: String,
      },
    },
  },
}

export default nodes
