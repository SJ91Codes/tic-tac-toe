// player object
const Player = (piece, player) =>{
    piece = piece;
    player = player;
    positions = []

    return{piece, player, positions}

}

//gameboard module
const gameboard = (() => {
    // array containing player positions
    let boardArray = []
    let toPlay
    let moves = 0



    // function to create the board
    const create = () =>{
        const hBoard = document.querySelector(".game-board")
        // create each position, assign position value as data attribute and add listener
        for(x=0; x<9; x++){
            const gPiece = document.createElement("div")
            hBoard.appendChild(gPiece)
            gPiece.classList.add("piece")
            gPiece.setAttribute("data-pos", x)
            gPiece.addEventListener("click", displayControl.place)
        }
    }

    const compare = (player) =>{
        const winningCombos = [[0,1,2], [0,3,6], [0,4,8], [1,4,7], [2,5,8], [2,4,6], [3,4,5], [6,7,8]]
        //cycle through each winning combo
        winningCombos.forEach(val=>{
            let check = 0
            //for each position in winning combo, check if its in the players positions
            val.forEach(pos =>{
                //if winning combo place in player positions icrement the check variable
                if(player.positions.includes(pos)){
                check++
                }
            })
            // if 3 winning combos in player positions then player has won
            if(check >2){
                winner(player.piece)
            }else if(gameboard.moves>8){
                winner("draw")
            }

        })
    
            
    }

    const winner= (piece)=>{
        // hide gameboard
        const hBoard = document.querySelector(".game-board")
        hBoard.classList.add("hidden")
        // create div to display result
        const result = document.createElement("div")
        result.classList.add("result")
        // add result to display
        if(piece === "draw"){
            result.innerText=`${piece}`

        }else{
            result.innerText=`${piece} wins`
        }
        document.body.appendChild(result)
        // end the game
        throw new Error("game over")

    }
   
    return{create, boardArray, compare, toPlay, winner, moves}
    
    
})();
//module to control display of board and pieces
const displayControl = (()=>{
    //function to change current player
    const changePlayer = () =>{
        if(player === player1){
            player = player2
        }else{
            player = player1
        }
    }
    //return current player
    const getPlayer = () =>{
        return player.piece
    }
    //function to place positions on board
    const render = () => {
        //cycle through array and place relevant pieces in relevant board positions
        gameboard.boardArray.forEach((val, index)=>{
            let toPlace = document.querySelector(`[data-pos = "${index}"] `)
            toPlace.innerText = val
            

        }
        )
    }

    // function to place player piece on relevant board piece
    const place = (e)=>{
        //get the data pos attribute from the event when piece clicked
        let toPlace = e.path[0].attributes[1].value
        // place the player piece in the board array in index that relates to board position
        gameboard.boardArray[toPlace] = getPlayer()
        //add selected position to players array, converted to int
        player.positions.push(Number(toPlace))
        gameboard.moves++
        //place all positions on board, check if player has won and change current player
        render()
        gameboard.compare(player)
        if(gameboard.toPlay === "pvp"){
            changePlayer()
        }else if (gameboard.toPlay === "pvc"){
            changePlayer()
            compMove()
            gameboard.moves++
            gameboard.compare(player)
            console.log("game" + gameboard.moves)
            changePlayer()
        }
        
    }

    const compMove = ()=>{
        // generate random number for computer position
        let cMove = Math.floor(Math.random() * 9);
        //if position is taken generate another random nuber until unique one is chosen
        if(gameboard.moves<9){
            while(gameboard.boardArray[cMove] != null ){
                cMove = Math.floor(Math.random() * 9);
                console.log(cMove)
            }
        }
        // place compmove in board array and add position to player 2 positions list
        gameboard.boardArray[cMove] = getPlayer()
        player.positions.push(cMove)
        let randomWait = Math.floor(Math.random()*2000)
        console.log(randomWait)
        setTimeout(render, randomWait)
        
    }
    return{getPlayer, place}

})();

// set screen to choose between pvc or pvp
let play = document.querySelector("button.play")
play.addEventListener("click", ()=>{
    const toPick = document.querySelector("#play")
    gameboard.toPlay = toPick.value
    let start = document.querySelector(".start")
    let game = document.querySelector(".game-board")
    start.classList.add("hidden")
    game.classList.remove("hidden")
    gameboard.create()
    console.log(gameboard.toPlay)

})

// create players
const player1 = Player("x", 1)
const player2 = Player("o", 2)
// start game with player as player 1
let player = player1



