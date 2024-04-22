const cols = document.querySelectorAll('.col')

document.addEventListener('keydown', event => {
  event.preventDefault()
  if (event.code.toLowerCase() === 'space'){
    setRandomCollours()
  }
})

document.addEventListener('click', event => {
  const type = event.target.dataset.type
  
  if (type === 'lock') {
    const node = event.target.tagName.toLowerCase() === 'i'
    ? event.target
    : event.target.children[0]

    node.classList.toggle('fa-lock-open')
    node.classList.toggle('fa-lock')
  } else if (type === 'copy') {
    copyToCkickboard(event.target.textContent)
  }
})

function generateRandomCollous() {
  const hexCods = '0123456789ABCDEF'
  let color = ''
  for (let i = 0; i < 6; i++) {
    color += hexCods[Math.floor(Math.random() * hexCods.length)]
  }
  return '#' + color
}

function copyToCkickboard(text) {
  return navigator.clipboard.writeText(text)
}


function setRandomCollours() {
  cols.forEach(col => {
    const isLocked = col.querySelector('i').classList.contains('fa-lock')
    const text = col.querySelector('h2')
    const button = col.querySelector('button')
    const color = generateRandomCollous()

    if (isLocked) {
      return
    }

    text.textContent = color
    col.style.background = generateRandomCollous()
    
   setTextColor(text,color)
   setTextColor(button,color)
  })
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance()
  text.style.color = luminance > 0.5 ? 'black' : 'white'
}




setRandomCollours()