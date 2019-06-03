const fs = require('fs');

const files = fs.readdirSync('./');

console.log(files);

fs.readdir('$', (err, file) => {
  if (err) {
    console.log(err);
  } else {
    console.log(file);
  }
});

