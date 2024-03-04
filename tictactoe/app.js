
let one = document.getElementById("cell1")
let two = document.getElementById("cell2")
let three = document.getElementById("cell3")
let four = document.getElementById("cell4")
let five = document.getElementById("cell5")
let six = document.getElementById("cell6")
let seven = document.getElementById("cell7")
let eight = document.getElementById("cell8")
let nine = document.getElementById("cell9")
let gameactive = true

        document.addEventListener("DOMContentLoaded", async function () {
            const cells = document.querySelectorAll('.cell');
            let turn = "X";
             if (turn === "X") {
                 xTurn(turn)

             }
            if (turn === "O") {
                await APITurn(turn,cells)
            }


             async function xTurn(turn) {
                 cells.forEach(cell => {
                     cell.addEventListener('click', function () {
                         if (gameactive && this.textContent === '') {
                             this.textContent = turn;
                             if (iswin(turn)) {
                                 window.alert('Game is over now please restart the page to play a new game')
                                 gameactive = false;
                             } else if (tie()) {
                                 window.alert('Game is a tie now please restart the page to play a new game')
                             } else {
                                 switchTurn()
                             }
                         }
                     });
                 });
             }


            /* async function APITurn(turn) {
                 try {
                     let data =   await fetch("game.json")
                     let json =  await data.json()
                     console.log(json)
                     let recommend = json.recommendation
                     console.log(recommend);
                     if(cells[recommend + 1].textContent === '') {
                         cells[recommend + 1].textContent = turn
                         if (iswin(turn)) {
                             window.alert('Game is over now please restart the page to play a new game')
                         } else {
                             switchTurn()
                         }
                     }

                 } catch (e) {
                     console.log(e)
                 }


             }*/
            async function APITurn(turn, cells) {
                // Generate the game state string
                let gameState = Array.from(cells).map(cell => cell.textContent === '' ? '-' : cell.textContent).join('');

                try {
                    // Make the API call
                    let res = await fetch(`https://tic-tac-toe-api-psu.onrender.com/api/v1/${gameState}/${turn}`);
                    let data = await res.json();
                    let recommendation = data.recommendation;

                    // Use the recommendation to make a move
                    if (gameactive && cells[recommendation].textContent === '') {
                        cells[recommendation].textContent = turn;
                        if (iswin(turn)) {
                            window.alert('Game is over now please restart the page to play a new game');
                            gameactive = false;
                        } else if (tie()) {
                            window.alert('Game is a tie now please restart the page to play a new game');
                        } else {
                            switchTurn();
                        }
                    }
                } catch (e) {
                    console.error(e);
                }
            }



            function switchTurn() {
                turn = turn === "X" ? "O" : "X";
                // Check the current turn and call the appropriate function
                if (turn === "O") {
                    APITurn(turn, cells);
                }
            }


            function iswin(player) {
                if (one.textContent === player && two.textContent === player && three.textContent === player) {
                    return true
                }

                if (four.textContent === player && five.textContent === player && six.textContent === player) {
                    return true
                }
                if (one.textContent === player && four.textContent === player && seven.textContent === player) {
                    return true
                }
                if (two.textContent === player && five.textContent === player && eight.textContent === player) {
                    return true
                }
                if (three.textContent === player && six.textContent === player && nine.textContent === player) {
                    return true
                }

                if (one.textContent === player && five.textContent === player && nine.textContent === player) {
                    return true
                }

                if (three.textContent === player && five.textContent === player && seven.textContent === player) {
                    return true
                }
            }

            function tie() {
                //use the javascript spread syntax feature to see if there's a tie by checking
                // for every cell if there's either an X or O there
                return [...cells].every(cell => cell.textContent === 'X' || cell.textContent === 'O');
            }


        });