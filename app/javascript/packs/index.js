import React from 'react'
import ReactDOM from 'react-dom'
import { SynthContainer } from '../containers/SynthContainer'
import './reset.css'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <SynthContainer />,
    document.body.appendChild(document.createElement('div'))
  )
})