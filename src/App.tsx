import { KeyboardControls, Sky } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Suspense } from 'react'

import { Cubes } from './components/Cubes'
import { FPV } from './components/FPV'
import { Ground } from './components/Ground'
import { Menu } from './components/Menu'
import { Player } from './components/Player'
import { TextureSelector } from './components/TextureSelector'

function App() {
  return (
    <KeyboardControls
      map={[
        { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
        { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
        { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
        { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
        { name: 'jump', keys: ['Space'] },
        { name: 'dirt', keys: ['Digit1'] },
        { name: 'grass', keys: ['Digit2'] },
        { name: 'glass', keys: ['Digit3'] },
        { name: 'wood', keys: ['Digit4'] },
        { name: 'log', keys: ['Digit5'] },
      ]}
    >
      <Canvas>
        <FPV />
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={1} />
        <Suspense>
          <Physics>
            <Player />
            <Ground />
            <Cubes />
          </Physics>
        </Suspense>
      </Canvas>
      <div className="cursor" />
      <Menu />
      <TextureSelector />
    </KeyboardControls>
  )
}

export default App
