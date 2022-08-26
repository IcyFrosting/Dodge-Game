document.addEventListener('DOMContentLoaded' , () => {
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')
    const GameOverText = document.querySelector('#gameOver')

    let birdLeft = 220;
    let birdBottom = 100;
    let gravity = 3;
    let isGameOver = false;
    let gap = 430

    function gameStart() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'

        GameOverText.style.display = 'none';
    }

    let timerId = setInterval(gameStart, 20)
    
    // SpaceBar Jump
    function control(e) {
        if (e.keyCode === 32) {
            jump()
        }
    }
    
    function jump() {
        if (birdBottom < 500) {
            birdBottom += 50
            bird.style.bottom = birdBottom + "px"
        }
        console.log(birdBottom)
    }

    document.addEventListener('keyup', control)

    function generateObstacle() {
        var randomHeight = Math.random() * 60

        var ObstacleLeft = 500
        var ObstacleBottom = randomHeight

        const obstacle = document.createElement('div')
        if(!isGameOver) obstacle.classList.add('obstacle')
        gameDisplay.append(obstacle)

        obstacle.style.left = ObstacleLeft + "px"
        obstacle.style.bottom = ObstacleBottom + "px"
    
        function moveObstacle() {
            ObstacleLeft -=2
            obstacle.style.left = ObstacleLeft + 'px'
            console.log(ObstacleLeft)
            if (ObstacleLeft === -60){
                clearInterval(timerId2)
                gameDisplay.removeChild(obstacle)
            }

            if (
                ObstacleLeft > 200 && ObstacleLeft < 280 && birdLeft === 220 &&
                (birdBottom < ObstacleBottom + 153 || birdBottom > ObstacleBottom + gap -200)||
                birdBottom === 0 
                ) {
                gameOver()
                clearInterval(timerId2)
            }
        }
        let timerId2 = setInterval(moveObstacle, 20)
        if(!isGameOver) setTimeout(generateObstacle, 3000)
    }
    generateObstacle()

    function gameOver() {
        clearInterval(timerId)
        isGameOver = true
        document.removeEventListener('keyup', control)
        GameOverText.style.display = 'block';
    }
})

// https://youtu.be/8xPsg6yv7TU?t=4196
