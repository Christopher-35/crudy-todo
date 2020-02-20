// rewriting exports.create
// counter.getNextUniqueId((err, data) => {
//   if (err) {
//     console.log("error getting next ID: ", `${err}`);
//   } else {
//     fs.writeFile(path.join(exports.dataDir, `${id}.txt`), text, err => {
//       if (err) {
//         throw `${err}`;
//       } else {
//         callback(null, { id, text });
//         console.log("The file has been saved!");
//       }
//     });
//   }
// });

// rewriting update function
exports.update = (id, text, callback) => {
  var todoPath = `${exports.dataDir}/${id}.txt`;
  fs.readFile(todoPath, (err, fileData) => {
    if (err) {
      callback(err, null);
    } else {
      fs.writeFile(todoPath, text, (err) => {
      });
    }
  });

  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

let counter = 0;

module.exports.counter = counter;

function callback(err, results) {
  if (err) {
    console.log(err);
    return;
  }
}

readCounter((err, count) => {
  if (err) {
    console.log("error reading counter: ", err);
  }
});
// fs.readFile('/foo.txt', function(err, data) {
//   // TODO: Error Handling Still Needed!
//   console.log(data);
