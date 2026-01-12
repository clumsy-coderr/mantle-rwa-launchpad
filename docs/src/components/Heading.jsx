export function Heading({ id, level, children }) {
  const Tag = `h${level}`

  return (
    <Tag id={id} className="scroll-mt-24">
      {children}
    </Tag>
  )
}
