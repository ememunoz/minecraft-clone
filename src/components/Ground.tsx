import { RigidBody } from '@react-three/rapier'

import { textures } from '../assets/textures'
import { ThreeEvent } from '@react-three/fiber'
import { useStore } from '../hooks/useStore'

export const Ground = () => {
  const addCube = useStore((state) => state.addCube)
  const { ground } = textures
  ground.repeat.set(100, 100)

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    const [x, y, z] = Object.values(e.point).map(v => Math.ceil(v))
    addCube(x, 0, z)
  }


  return (
    <RigidBody
      type="fixed"
      restitution={0}
      friction={0}
      linearDamping={1}
      angularDamping={0.5}
    >
      <mesh position={[0, -1.01, 0]} onClick={handleClick} receiveShadow>
        <boxGeometry args={[100, 1, 100]} />
        <meshStandardMaterial map={ground} />
      </mesh>
    </RigidBody>
  )
}
