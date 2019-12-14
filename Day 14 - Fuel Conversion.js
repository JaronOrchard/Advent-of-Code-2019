function day14(inputString) {
  var reactions = {};
  
  var inputReactions = inputString.split(";");
  for (var i = 0; i < inputReactions.length; i++) {
    var beforeAndAfter = inputReactions[i].split(" => ");
    var outputAmount = beforeAndAfter[1].split(" ")[0];
    var outputChemical = beforeAndAfter[1].split(" ")[1];
    var rowInputs = beforeAndAfter[0].split(", ");
    var rowInputArray = [];
    for (var j = 0; j < rowInputs.length; j++) {
      var inputAmount = rowInputs[j].split(" ")[0];
      var inputChemical = rowInputs[j].split(" ")[1];
      rowInputArray.push({"chemical": inputChemical, "amount": Number(inputAmount)});
    }
    reactions[outputChemical] = {"amountProduced": Number(outputAmount), "materials": rowInputArray};
  }
  
  // ~~~
 /*
 10 ORE => 10 A
 1 ORE => 1 B
 7 A, 1 B => 1 C
 7 A, 1 C => 1 D
 7 A, 1 D => 1 E
 7 A, 1 E => 1 FUEL
 */
  var thingsToMake = {"ORE": 0};
  for (key in reactions) {
    thingsToMake[key] = 0;
  }
  thingsToMake["FUEL"] = 1;
  
  var nearTrillionOre = 997000000000;
  var trillionOre = 1000000000000;
  var MULTIPLIER = 100;
  var fuelMade = 0;
  var bestNeg = -99999;
  var bestNegRecipes = {};
  var bestNegFuel = 0;
  
  while (thingsToMake["ORE"] < trillionOre) {
    while (getNonzeroKeys(thingsToMake).length > 0) {
      for (key in thingsToMake) {
        if (thingsToMake[key] <= 0 || key === "ORE") {
          continue;
        }
        var recipe = reactions[key];
        thingsToMake[key] -= recipe.amountProduced;
        //console.log("thingsToMake[" + key + "] is now " + thingsToMake[key]);
        for (var i = 0; i < recipe.materials.length; i++) {
          var inputChemical = recipe.materials[i].chemical;
          var inputAmount = recipe.materials[i].amount;
          thingsToMake[inputChemical] += inputAmount;
          //console.log("  thingsToMake[" + inputChemical + "] is now " + thingsToMake[inputChemical]);
        }
      }
    }
    if (thingsToMake["ORE"] < trillionOre) {
      fuelMade++;
    }
    console.log(thingsToMake);
    if (getNonzeroKeysAmounts(thingsToMake) > bestNeg) {
      bestNeg = getNonzeroKeysAmounts(thingsToMake);
      bestNegRecipes = JSON.parse(JSON.stringify(thingsToMake));
      bestNegFuel = fuelMade;
    }
    console.log("bestNeg: " + bestNeg);
    // -45 works best for my data set.  Not super efficient, but jumps from 5,000 fuel to 998,000,000,000 reliably.
    if (bestNeg >= -45) {
      while (thingsToMake["ORE"] < nearTrillionOre) {
        for (key in bestNegRecipes) {
          thingsToMake[key] += bestNegRecipes[key];
        }
        fuelMade += bestNegFuel;
        console.log("MULTIPLIER: Made " + fuelMade + " fuel by using " + thingsToMake["ORE"] + " ore");
      }
    }
    if (thingsToMake["ORE"] < trillionOre) {
      console.log("Made " + fuelMade + " fuel by using " + thingsToMake["ORE"] + " ore");
    }
    
    thingsToMake["FUEL"] = 1;
  }
  console.log(thingsToMake);
}
function getNonzeroKeys(input) {
  var output = [];
  for (key in input) {
    if (input[key] > 0 && key !== "ORE") {
      output.push(key);
    }
  }
  return output;
}
function getNonzeroKeysAmounts(input) {
  var val = 0;
  for (key in input) {
    if (key !== "ORE") {
      val += input[key];
    }
  }
  return val;
}
//day14("10 ORE => 10 A;1 ORE => 1 B;7 A, 1 B => 1 C;7 A, 1 C => 1 D;7 A, 1 D => 1 E;7 A, 1 E => 1 FUEL");
//day14("9 ORE => 2 A;8 ORE => 3 B;7 ORE => 5 C;3 A, 4 B => 1 AB;5 B, 7 C => 1 BC;4 C, 1 A => 1 CA;2 AB, 3 BC, 4 CA => 1 FUEL");
//day14("171 ORE => 8 CNZTR;7 ZLQW, 3 BMBT, 9 XCVML, 26 XMNCP, 1 WPTQ, 2 MZWV, 1 RJRHP => 4 PLWSL;114 ORE => 4 BHXH;14 VRPVC => 6 BMBT;6 BHXH, 18 KTJDG, 12 WPTQ, 7 PLWSL, 31 FHTLT, 37 ZDVW => 1 FUEL;6 WPTQ, 2 BMBT, 8 ZLQW, 18 KTJDG, 1 XMNCP, 6 MZWV, 1 RJRHP => 6 FHTLT;15 XDBXC, 2 LTCX, 1 VRPVC => 6 ZLQW;13 WPTQ, 10 LTCX, 3 RJRHP, 14 XMNCP, 2 MZWV, 1 ZLQW => 1 ZDVW;5 BMBT => 4 WPTQ;189 ORE => 9 KTJDG;1 MZWV, 17 XDBXC, 3 XCVML => 2 XMNCP;12 VRPVC, 27 CNZTR => 2 XDBXC;15 KTJDG, 12 BHXH => 5 XCVML;3 BHXH, 2 VRPVC => 7 MZWV;121 ORE => 7 VRPVC;7 XCVML => 6 RJRHP;5 BHXH, 4 VRPVC => 5 LTCX");
day14("1 HKCVW, 2 DFCT => 5 ZJZRN;8 TCPN, 7 XHTJF, 3 DFCT => 8 ZKCXK;1 ZJZRN, 4 NZVL, 1 NJFXK, 7 RHJCQ, 32 MCQS, 1 XFNPT => 5 ZWQX;10 DRWB, 16 JBHKV => 6 TCPN;3 MBFK => 7 DRWB;9 RHJCQ => 6 MBMKZ;1 BVFPF => 2 KRTGD;1 QNXC, 7 BKNQT, 1 XFNPT => 4 VNFJQ;2 TCPN, 1 WFSV => 2 TGJP;35 DFCT => 2 RHJCQ;1 SKBV, 7 CTRH => 8 QGDSV;8 VSRMJ, 1 BVFPF => 4 CTRH;1 WMCD => 3 FPZLF;13 CVJQG, 8 DXBZJ => 9 QBDQ;1 XSRWM => 5 GDJGV;132 ORE => 3 MBFK;2 BQGP => 9 LZKJZ;5 GZLHP => 7 WFSV;2 RXSZS, 10 MBFK, 1 BPNVK => 2 GZLHP;13 BZFH => 8 XSRWM;3 QLSVN => 3 SKBV;8 QBDQ => 4 VSRMJ;1 RXSZS => 9 CVJQG;3 MBFK => 3 BVFPF;7 GZLHP, 4 MBFK, 5 CVJQG => 8 XHTJF;1 GZLHP => 2 DFCT;4 SZDWB, 4 RHJCQ, 1 WMCD => 3 RGZDK;2 BRXLV => 8 DXBZJ;192 ORE => 7 RXSZS;1 PRMR, 6 DFCT => 5 SZDWB;104 ORE => 9 BPNVK;6 VLJWQ, 8 ZKCXK, 6 BKNQT, 26 JRXQ, 7 FPZLF, 6 HKCVW, 18 KRTGD => 4 RBFX;7 XFNPT, 1 GDJGV => 2 HJDB;15 SKBV, 8 DRWB, 12 RXSZS => 3 GHQPH;1 BZFH => 5 GCBR;1 TGJP, 6 SKBV => 1 BZFH;4 KRTGD, 1 ZJHKP, 1 LZKJZ, 1 VNFJQ, 6 QBDQ, 1 PRMR, 1 NJFXK, 1 HJDB => 8 TFQH;10 BVFPF, 1 RGZDK => 8 QNXC;1 XHTJF => 5 JRXQ;3 XKTMK, 4 QGDSV => 3 ZJHKP;2 BZFH => 7 PRMR;1 BPNVK, 1 RXSZS => 5 JBHKV;10 XHTJF => 9 BKNQT;1 JBHKV, 2 XHTJF => 8 QLSVN;24 VNFJQ, 42 TFQH, 39 RBFX, 1 ZWQX, 7 VBHVQ, 26 DRWB, 21 NJFXK => 1 FUEL;26 WBKQ, 14 XHTJF => 5 BQGP;5 WBKQ, 7 MBMKZ => 3 LQGC;6 LQGC => 5 NZVL;13 KRTGD, 5 GHQPH => 9 VLJWQ;117 ORE => 4 BRXLV;3 XKTMK, 1 PRMR => 2 MCQS;3 DRWB, 7 BVFPF, 4 TCPN => 7 NJFXK;10 VHFCR, 13 JZQJ => 5 XKTMK;17 CVJQG, 4 GCBR => 9 HKCVW;22 DFCT, 17 TGJP => 2 WBKQ;2 JZQJ, 12 XFNPT, 1 BQGP => 2 VBHVQ;12 HKCVW => 1 JZQJ;1 XSRWM => 3 WMCD;12 BZFH, 14 SKBV, 1 CTRH => 4 XFNPT;7 ZKCXK => 6 VHFCR");

