import { useEffect, useState } from 'react'
import installIcon from "../assets/install-icon.svg"

export default function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null)
  const [canInstall, setCanInstall] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setCanInstall(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return
    
    const promptEvent = deferredPrompt as BeforeInstallPromptEvent
    await promptEvent.prompt()
    const result = await promptEvent.userChoice
    
    if (result.outcome === 'accepted') {
      console.log('Usuário instalou o app')
      setIsInstalled(true)
    }
    
    setDeferredPrompt(null)
    setCanInstall(false)
  }

  if (isInstalled) {
    return (
      <>
        <img src={installIcon} alt="App Instalado" />
        <p style={{ color: '#1DB954' }}>App Instalado</p>
      </>
    )
  }

  if (!canInstall) return null

  return (
    <>
      <img src={installIcon} alt="Instalar PWA" />
      <p onClick={handleInstallClick} style={{ cursor: 'pointer' }}>Instalar PWA</p>
    </>
  )
}
