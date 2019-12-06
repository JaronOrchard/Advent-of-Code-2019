function intCodeComp(inputArray) {
  var INPUT_VALUE = 5;
  var LOGGING = true;
  var MAX_STEPS = 500;
  
  var inputs = inputArray.split(',');
  for (var i = 0; i < inputs.length; i++) { inputs[i] = Number(inputs[i]); }
  inputs.push(0); inputs.push(0); inputs.push(0); // Buffer
  var currIndex = 0;
  var steps = 0; // for preventing infinite loops during debugging
  
  while (true/*steps++ < MAX_STEPS*/) {
    var nextInstruction = inputs[currIndex];
    var opCode = nextInstruction % 100;
    var param1Mode = Math.floor(nextInstruction / 100) % 10;
    var param2Mode = Math.floor(nextInstruction / 1000) % 10;
    var param3Mode = Math.floor(nextInstruction / 10000) % 10;
    if (LOGGING) console.log("  Modes: " + param1Mode + " | " + param2Mode + " | " + param3Mode);

    // Get params:
    var param1, param2, param3, param1Pos, param1Imm, param2Pos, param2Imm, param3Pos, param3Imm;
    param1Imm = inputs[currIndex + 1];
    param1Pos = inputs[param1Imm];
    param2Imm = inputs[currIndex + 2];
    param2Pos = inputs[param2Imm];
    param3Imm = inputs[currIndex + 3];
    param3Pos = inputs[param3Imm];
    
    param1 = (param1Mode === 0) ? param1Pos : /* === 1 */ param1Imm;
    param2 = (param2Mode === 0) ? param2Pos : /* === 1 */ param2Imm;
    param3 = (param3Mode === 0) ? param3Pos : /* === 1 */ param3Imm;

    // Do stuff:
    if (opCode === 1) {
      if (LOGGING) console.log("Read " + nextInstruction + "; Adding " + param1 + " and " + param2 + " and putting in " + param3Imm);
      inputs[param3Imm] = param1 + param2;
      currIndex += 4;
    } else if (opCode === 2) {
      if (LOGGING) console.log("Read " + nextInstruction + "; Multiplying " + param1 + " and " + param2 + " and putting in " + param3Imm);
      inputs[param3Imm] = param1 * param2;
      currIndex += 4;
    } else if (opCode === 3) {
      if (LOGGING) console.log("Read " + nextInstruction + "; Getting input value " + INPUT_VALUE + " and putting in " + param1Imm);
      inputs[param1Imm] = INPUT_VALUE;
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
        if (LOGGING) console.log("Read " + nextInstruction + "; setting " + param3Imm + " to 1 because " + param1 + " < " + param2);
        inputs[param3Imm] = 1;
      } else {
        if (LOGGING) console.log("Read " + nextInstruction + "; setting " + param3Imm + " to 0 because " + param1 + " >= " + param2);
        inputs[param3Imm] = 0;
      }
      currIndex += 4;
    } else if (opCode === 8) {
      if (param1 === param2) {
        if (LOGGING) console.log("Read " + nextInstruction + "; setting " + param3Imm + " to 1 because " + param1 + " === " + param2);
        inputs[param3Imm] = 1;
      } else {
        if (LOGGING) console.log("Read " + nextInstruction + "; setting " + param3Imm + " to 0 because " + param1 + " !== " + param2);
        inputs[param3Imm] = 0;
      }
      currIndex += 4;


      
    } else if (opCode === 99) {
      console.log("Successful termination");
      break;
    } else {
      console.log("FAILURE!  GOT " + nextInstruction);
      break;
    }
  }

  console.log("done");
  if (LOGGING) console.log(inputs);
}
