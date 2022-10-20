//gameboard module
const gameboard = (() => {
    let boardArray = []

    const move = (player) => {
        boardArray.push(player)
        console.log("hello")
    }

    const create = () =>{
        const hBoard = document.querySelector(".game-board")
        for(x=0; x<9; x++){
            const gPiece = document.createElement("div")
            hBoard.appendChild(gPiece)
            gPiece.classList.add("piece")
            gPiece.setAttribute("data-pos", x)
            gPiece.addEventListener("click", place)
        }
    }

    const place = function(e){
        let toPlace = e.path[0].attributes[1].value
        boardArray[toPlace] = displayControl.player
        displayControl.render
    }
    return{create, move, boardArray}
    
    
})();

const displayControl = (()=>{
    const player = "x"

    const changePlayer = () =>{
        if(player === "x"){
            player = "o"
        }else{
            player = "x"
        }
    }
    const getPlayer = () =>{
        return player
    }

    const render = () => {
        gameboard.boardArray.forEach((val, index)=>{
            toPlace = document.querySelector(`[data-pos = "${index}"] `)
            toPlace.innerText = val

        }
        )
    }
    return{getPlayer, render}

})();
gameboard.create()

