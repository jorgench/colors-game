import { create } from 'zustand'
import { combine, persist, createJSONStorage } from 'zustand/middleware'

export const useGameState = create(
  persist(
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

            set(state => {
              const indexLevel = state.pointsHistory[state.level - 1]

              if (indexLevel) {
                const levelCopy = [...state.pointsHistory]

                levelCopy[state.level - 1] = {
                  level: state.level + 1,
                  points,
                }

                return {
                  pointsHistory: levelCopy,
                }
              }

              return {
                pointsHistory: [...state.pointsHistory, { level: state.level + 1, points }],
              }
            })
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

              if (maxLevel === undefined || newCurrentLevel > maxLevel) {
                return { level: state.level }
              }

              return { level: newCurrentLevel }
            })
          },
        }
      },
    ),
    {
      name: 'gameStorage',
      storage: createJSONStorage(() => localStorage, {
        replacer: (key, value) => {
          if (key === 'gameStep' && value === 'finish') {
            return 'started'
          }
          return value
        },
      }),
    },
  ),
)
