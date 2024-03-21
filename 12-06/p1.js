// Day 6, Problem #1
// https://adventofcode.com/2022
// Adam Smith

const pickFile = { example: 'Example', input: 'Input' }

const readFile = file => {
    const fs = require('fs');
    const thisFile = fs.readFileSync(__dirname + '/' + file + '.txt', 'utf-8');
    return thisFile.split('\n');
}

const checkUnique = packet => {
    let isUnique = true;
    for (let i = 1; i < 4 && isUnique; i++) {
        const character = packet.pop();
        isUnique = !packet.includes(character);
    }
    return isUnique;
}

const findMarker = datastream => {
    for (let i = 0; i < datastream.length - 4; i++) {
        const packet = datastream.slice(i, i + 4);
        const isUnique = checkUnique(packet);
        if (isUnique) return i + 4;
    }
}

const run = () => {
    const fileLines = readFile(pickFile.input);
    const datastream = fileLines[0].split('');
    const markerEnd = findMarker(datastream);
    return markerEnd;
}

const outcome = run();
console.log(`The outcome is: ${outcome}`);