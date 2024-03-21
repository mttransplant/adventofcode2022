// Day 5, Problem #2
// https://adventofcode.com/2022
// Adam Smith

const pickFile = { example: 'Example', input: 'Input' }

const readFile = file => {
    const fs = require('fs');
    const thisFile = fs.readFileSync(__dirname + '/' + file + '.txt', 'utf-8');
    return thisFile.split('\n');
}

class Stack {
    #stack;
    constructor(stack) {
        this.#stack = stack;
    }
    removeCrate() {
        const crate = this.#stack.pop();
        return crate;
    }
    removeCrates(count) {
        const crates = this.#stack.splice(this.#stack.length - count, count);
        return crates;
    }
    addCrate(crate) {
        this.#stack.push(crate);
    }
    addCrates(crates) {
        this.#stack = this.#stack.concat(crates);
    }
    topCrate() {
        return this.#stack[this.#stack.length - 1];
    }
}

class Stacks {
    #stackLines;
    #stacks;
    constructor(fileLines) {
        this.#stackLines = this.#loadStackLines(fileLines);
        this.#stacks = this.#parseStacks(this.#stackLines);
    }
    #loadStackLines(fileLines) {
        return fileLines.slice(0, fileLines.indexOf(''));
    }
    #parsePositions(positionRow) {
        const positionArr = positionRow.split('').map(val => Number(val));
        const maxColumn = positionArr.reduce((acc, curr) => acc > curr ? acc : curr);
        const positions = [];
        for (let i = 1; i <= maxColumn; i++) {
            const thisPosition = positionArr.indexOf(i);
            positions.push(thisPosition);
        }
        return positions;
    }
    #extractCrates(stackRows, position) {
        const stack = [];
        for (let i = stackRows.length - 1; i >= 0; i--) {
            const crate = stackRows[i].charAt(position);
            if (crate != ' ') stack.push(crate);
        }
        return new Stack(stack);
    }
    #parseStacks(stackRows) {
        const positions = this.#parsePositions(stackRows.pop());
        const stacks = [];
        for (let c of positions) {
            stacks.push(this.#extractCrates(stackRows, c));
        }
        return stacks;
    }
    moveCrate(from, to) {
        const crate = this.#stacks[from - 1].removeCrate();
        this.#stacks[to - 1].addCrate(crate);
    }
    moveCrates(instruction) {
        const crates = this.#stacks[instruction.from -1].removeCrates(instruction.move);
        this.#stacks[instruction.to -1].addCrates(crates);
    }
    topCrates() {
        const tops = this.#stacks.map(stack => stack.topCrate());
        return tops.toString().replaceAll(',', '');
    }
}

class Instructions {
    #instructionsList;
    #instructions;
    constructor(fileLines) {
        this.#instructionsList = this.#loadInstructionLines(fileLines);
        this.#instructions = this.#parseInstructions(this.#instructionsList);
    }
    #loadInstructionLines(fileLines) {
        return fileLines.slice(fileLines.indexOf('') + 1);
    }
    #parseInstructions(instructionsList) {
        return this.#instructionsList.map(instruction => this.#parseInstruction(instruction));
    }
    #parseInstruction(instructionLine) {
        const parts = instructionLine.split(' ');
        return { move: Number(parts[1]), from: Number(parts[3]), to: Number(parts[5]) };
    }
    get allInstructions() {
        return this.#instructions;
    }
}

const executeInstructions = (instructions, stacks) => {
    for (let instruction of instructions.allInstructions) {
        stacks.moveCrates(instruction);
    }
}

const run = () => {
    const fileLines = readFile(pickFile.input);
    const stacks = new Stacks(fileLines);
    const instructions = new Instructions(fileLines);
    executeInstructions(instructions, stacks);
    return stacks.topCrates();
}

const outcome = run();
console.log(`The outcome is: ${outcome}`);