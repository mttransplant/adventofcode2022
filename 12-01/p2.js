// Day 1, Problem #2
// https://adventofcode.com/2022
// Adam Smith

const ingestFile = file => {
	const fs = require('fs');
	const thisFile = fs.readFileSync(__dirname + '/' + file + '.txt', 'utf-8');
	return thisFile.split('\n');
}

class Elf {
    #items = [];
    constructor(items) {
        this.#items.concat(items);
    }
    get items() {
        return this.#items;
    }
    get calories() {
        return this.#items.reduce((acc,item) => acc+Number(item), 0);
    }
    addItem(item) {
        if (item != '') this.#items.push(item);
    }
}

const removeEmptyElves = listOfElves => {
    return listOfElves.reduce((acc,elf) => {
        if (elf.items.length == 0) return acc;
        if (elf.items.length == 1 && elf.items[0] == '') return acc;
        return acc.concat(elf);
    },[]);
}

const parseInventory = list => {
    elves = [new Elf()];
    if (Array.isArray(list) && list.length >0) {
        list.forEach(item => item!='' ? elves[elves.length - 1].addItem(item) : elves.push(new Elf()));
    }
    return removeEmptyElves(elves);
}

const findMostCalories = listOfElves => {
    const allCalories = listOfElves.map(elf => elf.calories);
    return Math.max(...allCalories);
}

const findTopThreeCalories = listOfElves => {
    const allCalories = listOfElves.map(elf => elf.calories);
    allCalories.sort((a,b) => b-a);
    return allCalories.splice(0,3);
}

const lines = ingestFile('Input');
const allElves = parseInventory(lines);
const maxCalories = findMostCalories(allElves);
const topThreeCals = findTopThreeCalories(allElves);
const sumTopThreeCals = topThreeCals.reduce((acc,curr) => acc+curr, 0);
console.log(`Max calories: ${maxCalories}`);
console.log(`Sum of top three calories: ${sumTopThreeCals}`);