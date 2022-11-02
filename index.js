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
            if(check ===3){
                winner()
            }

        })
    
            
    }

    const winner= ()=>{
        const hBoard = document.querySelector(".game-board")
        hBoard.classList.add("hidden")
        const result = document.createElement("div")
        result.classList.add("result")
        result.innerText=`${player.piece} wins`
        document.body.appendChild(result)

    }
   
    return{create, boardArray, compare, toPlay}
    
    
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
        //place all positions on board, check if player has won and change current player
        render()
        gameboard.compare(player)
        if(gameboard.toPlay === "pvp"){
            changePlayer()
        }else if (gameboard.toPlay === "pvc"){
            changePlayer()
            compMove()
        }
        
    }

    const compMove = ()=>{
        let cMove = Math.floor(Math.random() * 10);
        while(player.positions.includes(cMove) == true){
            cMove = Math.floor(Math.random() * 10);
        }
        gameboard.boardArray[cMove] = getPlayer()
        player.positions.push(cMove)
        render()
        
    }
    return{getPlayer, place}

})();
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


const player1 = Player("x", 1)
const player2 = Player("o", 2)

let player = player1



