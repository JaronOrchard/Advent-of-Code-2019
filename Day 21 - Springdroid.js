var LOGGING = false;
function intCodeComp(inputArray) {
  var MAX_STEPS = 500;
  
  var inputs = inputArray.split(',');
  for (var i = 0; i < inputs.length; i++) { inputs[i] = Number(inputs[i]); }
  inputs.push(0); inputs.push(0); inputs.push(0); // Buffer
  var currIndex = 0;
  var steps = 0; // for preventing infinite loops during debugging
  var relativeBase = 0;
  
  /* part 1 */ //var PROGRAM = "NOT C J|AND D J|OR J T|NOT A J|OR T J|WALK|";
  /* part 2 */ var PROGRAM = "NOT C J|AND D J|OR J T|NOT A J|OR T J|AND E T|AND H T|OR E T|OR H T|AND T J|AND J T|OR B T|OR E T|NOT T T|OR T J|RUN|";
  var programIndex = 0;
  var outputMessage = "";
  
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
      var INPUT_VALUE = Number(PROGRAM[programIndex].charCodeAt(0));
      if (PROGRAM[programIndex] === "|") INPUT_VALUE = 10;
      programIndex++;
      
      setValueInArray(inputs, (param1Mode === 2 ? param1Imm + relativeBase : param1Imm), INPUT_VALUE);
      if (LOGGING) console.log("Read " + nextInstruction + "; Getting input value " + INPUT_VALUE + " and putting in " + (param1Mode === 2 ? param1Imm + relativeBase : param1Imm));
      currIndex += 2;
    } else if (opCode === 4) {
      console.log("Read " + nextInstruction + "; Output mode: " + param1 + " : " + String.fromCharCode(param1));
      currIndex += 2;
      outputMessage += String.fromCharCode(param1);
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
  console.log(outputMessage);
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
String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}
intCodeComp("109,2050,21101,966,0,1,21102,13,1,0,1105,1,1378,21101,0,20,0,1106,0,1337,21101,27,0,0,1106,0,1279,1208,1,65,748,1005,748,73,1208,1,79,748,1005,748,110,1208,1,78,748,1005,748,132,1208,1,87,748,1005,748,169,1208,1,82,748,1005,748,239,21102,1041,1,1,21101,0,73,0,1106,0,1421,21101,0,78,1,21101,1041,0,2,21102,1,88,0,1105,1,1301,21102,1,68,1,21102,1,1041,2,21101,0,103,0,1105,1,1301,1101,0,1,750,1106,0,298,21101,82,0,1,21102,1,1041,2,21102,125,1,0,1106,0,1301,1101,0,2,750,1105,1,298,21102,1,79,1,21101,0,1041,2,21102,1,147,0,1105,1,1301,21101,84,0,1,21102,1041,1,2,21102,1,162,0,1106,0,1301,1101,0,3,750,1105,1,298,21101,0,65,1,21101,0,1041,2,21102,184,1,0,1106,0,1301,21102,76,1,1,21102,1,1041,2,21101,199,0,0,1105,1,1301,21101,75,0,1,21102,1041,1,2,21102,1,214,0,1105,1,1301,21101,221,0,0,1105,1,1337,21102,10,1,1,21102,1,1041,2,21102,1,236,0,1106,0,1301,1105,1,553,21102,85,1,1,21102,1,1041,2,21101,0,254,0,1106,0,1301,21101,78,0,1,21101,0,1041,2,21102,269,1,0,1105,1,1301,21101,276,0,0,1105,1,1337,21102,10,1,1,21101,1041,0,2,21102,1,291,0,1106,0,1301,1102,1,1,755,1105,1,553,21102,1,32,1,21102,1,1041,2,21101,313,0,0,1105,1,1301,21102,1,320,0,1105,1,1337,21101,0,327,0,1105,1,1279,1202,1,1,749,21102,1,65,2,21101,0,73,3,21101,0,346,0,1106,0,1889,1206,1,367,1007,749,69,748,1005,748,360,1101,1,0,756,1001,749,-64,751,1105,1,406,1008,749,74,748,1006,748,381,1102,1,-1,751,1106,0,406,1008,749,84,748,1006,748,395,1101,-2,0,751,1105,1,406,21101,1100,0,1,21101,0,406,0,1106,0,1421,21102,32,1,1,21101,1100,0,2,21101,0,421,0,1106,0,1301,21102,1,428,0,1106,0,1337,21102,1,435,0,1106,0,1279,2101,0,1,749,1008,749,74,748,1006,748,453,1102,-1,1,752,1105,1,478,1008,749,84,748,1006,748,467,1101,-2,0,752,1106,0,478,21102,1168,1,1,21102,1,478,0,1105,1,1421,21101,0,485,0,1105,1,1337,21101,10,0,1,21102,1168,1,2,21102,1,500,0,1106,0,1301,1007,920,15,748,1005,748,518,21102,1,1209,1,21101,518,0,0,1105,1,1421,1002,920,3,529,1001,529,921,529,1002,750,1,0,1001,529,1,537,1001,751,0,0,1001,537,1,545,1001,752,0,0,1001,920,1,920,1105,1,13,1005,755,577,1006,756,570,21101,0,1100,1,21101,0,570,0,1105,1,1421,21102,987,1,1,1106,0,581,21102,1,1001,1,21102,1,588,0,1105,1,1378,1101,0,758,594,102,1,0,753,1006,753,654,21001,753,0,1,21102,1,610,0,1106,0,667,21102,0,1,1,21102,621,1,0,1105,1,1463,1205,1,647,21102,1,1015,1,21101,635,0,0,1105,1,1378,21102,1,1,1,21101,646,0,0,1105,1,1463,99,1001,594,1,594,1106,0,592,1006,755,664,1102,0,1,755,1106,0,647,4,754,99,109,2,1101,726,0,757,21202,-1,1,1,21101,9,0,2,21101,0,697,3,21102,1,692,0,1106,0,1913,109,-2,2106,0,0,109,2,102,1,757,706,2102,1,-1,0,1001,757,1,757,109,-2,2105,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,255,63,191,127,159,95,223,0,77,206,142,202,188,155,51,123,246,87,233,125,57,60,236,94,226,174,245,46,254,115,171,86,222,231,247,167,197,84,185,166,116,239,69,203,140,120,47,183,163,79,205,58,43,253,76,204,126,53,101,55,199,221,138,70,85,214,169,238,175,143,242,230,207,38,189,196,244,181,227,179,61,234,139,228,251,107,235,50,241,201,152,56,100,39,178,156,49,34,200,177,93,158,153,78,110,184,92,119,219,198,137,218,59,71,173,35,118,108,252,172,121,136,220,229,98,54,42,168,232,109,216,250,186,187,212,248,111,103,162,190,102,215,113,157,243,99,122,124,141,106,237,213,117,114,68,182,170,154,62,217,249,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,20,73,110,112,117,116,32,105,110,115,116,114,117,99,116,105,111,110,115,58,10,13,10,87,97,108,107,105,110,103,46,46,46,10,10,13,10,82,117,110,110,105,110,103,46,46,46,10,10,25,10,68,105,100,110,39,116,32,109,97,107,101,32,105,116,32,97,99,114,111,115,115,58,10,10,58,73,110,118,97,108,105,100,32,111,112,101,114,97,116,105,111,110,59,32,101,120,112,101,99,116,101,100,32,115,111,109,101,116,104,105,110,103,32,108,105,107,101,32,65,78,68,44,32,79,82,44,32,111,114,32,78,79,84,67,73,110,118,97,108,105,100,32,102,105,114,115,116,32,97,114,103,117,109,101,110,116,59,32,101,120,112,101,99,116,101,100,32,115,111,109,101,116,104,105,110,103,32,108,105,107,101,32,65,44,32,66,44,32,67,44,32,68,44,32,74,44,32,111,114,32,84,40,73,110,118,97,108,105,100,32,115,101,99,111,110,100,32,97,114,103,117,109,101,110,116,59,32,101,120,112,101,99,116,101,100,32,74,32,111,114,32,84,52,79,117,116,32,111,102,32,109,101,109,111,114,121,59,32,97,116,32,109,111,115,116,32,49,53,32,105,110,115,116,114,117,99,116,105,111,110,115,32,99,97,110,32,98,101,32,115,116,111,114,101,100,0,109,1,1005,1262,1270,3,1262,20102,1,1262,0,109,-1,2105,1,0,109,1,21102,1288,1,0,1106,0,1263,21001,1262,0,0,1101,0,0,1262,109,-1,2105,1,0,109,5,21101,0,1310,0,1106,0,1279,22101,0,1,-2,22208,-2,-4,-1,1205,-1,1332,22101,0,-3,1,21101,0,1332,0,1106,0,1421,109,-5,2105,1,0,109,2,21102,1346,1,0,1105,1,1263,21208,1,32,-1,1205,-1,1363,21208,1,9,-1,1205,-1,1363,1105,1,1373,21102,1,1370,0,1106,0,1279,1105,1,1339,109,-2,2106,0,0,109,5,1201,-4,0,1386,20101,0,0,-2,22101,1,-4,-4,21101,0,0,-3,22208,-3,-2,-1,1205,-1,1416,2201,-4,-3,1408,4,0,21201,-3,1,-3,1106,0,1396,109,-5,2105,1,0,109,2,104,10,21201,-1,0,1,21102,1436,1,0,1105,1,1378,104,10,99,109,-2,2105,1,0,109,3,20002,594,753,-1,22202,-1,-2,-1,201,-1,754,754,109,-3,2106,0,0,109,10,21102,1,5,-5,21101,1,0,-4,21101,0,0,-3,1206,-9,1555,21101,0,3,-6,21101,5,0,-7,22208,-7,-5,-8,1206,-8,1507,22208,-6,-4,-8,1206,-8,1507,104,64,1106,0,1529,1205,-6,1527,1201,-7,716,1515,21002,0,-11,-8,21201,-8,46,-8,204,-8,1105,1,1529,104,46,21201,-7,1,-7,21207,-7,22,-8,1205,-8,1488,104,10,21201,-6,-1,-6,21207,-6,0,-8,1206,-8,1484,104,10,21207,-4,1,-8,1206,-8,1569,21101,0,0,-9,1105,1,1689,21208,-5,21,-8,1206,-8,1583,21101,1,0,-9,1105,1,1689,1201,-5,716,1588,21001,0,0,-2,21208,-4,1,-1,22202,-2,-1,-1,1205,-2,1613,22101,0,-5,1,21101,0,1613,0,1105,1,1444,1206,-1,1634,21202,-5,1,1,21102,1627,1,0,1106,0,1694,1206,1,1634,21102,2,1,-3,22107,1,-4,-8,22201,-1,-8,-8,1206,-8,1649,21201,-5,1,-5,1206,-3,1663,21201,-3,-1,-3,21201,-4,1,-4,1105,1,1667,21201,-4,-1,-4,21208,-4,0,-1,1201,-5,716,1676,22002,0,-1,-1,1206,-1,1686,21102,1,1,-4,1105,1,1477,109,-10,2106,0,0,109,11,21102,1,0,-6,21101,0,0,-8,21102,1,0,-7,20208,-6,920,-9,1205,-9,1880,21202,-6,3,-9,1201,-9,921,1725,20101,0,0,-5,1001,1725,1,1733,20102,1,0,-4,21201,-4,0,1,21102,1,1,2,21101,0,9,3,21101,0,1754,0,1106,0,1889,1206,1,1772,2201,-10,-4,1766,1001,1766,716,1766,21002,0,1,-3,1106,0,1790,21208,-4,-1,-9,1206,-9,1786,21201,-8,0,-3,1106,0,1790,21201,-7,0,-3,1001,1733,1,1795,21002,0,1,-2,21208,-2,-1,-9,1206,-9,1812,21201,-8,0,-1,1106,0,1816,21202,-7,1,-1,21208,-5,1,-9,1205,-9,1837,21208,-5,2,-9,1205,-9,1844,21208,-3,0,-1,1105,1,1855,22202,-3,-1,-1,1105,1,1855,22201,-3,-1,-1,22107,0,-1,-1,1105,1,1855,21208,-2,-1,-9,1206,-9,1869,21201,-1,0,-8,1106,0,1873,22101,0,-1,-7,21201,-6,1,-6,1106,0,1708,22102,1,-8,-10,109,-11,2106,0,0,109,7,22207,-6,-5,-3,22207,-4,-6,-2,22201,-3,-2,-1,21208,-1,0,-6,109,-7,2106,0,0,0,109,5,2102,1,-2,1912,21207,-4,0,-1,1206,-1,1930,21102,1,0,-4,22101,0,-4,1,21202,-3,1,2,21102,1,1,3,21101,0,1949,0,1106,0,1954,109,-5,2106,0,0,109,6,21207,-4,1,-1,1206,-1,1977,22207,-5,-3,-1,1206,-1,1977,22101,0,-5,-5,1105,1,2045,21201,-5,0,1,21201,-4,-1,2,21202,-3,2,3,21102,1996,1,0,1106,0,1954,21201,1,0,-5,21101,0,1,-2,22207,-5,-3,-1,1206,-1,2015,21102,1,0,-2,22202,-3,-2,-3,22107,0,-4,-1,1206,-1,2037,21202,-2,1,1,21101,0,2037,0,105,1,1912,21202,-3,-1,-3,22201,-5,-3,-5,109,-6,2105,1,0");
