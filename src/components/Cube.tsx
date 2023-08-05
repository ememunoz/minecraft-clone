import { ThreeEvent } from '@react-three/fiber'
import { RapierRigidBody, RigidBody } from '@react-three/rapier'
import { useRef, useState } from 'react'
import { Vector3 } from 'three'

import { textures } from '../assets/textures'
import { useStore } from '../hooks/useStore'
import { TextureType } from '../types/Texture'

type Props = {
  position: { x: number; y: number; z: number }
  texture: TextureType
}
export const Cube = ({ position, texture }: Props) => {
  const [isHovered, setIsHovered] = useState(false)
  const boxRef = useRef<RapierRigidBody>(null)
  const positionVector = new Vector3(position.x, position.y, position.z)
  const activeTexture = textures[texture]
  const [addCube, removeCube] = useStore(state => [
    state.addCube,
    state.removeCube,
  ])

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    if (!e.faceIndex || !boxRef.current) return
    const clickedFace = Math.floor(e.faceIndex / 2)
    const { x, y, z } = boxRef.current.translation()
    if (e.altKey) {
      removeCube(x, y, z)
      return
    }
    if (clickedFace === 0) {
      addCube(x + 1, y, z)
    } else if (clickedFace === 1) {
      addCube(x - 1, y, z)
    } else if (clickedFace === 2) {
      addCube(x, y + 1, z)
    } else if (clickedFace === 3) {
      addCube(x, y - 1, z)
    } else if (clickedFace === 4) {
      addCube(x, y, z + 1)
    } else if (clickedFace === 5) {
      addCube(x, y, z - 1)
    }
    return
  }

  const handlePointerMove = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    setIsHovered(true)
  }
  const handlePointerOut = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    setIsHovered(false)
  }

  return (
    <RigidBody
      ref={boxRef}
      position={positionVector}
      type="fixed"
      restitution={0}
      friction={0}
    >
      <mesh
        onClick={handleClick}
        onPointerMove={handlePointerMove}
        onPointerOut={handlePointerOut}
      >
        <boxGeometry />
        <meshStandardMaterial
          map={activeTexture}
          color={isHovered ? 'grey' : 'white'}
          opacity={texture === 'glass' ? 0.8 : 1}
          transparent
        />
      </mesh>
    </RigidBody>
  )
}
