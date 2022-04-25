import { useMachine } from '@xstate/react'
import React, { FC } from 'react'
import { modalWithVideoMachine } from '../machines/modalMachine'
import List from './List'

const VideoList: FC = () => {
  const [state, send] = useMachine(modalWithVideoMachine, { devTools: true })

  return (
    <List
      items={state} />
  )
}

export default VideoList
