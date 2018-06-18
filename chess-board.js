pawn1 = document.createElement("div");
pawn1.classList.add("pawn");
pawn1.myPosition = [Math.floor(Math.random()*8), Math.floor(Math.random()*8)];
document.getElementsByClassName("row")[pawn1.myPosition[0]].getElementsByClassName("cell")[pawn1.myPosition[1]].appendChild(pawn1);

allCells = [];
for (var i = 0; i < document.getElementsByClassName("row").length; i++) {
    var row = [];
    for (var j = 0; j < document.getElementsByClassName("row")[i].getElementsByClassName("cell").length; j++) {
        row.push(document.getElementsByClassName("row")[i].getElementsByClassName("cell")[j])
    }
    allCells.push(row);
}
console.log(allCells);

pawn1.onclick = function () {
    cp = pawn1.myPosition;
    console.log(this);
    var optinalPositions = [[cp[0] - 1, cp[1]], [cp[0] + 1, cp[1]], [cp[0], cp[1] - 1], [cp[0], cp[1] + 1]].filter(function (pos) {
        console.log(Math.max.apply(null, pos));
        return Math.min.apply(null, pos) >= 0 && Math.max.apply(null, pos) < 8;
    });

    console.log(optinalPositions);
    var optinalCells = [];
    for (var position of optinalPositions) {
        cell = allCells[position[0]][position[1]];
        cell.style.background = "rgba(255,99,71,0.5)";
        cell.onclick = function (position) {
            return function () {
                this.appendChild(pawn1);
                console.log(cp);

                cp[0] = position[0];
                cp[1] = position[1];
                for (var cell of optinalCells) {
                    cell.style["background"] = null;
                    cell.onclick = null;
                    console.log(cell)
                }
            }
        }(position);
        optinalCells.push(cell);
    }

};