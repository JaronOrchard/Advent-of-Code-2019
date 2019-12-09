var LOGGING = false;
function intCodeComp(inputArray) {
  var INPUT_VALUE = 1;
  var MAX_STEPS = 500;
  
  var inputs = inputArray.split(',');
  for (var i = 0; i < inputs.length; i++) { inputs[i] = Number(inputs[i]); }
  inputs.push(0); inputs.push(0); inputs.push(0); // Buffer
  var currIndex = 0;
  var steps = 0; // for preventing infinite loops during debugging
  
  var relativeBase = 0;
  
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
      setValueInArray(inputs, (param1Mode === 2 ? param1Imm + relativeBase : param1Imm), INPUT_VALUE);
      if (LOGGING) console.log("Read " + nextInstruction + "; Getting input value " + INPUT_VALUE + " and putting in " + (param1Mode === 2 ? param1Imm + relativeBase : param1Imm));
      currIndex += 2;
    } else if (opCode === 4) {
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
intCodeComp("1102,34463338,34463338,63,1007,63,34463338,63,1005,63,53,1102,3,1,1000,109,988,209,12,9,1000,209,6,209,3,203,0,1008,1000,1,63,1005,63,65,1008,1000,2,63,1005,63,904,1008,1000,0,63,1005,63,58,4,25,104,0,99,4,0,104,0,99,4,17,104,0,99,0,0,1102,0,1,1020,1102,1,38,1015,1102,37,1,1003,1102,21,1,1002,1102,34,1,1017,1101,39,0,1008,1102,1,20,1007,1101,851,0,1022,1102,1,1,1021,1101,24,0,1009,1101,0,26,1005,1101,29,0,1019,1101,0,866,1027,1101,0,260,1025,1102,33,1,1014,1101,0,36,1006,1102,1,25,1018,1102,1,669,1028,1101,0,27,1016,1101,0,23,1012,1102,35,1,1004,1102,1,31,1011,1101,0,664,1029,1101,32,0,1010,1101,0,22,1000,1102,873,1,1026,1102,1,848,1023,1102,265,1,1024,1101,0,28,1013,1101,30,0,1001,109,6,2107,31,-5,63,1005,63,201,1001,64,1,64,1106,0,203,4,187,1002,64,2,64,109,4,21107,40,39,1,1005,1011,219,1106,0,225,4,209,1001,64,1,64,1002,64,2,64,109,-1,2102,1,0,63,1008,63,24,63,1005,63,247,4,231,1106,0,251,1001,64,1,64,1002,64,2,64,109,9,2105,1,6,4,257,1105,1,269,1001,64,1,64,1002,64,2,64,109,-18,2108,19,2,63,1005,63,289,1001,64,1,64,1106,0,291,4,275,1002,64,2,64,109,23,21108,41,41,-8,1005,1015,313,4,297,1001,64,1,64,1106,0,313,1002,64,2,64,109,-19,2101,0,-4,63,1008,63,23,63,1005,63,333,1106,0,339,4,319,1001,64,1,64,1002,64,2,64,109,9,1206,7,357,4,345,1001,64,1,64,1105,1,357,1002,64,2,64,109,-15,2108,22,2,63,1005,63,375,4,363,1105,1,379,1001,64,1,64,1002,64,2,64,109,10,1208,-7,30,63,1005,63,397,4,385,1106,0,401,1001,64,1,64,1002,64,2,64,109,-7,1201,8,0,63,1008,63,27,63,1005,63,421,1106,0,427,4,407,1001,64,1,64,1002,64,2,64,109,-4,1202,3,1,63,1008,63,22,63,1005,63,449,4,433,1105,1,453,1001,64,1,64,1002,64,2,64,109,15,21108,42,40,4,1005,1016,469,1105,1,475,4,459,1001,64,1,64,1002,64,2,64,109,1,21101,43,0,0,1008,1013,43,63,1005,63,501,4,481,1001,64,1,64,1105,1,501,1002,64,2,64,109,-17,1207,10,35,63,1005,63,521,1001,64,1,64,1105,1,523,4,507,1002,64,2,64,109,7,2107,23,6,63,1005,63,545,4,529,1001,64,1,64,1105,1,545,1002,64,2,64,109,3,1201,0,0,63,1008,63,36,63,1005,63,571,4,551,1001,64,1,64,1105,1,571,1002,64,2,64,109,1,21107,44,45,7,1005,1014,593,4,577,1001,64,1,64,1106,0,593,1002,64,2,64,109,7,1205,6,609,1001,64,1,64,1106,0,611,4,599,1002,64,2,64,109,-14,1202,4,1,63,1008,63,32,63,1005,63,635,1001,64,1,64,1106,0,637,4,617,1002,64,2,64,109,30,1205,-9,651,4,643,1105,1,655,1001,64,1,64,1002,64,2,64,109,-4,2106,0,2,4,661,1106,0,673,1001,64,1,64,1002,64,2,64,109,-5,21101,45,0,-8,1008,1013,42,63,1005,63,697,1001,64,1,64,1106,0,699,4,679,1002,64,2,64,109,-10,1207,-6,27,63,1005,63,721,4,705,1001,64,1,64,1105,1,721,1002,64,2,64,109,-11,2101,0,6,63,1008,63,36,63,1005,63,743,4,727,1106,0,747,1001,64,1,64,1002,64,2,64,109,3,2102,1,-2,63,1008,63,33,63,1005,63,767,1105,1,773,4,753,1001,64,1,64,1002,64,2,64,109,18,1206,0,789,1001,64,1,64,1106,0,791,4,779,1002,64,2,64,109,-11,1208,-5,23,63,1005,63,807,1106,0,813,4,797,1001,64,1,64,1002,64,2,64,109,-5,21102,46,1,10,1008,1015,46,63,1005,63,835,4,819,1105,1,839,1001,64,1,64,1002,64,2,64,109,11,2105,1,7,1106,0,857,4,845,1001,64,1,64,1002,64,2,64,109,14,2106,0,-3,1001,64,1,64,1106,0,875,4,863,1002,64,2,64,109,-22,21102,47,1,5,1008,1013,48,63,1005,63,899,1001,64,1,64,1106,0,901,4,881,4,64,99,21102,1,27,1,21102,915,1,0,1105,1,922,21201,1,65718,1,204,1,99,109,3,1207,-2,3,63,1005,63,964,21201,-2,-1,1,21102,1,942,0,1105,1,922,22101,0,1,-1,21201,-2,-3,1,21102,957,1,0,1106,0,922,22201,1,-1,-2,1105,1,968,21201,-2,0,-2,109,-3,2105,1,0");
