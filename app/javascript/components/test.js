window.addEventListener('DOMContentLoaded', (event) => {

  console.log('DOM fully loaded and parsed')

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  const oscillator = audioCtx.createOscillator()

  function initOscillator() {
    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime)
    oscillator.started = false
  }

  function start() {
    oscillator.connect(audioCtx.destination)

    if (oscillator.started === false) {
      oscillator.start()
      oscillator.started = true
    }
  }

  function stop() {
    // oscillator.stop(audioCtx.currentTime)
    oscillator.disconnect(audioCtx.destination)
  }

  function changeFrequency(e) {
    const frequency = e.target.valueAsNumber
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime) // value in hertz
  }

  let startButton = document.createElement('div')
  let stopButton = document.createElement('div')
  let frequencyInput = document.createElement('input')
  startButton.innerText = 'START'
  stopButton.innerText = 'STOP'
  frequencyInput.type = 'range'
  frequencyInput.min = 0
  frequencyInput.max = 1320

  startButton.addEventListener('click', start)
  stopButton.addEventListener('click', stop)

  frequencyInput.addEventListener('input', (e) => {
    changeFrequency(e)
  })

  let body = document.getElementsByTagName('body')[0]
  body.appendChild(startButton)
  body.appendChild(stopButton)
  body.appendChild(frequencyInput)

  initOscillator()
})