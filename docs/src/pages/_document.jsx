import { Head, Html, Main, NextScript } from 'next/document'

const themeScript = `
  let mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  function updateTheme(savedTheme) {
    let theme = 'system'
    try {
      if (!savedTheme) {
        savedTheme = window.localStorage.theme
      }
      if (savedTheme === 'dark') {
        theme = 'dark'
        document.documentElement.classList.add('dark')
      } else if (savedTheme === 'light') {
        theme = 'light'
        document.documentElement.classList.remove('dark')
      } else if (mediaQuery.matches) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    } catch {
      theme = 'light'
      document.documentElement.classList.remove('dark')
    }
    return theme
  }

  function updateThemeWithoutTransitions(savedTheme) {
    updateTheme(savedTheme)
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }

  document.documentElement.setAttribute('data-theme', updateTheme())

  new MutationObserver(([{ oldValue }]) => {
    let newValue = document.documentElement.getAttribute('data-theme')
    if (newValue !== oldValue) {
      try {
        window.localStorage.setItem('theme', newValue)
      } catch {}
      updateThemeWithoutTransitions(newValue)
    }
  }).observe(document.documentElement, { attributeFilter: ['data-theme'], attributeOldValue: true })

  mediaQuery.addEventListener('change', updateThemeWithoutTransitions)
  window.addEventListener('storage', updateThemeWithoutTransitions)
`

export default function Document() {
  return (
    <Html className="antialiased [font-feature-settings:'ss01']" lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </Head>
      <body className="bg-background text-foreground">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
