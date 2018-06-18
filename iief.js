var action = function (adder, moltiplyer) {
    var uuu ="kyfhtfkyfn";
    return {
        add: function (x) {
            return adder + x;
        },
        multiply: function (x) {
            return moltiplyer * x;
        }
    }
}(50, 66);

console.log(action.add(79));
console.log(action.multiply(38));
console.log(res);
