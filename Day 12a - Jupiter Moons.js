function day12() {
  /*var moon1Pos = [-1, 0, 2];
  var moon2Pos = [2, -10, -7];
  var moon3Pos = [4, -8, 8];
  var moon4Pos = [3, 5, -1];*/
  var moon1Pos = [0, 6, 1];
  var moon2Pos = [4, 4, 19];
  var moon3Pos = [-11, 1, 8];
  var moon4Pos = [2, 19, 15];
  var moon1Vel = [0, 0, 0];
  var moon2Vel = [0, 0, 0];
  var moon3Vel = [0, 0, 0];
  var moon4Vel = [0, 0, 0];
  var step = 0;
  var MAX_STEPS = 10;
  
  while (step < MAX_STEPS) {
    if (moon1Pos[0] < moon2Pos[0]) { moon1Vel[0]++; } else if (moon1Pos[0] > moon2Pos[0]) { moon1Vel[0]--; }
    if (moon1Pos[0] < moon3Pos[0]) { moon1Vel[0]++; } else if (moon1Pos[0] > moon3Pos[0]) { moon1Vel[0]--; }
    if (moon1Pos[0] < moon4Pos[0]) { moon1Vel[0]++; } else if (moon1Pos[0] > moon4Pos[0]) { moon1Vel[0]--; }
    if (moon1Pos[1] < moon2Pos[1]) { moon1Vel[1]++; } else if (moon1Pos[1] > moon2Pos[1]) { moon1Vel[1]--; }
    if (moon1Pos[1] < moon3Pos[1]) { moon1Vel[1]++; } else if (moon1Pos[1] > moon3Pos[1]) { moon1Vel[1]--; }
    if (moon1Pos[1] < moon4Pos[1]) { moon1Vel[1]++; } else if (moon1Pos[1] > moon4Pos[1]) { moon1Vel[1]--; }
    if (moon1Pos[2] < moon2Pos[2]) { moon1Vel[2]++; } else if (moon1Pos[2] > moon2Pos[2]) { moon1Vel[2]--; }
    if (moon1Pos[2] < moon3Pos[2]) { moon1Vel[2]++; } else if (moon1Pos[2] > moon3Pos[2]) { moon1Vel[2]--; }
    if (moon1Pos[2] < moon4Pos[2]) { moon1Vel[2]++; } else if (moon1Pos[2] > moon4Pos[2]) { moon1Vel[2]--; }
    
    if (moon2Pos[0] < moon1Pos[0]) { moon2Vel[0]++; } else if (moon2Pos[0] > moon1Pos[0]) { moon2Vel[0]--; }
    if (moon2Pos[0] < moon3Pos[0]) { moon2Vel[0]++; } else if (moon2Pos[0] > moon3Pos[0]) { moon2Vel[0]--; }
    if (moon2Pos[0] < moon4Pos[0]) { moon2Vel[0]++; } else if (moon2Pos[0] > moon4Pos[0]) { moon2Vel[0]--; }
    if (moon2Pos[1] < moon1Pos[1]) { moon2Vel[1]++; } else if (moon2Pos[1] > moon1Pos[1]) { moon2Vel[1]--; }
    if (moon2Pos[1] < moon3Pos[1]) { moon2Vel[1]++; } else if (moon2Pos[1] > moon3Pos[1]) { moon2Vel[1]--; }
    if (moon2Pos[1] < moon4Pos[1]) { moon2Vel[1]++; } else if (moon2Pos[1] > moon4Pos[1]) { moon2Vel[1]--; }
    if (moon2Pos[2] < moon1Pos[2]) { moon2Vel[2]++; } else if (moon2Pos[2] > moon1Pos[2]) { moon2Vel[2]--; }
    if (moon2Pos[2] < moon3Pos[2]) { moon2Vel[2]++; } else if (moon2Pos[2] > moon3Pos[2]) { moon2Vel[2]--; }
    if (moon2Pos[2] < moon4Pos[2]) { moon2Vel[2]++; } else if (moon2Pos[2] > moon4Pos[2]) { moon2Vel[2]--; }
    
    if (moon3Pos[0] < moon1Pos[0]) { moon3Vel[0]++; } else if (moon3Pos[0] > moon1Pos[0]) { moon3Vel[0]--; }
    if (moon3Pos[0] < moon2Pos[0]) { moon3Vel[0]++; } else if (moon3Pos[0] > moon2Pos[0]) { moon3Vel[0]--; }
    if (moon3Pos[0] < moon4Pos[0]) { moon3Vel[0]++; } else if (moon3Pos[0] > moon4Pos[0]) { moon3Vel[0]--; }
    if (moon3Pos[1] < moon1Pos[1]) { moon3Vel[1]++; } else if (moon3Pos[1] > moon1Pos[1]) { moon3Vel[1]--; }
    if (moon3Pos[1] < moon2Pos[1]) { moon3Vel[1]++; } else if (moon3Pos[1] > moon2Pos[1]) { moon3Vel[1]--; }
    if (moon3Pos[1] < moon4Pos[1]) { moon3Vel[1]++; } else if (moon3Pos[1] > moon4Pos[1]) { moon3Vel[1]--; }
    if (moon3Pos[2] < moon1Pos[2]) { moon3Vel[2]++; } else if (moon3Pos[2] > moon1Pos[2]) { moon3Vel[2]--; }
    if (moon3Pos[2] < moon2Pos[2]) { moon3Vel[2]++; } else if (moon3Pos[2] > moon2Pos[2]) { moon3Vel[2]--; }
    if (moon3Pos[2] < moon4Pos[2]) { moon3Vel[2]++; } else if (moon3Pos[2] > moon4Pos[2]) { moon3Vel[2]--; }
    
    if (moon4Pos[0] < moon1Pos[0]) { moon4Vel[0]++; } else if (moon4Pos[0] > moon1Pos[0]) { moon4Vel[0]--; }
    if (moon4Pos[0] < moon2Pos[0]) { moon4Vel[0]++; } else if (moon4Pos[0] > moon2Pos[0]) { moon4Vel[0]--; }
    if (moon4Pos[0] < moon3Pos[0]) { moon4Vel[0]++; } else if (moon4Pos[0] > moon3Pos[0]) { moon4Vel[0]--; }
    if (moon4Pos[1] < moon1Pos[1]) { moon4Vel[1]++; } else if (moon4Pos[1] > moon1Pos[1]) { moon4Vel[1]--; }
    if (moon4Pos[1] < moon2Pos[1]) { moon4Vel[1]++; } else if (moon4Pos[1] > moon2Pos[1]) { moon4Vel[1]--; }
    if (moon4Pos[1] < moon3Pos[1]) { moon4Vel[1]++; } else if (moon4Pos[1] > moon3Pos[1]) { moon4Vel[1]--; }
    if (moon4Pos[2] < moon1Pos[2]) { moon4Vel[2]++; } else if (moon4Pos[2] > moon1Pos[2]) { moon4Vel[2]--; }
    if (moon4Pos[2] < moon2Pos[2]) { moon4Vel[2]++; } else if (moon4Pos[2] > moon2Pos[2]) { moon4Vel[2]--; }
    if (moon4Pos[2] < moon3Pos[2]) { moon4Vel[2]++; } else if (moon4Pos[2] > moon3Pos[2]) { moon4Vel[2]--; }
    
    moon1Pos[0] += moon1Vel[0];
    moon1Pos[1] += moon1Vel[1];
    moon1Pos[2] += moon1Vel[2];
    moon2Pos[0] += moon2Vel[0];
    moon2Pos[1] += moon2Vel[1];
    moon2Pos[2] += moon2Vel[2];
    moon3Pos[0] += moon3Vel[0];
    moon3Pos[1] += moon3Vel[1];
    moon3Pos[2] += moon3Vel[2];
    moon4Pos[0] += moon4Vel[0];
    moon4Pos[1] += moon4Vel[1];
    moon4Pos[2] += moon4Vel[2];
    step++;
  }
  
  var moon1Pot = Math.abs(moon1Pos[0]) + Math.abs(moon1Pos[1]) + Math.abs(moon1Pos[2]);
  var moon2Pot = Math.abs(moon2Pos[0]) + Math.abs(moon2Pos[1]) + Math.abs(moon2Pos[2]);
  var moon3Pot = Math.abs(moon3Pos[0]) + Math.abs(moon3Pos[1]) + Math.abs(moon3Pos[2]);
  var moon4Pot = Math.abs(moon4Pos[0]) + Math.abs(moon4Pos[1]) + Math.abs(moon4Pos[2]);
  var moon1Kin = Math.abs(moon1Vel[0]) + Math.abs(moon1Vel[1]) + Math.abs(moon1Vel[2]);
  var moon2Kin = Math.abs(moon2Vel[0]) + Math.abs(moon2Vel[1]) + Math.abs(moon2Vel[2]);
  var moon3Kin = Math.abs(moon3Vel[0]) + Math.abs(moon3Vel[1]) + Math.abs(moon3Vel[2]);
  var moon4Kin = Math.abs(moon4Vel[0]) + Math.abs(moon4Vel[1]) + Math.abs(moon4Vel[2]);
  
  console.log((moon1Pot*moon1Kin) + (moon2Pot*moon2Kin) + (moon3Pot*moon3Kin) + (moon4Pot*moon4Kin));
  console.log("done");
}
day12();
