// Day 8, Problem #1
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

    #isVisible = (row,col) => {
        if (row==0 || col==0 || row==this.#grid.length-1 || col==this.#grid[row].length-1) {
            return true;
        }
        let up, down, left, right;
        up = down = left = right = true;
        
        for (let u = row-1; u >= 0; u--) {
            if (this.#grid[row][col] <= this.#grid[u][col]) {
                up = false;
                break;
            }
        }
        for (let d = row+1; d < this.#grid.length; d++) {
            if (this.#grid[row][col] <= this.#grid[d][col]) {
                down = false;
                break;
            }
        }
        for (let l = col-1; l >= 0; l--) {
            if (this.#grid[row][col] <= this.#grid[row][l]) {
                left = false;
                break;
            }
        }
        for (let r = col+1; r < this.#grid[row].length; r++) {
            if (this.#grid[row][col] <= this.#grid[row][r]) {
                right = false;
                break;
            }
        }
        return up || down || left || right;
    }

    #mapVisible = () => {  
        return this.#grid.map((row, r) => {     
            return row.map((col, c) => {
                return this.#isVisible(r,c);
            });
        });
    }
    
    countVisible = () => {
        const visibleMap = this.#mapVisible();
        let count = 0;
        for (let row = 0; row < this.#grid.length; row++) {
            for (let col = 0; col < this.#grid[row].length; col++) {
                if (visibleMap[row][col]) {
                    count++;
                }
            }
        }
        return count;
    }
}

const run = () => {
    const fileLines = readFile(pickFile.input);
    const myGrid = new Grid(fileLines);
    return myGrid.countVisible();
}

const outcome = run();
console.log(`The outcome is: ${outcome}`);