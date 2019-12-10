function day10(input, rows, cols) {
  var asteroidField = input;
  var bestAsteroids = 0;
  var i = 978; // (26, 28), my station answer
  var x = 26;
  var y = 28;
  var asteroids = [];
  
  // Take every point, find its coordinates, sine, and cosine.
  for (j = 0; j < asteroidField.length; j++) {
    if (j === i) { continue; } // You live here!  Don't blow it up!
    if (asteroidField[j] === "#") {
      astX = j % cols;
      astY = Math.floor(j / cols);
      asteroids.push(
        {
          x: astX,
          y: astY,
          radians: Math.atan2(astY - y, astX - x),
          distFromStation: Math.abs(astX - x) + Math.abs(astY - y)
        });
    }
  }
  for (var j = 0; j < asteroids.length; j++) {
    asteroids[j].radians += 5 * Math.PI / 2;
    while (asteroids[j].radians >= Math.PI * 2) {
      asteroids[j].radians -= Math.PI * 2;
    }
  }
  // Sort:
  asteroids.sort(
      function(a, b) {
        if (a.radians === b.radians)
          return a.distFromStation - b.distFromStation;
        return a.radians - b.radians;
      });
  for (var j = 0; j < asteroids.length; j++) {
    console.log(asteroids[j]);
  }
  // BLOW UP ALL THE ASTEROIDS:
  var blownUpAsteroids = 0;
  var lastRadians = -1;
  while (asteroids.length > 0) {
    while (asteroids[0].radians === lastRadians) {
      asteroids.push(asteroids[0]);
      asteroids = asteroids.slice(1);
    }
    blownUpAsteroids++;
    console.log("Blew up asteroid #" + blownUpAsteroids + " at (" + asteroids[0].x + "," + asteroids[0].y + ")");
    lastRadians = asteroids[0].radians;
    asteroids = asteroids.slice(1);
    if (blownUpAsteroids === 200) { return; } // Loop won't exit as-is if the final laser passes have the same radians, but I don't really care
  }
}
day10("#....#.....#...#.#.....#.#..#....##..#..##...#......#.....#..###.#.##......#.#.#.....##....#.#.....#....#.#...#.......#.##..#............##..#...##......##.#.#................#.#..##...#..##.....#...#.##.....#.##.##.#....###.#........####..#....#..####........##.........#..#...#......#.#..#..#.#.##......#.............#.#....##.......#...#.#.#..##.#.#.#.#.......#.....#.........##.###..#.....#.#..###.....##.....#...#.#.#......#.#....##.....##.#.....#...#....#...#..#....#.#...#.............###.#.##....#.#.....##.#.........#.##.####.........###.#...###....#..#...###..##..#..#.........#.#.....#........#.......#.......#..#.#.#..##.....#.#.....#..#....#....#.#.##......#..#.###........##.##.##...#...##.#...###....#.....#...#........#....#.###.....#.#.#..#............#..........#...##.....#....#....##..#.#.......#..##.....#.#.......................#..#...#....#.#.....#.........#..........#.............#.#.........#...#.#......#.##....#...#.#.#...#.#.....#.#.....#.....#.#.##......#..##....#.....#.....#....#.##..#..#..###.#.#....#......#...#..........#......#..#....##...#.#.#...#..#.#.##.#.#.....#..#..#........##.......#...##.##.##......#..#..##....", 34, 34);
