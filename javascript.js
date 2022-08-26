document.addEventListener('DOMContentLoaded' , () => {
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')
    const GameOverText = document.querySelector('#gameOver')

    var birdLeft = 25;
    var birdBottom = 50;
    var gravity = 0.5;
    var isGameOver = false;

    function gameStart() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + '%'
        bird.style.left = birdLeft + '%'

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
        if (birdBottom < 81) {
            birdBottom += 10
            bird.style.bottom = birdBottom + "%"
        }
        console.log(birdBottom)
    }

    document.addEventListener('keyup', control)

    function generateObstacle() {
        var randomHeight = Math.random() * 40

        var ObstacleLeft = 60
        var ObstacleBottom = randomHeight

        const obstacle = document.createElement('div')
        if(!isGameOver) obstacle.classList.add('obstacle')
        gameDisplay.append(obstacle)

        obstacle.style.left = ObstacleLeft + "%"
        obstacle.style.bottom = ObstacleBottom + "%"
    
        function moveObstacle() {
            ObstacleLeft -=0.2
            obstacle.style.left = ObstacleLeft + '%'
            console.log(ObstacleLeft)
            if (ObstacleLeft === 0){
                clearInterval(timerId2)
                gameDisplay.removeChild(obstacle)
            }

            if (
                ObstacleLeft > 14 && ObstacleLeft < 17 && birdBottom < ObstacleBottom + 5 && birdLeft === 25 ||
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