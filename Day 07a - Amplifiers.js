function amplifiers(inputArray) {
  var LOGGING = false;
  var MAX_STEPS = 500;
  
  var originalInputs = inputArray.split(',');
  for (var i = 0; i < originalInputs.length; i++) { originalInputs[i] = Number(originalInputs[i]); }
  originalInputs.push(0); originalInputs.push(0); originalInputs.push(0); // Buffer
  var steps = 0; // for preventing infinite loops during debugging
  var bestOutputSoFar = {val: 0, order: "nothing"};
  
  // Just used an online permutation generator lol
  //var phaseSignals = ["43210"];
  var phaseSignals = ["12340","21340","31240","13240","23140","32140","32410","23410","43210","34210","24310","42310","41320","14320","34120","43120","13420","31420","21430","12430","42130","24130","14230","41230","01234","10234","20134","02134","12034","21034","21304","12304","32104","23104","13204","31204","30214","03214","23014","32014","02314","20314","10324","01324","31024","13024","03124","30124","40123","04123","14023","41023","01423","10423","10243","01243","21043","12043","02143","20143","24103","42103","12403","21403","41203","14203","04213","40213","20413","02413","42013","24013","34012","43012","03412","30412","40312","04312","04132","40132","10432","01432","41032","14032","13042","31042","01342","10342","30142","03142","43102","34102","14302","41302","31402","13402","23401","32401","42301","24301","34201","43201","43021","34021","04321","40321","30421","03421","02431","20431","40231","04231","24031","42031","32041","23041","03241","30241","20341","02341"];
  
  for (var ps = 0; ps < phaseSignals.length; ps++) {
    var nextInputSignal = 0;
    
    var inputs = [];
    for (var copyIndex = 0; copyIndex < originalInputs.length; copyIndex++) {
      inputs.push(originalInputs[copyIndex]);
    }
    
    for (var psi = 0; psi < 5; psi++) {
    
      var gavePhaseSignal = false;
      var currIndex = 0;
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
          if (gavePhaseSignal) {
            inputs[param1Imm] = Number(nextInputSignal);
          } else {
            inputs[param1Imm] = Number(phaseSignals[ps][psi]);
            gavePhaseSignal = true;
          }
          if (LOGGING) console.log("Read " + nextInstruction + "; Getting input value " + inputs[param1Imm] + " and putting in " + param1Imm);
          currIndex += 2;
        } else if (opCode === 4) {
          console.log("Read " + nextInstruction + "; Output mode: " + param1);
          nextInputSignal = param1;
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
    }
    
    if (nextInputSignal > bestOutputSoFar.val) {
      bestOutputSoFar = {val: nextInputSignal, order: phaseSignals[ps]};
    }
  }
    
  console.log(bestOutputSoFar);
}
amplifiers("3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0");
