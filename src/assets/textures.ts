import { NearestFilter, RepeatWrapping, TextureLoader } from 'three'

import { images } from './images'

const { dirtImg, glassImg, grassImg, logImg, woodImg } = images
const dirtTexture = new TextureLoader().load(dirtImg)
const logTexture = new TextureLoader().load(logImg)
const grassTexture = new TextureLoader().load(grassImg)
const glassTexture = new TextureLoader().load(glassImg)
const woodTexture = new TextureLoader().load(woodImg)
const groundTexture = new TextureLoader().load(grassImg)

dirtTexture.magFilter = NearestFilter
logTexture.magFilter = NearestFilter
grassTexture.magFilter = NearestFilter
glassTexture.magFilter = NearestFilter
woodTexture.magFilter = NearestFilter
groundTexture.magFilter = NearestFilter
groundTexture.wrapS = RepeatWrapping
groundTexture.wrapT = RepeatWrapping

export const textures = {
  dirt: dirtTexture,
  log: logTexture,
  grass: grassTexture,
  glass: glassTexture,
  wood: woodTexture,
  ground: groundTexture,
}
