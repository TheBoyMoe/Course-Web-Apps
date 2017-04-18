function gatherNamesOf (arrayOfPeople) {
  return arrayOfPeople.map(function (person) {
    person.name;
  });
}

module.exports = gatherNamesOf;