import { PointerLockControls } from "@react-three/drei"
import { useThree } from "@react-three/fiber"

export const FPV = () => {
    const { camera, gl: { domElement } } = useThree()

    return (
        <PointerLockControls args={[camera, domElement]} />
    )

}