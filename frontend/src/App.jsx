import React from 'react'
import Body from './components/Body'
import { Toaster } from 'react-hot-toast';
import MovieDialog from './components/MovieDialog';

const App = () => {

  

  return (
    <div>
      <Body/>
      <Toaster/>
      <MovieDialog/>
    </div>
  )
}

export default App
