function day12() {
  /*var startingPos1 = [-1, 0, 2];
  var startingPos2 = [2, -10, -7];
  var startingPos3 = [4, -8, 8];
  var startingPos4 = [3, 5, -1];*/
  /*var startingPos1 = [-8, -10, 0];
  var startingPos2 = [5, 5, 10];
  var startingPos3 = [2, -7, 3];
  var startingPos4 = [9, -8, -3];*/
  var startingPos1 = [0, 6, 1];
  var startingPos2 = [4, 4, 19];
  var startingPos3 = [-11, 1, 8];
  var startingPos4 = [2, 19, 15];
  var moon1Pos = [0, 0, 0];
  var moon2Pos = [0, 0, 0];
  var moon3Pos = [0, 0, 0];
  var moon4Pos = [0, 0, 0];
  var moon5Pos = [0, 0, 0];
  var moon6Pos = [0, 0, 0];
  var moon7Pos = [0, 0, 0];
  var moon8Pos = [0, 0, 0];
  var moon1Vel = [0, 0, 0];
  var moon2Vel = [0, 0, 0];
  var moon3Vel = [0, 0, 0];
  var moon4Vel = [0, 0, 0];
  var moon5Vel = [0, 0, 0];
  var moon6Vel = [0, 0, 0];
  var moon7Vel = [0, 0, 0];
  var moon8Vel = [0, 0, 0];
  
  var step = 0;
  var loopStarts = [0, 0, 0];
  
  for (var coord = 0; coord < 3; coord++) {
    // Initialize:
    matched = 0;
    moon1Pos[coord] = startingPos1[coord];
    moon2Pos[coord] = startingPos2[coord];
    moon3Pos[coord] = startingPos3[coord];
    moon4Pos[coord] = startingPos4[coord];
    moon5Pos[coord] = startingPos1[coord];
    moon6Pos[coord] = startingPos2[coord];
    moon7Pos[coord] = startingPos3[coord];
    moon8Pos[coord] = startingPos4[coord];
    moon1Vel[coord] = 0;
    moon2Vel[coord] = 0;
    moon3Vel[coord] = 0;
    moon4Vel[coord] = 0;
    moon5Vel[coord] = 0;
    moon6Vel[coord] = 0;
    moon7Vel[coord] = 0;
    moon8Vel[coord] = 0;
    
    while (matched < 2) {
      // Do slower set:
      if (moon1Pos[coord] < moon2Pos[coord]) { moon1Vel[coord]++; } else if (moon1Pos[coord] > moon2Pos[coord]) { moon1Vel[coord]--; }
      if (moon1Pos[coord] < moon3Pos[coord]) { moon1Vel[coord]++; } else if (moon1Pos[coord] > moon3Pos[coord]) { moon1Vel[coord]--; }
      if (moon1Pos[coord] < moon4Pos[coord]) { moon1Vel[coord]++; } else if (moon1Pos[coord] > moon4Pos[coord]) { moon1Vel[coord]--; }
      if (moon2Pos[coord] < moon1Pos[coord]) { moon2Vel[coord]++; } else if (moon2Pos[coord] > moon1Pos[coord]) { moon2Vel[coord]--; }
      if (moon2Pos[coord] < moon3Pos[coord]) { moon2Vel[coord]++; } else if (moon2Pos[coord] > moon3Pos[coord]) { moon2Vel[coord]--; }
      if (moon2Pos[coord] < moon4Pos[coord]) { moon2Vel[coord]++; } else if (moon2Pos[coord] > moon4Pos[coord]) { moon2Vel[coord]--; }
      if (moon3Pos[coord] < moon1Pos[coord]) { moon3Vel[coord]++; } else if (moon3Pos[coord] > moon1Pos[coord]) { moon3Vel[coord]--; }
      if (moon3Pos[coord] < moon2Pos[coord]) { moon3Vel[coord]++; } else if (moon3Pos[coord] > moon2Pos[coord]) { moon3Vel[coord]--; }
      if (moon3Pos[coord] < moon4Pos[coord]) { moon3Vel[coord]++; } else if (moon3Pos[coord] > moon4Pos[coord]) { moon3Vel[coord]--; }
      if (moon4Pos[coord] < moon1Pos[coord]) { moon4Vel[coord]++; } else if (moon4Pos[coord] > moon1Pos[coord]) { moon4Vel[coord]--; }
      if (moon4Pos[coord] < moon2Pos[coord]) { moon4Vel[coord]++; } else if (moon4Pos[coord] > moon2Pos[coord]) { moon4Vel[coord]--; }
      if (moon4Pos[coord] < moon3Pos[coord]) { moon4Vel[coord]++; } else if (moon4Pos[coord] > moon3Pos[coord]) { moon4Vel[coord]--; }
      moon1Pos[coord] += moon1Vel[coord];
      moon2Pos[coord] += moon2Vel[coord];
      moon3Pos[coord] += moon3Vel[coord];
      moon4Pos[coord] += moon4Vel[coord];
      
      // Do faster set:
      for (var i = 0; i < 2; i++) {
        if (moon5Pos[coord] < moon6Pos[coord]) { moon5Vel[coord]++; } else if (moon5Pos[coord] > moon6Pos[coord]) { moon5Vel[coord]--; }
        if (moon5Pos[coord] < moon7Pos[coord]) { moon5Vel[coord]++; } else if (moon5Pos[coord] > moon7Pos[coord]) { moon5Vel[coord]--; }
        if (moon5Pos[coord] < moon8Pos[coord]) { moon5Vel[coord]++; } else if (moon5Pos[coord] > moon8Pos[coord]) { moon5Vel[coord]--; }
        if (moon6Pos[coord] < moon5Pos[coord]) { moon6Vel[coord]++; } else if (moon6Pos[coord] > moon5Pos[coord]) { moon6Vel[coord]--; }
        if (moon6Pos[coord] < moon7Pos[coord]) { moon6Vel[coord]++; } else if (moon6Pos[coord] > moon7Pos[coord]) { moon6Vel[coord]--; }
        if (moon6Pos[coord] < moon8Pos[coord]) { moon6Vel[coord]++; } else if (moon6Pos[coord] > moon8Pos[coord]) { moon6Vel[coord]--; }
        if (moon7Pos[coord] < moon5Pos[coord]) { moon7Vel[coord]++; } else if (moon7Pos[coord] > moon5Pos[coord]) { moon7Vel[coord]--; }
        if (moon7Pos[coord] < moon6Pos[coord]) { moon7Vel[coord]++; } else if (moon7Pos[coord] > moon6Pos[coord]) { moon7Vel[coord]--; }
        if (moon7Pos[coord] < moon8Pos[coord]) { moon7Vel[coord]++; } else if (moon7Pos[coord] > moon8Pos[coord]) { moon7Vel[coord]--; }
        if (moon8Pos[coord] < moon5Pos[coord]) { moon8Vel[coord]++; } else if (moon8Pos[coord] > moon5Pos[coord]) { moon8Vel[coord]--; }
        if (moon8Pos[coord] < moon6Pos[coord]) { moon8Vel[coord]++; } else if (moon8Pos[coord] > moon6Pos[coord]) { moon8Vel[coord]--; }
        if (moon8Pos[coord] < moon7Pos[coord]) { moon8Vel[coord]++; } else if (moon8Pos[coord] > moon7Pos[coord]) { moon8Vel[coord]--; }
        moon5Pos[coord] += moon5Vel[coord];
        moon6Pos[coord] += moon6Vel[coord];
        moon7Pos[coord] += moon7Vel[coord];
        moon8Pos[coord] += moon8Vel[coord];
      }
      
      step++;
      
      if (moon1Pos[coord] === moon5Pos[coord] && moon1Vel[coord] === moon5Vel[coord]
          && moon2Pos[coord] === moon6Pos[coord] && moon2Vel[coord] === moon6Vel[coord]
          && moon3Pos[coord] === moon7Pos[coord] && moon3Vel[coord] === moon7Vel[coord]
          && moon4Pos[coord] === moon8Pos[coord] && moon4Vel[coord] === moon8Vel[coord]) {
        if (matched === 0) {
          console.log("*** For coordinate " + coord + ", first met up at step " + step);
          step = 0;
          // Reset slower set:
          moon1Pos[coord] = startingPos1[coord];
          moon2Pos[coord] = startingPos2[coord];
          moon3Pos[coord] = startingPos3[coord];
          moon4Pos[coord] = startingPos4[coord];
          moon1Vel[coord] = 0;
          moon2Vel[coord] = 0;
          moon3Vel[coord] = 0;
          moon4Vel[coord] = 0;
        } else {
          console.log("*** For coordinate " + coord + ", start of the loop is " + step);
          loopStarts[coord] = step;
        }
        matched++;
      }
    }
  }
  
  // Use least common multiple to find the answer:
  var highestValue = Math.max(Math.max(loopStarts[0], loopStarts[1]), loopStarts[2]);
  var i = highestValue;
  while (true) {
    if (i % loopStarts[0] === 0 && i % loopStarts[1] === 0 && i % loopStarts[2] === 0) {
      console.log("LCM is " + i);
      return;
    }
    i += highestValue;
  }
}
day12();
