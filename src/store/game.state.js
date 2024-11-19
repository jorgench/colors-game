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
            pointsHistory: [...state.pointsHistory, { level: state.level + 1, points }],
          }))
        },
        setLevel(currentLevel) {
          set(() => ({
            level: currentLevel,
            gameStep: 'finish',
          }))
        },
        setPlayer(name = '') {
          if (name === '') return
          set(() => ({
            player: { name: name },
            gameStep: 'started',
          }))
        },
        setStep(step = 'finish') {
          set(() => ({
            gameStep: step,
          }))
        },
        moveToLevel(newCurrentLevel) {
          set(state => {
            if (newCurrentLevel <= 0) {
              return { level: state.level }
            }

            const points = state.pointsHistory
            const maxLevel = points[points.length - 1]?.level

            console.log('Points:', maxLevel, newCurrentLevel)
            if (maxLevel === undefined || newCurrentLevel > maxLevel) {
              return { level: state.level }
            }

            console.log('MOVE TO LEVEL???', newCurrentLevel)

            return { level: newCurrentLevel }
          })
        },
      }
    },
  ),
)
