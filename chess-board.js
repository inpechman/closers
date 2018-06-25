// pawn1 = document.createElement("div");
// pawn1.classList.add("white-pawn");
// pawn1.myPosition = [Math.floor(Math.random() * 8), Math.floor(Math.random() * 8)];
// document.getElementsByClassName("row")[pawn1.myPosition[0]].getElementsByClassName("cell")[pawn1.myPosition[1]].appendChild(pawn1);

allCells = [];
for (var i = 0; i < document.getElementsByClassName("row").length; i++) {
    var row = [];
    for (var j = 0; j < document.getElementsByClassName("row")[i].getElementsByClassName("cell").length; j++) {
        row.push(document.getElementsByClassName("row")[i].getElementsByClassName("cell")[j])
    }
    allCells.push(row);
}
console.log(allCells);
var currentPlayer = 1;

function changePlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
}

var redPawns = [];
var whitePawns = [];

for (var i = 0; i < 12; i++) {
    var redPawn = document.createElement("div");
    redPawn.classList.add("red-pawn");
    redPawn.classList.add("pawn");
    var y = i % 3;
    var x = i % 4;
    redPawn.myPosition = [y, x * 2 + (y % 2 ? 0 : 1)];
    allCells[y][x * 2 + (y % 2 ? 0 : 1)].appendChild(redPawn);
    redPawns.push(redPawn);
}

for (var i = 0; i < 12; i++) {
    var whitePawn = document.createElement("div");
    whitePawn.classList.add("white-pawn");
    whitePawn.classList.add("pawn");
    var y = i % 3;
    var x = i % 4;
    whitePawn.myPosition = [y + 5, x * 2 + (y % 2 ? 1 : 0)];
    allCells[y + 5][x * 2 + (y % 2 ? 1 : 0)].appendChild(whitePawn);
    whitePawns.push(whitePawn);
}

var optionalCells = [];

for (var redPawn of redPawns) {
    redPawn.onclick = pawnClick(1, true);
}

for (var whitePawn of whitePawns) {
    whitePawn.onclick = pawnClick(2, false);
}


function resetOptionalCells() {
    for (var cell of optionalCells) {
        cell.style.background = null;
        cell.onclick = null;
        console.log("reset cells")
    }
    optionalCells = []
}

// pawn1.onclick = function () {
//     cp = pawn1.myPosition;
//     console.log(this);
//     var optionalPositions = [[cp[0] - 1, cp[1]], [cp[0] + 1, cp[1]], [cp[0], cp[1] - 1], [cp[0], cp[1] + 1]].filter(function (pos) {
//         console.log(Math.max.apply(null, pos));
//         return Math.min.apply(null, pos) >= 0 && Math.max.apply(null, pos) < 8;
//     });
//
//     console.log(optionalPositions);
//     resetOptionalCells();
//     for (var position of optionalPositions) {
//         var cell = allCells[position[0]][position[1]];
//         cell.style.background = "rgba(255,99,71,0.5)";
//         cell.onclick = function (position) {
//             return function () {
//                 this.appendChild(pawn1);
//                 console.log(cp);
//
//                 cp[0] = position[0];
//                 cp[1] = position[1];
//                 // for (var cell of optionalCells) {
//                 //     cell.style.background = null;
//                 //     cell.onclick = null;
//                 //     console.log(cell)
//                 // }
//                 resetOptionalCells();
//             }
//         }(position);
//         optionalCells.push(cell);
//     }
//
// };

function pawnClick(player, backword) {
    var opponents = ["red", "white"];
    var playerOpp = opponents[(player === 1) ? 0 : 1];
    var otherOpp = opponents[(player === 2) ? 0 : 1];

    return function () {
        if (currentPlayer !== player) {
            return
        }
        var pawn = this;
        cp = pawn.myPosition;
        console.log(this);
        var optionalPositions = [[(backword) ? cp[0] + 1 : cp[0] - 1, cp[1] + 1], [(backword) ? cp[0] + 1 : cp[0] - 1, cp[1] - 1]].filter(function (pos) {
            console.log(Math.max.apply(null, pos));
            return Math.min.apply(null, pos) >= 0 && Math.max.apply(null, pos) < 8;
        });

        console.log(optionalPositions);
        resetOptionalCells();
        for (var position of optionalPositions) {
            var cell = allCells[position[0]][position[1]];
            var cellChild = cell.getElementsByClassName("pawn")[0];
            if (cellChild !== undefined) {
                if (cellChild.classList[0] === otherOpp + "-pawn") {
                    console.log(cellChild);
                    var direction = cellChild.myPosition[1] > cp[1];
                    var nextPos = [backword ? cp[0] + 2 : cp[0] - 2, direction ? cp[1] + 2 : cp[1] - 2];
                    var nextCell = allCells[nextPos[0]] [nextPos[1]];
                    var nextCellChild = nextCell.getElementsByClassName("pawn")[0];
                    if (nextCellChild !== undefined) {
                        continue
                    }
                    nextCell.style.background = "rgba(255,99,71,0.5)";
                    nextCell.onclick = function (position) {
                        return function () {
                            this.appendChild(pawn);
                            document.getElementById(otherOpp + "-dead").appendChild(cellChild);
                            console.log(cp);

                            cp[0] = position[0];
                            cp[1] = position[1];
                            // for (var cell of optionalCells) {
                            //     cell.style.background = null;
                            //     cell.onclick = null;
                            //     console.log(cell)
                            // }
                            resetOptionalCells();
                            changePlayer();
                        }
                    }(nextPos);
                    optionalCells.push(nextCell);
                    continue;

                } else {
                    continue;
                }

            }
            cell.style.background = "rgba(255,99,71,0.5)";
            cell.onclick = function (position) {
                return function () {
                    this.appendChild(pawn);
                    console.log(cp);

                    cp[0] = position[0];
                    cp[1] = position[1];
                    // for (var cell of optionalCells) {
                    //     cell.style.background = null;
                    //     cell.onclick = null;
                    //     console.log(cell)
                    // }
                    resetOptionalCells();
                    changePlayer();
                }
            }(position);
            optionalCells.push(cell);
        }

    }

}