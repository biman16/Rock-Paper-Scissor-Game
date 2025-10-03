let scores = JSON.parse(localStorage.getItem('score')) || {
            wins: 0,
            losses: 0,
            ties: 0
        };

        function updateScoreElement(){
            document.querySelector('.showDetails').innerHTML = `Wins: ${scores.wins}, Losses: ${scores.losses}, Ties: ${scores.ties}`;
        }

        function pickComputerMove(){
            let computerMove = '';
            const randomNumber = Math.random();
            if(randomNumber >= 0 && randomNumber <1/3){
                computerMove = 'Rock';
            } else if(randomNumber >= 1/3 && randomNumber < 2/3){
                computerMove ='Paper';
            } else {
                computerMove ='Scissors';
            }
            return computerMove;
        }

        updateScoreElement();

        let isAutoPlaying = false;
        let intervalId;

        function autoPlay(){
            if (!isAutoPlaying){
               intervalId = setInterval(function(){
                const playerMove = pickComputerMove();
                playGame(playerMove);
            }, 1000);
            isAutoPlaying = true;
            }else{
                clearInterval(intervalId);
                isAutoPlaying = false;
            }}

        function playGame(playerMove) {   
            const computerMove = pickComputerMove();
            let result = '';

            if(playerMove === 'Rock'){
                if (computerMove === 'Rock'){
                    result = 'You Tie';
                } else if (computerMove === 'Paper'){
                    result = 'You Lose';
                } else {
                    result = 'You Win';
                }
            } else if (playerMove === 'Paper'){
                if(computerMove === 'Rock'){
                    result = 'You Win';
                } else if (computerMove === 'Paper'){
                    result = 'You Tie';
                } else {
                    result = 'You Lose';
                }
            } else if(playerMove === 'Scissors') {
                if(computerMove === 'Rock'){
                    result = 'You Lose';
                } else if (computerMove === 'Paper'){
                    result = 'You Win';
                } else {
                    result = 'You Tie';
                }
            }

            if (result === 'You Win'){
                scores.wins += 1;
            } else if (result === 'You Lose'){
                scores.losses += 1;
            } else {
                scores.ties += 1;
            }

            localStorage.setItem('score', JSON.stringify(scores));
            updateScoreElement();

            document.querySelector('.showResult').innerHTML = result;
            document.querySelector('.showMoves').innerHTML =
             `
            You
            <img src="images/${playerMove}-emoji.png" alt="" class="emoji">
            <img src="images/${computerMove}-emoji.png" alt="" class="emoji"> Computer
            `;
        }