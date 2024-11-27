import { useState } from 'react'
import { TemplateModal } from './TemplateModal'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { createRef } from 'react'

const instructions = [
  {
    title: 'Bienvenido a Colors',
    content: (
      <p>
        ¡Prepárate para un desafío único! En este juego, tu tarea es organizar colores en una secuencia lógica.
        Desarrolla tu percepción visual y pon a prueba tu habilidad para distinguir tonalidades.
      </p>
    ),
    ref: createRef(null),
  },
  {
    title: '¿Cómo jugar?',
    content: (
      <div className="flow">
        <article>
          <ul>
            <li>
              <strong>Ordena los colores:</strong> Arrastra y suelta los colores para alinearlos en el orden correcto.
            </li>
            <li>
              <strong>Secuencia lógica:</strong> Los colores deben transicionar suavemente entre tonos, saturación o
              luminosidad.
            </li>
            <li>
              <strong>Bloques fijos:</strong> Algunos colores están bloqueados en su lugar para ayudarte. Usa estos como
              referencia.
            </li>
          </ul>
        </article>
        <video className="video" autoPlay loop key="video-step-1">
          <source type="video/webm" src="/videos/example_to_play.webm" />
          <source type="video/mp4" src="/videos/example_to_play.mp4" />
        </video>
      </div>
    ),
    ref: createRef(null),
  },
  {
    title: '¿Dificultades con los colores?',
    content: (
      <div className="flow">
        <article>
          Los niveles son generados aleatoriamente. Si tienes dificultades para distinguir los colores que te tocaron o
          deseas cambiarlos, puedes hacerlo presionando el siguiente <strong>botón</strong>.
        </article>
        <video className="video" autoPlay loop key="video-step-2">
          <source type="video/webm" src="/videos/example_to_change_color.webm" />
          <source type="video/mp4" src="/videos/example_to_change_color.mp4" />
        </video>
      </div>
    ),
    ref: createRef(null),
  },
  {
    title: 'Niveles y dificultad',
    content: (
      <article className="flow">
        Cada nivel introduce nuevos desafíos:
        <ul className="text-start">
          <li>
            <strong>Más colores:</strong> Aumenta el número de piezas que debes ordenar.
          </li>
          <li>
            <strong>Tonalidades cercanas:</strong> Las diferencias entre colores serán más sutiles a medida que avances.
          </li>
          <li>
            <strong>Tiempo y movimientos:</strong> Completa los niveles en el menor tiempo posible y con los movimientos
            mínimos.
          </li>
        </ul>
      </article>
    ),
    ref: createRef(null),
  },
  {
    title: '¡Diviértete jugando!',
    content: (
      <article>
        Recuerda, este juego no solo es un desafío, sino una experiencia relajante. Disfruta de los colores, mejora tus
        habilidades y diviértete explorando el mundo de las tonalidades.
      </article>
    ),
    ref: createRef(null),
  },
]

export function InstructorModal({ isOpen, onClose }) {
  const [step, setStep] = useState(0)

  const hasNextStep = step + 1 < instructions.length
  const currentStep = instructions[step]
  const selectedRef = currentStep.ref

  function nextStep() {
    const newStep = step + 1
    if (instructions.length === newStep) {
      onClose()
      setTimeout(() => {
        setStep(0)
      }, 500)
      return
    }

    setStep(newStep)
  }

  function prevStep() {
    if (step === 0) return
    setStep(p => p - 1)
  }

  function ModalOptions() {
    return (
      <>
        {step > 0 ? <button onClick={prevStep}>Atrás</button> : null}
        <button onClick={nextStep}>{hasNextStep ? 'Continuar' : 'A Jugar'}</button>
      </>
    )
  }

  function onExited() {
    console.log
  }

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition key={currentStep.title} nodeRef={selectedRef} classNames="fade" timeout={200} onExited={onExited}>
        <TemplateModal title={currentStep.title} footer={<ModalOptions />} isOpen={isOpen} onClose={onClose}>
          <div className="content">
            <div ref={selectedRef}>{currentStep.content}</div>
          </div>
        </TemplateModal>
      </CSSTransition>
    </SwitchTransition>
  )
}
