const cols = document.querySelectorAll('.col')

//Функция отвечающая за обновления цветов при нажатии на пробел
document.addEventListener('keydown', event => {
  event.preventDefault()
  if (event.code.toLowerCase() === 'space'){
    setRandomCollours()
  }
})

// 
document.addEventListener('click', event => {
  const type = event.target.dataset.type
  
  if (type === 'lock') {
    const node = event.target.tagName.toLowerCase() === 'i'
    ? event.target
    : event.target.children[0]

    //Кусок кода отвечающий за иконку замочка
    node.classList.toggle('fa-lock-open')
    node.classList.toggle('fa-lock')
  } else if (type === 'copy') {
    copyToCkickboard(event.target.textContent)
  }
})

// Функция которая берёт значения заданные в hexCods (все значения шестнадцатиричной системы, т. к. цвета определяются именно с её помощью) и возвращает значение с 6 символами
function generateRandomCollous() {
  const hexCods = '0123456789ABCDEF'
  let color = ''
  for (let i = 0; i < 6; i++) {
    color += hexCods[Math.floor(Math.random() * hexCods.length)]
  }
  return '#' + color
}

// Функция которая при нажатии на номер цвета копирует его
function copyToCkickboard(text) {
  return navigator.clipboard.writeText(text)
}

// Главная Функция которая передаёт значение generateRandomCollous() в html файл (даёт название цвета заголовку h2 и сам цвет колонке), но только если иконка замочка открыта, если закрыта то просто возвращает пустое значение(цвет колонки и её название не меняется) 
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
// Функция которая пользуется библиотекой chroma для определения цвета текста (если цвет светлый, то текст будет тёмным и наоборот)
function setTextColor(text, color) {
  const luminance = chroma(color).luminance()
  text.style.color = luminance > 0.5 ? 'black' : 'white'
}




setRandomCollours()
