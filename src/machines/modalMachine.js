import { createMachine, assign } from 'xstate';

export const modalWithVideoMachine = createMachine({

  id: 'modalWithVideo',
  initial: 'closed',
  context: { playingVideo: false },
  states: {
    closed: {
      on: {
        OPEN_MODAL: {
          target: 'opened',
          actions: 'playVideo'
        }
      }
    },
    opened: {
      type: 'parallel',
      states: {
        size: {
          initial: 'default',
          states: {
            default: {
              on: {
                TOGGLE_SMALLER: 'smaller',
              }
            },
            smaller: {
              on: {
                TOGGLE_DEFAULT: 'default'
              }
            }
          }
        },
        player: {
          initial: 'play',
          states: {
            play: {
              on: {
                TOGGLE_PAUSE: {
                  target: 'pause',
                  actions: 'pauseVideo'
                },
              }
            },
            pause: {
              on: {
                TOGGLE_PLAY: {
                  target: 'play',
                  actions: 'playVideo'
                }
              }
            }
          }
        },
      },
      on: {
        CLOSE_MODAL: {
          target: 'closed',
          actions: 'pauseVideo'
        }
      }
    }
  },
},
  {
    actions: {
      playVideo: assign({ playingVideo: (context) => context.playingVideo = true }),
      pauseVideo: assign({ playingVideo: (context) => context.playingVideo = false }),
    }
  });
