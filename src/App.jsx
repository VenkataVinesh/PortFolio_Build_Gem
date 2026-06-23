import React, { useEffect, useState } from 'react'
import Aurora from './variants/Aurora.jsx'
import ProjectDetail from './variants/ProjectDetail.jsx'

function useHashRoute() {
  const get = () => window.location.hash.replace('#/', '')
  const [route, setRoute] = useState(get())
  useEffect(() => {
    const on = () => setRoute(get())
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return route
}

export default function App() {
  const route = useHashRoute()
  if (route.startsWith('p/')) return <ProjectDetail id={route.slice(2)} />
  return <Aurora />
}
