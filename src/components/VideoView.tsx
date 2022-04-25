import './App.css'

import React, { FC } from 'react'

import { Modal, Button } from 'antd'
import {
  CaretRightFilled,
  ShrinkOutlined,
  PauseOutlined,
  ArrowsAltOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons'

import ReactPlayer from 'react-player'

const VideoView: FC<>({}) {
  return (
    <div>
      <div>
        <div className="closed-modal">
          <PlayCircleOutlined
            className="playing-icon"
            onClick={() => send({'OPEN_MODAL'})}
          />
        </div>
        <h1> Видео </h1>
        <h3> NAME </h3>
        <p>
          <i> DATE </i>
        </p>
      </div>

      <Modal
        title="ВИДЕО | NAME | DATE"
        visible={visible ? true : false}
        onCancel={handleCancel}
        style={{ margin: '5vh auto auto' }}
        width={defaultSize ? 1000 : 500}
        footer={[
          <Button
            key="screen-size"
            onClick={() =>
              send(defaultSize ? 'TOGGLE_SMALLER' : 'TOGGLE_DEFAULT')
            }
            shape="circle"
            icon={defaultSize ? <ShrinkOutlined /> : <ArrowsAltOutlined />}
          />,

          <Button
            key="play-pause"
            onClick={() => send(playingVideo ? 'TOGGLE_PAUSE' : 'TOGGLE_PLAY')}
            shape="circle"
            icon={playingVideo ? <PauseOutlined /> : <CaretRightFilled />}
          />,
        ]}
      >
        <ReactPlayer
          url="https://cdn.flowplayer.com/d9cd469f-14fc-4b7b-a7f6-ccbfa755dcb8/hls/383f752a-cbd1-4691-a73f-a4e583391b3d/playlist.m3u8"
          playing={playingVideo}
          width="100%"
          height="100%"
          loop={true}
        />
      </Modal>
    </div>
  )
}

export default VideoView
