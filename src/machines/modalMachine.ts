import { createMachine, assign, DoneInvokeEvent } from 'xstate'
import { data } from '../data/data'
import { IVideoData } from '../types/types'

type VideoDataContext = {
  results: IVideoData[]
  currentVideo?: null | object
  error?: null | string
}

// state = { loaded: false, data: null }

// const getData = () => new Promise(resolve => {
//   setTimeout(() => resolve( {data: 177} ), 2000)
// })

// ...

// getData().then(d => {
//   // что то делаем с данными, например
//   this.setState( { loaded: true, data: d } )
// })

// render() {
//   if (!this.state.loaded) return <Loading />
//   return <MyBeautifulDataComponent />
// }

// function getList() {
//   //Код функции не требует изменений
//   return new Promise(function (resolve, reject) {
//     setTimeout(() => {
//       resolve(
//         Array.from({ length: 10 }, (_el, index) => ({
//           label: `label ${index + 1}`,
//           checked: false,
//           id: index
//         }))
//       );
//     }, 1000);
//   });
// }

const fakePromise = async (): Promise<IVideoData[]> => {
  const getRandomNumber = (min: number, max: number) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  }
  const randomNumber = getRandomNumber(1, 10)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        randomNumber === 2 ||
        randomNumber === 4 ||
        randomNumber === 6 ||
        randomNumber === 8 ||
        randomNumber === 10
      ) {
        reject('Произошла ошибка при загрузке данных. Попробуйте еще раз.')
      }
      resolve(data)
    }, 1000)
  })
}

export const modalWithVideoMachine = createMachine<VideoDataContext>(
  {
    id: 'modalWithVideo',
    initial: 'idle',
    context: {
      results: [],
      currentVideo: {},
      error: null,
    },
    states: {
      idle: {
        on: {
          FAKE_FETCH: { target: 'loading' },
        },
      },
      loading: {
        invoke: {
          id: 'getVidoData',
          src: (context, event) => fakePromise(),
          onDone: {
            target: 'success',
            actions: assign<
              VideoDataContext,
              DoneInvokeEvent<{ results: IVideoData[] }>
            >({
              results: (context, event) => event.data.results,
            }),
          },
          onError: {
            target: 'failure',
            actions: assign<VideoDataContext, DoneInvokeEvent<Error>>({
              error: (context, event) => event.data.message,
            }),
          },
        },
      },
      failure: {
        on: { RETRY: { target: 'loading' } },
      },
      success: {
        type: 'parallel',
        initial: 'closed',
        states: {
          closed: {
            on: {
              OPEN_MODAL: {
                target: 'opened',
                actions: assign<VideoDataContext>({
                  currentVideo: (context, event) =>
                    context.results.filter((video) => video === event.),
                }), // TODO: think about logic of OPEN_MODAL with current (context every video) context, and HOW ???
              },
            },
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
                    },
                  },
                  smaller: {
                    on: {
                      TOGGLE_DEFAULT: 'default',
                    },
                  },
                },
              },
              player: {
                initial: 'play',
                states: {
                  play: {
                    on: {
                      TOGGLE_PAUSE: {
                        target: 'pause',
                        actions: 'pauseVideo',
                      },
                    },
                  },
                  pause: {
                    on: {
                      TOGGLE_PLAY: {
                        target: 'play',
                        actions: 'playVideo',
                      },
                    },
                  },
                },
              },
            },
            on: {
              CLOSE_MODAL: {
                target: 'closed',
                actions: 'pauseVideo',
              },
            },
          },
        },
      },
    },
  },
  {
    actions: {
      // playVideo: assign({
      //   playingVideo: (context) => (context.playingVideo = true),
      // }),
      // pauseVideo: assign({
      //   playingVideo: (context) => (context.playingVideo = false),
      // }),
    },
  }
)
