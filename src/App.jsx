import './App.css';

import { useMachine } from '@xstate/react';
import { createMachine } from 'xstate';
import { Modal, Button } from 'antd';

import ReactPlayer from 'react-player';


const machine = createMachine({
  id: 'modal',
  initial: 'invisible',
  states: {
    invisible: {
      on: { toggle: 'visible' }
    },
    visible: {
      on: { toggle: 'invisible' }
    }
  }
});

function App() {

  const [state, send] = useMachine(machine);

  console.log(state);

  return (
    <div className="App">
      <Button type="primary" onClick={() => send('toggle')}>
        PLAY VIDEO
      </Button>
      <Modal
        title="PLAYER"
        centered
        visible={state.value === 'invisible' ? false : true}
        onOk={() => send('toggle')}
        onCancel={() => send('toggle')}
      >
        <ReactPlayer url='https://cdn.flowplayer.com/d9cd469f-14fc-4b7b-a7f6-ccbfa755dcb8/hls/383f752a-cbd1-4691-a73f-a4e583391b3d/playlist.m3u8' />
      </Modal>
    </div>
  );
}

export default App;
