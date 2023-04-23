import { nanoid } from 'nanoid'
import { create } from 'zustand'

import { TextureType } from '../types/Texture'

interface Cube {
  key: string
  pos: number[]
  texture: TextureType
}

interface State {
  texture: TextureType
  cubes: Cube[]
  addCube: (x: number, y: number, z: number) => void
  removeCube: (x: number, y: number, z: number) => void
  setTexture: (texture: TextureType) => void
  saveWorld: () => void
  resetWorld: () => void
}

const getLocalStorage = (): Cube[] => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (data) return JSON.parse(data)
  return []
}

const setLocalStorage = (value: Cube[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value))
}

const LOCAL_STORAGE_KEY = 'cubes-minecraft-clone'

export const useStore = create<State>(set => ({
  texture: 'dirt',
  cubes: getLocalStorage(),
  addCube: (x, y, z) => {
    set(prev => ({
      cubes: [
        ...prev.cubes,
        {
          key: nanoid(),
          pos: [x, y, z],
          texture: prev.texture,
        },
      ],
    }))
  },
  removeCube: (x, y, z) => {
    set(prev => ({
      cubes: prev.cubes.filter(
        ({ pos: [cx, cy, cz] }) => x !== cx || y !== cy || z !== cz
      ),
    }))
  },
  setTexture: texture => {
    set(() => ({ texture }))
  },
  saveWorld: () => {
    set(prev => {
      setLocalStorage(prev.cubes)
      return prev
    })
  },
  resetWorld: () => {
    set(() => ({ cubes: [] }))
  },
}))
