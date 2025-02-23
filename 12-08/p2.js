// Day 8, Problem #2
// https://adventofcode.com/2022
// Adam Smith

const pickFile = { example: 'Example', input: 'Input' }

const readFile = file => {
    const fs = require('fs');
    const thisFile = fs.readFileSync(__dirname + '/' + file + '.txt', 'utf-8');
    return thisFile.split('\n');
}

class Grid {
    #grid = [];
    constructor(lines) {
        const g = [];
        lines.forEach(line => {
            const row = line.split('');
            g.push(row);
        });
        this.#grid = g;
    }
    
    get grid() {
        return this.#grid;
    }

    #scenicScore = (row,col) => {
        if (row==0 || col==0 || row==this.#grid.length-1 || col==this.#grid[row].length-1) {
            return 0;
        }
        let up, down, left, right;
        up = down = left = right = 1;
        
        for (let u = row-1; u > 0; u--) {
            if (this.#grid[row][col] <= this.#grid[u][col]) {
                break;
            } else {
                up++;
            }
        }
        for (let d = row+1; d < this.#grid.length-1; d++) {
            if (this.#grid[row][col] <= this.#grid[d][col]) {
                break;
            } else {
                down++;
            }
        }
        for (let l = col-1; l > 0; l--) {
            if (this.#grid[row][col] <= this.#grid[row][l]) {
                break;
            } else {
                left++;
            }
        }
        for (let r = col+1; r < this.#grid[row].length-1; r++) {
            if (this.#grid[row][col] <= this.#grid[row][r]) {
                break;
            } else {
                right++;
            }
        }
        return up * down * left * right;
    }

    #mapScore = () => {  
        return this.#grid.map((row, r) => {     
            return row.map((col, c) => {
                return this.#scenicScore(r,c);
            });
        });
    }
    
    highScore = () => {
        const scoreMap = this.#mapScore();
        let score = 0;
        for (let row = 0; row < this.#grid.length; row++) {
            for (let col = 0; col < this.#grid[row].length; col++) {
                if (scoreMap[row][col] > score) {
                    score = scoreMap[row][col];
                }
            }
        }
        return score;
    }
}

const run = () => {
    const fileLines = readFile(pickFile.input);
    const myGrid = new Grid(fileLines);
    return myGrid.highScore();
}

const outcome = run();
console.log(`The outcome is: ${outcome}`);