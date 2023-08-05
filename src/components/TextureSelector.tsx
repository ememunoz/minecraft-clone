import { useKeyboardControls } from '@react-three/drei'
import { useEffect, useState } from 'react'

import { images } from '../assets/images'
import { useStore } from '../hooks/useStore'

export const TextureSelector = () => {
  // const { dirtImg, glassImg, grassImg, logImg, woodImg } = images
  const [visible, setVisible] = useState(false)
  const activeTexture = useStore(state => state.texture)
  const setTexture = useStore(state => state.setTexture)
  const [subscribeKeys] = useKeyboardControls()

  useEffect(() => {
    const unsubDirt = subscribeKeys(
      state => state.dirt,
      value => value && setTexture('dirt')
    )
    const unsubGlass = subscribeKeys(
      state => state.glass,
      value => value && setTexture('glass')
    )
    const unsubGrass = subscribeKeys(
      state => state.grass,
      value => value && setTexture('grass')
    )
    const unsubWood = subscribeKeys(
      state => state.wood,
      value => value && setTexture('wood')
    )
    const unsubLog = subscribeKeys(
      state => state.log,
      value => value && setTexture('log')
    )
    return () => {
      unsubDirt()
      unsubGlass()
      unsubGrass()
      unsubWood()
      unsubLog()
    }
  }, [])

  useEffect(() => {
    const visibilityTimeout = setTimeout(() => {
      setVisible(false)
    }, 2000)
    setVisible(true)
    return () => clearTimeout(visibilityTimeout)
  }, [activeTexture])

  return (
    <>
      {visible && (
        <div className="texture-selector">
          {Object.entries(images).map(([key, value]) => (
            <img
              key={key}
              src={value}
              className={`${key === activeTexture + 'Img' ? 'active' : ''}`}
            />
          ))}
        </div>
      )}
    </>
  )
}
