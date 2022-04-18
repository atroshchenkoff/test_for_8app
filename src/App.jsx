import './App.css';

import { useMachine } from '@xstate/react';
import { createMachine, assign } from 'xstate';

import { Modal, Button } from 'antd';
import { CaretRightFilled, ShrinkOutlined, PauseOutlined, ArrowsAltOutlined } from '@ant-design/icons';

import ReactPlayer from 'react-player';


const modalWithVideoMachine = createMachine({
  id: 'modalWithVideo',
  initial: 'closed',
  context: { playingVideo: false, fullscreen: false },
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

function App() {

  const [state, send] = useMachine(modalWithVideoMachine, { devTools: true });

  let playingVideo = state?.context?.playingVideo;
  let visible = state?.value?.opened
  let size = state?.value?.opened?.size === 'default';

  const handleCancel = () => {
    // at first pause video
    send('TOGGLE_PAUSE');
    // then close modal
    setTimeout(() => {
      send('CLOSE_MODAL');
    }, 100);
  };


  return (

    <div className="App">

      <Button type="primary" onClick={() => send('OPEN_MODAL')}>
        PLAY VIDEO
      </Button>

      <Modal
        title="PLAYER"
        centered
        visible={visible ? true : false}
        onCancel={handleCancel}
        width={size ? 1000 : 500}
        height={size ? 700: 300}
        footer={[
          
          <Button
            key='screen-size'
            onClick={() => send(size ? 'TOGGLE_SMALLER' : 'TOGGLE_DEFAULT')}
            shape='circle'
            icon={size ? <ShrinkOutlined /> : <ArrowsAltOutlined />}
          />,

          <Button
            key='play-pause'
            onClick={() => send(playingVideo ? 'TOGGLE_PAUSE' : 'TOGGLE_PLAY')}
            shape='circle'
            icon={playingVideo ? <PauseOutlined /> : <CaretRightFilled />}
          />,
        ]}
      >
        <ReactPlayer
          url='https://cdn.flowplayer.com/d9cd469f-14fc-4b7b-a7f6-ccbfa755dcb8/hls/383f752a-cbd1-4691-a73f-a4e583391b3d/playlist.m3u8'
          playing={playingVideo}
          width='100%'
          height='100%'
          loop={true}
        />
      </Modal>
    </div>
  );
}

export default App;
