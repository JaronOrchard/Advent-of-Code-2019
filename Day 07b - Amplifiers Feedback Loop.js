function amplifiers(inputArray) {
  var LOGGING = false;
  var MAX_STEPS = 500;
  
  var originalInputs = inputArray.split(',');
  for (var i = 0; i < originalInputs.length; i++) { originalInputs[i] = Number(originalInputs[i]); }
  originalInputs.push(0); originalInputs.push(0); originalInputs.push(0); // Buffer
  var steps = 0; // for preventing infinite loops during debugging
  var bestOutputSoFar = {val: 0, order: "nothing"};
  
  // Just used an online permutation generator lol
  //var phaseSignals = ["98765"];
  var phaseSignals = ["67895","76895","86795","68795","78695","87695","87965","78965","98765","89765","79865","97865","96875","69875","89675","98675","68975","86975","76985","67985","97685","79685","69785","96785","56789","65789","75689","57689","67589","76589","76859","67859","87659","78659","68759","86759","85769","58769","78569","87569","57869","75869","65879","56879","86579","68579","58679","85679","95678","59678","69578","96578","56978","65978","65798","56798","76598","67598","57698","75698","79658","97658","67958","76958","96758","69758","59768","95768","75968","57968","97568","79568","89567","98567","58967","85967","95867","59867","59687","95687","65987","56987","96587","69587","68597","86597","56897","65897","85697","58697","98657","89657","69857","96857","86957","68957","78956","87956","97856","79856","89756","98756","98576","89576","59876","95876","85976","58976","57986","75986","95786","59786","79586","97586","87596","78596","58796","85796","75896","57896"];
  
  for (var ps = 0; ps < phaseSignals.length; ps++) {
    var nextInputSignal = 0;
    var currIndex = [];
    var gavePhaseSignal = [];
    
    // Idea: Keep state of all five amplifiers at once, rotate when one gives an output signal
    var currentAmplifier = 0;
    var inputs = [];
    for (var i = 0; i < 5; i++) {
      currIndex.push(0);
      gavePhaseSignal.push(false);
      var tempInputs = [];
      for (var j = 0; j < originalInputs.length; j++) {
        tempInputs.push(originalInputs[j]);
      }
      inputs.push(tempInputs);
    }
    
    while (true/*steps++ < MAX_STEPS*/) {
      var nextInstruction = inputs[currentAmplifier][currIndex[currentAmplifier]];
      var opCode = nextInstruction % 100;
      var param1Mode = Math.floor(nextInstruction / 100) % 10;
      var param2Mode = Math.floor(nextInstruction / 1000) % 10;
      var param3Mode = Math.floor(nextInstruction / 10000) % 10;
      if (LOGGING) console.log("  Modes: " + param1Mode + " | " + param2Mode + " | " + param3Mode);

      // Get params:
      var param1, param2, param3, param1Pos, param1Imm, param2Pos, param2Imm, param3Pos, param3Imm;
      param1Imm = inputs[currentAmplifier][currIndex[currentAmplifier] + 1];
      param1Pos = inputs[currentAmplifier][param1Imm];
      param2Imm = inputs[currentAmplifier][currIndex[currentAmplifier] + 2];
      param2Pos = inputs[currentAmplifier][param2Imm];
      param3Imm = inputs[currentAmplifier][currIndex[currentAmplifier] + 3];
      param3Pos = inputs[currentAmplifier][param3Imm];
      
      param1 = (param1Mode === 0) ? param1Pos : /* === 1 */ param1Imm;
      param2 = (param2Mode === 0) ? param2Pos : /* === 1 */ param2Imm;
      param3 = (param3Mode === 0) ? param3Pos : /* === 1 */ param3Imm;

      // Do stuff:
      if (opCode === 1) {
        if (LOGGING) console.log("Read " + nextInstruction + "; Adding " + param1 + " and " + param2 + " and putting in " + param3Imm);
        inputs[currentAmplifier][param3Imm] = param1 + param2;
        currIndex[currentAmplifier] += 4;
      } else if (opCode === 2) {
        if (LOGGING) console.log("Read " + nextInstruction + "; Multiplying " + param1 + " and " + param2 + " and putting in " + param3Imm);
        inputs[currentAmplifier][param3Imm] = param1 * param2;
        currIndex[currentAmplifier] += 4;
      } else if (opCode === 3) {
        var inputRead;
        if (gavePhaseSignal[currentAmplifier]) {
          inputRead = Number(nextInputSignal);
        } else {
          inputRead = Number(phaseSignals[ps][currentAmplifier]);
          gavePhaseSignal[currentAmplifier] = true;
        }
        inputs[currentAmplifier][param1Imm] = inputRead;
        if (LOGGING) console.log("Read " + nextInstruction + "; Getting input value " + inputRead + " and putting in " + param1Imm);
        currIndex[currentAmplifier] += 2;
      } else if (opCode === 4) {
        if (LOGGING) console.log("Read " + nextInstruction + "; Output mode: " + param1);
        console.log("Amplifier " + currentAmplifier + " sent signal " + param1 + ", moving to next");
        nextInputSignal = param1;
        currIndex[currentAmplifier] += 2;
        currentAmplifier = (currentAmplifier + 1) % 5; // Next amplifier
      } else if (opCode === 5) {
        currIndex[currentAmplifier] += 3;
        if (param1 !== 0) {
          if (LOGGING) console.log("Read " + nextInstruction + "; jumping to " + param2 + " because " + param1 + " is not zero");
          currIndex[currentAmplifier] = param2;
        } else {
          if (LOGGING) console.log("Read " + nextInstruction + "; not jumping because " + param1 + " is zero");
        }
      } else if (opCode === 6) {
        currIndex[currentAmplifier] += 3;
        if (param1 === 0) {
          if (LOGGING) console.log("Read " + nextInstruction + "; jumping to " + param2 + " because " + param1 + " is zero");
          currIndex[currentAmplifier] = param2;
        } else {
          if (LOGGING) console.log("Read " + nextInstruction + "; not jumping because " + param1 + " is not zero");
        }
      } else if (opCode === 7) {
        if (param1 < param2) {
          if (LOGGING) console.log("Read " + nextInstruction + "; setting " + param3Imm + " to 1 because " + param1 + " < " + param2);
          inputs[currentAmplifier][param3Imm] = 1;
        } else {
          if (LOGGING) console.log("Read " + nextInstruction + "; setting " + param3Imm + " to 0 because " + param1 + " >= " + param2);
          inputs[currentAmplifier][param3Imm] = 0;
        }
        currIndex[currentAmplifier] += 4;
      } else if (opCode === 8) {
        if (param1 === param2) {
          if (LOGGING) console.log("Read " + nextInstruction + "; setting " + param3Imm + " to 1 because " + param1 + " === " + param2);
          inputs[currentAmplifier][param3Imm] = 1;
        } else {
          if (LOGGING) console.log("Read " + nextInstruction + "; setting " + param3Imm + " to 0 because " + param1 + " !== " + param2);
          inputs[currentAmplifier][param3Imm] = 0;
        }
        currIndex[currentAmplifier] += 4;


        
      } else if (opCode === 99) {
        console.log("Successful termination in amplifier " + currentAmplifier + ", moving to next");
        currentAmplifier = (currentAmplifier + 1) % 5;
        break;
      } else {
        console.log("FAILURE!  GOT " + nextInstruction);
        break;
      }
    }
    
    if (nextInputSignal > bestOutputSoFar.val) {
      bestOutputSoFar = {val: nextInputSignal, order: phaseSignals[ps]};
    }
  }
    
  console.log(bestOutputSoFar);
}
amplifiers("3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5");
