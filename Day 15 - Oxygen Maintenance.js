var LOGGING = false;
function intCodeComp(inputArray) {
  var MAX_STEPS = 500;
  
  var inputs = inputArray.split(',');
  for (var i = 0; i < inputs.length; i++) { inputs[i] = Number(inputs[i]); }
  inputs.push(0); inputs.push(0); inputs.push(0); // Buffer
  var currIndex = 0;
  var steps = 0; // for preventing infinite loops during debugging
  var relativeBase = 0;
  
  var map = {"0,0": 0};
  var currentX = 0;
  var currentY = 0;
  var tryingX;
  var tryingY;
  var retreating = false;
  var max = 0;
  var reset = false;
  
  while (true/*steps++ < MAX_STEPS*/) {
    var nextInstruction = inputs[currIndex];
    var opCode = nextInstruction % 100;
    var param1Mode = Math.floor(nextInstruction / 100) % 10;
    var param2Mode = Math.floor(nextInstruction / 1000) % 10;
    var param3Mode = Math.floor(nextInstruction / 10000) % 10;
    if (LOGGING) console.log("  Modes: " + param1Mode + " | " + param2Mode + " | " + param3Mode);

    // Get params:
    var param1, param2, param3, param1Pos, param1Imm, param2Pos, param2Imm, param3Pos, param3Imm;
    param1Imm = getValueFromArray(inputs, currIndex + 1);
    param1Pos = getValueFromArray(inputs, param1Imm);
    param1Rel = getValueFromArray(inputs, param1Imm + relativeBase);
    param2Imm = getValueFromArray(inputs, currIndex + 2);
    param2Pos = getValueFromArray(inputs, param2Imm);
    param2Rel = getValueFromArray(inputs, param2Imm + relativeBase);
    param3Imm = getValueFromArray(inputs, currIndex + 3);
    param3Pos = getValueFromArray(inputs, param3Imm);
    param3Rel = getValueFromArray(inputs, param3Imm + relativeBase);

    if (param1Mode === 0) {
      param1 = param1Pos;
    } else if (param1Mode === 1) {
      param1 = param1Imm;
    } else if (param1Mode === 2) {
      param1 = param1Rel;
    }
    if (param2Mode === 0) {
      param2 = param2Pos;
    } else if (param2Mode === 1) {
      param2 = param2Imm;
    } else if (param2Mode === 2) {
      param2 = param2Rel;
    }
    if (param3Mode === 0) {
      param3 = param3Pos;
    } else if (param3Mode === 1) {
      param3 = param3Imm;
    } else if (param3Mode === 2) {
      param3 = param3Rel;
    }

    // Do stuff:
    if (opCode === 1) {
      if (LOGGING) console.log("Read " + nextInstruction + "; Adding " + param1 + " and " + param2 + " and putting in " + (param3Mode === 2 ? param3Imm + relativeBase : param3Imm));
      setValueInArray(inputs, (param3Mode === 2 ? param3Imm + relativeBase : param3Imm), param1 + param2);
      currIndex += 4;
    } else if (opCode === 2) {
      if (LOGGING) console.log("Read " + nextInstruction + "; Multiplying " + param1 + " and " + param2 + " and putting in " + (param3Mode === 2 ? param3Imm + relativeBase : param3Imm));
      setValueInArray(inputs, (param3Mode === 2 ? param3Imm + relativeBase : param3Imm), param1 * param2);
      currIndex += 4;
    } else if (opCode === 3) {
      
      /*

      Plan of action:

      1) Log current position and distance from start
      2) If any of 1/2/3/4 are unknown: Try them, other retreat in the direction of start
         If wall, update map
         If location, log it, update current position and distance from start

      */
      
      var currentDist = map[currentX + "," + currentY];
      if (!map.hasOwnProperty((currentX + 1) + "," + currentY)
          || map[(currentX + 1) + "," + currentY] > currentDist + 1) {
        // Try east
        tryingX = currentX + 1;
        tryingY = currentY;
        INPUT_VALUE = 4;
      } else if (!map.hasOwnProperty((currentX - 1) + "," + currentY)
          || map[(currentX - 1) + "," + currentY] > currentDist + 1) {
        // Try west
        tryingX = currentX - 1;
        tryingY = currentY;
        INPUT_VALUE = 3;
      } else if (!map.hasOwnProperty(currentX + "," + (currentY + 1))
          || map[currentX + "," + (currentY + 1)] > currentDist + 1) {
        // Try south
        tryingX = currentX;
        tryingY = currentY + 1;
        INPUT_VALUE = 2;
      } else if (!map.hasOwnProperty(currentX + "," + (currentY - 1))
          || map[currentX + "," + (currentY - 1)] > currentDist + 1) {
        // Try north
        tryingX = currentX;
        tryingY = currentY - 1;
        INPUT_VALUE = 1;
      } else {
        // Find spot closer to parent and go there
        var currentDistance = map[currentX + "," + currentY];
        if (map[(currentX + 1) + "," + currentY] === currentDistance - 1) {
          tryingX = currentX + 1;
          tryingY = currentY;
          INPUT_VALUE = 4;
          retreating = true;
        } else if (map[(currentX - 1) + "," + currentY] === currentDistance - 1) {
          tryingX = currentX - 1;
          tryingY = currentY;
          INPUT_VALUE = 3;
          retreating = true;
        } else if (map[currentX + "," + (currentY + 1)] === currentDistance - 1) {
          tryingX = currentX;
          tryingY = currentY + 1;
          INPUT_VALUE = 2;
          retreating = true;
        } else if (map[currentX + "," + (currentY - 1)] === currentDistance - 1) {
          tryingX = currentX;
          tryingY = currentY - 1;
          INPUT_VALUE = 1;
          retreating = true;
        } else {
          console.log("done: " + max);
          console.log(map);
          //console.log("FATAL ERROR AT " + currentX + "," + currentY);
          return;
        }
      }
      
      setValueInArray(inputs, (param1Mode === 2 ? param1Imm + relativeBase : param1Imm), INPUT_VALUE);
      if (LOGGING) console.log("Read " + nextInstruction + "; Getting input value " + INPUT_VALUE + " and putting in " + (param1Mode === 2 ? param1Imm + relativeBase : param1Imm));
      currIndex += 2;
    } else if (opCode === 4) {
      
      if (!retreating) {
        if (param1 === 0) {
          map[tryingX + "," + tryingY] = "#";
        } else if (param1 === 1) {
          map[tryingX + "," + tryingY] = map[currentX + "," + currentY] + 1;
          currentX = tryingX;
          currentY = tryingY;
          var max = Math.max(map[currentX + "," + currentY], max);
        } else if (param1 === 2) {
          map[tryingX + "," + tryingY] = map[currentX + "," + currentY] + 1;
          currentX = tryingX;
          currentY = tryingY;
          console.log("FOUND SYSTEM AT " + currentX + "," + currentY + " AFTER " + map[currentX + "," + currentY] + " MOVES");
          var max = Math.max(map[currentX + "," + currentY], max);
          if (!reset) {
            map = {};
            map[currentX + "," + currentY] = 0;
            max = 0;
          }
          //return;
        } else {
          console.log("FATAL ERROR 2");
          return;
        }
      } else {
        currentX = tryingX;
        currentY = tryingY;
      }
      retreating = false;
      
      
      console.log("Read " + nextInstruction + "; Output mode: " + param1);
      currIndex += 2;
    } else if (opCode === 5) {
      currIndex += 3;
      if (param1 !== 0) {
        if (LOGGING) console.log("Read " + nextInstruction + "; jumping to " + param2 + " because " + param1 + " is not zero");
        currIndex = param2;
      } else {
        if (LOGGING) console.log("Read " + nextInstruction + "; not jumping because " + param1 + " is zero");
      }
    } else if (opCode === 6) {
      currIndex += 3;
      if (param1 === 0) {
        if (LOGGING) console.log("Read " + nextInstruction + "; jumping to " + param2 + " because " + param1 + " is zero");
        currIndex = param2;
      } else {
        if (LOGGING) console.log("Read " + nextInstruction + "; not jumping because " + param1 + " is not zero");
      }
    } else if (opCode === 7) {
      if (param1 < param2) {
        if (LOGGING) console.log("Read " + nextInstruction + "; setting " + (param3Mode === 2 ? param3Imm + relativeBase : param3Imm) + " to 1 because " + param1 + " < " + param2);
        setValueInArray(inputs, (param3Mode === 2 ? param3Imm + relativeBase : param3Imm), 1);
      } else {
        if (LOGGING) console.log("Read " + nextInstruction + "; setting " + (param3Mode === 2 ? param3Imm + relativeBase : param3Imm) + " to 0 because " + param1 + " >= " + param2);
        setValueInArray(inputs, (param3Mode === 2 ? param3Imm + relativeBase : param3Imm), 0);
      }
      currIndex += 4;
    } else if (opCode === 8) {
      if (param1 === param2) {
        if (LOGGING) console.log("Read " + nextInstruction + "; setting " + (param3Mode === 2 ? param3Imm + relativeBase : param3Imm) + " to 1 because " + param1 + " === " + param2);
        setValueInArray(inputs, (param3Mode === 2 ? param3Imm + relativeBase : param3Imm), 1);
      } else {
        if (LOGGING) console.log("Read " + nextInstruction + "; setting " + (param3Mode === 2 ? param3Imm + relativeBase : param3Imm) + " to 0 because " + param1 + " !== " + param2);
        setValueInArray(inputs, (param3Mode === 2 ? param3Imm + relativeBase : param3Imm), 0);
      }
      currIndex += 4;
    } else if (opCode === 9) {
      if (LOGGING) console.log("Read " + nextInstruction + "; increasing relativeBase by " + param1 + " to " + (relativeBase + param1));
      relativeBase += param1;
      currIndex += 2;


      
    } else if (opCode === 99) {
      console.log("Successful termination");
      break;
    } else {
      console.log("FAILURE!  GOT " + nextInstruction);
      break;
    }
  }

  console.log("done");
}
function extendMemoryIfNecessary(inputs, index) {
  if (index > 999999) return; // this is just a hack anyway
  if (inputs.length <= index) {
    if (LOGGING) console.log("[extending memory, got " + index + " and inputs is length " + inputs.length + "]");
  }
  while (inputs.length <= index) {
    inputs.push(0);
  }
}
function getValueFromArray(inputs, index) {
  extendMemoryIfNecessary(inputs, index);
  return (inputs[index] === undefined) ? 0 : inputs[index];
}
function setValueInArray(inputs, index, val) {
  extendMemoryIfNecessary(inputs, index);
  inputs[index] = val;
}
intCodeComp("3,1033,1008,1033,1,1032,1005,1032,31,1008,1033,2,1032,1005,1032,58,1008,1033,3,1032,1005,1032,81,1008,1033,4,1032,1005,1032,104,99,1002,1034,1,1039,1002,1036,1,1041,1001,1035,-1,1040,1008,1038,0,1043,102,-1,1043,1032,1,1037,1032,1042,1106,0,124,1001,1034,0,1039,1002,1036,1,1041,1001,1035,1,1040,1008,1038,0,1043,1,1037,1038,1042,1106,0,124,1001,1034,-1,1039,1008,1036,0,1041,1002,1035,1,1040,1001,1038,0,1043,101,0,1037,1042,1105,1,124,1001,1034,1,1039,1008,1036,0,1041,102,1,1035,1040,1001,1038,0,1043,101,0,1037,1042,1006,1039,217,1006,1040,217,1008,1039,40,1032,1005,1032,217,1008,1040,40,1032,1005,1032,217,1008,1039,39,1032,1006,1032,165,1008,1040,3,1032,1006,1032,165,1102,1,2,1044,1106,0,224,2,1041,1043,1032,1006,1032,179,1102,1,1,1044,1106,0,224,1,1041,1043,1032,1006,1032,217,1,1042,1043,1032,1001,1032,-1,1032,1002,1032,39,1032,1,1032,1039,1032,101,-1,1032,1032,101,252,1032,211,1007,0,59,1044,1105,1,224,1102,1,0,1044,1105,1,224,1006,1044,247,101,0,1039,1034,1001,1040,0,1035,101,0,1041,1036,1002,1043,1,1038,1002,1042,1,1037,4,1044,1105,1,0,93,27,71,56,88,17,30,78,5,57,79,56,3,82,62,58,16,2,21,89,95,33,12,32,90,12,7,76,83,31,8,13,27,89,60,33,7,40,22,50,8,63,35,45,57,94,81,4,65,33,47,73,28,98,11,70,95,17,82,39,19,73,62,56,80,85,23,91,39,86,91,82,50,37,86,4,90,83,8,65,56,63,15,99,51,3,60,60,77,58,90,82,5,52,14,87,37,74,85,43,17,61,91,35,31,81,19,12,34,54,9,66,34,69,67,21,4,14,87,22,76,26,82,79,4,69,48,73,8,73,57,61,83,23,83,60,3,41,75,67,53,44,91,27,52,84,66,13,65,95,81,83,30,26,60,12,33,92,81,46,78,25,13,72,87,26,63,57,35,2,60,96,63,26,2,76,95,21,38,60,5,79,86,89,47,42,12,91,30,52,69,55,67,73,47,44,5,86,8,52,69,81,23,70,3,38,41,89,88,58,41,9,96,27,67,21,14,68,67,35,84,23,20,91,63,47,75,34,70,57,13,54,82,33,61,27,97,88,46,44,56,74,14,5,96,71,16,40,86,61,84,41,81,81,16,88,51,41,96,76,28,97,44,41,65,87,50,73,58,71,46,73,51,43,18,46,99,74,65,9,89,3,77,22,34,93,94,39,54,96,12,35,62,87,56,69,64,9,34,91,64,71,28,10,94,1,96,20,67,92,39,37,26,79,68,16,76,57,83,92,46,75,99,26,64,39,72,65,37,93,65,5,53,62,36,13,97,14,38,85,33,76,56,99,29,64,84,28,19,91,92,55,33,88,32,70,38,53,76,1,76,35,26,75,18,18,7,88,19,53,65,22,91,20,85,15,13,72,82,13,31,75,62,68,4,56,91,89,56,10,46,63,7,74,50,15,85,87,64,77,12,95,10,66,77,51,6,61,75,91,75,85,61,78,4,97,99,4,90,34,89,44,44,68,89,30,20,70,24,22,81,22,77,61,33,89,2,11,75,50,85,13,43,56,78,73,49,27,38,78,56,90,17,94,72,51,5,55,67,32,19,81,81,45,83,18,96,33,75,53,4,29,87,80,33,57,78,80,43,68,57,71,83,10,18,98,70,36,61,31,73,33,69,24,78,76,43,88,96,16,14,91,43,66,15,98,44,48,68,57,72,48,49,89,62,31,55,83,68,86,97,16,25,87,13,74,40,82,43,48,85,40,45,72,33,60,84,4,47,96,19,92,75,73,46,6,69,4,81,98,89,48,55,89,24,64,31,47,50,93,72,47,72,36,79,7,24,66,60,65,18,81,93,40,37,36,62,94,48,8,77,21,82,22,65,20,46,85,47,52,70,55,74,19,65,15,72,81,57,67,46,94,21,16,94,84,36,43,62,82,48,47,79,5,96,39,58,85,80,31,7,98,23,69,22,99,37,69,35,66,36,70,3,69,47,6,64,38,69,42,57,91,89,21,89,13,42,78,24,44,79,74,65,63,85,10,50,71,94,26,78,55,5,26,71,46,20,83,96,51,87,2,99,83,5,38,86,8,13,94,61,93,39,67,23,60,74,87,57,30,72,23,19,95,57,93,83,58,34,83,35,4,47,81,88,24,87,34,93,79,70,18,24,73,98,76,77,24,93,18,66,56,87,25,29,7,7,97,40,61,56,96,96,1,42,21,92,73,11,10,97,69,58,93,2,82,27,96,7,84,44,67,57,63,13,79,56,72,34,89,26,94,24,86,99,71,73,98,26,89,10,98,5,64,70,85,32,61,35,67,0,0,21,21,1,10,1,0,0,0,0,0,0");
