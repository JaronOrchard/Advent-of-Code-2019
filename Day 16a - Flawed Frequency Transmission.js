function day16(inputNum) {
  var pattern = [0, 1, 0, -1];
  var PHASES = 100;

  /*
  var temp = "";
  for (var x = 0; x < 10000; x++) {
    temp += inputNum;
  }
  inputNum = temp;
  console.log(temp.length);
  */
  
  for (var phase = 0; phase < PHASES; phase++) {
    var outputNum = "";
    for (var i = 0; i < inputNum.length; i++) {
      // Create output digit i:
      // Determine pattern
      var currPattern = [];
      while (currPattern.length < inputNum.length + 1) {
        for (var k = 0; k < pattern.length; k++) {
          for (var l = 0; l < i + 1; l++) {
            currPattern.push(pattern[k]);
          }
        }
      }
      currPattern = currPattern.slice(1);
      var sum = 0;
      for (var j = 0; j < inputNum.length; j++) {
        sum += Number(inputNum[j]) * currPattern[j];
      }
      outputNum += Math.abs(sum) % 10;
    }
    inputNum = outputNum;
    console.log("Finished phase " + (phase + 1));
  }
  
  // This works too, without using |currPattern|, but it's still O(n^2) and not fast enough to compete
  /*
    for (var phase = 0; phase < PHASES; phase++) {
    var outputNum = "";
    for (var i = 0; i < inputNum.length; i++) {
      var sum = 0;
      var paddedNum = "0" + inputNum;
      for (var j = i+1; j < paddedNum.length; j++) {
        //console.log("i: " + i + ", j: " + j);
        if (j%((i+1)*4) >= (i+1) && j%((i+1)*4) < (i+1)*2) {
          sum += Number(paddedNum[j]);
        } else if (j%((i+1)*4) >= (i+1)*3) {
          sum -= Number(paddedNum[j]);
        }
      }
      outputNum += Math.abs(sum) % 10;
      console.log(i);
    }
    inputNum = outputNum;
    console.log("Finished phase " + (phase + 1));
  }
  */

  console.log(outputNum);
  console.log("done");
}
day16("59796737047664322543488505082147966997246465580805791578417462788780740484409625674676660947541571448910007002821454068945653911486140823168233915285229075374000888029977800341663586046622003620770361738270014246730936046471831804308263177331723460787712423587453725840042234550299991238029307205348958992794024402253747340630378944672300874691478631846617861255015770298699407254311889484508545861264449878984624330324228278057377313029802505376260196904213746281830214352337622013473019245081834854781277565706545720492282616488950731291974328672252657631353765496979142830459889682475397686651923318015627694176893643969864689257620026916615305397");
//day16("03036732577212944063491565474664");
//day16("12345678");
