const os = require('os');

const totalMem = os.totalmem();
const freeMem = os.freemem();

console.log(`Total Memory: ${totalMem}`);
console.log(`Free Memory: ${freeMem}`);