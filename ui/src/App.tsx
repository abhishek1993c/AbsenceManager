import React from 'react'
import logo from './logo.svg'
import './App.css'
import Component from './components'

function App () {
  return (
    <div className="App">
      <div className='header'>
        Absence Manager
      </div>
      <div className='container'>
        <Component/>
      </div>
    </div>
  )
}

export default App
