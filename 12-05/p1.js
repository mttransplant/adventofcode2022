// Day 4, Problem #1
// https://adventofcode.com/2022
// Adam Smith

const pickFile = {
    example: 'Example',
    input: 'Input'
}

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
    addCrate(crate) {
        this.#stack.push(crate);
    }
    topCrate() {
        return this.#stack[this.#stack.length -1];
    }
}

class Stacks {
    #stackLines;
    #stacks;
    constructor(stackLines) {
        this.#stackLines = stackLines;
        this.#stacks = this.#parseStacks(this.#stackLines);
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
    topCrates() {
        const tops = this.#stacks.map(stack => stack.topCrate());
        return tops.toString().replaceAll(',','');
    }
}

class Instructions {
    #instructions;
    #counter = 0;
    constructor(instructions) {
        this.#instructions = instructions;
    }
    #parseInstruction(instructionLine) {
        const instructionParts = instructionLine.split(' ');
        const instruction = { move: Number(instructionParts[1]), from: Number(instructionParts[3]), to: Number(instructionParts[5]) };
        return instruction;
    }
    get instructionCount() {
        return this.#instructions.length;
    }
    nextInstruction() {
        const instructionLine = this.#instructions[this.#counter];
        this.#counter++;
        return this.#parseInstruction(instructionLine);
    }
}

const loadStackLines = fileLines => {
    return fileLines.slice(0, fileLines.indexOf(''));
}

const loadInstructionLines = fileLines => {
    return fileLines.slice(fileLines.indexOf('') + 1);
}

const executeInstructions = (instructions, stacks) => {
    let instruction;
    for (let i = 0; i < instructions.instructionCount; i++) {
        instruction = instructions.nextInstruction();
        for (let j = 0; j < instruction.move; j++) {
            stacks.moveCrate(instruction.from, instruction.to);
        }
    }
}

const run = () => {
    const fileLines = readFile(pickFile.input);
    const stacks = new Stacks(loadStackLines(fileLines));
    const instructions = new Instructions(loadInstructionLines(fileLines));
    executeInstructions(instructions, stacks);
    return stacks.topCrates();
}

const outcome = run();
console.log(`The outcome is: ${outcome}`);