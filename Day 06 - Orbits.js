function day6(inputArray) {
  var disjointSet = {}
  for (var i = 0; i < inputArray.length; i++) {
    var center = inputArray[i].split(')')[0];
    var orbiter = inputArray[i].split(')')[1];
    disjointSet[orbiter] = center;
  }
  
  totalOrbits = 0;
  for (i in disjointSet) {
    var currentObject = i;
    while(!!disjointSet[currentObject]) {
      totalOrbits++;
      currentObject = disjointSet[currentObject];
    }
  }
  console.log("total orbits: " + totalOrbits);
  
  // Part 2: (Will not terminate unless YOU and SAN are connected)
  var santaOrbits = [];
  var currentObject = "SAN";
  while (!!disjointSet[currentObject]) {
    currentObject = disjointSet[currentObject];
    santaOrbits.push(currentObject);
  }
  currentObject = "YOU";
  var distanceFromYou = -1;
  while (true) {
    currentObject = disjointSet[currentObject];
    distanceFromYou++;
    for (var i = 0; i < santaOrbits.length; i++) {
      if (santaOrbits[i] === currentObject) {
        console.log(i + "+" + distanceFromYou + " = " + (i + distanceFromYou));
        return;
      }
    }
  }
}
day6(["COM)B","B)C","C)D","D)E","E)F","B)G","G)H","D)I","E)J","J)K","K)L","K)YOU","I)SAN"]);
