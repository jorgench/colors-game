import { Icon } from '@iconify/react/dist/iconify.js'
import { useId } from 'react'

import '../assets/switch.css'

import { useLocalStorage } from '@uidotdev/usehooks'
import { useLayoutEffect } from 'react'

function useTheme() {
  const preferences = window.matchMedia('(prefers-color-scheme:dark)').matches
  const [isDarkTheme, setIsDark] = useLocalStorage('darkTheme', preferences)

  useLayoutEffect(() => {
    document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light')
  }, [isDarkTheme])

  function changeTheme() {
    setIsDark(!isDarkTheme)
  }

  return {
    isDarkTheme,
    changeTheme,
  }
}

export function ThemeColorSwitch() {
  const { isDarkTheme, changeTheme } = useTheme()
  const idComponent = useId()

  function onChange(evt) {
    changeTheme(evt.target.checked)
  }

  return (
    <div className="switch">
      <label htmlFor={idComponent}>
        <input
          id={idComponent}
          type="checkbox"
          aria-label="Cambiar de tema"
          checked={isDarkTheme}
          value="isDarkTheme"
          onChange={onChange}
        />
        <div className="switch-icons" key={`mode-${isDarkTheme}`}>
          {isDarkTheme ? <Icon icon="mynaui:brightness-high-solid" /> : <Icon icon="mynaui:moon-solid" />}
        </div>
      </label>
    </div>
  )
}
