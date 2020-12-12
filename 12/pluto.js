var fs = require('fs');

const aoc = require("./aoc20_12_2.js");

let mem = fs.readFileSync('input.txt').toString().replace("\r","").split("\n");

// console.log(mem);

let s = { E: 0, N: 0, F: "E", WE:10, WN: 1 };

s = mem.reduce( aoc.step, s);

// console.log(s);

let res = (Math.abs(s.E)+Math.abs(s.N));

console.log(res);