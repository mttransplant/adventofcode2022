// Day 6, Problem #2
// https://adventofcode.com/2022
// Adam Smith

const pickFile = { example: 'Example', input: 'Input' }

const readFile = file => {
    const fs = require('fs');
    const thisFile = fs.readFileSync(__dirname + '/' + file + '.txt', 'utf-8');
    return thisFile.split('\n');
}

const checkUnique = (packet, len) => {
    let isUnique = true;
    for (let i = 1; i < len && isUnique; i++) {
        const character = packet.pop();
        isUnique = !packet.includes(character);
    }
    return isUnique;
}

const findMarker = (datastream, len) => {
    for (let i = 0; i < datastream.length - len; i++) {
        const packet = datastream.slice(i, i + len);
        const isUnique = checkUnique(packet, len);
        if (isUnique) return i + len;
    }
}

const run = () => {
    const fileLines = readFile(pickFile.input);
    const datastream = fileLines[0].split('');
    const packetMarkerEnd = findMarker(datastream, 4);
    const messageMarkerEnd = findMarker(datastream, 14);
    return `Packet Marker End is ${packetMarkerEnd} and Message Marker End is ${messageMarkerEnd}`;
}

const outcome = run();
console.log(`The outcome is: ${outcome}`);