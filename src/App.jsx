import { useEffect, useState } from 'react'
import Home from './pages/Home.jsx'
import Work from './pages/Work.jsx'
import About from './pages/About.jsx'
import Resume from './pages/Resume.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import NotFound from './pages/NotFound.jsx'

// Only "#/..." is a route. A bare "#work" is an in-page anchor and must fall
// through to the home page rather than being read as a route name.
function parseRoute() {
  const h = window.location.hash || ''
  if (!h.startsWith('#/')) return ''
  return h.slice(2).replace(/\/+$/, '')
}

function useHashRoute() {
  const [route, setRoute] = useState(parseRoute)
  useEffect(() => {
    const on = () => setRoute(parseRoute())
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return route
}

export default function App() {
  const route = useHashRoute()

  // Land at the top when the view changes. In-page anchors resolve to route ''
  // and are handled natively, so guard on an actual anchor being present.
  useEffect(() => {
    if (!window.location.hash.startsWith('#/') && window.location.hash.length > 1) return
    window.scrollTo(0, 0)
  }, [route])

  if (route.startsWith('p/')) return <ProjectDetail id={route.slice(2)} />

  switch (route) {
    case '':
      return <Home />
    case 'work':
      return <Work />
    case 'about':
      return <About />
    case 'resume':
      return <Resume />
    default:
      return <NotFound />
  }
}
