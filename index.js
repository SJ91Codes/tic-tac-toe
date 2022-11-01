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

    // function to create the board
    const create = () =>{
        const hBoard = document.querySelector(".game-board")
        // create each position, assign position value as data attribute and add listener
        for(x=0; x<9; x++){
            const gPiece = document.createElement("div")
            hBoard.appendChild(gPiece)
            gPiece.classList.add("piece")
            gPiece.setAttribute("data-pos", x)
            gPiece.addEventListener("click", place)
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
                console.log("winner")
            }

        })
    
            
    



    }
    // function to place player piece on relevant board piece
    const place = function(e){
        //get the data pos attribute from the event when piece clicked
        let toPlace = e.path[0].attributes[1].value
        // place the player piece in the board array in index that relates to board position
        boardArray[toPlace] = displayControl.getPlayer()
        //add selected position to players array, converted to int
        player.positions.push(Number(toPlace))
        //place all positions on board and change current player
        displayControl.render()
        compare(player)
        displayControl.changePlayer()
        
    }
    return{create, boardArray}
    
    
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
            toPlace = document.querySelector(`[data-pos = "${index}"] `)
            toPlace.innerText = val
            

        }
        )
    }
    return{getPlayer, render, changePlayer}

})();
gameboard.create()
const player1 = Player("x", 1)
const player2 = Player("o", 2)



let player = player1


