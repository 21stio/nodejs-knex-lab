var config = require("./knexConfig").knexConfig;

var knex = require('knex')(config);

function testGetAll() {
  knex.select('*').from('numbers')
    .orderBy('number', 'asc')
    .then(function (data) {
      console.log(data);
      process.exit(0);
    })
    .catch(console.error)  
}

var counter = 1;
function testTransaction() {
  var max = 3;
  for (var c = 1; c <= max; c++) {
    knex.transaction(function(trx) {
      knex("numbers")
        .transacting(trx)
        .forUpdate()
        .orderBy('number', 'asc')
        .select("*")
        .then(function(response){
          console.log(response);

          return knex("numbers")
            .where("number", "=", counter++)
            .update("locked", true)
            .transacting(trx)
            .then(function (argument) {
              trx.commit();
            });
        })
        .catch(function(err){
          console.log(err);
        });
    })
    .then(function(resp) {
      console.log('Transaction complete.');
      if(c == max) {
        process.exit();
      }
    })
    .catch(function(err) {
      console.error(err);
    })
  }
}

testTransaction();

setTimeout(function () {
  testGetAll();
  setTimeout(function () {
    process.exit()
  }, 3000);
}, 5000);
