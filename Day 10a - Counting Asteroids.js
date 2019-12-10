function day10(input, rows, cols) {
  var asteroidField = input;
  var bestAsteroids = 0;
  for (var i = 0; i < rows*cols; i++) {
    if (asteroidField[i] !== "#") continue; // can't build here anyway
    
    // Create BFS of spots to visit
    var toVisit = [i];
    var locations = [];
    while (toVisit.length > 0) {
      var curr = toVisit[0];
      toVisit = toVisit.slice(1);
      if (!locations.includes(curr)) {
        locations.push(curr);
        if (curr % cols !== cols - 1) { toVisit.push(curr + 1); }
        if (curr % cols !== 0) { toVisit.push(curr - 1); }
        if (curr >= cols) { toVisit.push(curr - cols); }
        if (curr < (rows * cols) - cols) { toVisit.push(curr + cols); }
      }
    }
    locations = locations.slice(1); // don't need the one you build on
    
    // Count visible asteroids
    var discoveredAsteroids = 0;
    var tempField = asteroidField;
    var stationX = i % cols;
    var stationY = Math.floor(i / cols);
    for (var j = 0; j < locations.length; j++) {
      var spot = locations[j];
      if (tempField[spot] !== "#") continue; // no asteroid here, or previously marked blocked spot
      
      discoveredAsteroids++;
      var spotX = spot % cols;
      var spotY = Math.floor(spot / cols);
      //console.log("found asteroid at (" + spotX + "," + spotY + ")");
      
      
      var tempX = spotX;
      var tempY = spotY;
      while (tempX >= 0 && tempX < cols && tempY >= 0 && tempY < rows) {
        //console.log("  crossing out (" + tempX + "," + tempY + ")");
        tempField = tempField.replaceAt(tempY*rows + tempX, "X");
        // special case direct lines:
        if (spotX - stationX === spotY - stationY || spotX - stationX === 0 || spotY - stationY === 0) {
          var incX, incY;
          if (spotX - stationX > 0) {
            incX = 1;
          } else if (spotX - stationX < 0) {
            incX = -1;
          } else {
            incX = 0;
          }
          if (spotY - stationY > 0) {
            incY = 1;
          } else if (spotY - stationY < 0) {
            incY = -1;
          } else {
            incY = 0;
          }
          tempX += incX;
          tempY += incY;
        /**
        
        This code only considered cases like 1/3 and 1/4, but not 2/3.
        Took me a while to find that, unfortunately, so I threw together what comes after as a hacky fix.
        
        } else if (Number.isInteger((spotX - stationX) / (spotY - stationY))) { // like 6,3
          var incX, incY;
          incX = (spotX - stationX) / (spotY - stationY);
          incY = (spotY - stationY) / (spotY - stationY);
          if (spotX - stationX < 0) {
            incX = Math.abs(incX) * -1;
          } else {
            incX = Math.abs(incX);
          }
          if (spotY - stationY < 0) {
            incY = Math.abs(incY) * -1;
          } else {
            incY = Math.abs(incY);
          }
          tempX += incX;
          tempY += incY;
        } else if (Number.isInteger((spotY - stationY) / (spotX - stationX))) { // like 3,6
          var incX, incY;
          incX = (spotX - stationX) / (spotX - stationX);
          incY = (spotY - stationY) / (spotX - stationX);
          if (spotX - stationX < 0) {
            incX = Math.abs(incX) * -1;
          } else {
            incX = Math.abs(incX);
          }
          if (spotY - stationY < 0) {
            incY = Math.abs(incY) * -1;
          } else {
            incY = Math.abs(incY);
          }
          tempX += incX;
          tempY += incY;
        */
        } else {
          incX = spotX - stationX;
          incY = spotY - stationY;
          while (Math.abs(incX) % 2 === 0 && Math.abs(incY) % 2 === 0) { incX /= 2; incY /= 2; }
          while (Math.abs(incX) % 3 === 0 && Math.abs(incY) % 3 === 0) { incX /= 3; incY /= 3; }
          while (Math.abs(incX) % 5 === 0 && Math.abs(incY) % 5 === 0) { incX /= 5; incY /= 5; }
          while (Math.abs(incX) % 7 === 0 && Math.abs(incY) % 7 === 0) { incX /= 7; incY /= 7; }
          while (Math.abs(incX) % 11 === 0 && Math.abs(incY) % 11 === 0) { incX /= 11; incY /= 11; }
          while (Math.abs(incX) % 13 === 0 && Math.abs(incY) % 13 === 0) { incX /= 13; incY /= 13; }
          while (Math.abs(incX) % 17 === 0 && Math.abs(incY) % 17 === 0) { incX /= 17; incY /= 17; }
          while (Math.abs(incX) % 19 === 0 && Math.abs(incY) % 19 === 0) { incX /= 19; incY /= 19; }
          while (Math.abs(incX) % 23 === 0 && Math.abs(incY) % 23 === 0) { incX /= 23; incY /= 23; }
          while (Math.abs(incX) % 29 === 0 && Math.abs(incY) % 29 === 0) { incX /= 29; incY /= 29; }
          while (Math.abs(incX) % 31 === 0 && Math.abs(incY) % 31 === 0) { incX /= 31; incY /= 31; }
          tempX += incX;
          tempY += incY;
        }
      }
      
    }
    //console.log("for " + i + ": " + discoveredAsteroids);
    if (discoveredAsteroids > bestAsteroids) {
      bestAsteroids = discoveredAsteroids;
      console.log("New best " + bestAsteroids + " at (" + stationX + "," + stationY + ")");
    }
  }
  
}
// https://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript
String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}
//day10(".#..#.....#####....#...##", 5, 5);
//day10("......#.#.#..#.#......#######..#.#.###...#..#.......#....#.##..#....#..##.#..#####...#..#..#....####", 10, 10);
//day10("#.#...#.#..###....#..#....#...##.#.#.#.#....#.#.#..##..###.#..#...##....##....##......#....####.###.", 10, 10);
//day10(".#..#..#######.###.#....###.#...###.##.###.##.#.#.....###..#..#.#..#.##..#.#.###.##...##.#.....#.#..", 10, 10);
//day10(".#..##.###...#########.############..##..#.######.########.#.###.#######.####.#.#####.##.#.##.###.##..#####..#.##############################.####....###.#.#.####.######################.##.###..####....######..##.###########.##.####...##..#.#####..#.######.#####...#.##########...#.##########.#######.####.#.###.###.#.##....##.##.###..#####.#.#.###########.####.#.#.#####.####.######.##.####.##.#..##", 20, 20);
day10("#....#.....#...#.#.....#.#..#....##..#..##...#......#.....#..###.#.##......#.#.#.....##....#.#.....#....#.#...#.......#.##..#............##..#...##......##.#.#................#.#..##...#..##.....#...#.##.....#.##.##.#....###.#........####..#....#..####........##.........#..#...#......#.#..#..#.#.##......#.............#.#....##.......#...#.#.#..##.#.#.#.#.......#.....#.........##.###..#.....#.#..###.....##.....#...#.#.#......#.#....##.....##.#.....#...#....#...#..#....#.#...#.............###.#.##....#.#.....##.#.........#.##.####.........###.#...###....#..#...###..##..#..#.........#.#.....#........#.......#.......#..#.#.#..##.....#.#.....#..#....#....#.#.##......#..#.###........##.##.##...#...##.#...###....#.....#...#........#....#.###.....#.#.#..#............#..........#...##.....#....#....##..#.#.......#..##.....#.#.......................#..#...#....#.#.....#.........#..........#.............#.#.........#...#.#......#.##....#...#.#.#...#.#.....#.#.....#.....#.#.##......#..##....#.....#.....#....#.##..#..#..###.#.#....#......#...#..........#......#..#....##...#.#.#...#..#.#.##.#.#.....#..#..#........##.......#...##.##.##......#..#..##....", 34, 34);
