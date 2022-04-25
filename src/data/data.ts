import { IVideoData } from '../types/types'

export const data: IVideoData[] = [
  {
    id: 1,
    title: 'Видео 1',
    author: 'Владимир',
    uploadDate: new Date(
      +new Date() - Math.floor(Math.random() * 10000000000)
    ).toLocaleDateString('ru'),
    url: 'https://cdn.flowplayer.com/d9cd469f-14fc-4b7b-a7f6-ccbfa755dcb8/hls/383f752a-cbd1-4691-a73f-a4e583391b3d/playlist.m3u8',
  },
  {
    id: 2,
    title: 'Видео 2',
    author: 'Олег',
    uploadDate: new Date(
      +new Date() - Math.floor(Math.random() * 10000000000)
    ).toLocaleDateString('ru'),
    url: 'https://www.youtube.com/watch?v=7NOSDKb0HlU',
  },
  {
    id: 3,
    title: 'Видео 3',
    author: 'Александр',
    uploadDate: new Date(
      +new Date() - Math.floor(Math.random() * 10000000000)
    ).toLocaleDateString('ru'),
    url: 'https://www.youtube.com/watch?v=5yx6BWlEVcY',
  },
  {
    id: 4,
    title: 'Видео 4',
    author: 'Михаил',
    uploadDate: new Date(
      +new Date() - Math.floor(Math.random() * 10000000000)
    ).toLocaleDateString('ru'),
    url: 'https://www.youtube.com/watch?v=5zb7Pxr3oAo',
  },
]
