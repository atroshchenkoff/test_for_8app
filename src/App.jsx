import './App.css';

import { useMachine } from '@xstate/react';
import { modalWithVideoMachine } from './machines/modalMachine'

import { Modal, Button } from 'antd';
import { CaretRightFilled, ShrinkOutlined, PauseOutlined, ArrowsAltOutlined, PlayCircleOutlined } from '@ant-design/icons';

import ReactPlayer from 'react-player';


function App() {

  const [state, send] = useMachine(modalWithVideoMachine, { devTools: true });

  let playingVideo = state?.context?.playingVideo;
  let visible = state?.value?.opened
  let defaultSize = state?.value?.opened?.size === 'default';

  const handleCancel = () => {
    // at first pause the video before the component is umounted
    send('TOGGLE_PAUSE');
    // then close modal over 100 ms
    setTimeout(() => {
      send('CLOSE_MODAL');
    }, 100);
  };

  return (

    <div className="App">

      <div className='closed-modal'>
        <PlayCircleOutlined className='playing-icon' onClick={() => send('OPEN_MODAL')} />
      </div>

      <Modal
        title="PLAYER"
        visible={visible ? true : false}
        onCancel={handleCancel}
        style={{ margin: '5vh auto auto' }}
        width={defaultSize ? 1000 : 500}
        footer={[

          <Button
            key='screen-size'
            onClick={() => send(defaultSize ? 'TOGGLE_SMALLER' : 'TOGGLE_DEFAULT')}
            shape='circle'
            icon={defaultSize ? <ShrinkOutlined /> : <ArrowsAltOutlined />}
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
