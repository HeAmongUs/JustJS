const osuBtn = document.querySelector(".osu")
const startBtn = document.querySelector(".start")
const startLink = document.querySelector(".start-link")
const screens = document.querySelectorAll(".screen")
const timeList = document.querySelector("#time-list")
const timeEl = document.querySelector("#time")
const board = document.querySelector("#board")

const GRADIENT_COLORS = [
    "linear-gradient(90deg, #f598a8, #f6edb2)",
    "linear-gradient(90deg, #cfecd0, #a0cea7, #9ec0db)",
    "linear-gradient(90deg, #cfecd0, #ffc5ca)",
    "linear-gradient(90deg, #b9deed, #efefef)",
    "linear-gradient(90deg, #aea4e3, #d3ffe8)",
    "linear-gradient(90deg, #69b7eb, #b3dbd3, #f4d6db)",
    "linear-gradient(90deg, #ee5c87, #f1a4b5, #d587b3)",
    "linear-gradient(85deg, #fb63f9, #c2e534)",
    "linear-gradient(21deg, #dd03e4, #5611ec)",
    "linear-gradient(4deg, #5462c3, #ba872c)",
    "linear-gradient(81deg, #ddb35f, #7409c7)",
    "linear-gradient(135deg, #e55d87 0%, #5fc3e4 100%)",
    "linear-gradient(66deg, #e38010, #1535bf)",
    "linear-gradient(rgba(135, 60, 255, 0.4), rgba(135, 60, 255, 0.0) 80%), linear-gradient(-45deg, rgba(120, 155, 255, 0.9) 25%, rgba(255, 160, 65, 0.9) 75%)",
    "linear-gradient(limegreen, transparent), linear-gradient(90deg, skyblue, transparent), linear-gradient(-90deg, coral, transparent);",
]

let mouseOnStart = false
let mouseOnOsu = false
let time = 0
let score = 0

osuBtn.addEventListener("mouseover", () => {
    mouseOnOsu = true
    startBtn.classList.remove("hide")
})

osuBtn.addEventListener("mouseout", () => {
    mouseOnOsu = false
    setTimeout(() => {
        if (!mouseOnStart & !mouseOnOsu) {
            startBtn.classList.add("hide")
        }
    }, 500)
})

startBtn.addEventListener("mouseover", () => {
    mouseOnStart = true
    startBtn.classList.remove("hide")
})

startBtn.addEventListener("mouseout", () => {
    mouseOnStart = false
    setTimeout(() => {
        if (!mouseOnStart & !mouseOnOsu) {
            startBtn.classList.add("hide")
        }
    }, 500)
})

startLink.addEventListener("click", (event) => {
    event.preventDefault()
    screens[0].classList.add("up")
})

timeList.addEventListener("click", event => {
    if (event.target.classList.contains("time-btn")) {
        time = parseInt(event.target.getAttribute("data-time"))
        screens[1].classList.add("up")
        preperatingAndStartGame()
    }
})

function preperatingAndStartGame() {
    printOnBoardWithDelay("3", 100)
    printOnBoardWithDelay("2", 1000)
    printOnBoardWithDelay("1", 2000)
    printOnBoardWithDelay(" ", 2900)
    setTimeout(() => { startGame() }, 3000)
}

function printOnBoardWithDelay(text, delay) {
    setTimeout(() => { board.innerHTML = `<h1><span class="primary">${text}</span></h1>` }, delay)
}

function startGame() {
    createRandomCircle(score)
    setInterval(() => {
        if (time === 0) {
            finishGame()
        } else {
            let currentTime = --time
            if (currentTime < 10) {
                currentTime = `0${currentTime}`
            }
            setTime(currentTime)
        }
    }, 1000);
    setTime(time)
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`
    timeEl.parentNode.classList.add("hide")
}

board.addEventListener("click", event => {
    if (event.target.classList.contains("circle")) {
        event.target.remove()
        score++
        createRandomCircle(score)
    }
})

function createRandomCircle(digit) {
    const externalCircle = document.createElement('div')
    const circle = document.createElement("div")
    const size = 50
    const { width, height } = board.getBoundingClientRect()
    const x = getRandomInt(0, width - size * 2.5)
    const y = getRandomInt(0, height - size * 2.5)

    circle.classList.add("circle")
    circle.setAttribute('data-createTime', Date.now())
    circle.innerHTML = `${digit + 1}`

    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = `${GRADIENT_COLORS[getRandomInt(0, GRADIENT_COLORS.length) + 1]}`

    circle.append(externalCircle)
    board.append(circle)

    externalCircle.classList.add(`externalCircle`)
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

d = Date.now()


console.log(d)

