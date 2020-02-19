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
