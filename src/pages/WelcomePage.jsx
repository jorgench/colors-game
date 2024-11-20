import { useState } from 'react'
import { FormNameModal } from '../components/FormNameModal'
import { LogoGame } from '../components/LogoGame'
import { PageLayout } from '../layout/PageLayout'

export function WelcomePage() {
  const [openModalName, setOpenModalName] = useState(false)

  return (
    <PageLayout>
      <main className="container page">
        <LogoGame className="title h1" />
        <p>
          Este es un juego inspirado en <a href="#">Blendoku</a> Realizado en React
        </p>
        <button onClick={() => setOpenModalName(true)}>Comenzar</button>
      </main>
      <FormNameModal isOpen={openModalName} onClose={() => setOpenModalName(false)} />
    </PageLayout>
  )
}
