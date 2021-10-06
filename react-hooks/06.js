// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {
  PokemonForm,
  fetchPokemon,
  PokemonDataView,
  PokemonInfoFallback,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    status: 'idle',
    pokemon: null,
    error: null,
  })

  React.useEffect(() => {
    if (pokemonName === '') return

    setState(prevState => ({
      ...prevState,
      status: 'pending',
      pokemon: null,
      error: null,
    }))

    fetchPokemon(pokemonName)
      .then(result => {
        setState(prevState => ({
          ...prevState,
          status: 'resolved',
          pokemon: result,
          error: null,
        }))
      })
      .catch(error => {
        setState(prevState => ({
          ...prevState,
          status: 'rejected',
          pokemon: null,
          error,
        }))
      })
  }, [setState, pokemonName])

  const {status, error, pokemon} = state

  if (status === 'rejected') {
    throw error
  }

  if (status === 'idle') {
    return 'Submit a pokemon'
  }

  if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  }

  return <PokemonDataView pokemon={pokemon} />
}

const PokemonErrorFallback = ({error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary }>Try again</button>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary FallbackComponent={PokemonErrorFallback} resetKeys={[pokemonName]}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
