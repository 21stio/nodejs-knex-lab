exports.seed = function(knex, Promise) {
  return knex('numbers').del()
    .then(function () {
      var inserts = [];
      for (var i = 1; i <= 10; i++) {
        inserts.push(knex('numbers').insert({number: i}));
      }
      return Promise.all(inserts);
    });
};
