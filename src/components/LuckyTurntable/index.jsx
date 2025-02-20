import React, { useState, useRef } from 'react'
import { LuckyWheel } from '@lucky-canvas/react'

export default function App({prizes,onEnd,onStart}) {
  const [blocks] = useState([
    { padding: '13px', background: '#ff6b6b' }
  ])
//   const [prizes] = useState([
//     { background: '#e9e8fe', fonts: [{ text: '' }] },
//     { background: '#b8c5f2', fonts: [{ text: '1' }] },
//     { background: '#e9e8fe', fonts: [{ text: '2' }] },
//     { background: '#b8c5f2', fonts: [{ text: '3' }] },
//     { background: '#e9e8fe', fonts: [{ text: '4' }] },
//     { background: '#b8c5f2', fonts: [{ text: '5' }] },
//   ])
  const [buttons] = useState([
    { radius: '30%', background: 'pink' },
    { radius: '25%', background: '#ef6a95' },
    {
      radius: '20%', background: '#ff6b6b',
      pointer: true,
      fonts: [{ text: '开始', top: '-10px', fontColor: '#fff' }]
    }
  ])
  const myLucky = useRef()
  return <div>
    <LuckyWheel
      ref={myLucky}
      width="300px"
      height="300px"
      blocks={blocks}
      prizes={prizes}
      buttons={buttons}
      onStart={() => {
        onStart()
        myLucky.current.play()
        setTimeout(() => {
          const index = Math.floor(Math.random() * prizes.length)
          myLucky.current.stop(index)
        }, 2500)
      }}
      onEnd={prize => {
        onEnd(prize)
      }}
    />
  </div>
}