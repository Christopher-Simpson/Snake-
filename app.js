document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width = 10
    let currentIndex = 0 //first div in the grid
    let appleIndex = 0 //first div in the grid
    let currentSnake = [2,1,0] //all divs with value of 2 will be the head and value of 0 tail, body will be 1
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0


    //start/restart
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerHTML = score
        intervalTime = 1000
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }


    //function that deals with all the move outcomes of the snake
    function moveOutcomes() {
    
    //deals with snake hitting border and hitting self
    if (
        (currentSnake[0] + width >= (width * width) && direction === width) || //if snake hits bottom
        (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
        (currentSnake[0] - width < 0 && direction === -width) || // if snake hits top wall
        squares[currentSnake[0] + direction].classList.contains('snake') //if snake hits itself
       ) {
           return clearInterval(interval) // this will clear the interval if any of the above happened
       }

    const tail = currentSnake.pop() //removes last ite of the array and shows it
    squares[tail].classList.remove('snake')  //removes class of snake from the TAIL
    currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of the array
    
    //deals with snake hitting apple    
    if (squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        randomApple()
        score++
        scoreDisplay.textContent = score
        clearInterval(interval)
        intervalTime = intervalTime * speed
        interval = setInterval(moveOutcomes, intervalTime)
    }
    squares[currentSnake[0]].classList.add('snake')
    }
    

    //generate new apple once its eaten
    function randomApple() {
        do{
            appleIndex = Math.floor(Math.random() *squares.length)
        } while (squares[appleIndex].classList.contains('snake'))
        squares[appleIndex].classList.add('apple')
    }


    //assign functions to keycodes
    function control(e) {
        squares[currentIndex].classList.remove('snake') //remove class of snake from all divs

        if (e.keyCode === 39) {
            direction = 1 //If we press right on the keyboard the snake will go right one
        } else if (e.keyCode === 38) {
            direction = -width //press the up arrow the snake will go back 10 divs appearing to go up
        } else if (e.keyCode === 37) {
            direction = -1 //left arrow makes snake go left 1
        } else if (e.keyCode === 40) {
            direction = +width //down arrow makes snake go forward 20 divs appearing to go down
        }
    } 

    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)
})