import { useStore } from "../hooks/useStore"
import { Cube } from "./Cube"

export const Cubes = () => {
    const cubes = useStore((state) => state.cubes)
    return (
        <>
            {cubes.map(({ key, pos, texture }) => (
                <Cube
                    key={key}
                    position={{ x: pos[0], y: pos[1], z: pos[2] }}
                    texture={texture}
                />
            ))}
        </>
    )
}