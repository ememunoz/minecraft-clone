import { useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RapierRigidBody, RigidBody } from '@react-three/rapier'
import { useEffect, useRef } from 'react'
import { Vector3 } from 'three'

export const Player = () => {
  const playerRef = useRef<RapierRigidBody>(null)
  const [subscribeKeys, getKeys] = useKeyboardControls()

  useFrame(({ camera }) => {
    if (!playerRef.current) return
    const { forward, backward, leftward, rightward } = getKeys()
    const yVectorValue = playerRef.current.linvel().y ?? 0
    const frontVector = new Vector3(
      0,
      0,
      (backward ? 1 : 0) - (forward ? 1 : 0)
    )
    const sideVector = new Vector3(
      (leftward ? 1 : 0) - (rightward ? 1 : 0),
      0,
      0
    )
    const direction = new Vector3()
    direction
      .copy(frontVector)
      .sub(sideVector)
      .normalize()
      .multiplyScalar(4)
      .applyEuler(camera.rotation)
      .setY(yVectorValue)

    playerRef.current?.setLinvel(direction, true)
    const { x, y, z } = playerRef.current.translation()
    const playerPosition = new Vector3(x, y, z)
    camera.position.copy(playerPosition)
  })

  const jump = () => {
    if (!playerRef.current) return
    const { y: yVelocity } = playerRef.current.linvel()
    if (Math.abs(yVelocity) <= 0.0001) {
      playerRef.current.applyImpulse({ x: 0, y: 5, z: 0 }, true)
    }
  }

  useEffect(() => {
    const unsubscribeJump = subscribeKeys(
      state => state.jump,
      value => {
        if (value) jump()
      }
    )
    return () => unsubscribeJump()
  }, [])

  // useEffect(() => {
  // const unsubscribeMovement = subscribeKeys((state) => { })
  // retu
  // })

  return (
    <RigidBody
      ref={playerRef}
      position={[0, 1, 0]}
      restitution={0}
      friction={0}
      mass={10}
      angularDamping={0}
    >
      <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
    </RigidBody>
  )
}
