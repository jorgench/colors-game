import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export const useGameState = create(
  combine(
    {
      /** @type {'empty'|'started'|'finish'} **/
      gameStep: 'empty', //started, finish
      level: 0,
      pointsHistory: [],
      player: {
        name: '',
      },
    },
    set => {
      return {
        setNextLevel(points = 0) {
          if (points < 1) return
          set(state => ({
            level: (state.level += 1),
            points: [...state.pointsHistory, points],
          }))
        },
        setPlayer(name = '') {
          if (name === '') return
          set(() => ({
            player: { name: name },
            gameStep: 'started',
          }))
        },
        setStep() {
          set(() => ({
            gameStep: 'finish',
          }))
        },
      }
    },
  ),
)
