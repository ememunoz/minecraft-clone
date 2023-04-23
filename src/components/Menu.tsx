import { useStore } from '../hooks/useStore'

export const Menu = () => {
  const [saveWorld, resetWorld] = useStore(state => [
    state.saveWorld,
    state.resetWorld,
  ])

  return (
    <div className="menu">
      <button onClick={saveWorld} type="button">
        Save World
      </button>
      <button onClick={resetWorld} type="button">
        Reset World
      </button>
    </div>
  )
}
