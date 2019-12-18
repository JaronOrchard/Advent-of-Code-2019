function day18(cols, rows, totalKeys, input) {
  var boardStates = [];
  boardStates.push({
    steps_taken: 0,
    keys_gathered: 0,
    board_state: input
  });
  
  // 1) Grab board state from list
  // 2) Get list of available keys via BFS
  //    a) If 0, skip this state
  // 3) For each key:
  //    a) Navigate to it
  //    b) Unlock corresponding door on map
  //    c) Log steps taken
  //    d) If keys gathered = max keys on map, update best steps, else add new board state
  
  var best_steps = 999999999;
  while (boardStates.length > 0) {
    var boardState = boardStates[0];
    boardStates = boardStates.slice(1);
    console.log("Grabbing board state, " + boardStates.length + " remain");
    
    // Start with index of @ symbol
    var cellsToVisit = [{index: boardState.board_state.indexOf("@"), dist: 0}];
    var mappedCellIndexes = {};
    mappedCellIndexes[boardState.board_state.indexOf("@")] = true;
    var keyMap = {};
    while (cellsToVisit.length > 0) {
      var cell = cellsToVisit[0];
      var cellIndex = cell.index;
      var cellDist = cell.dist;
      cellsToVisit = cellsToVisit.slice(1);
      // If wall or impassible, skip
      if (boardState.board_state[cellIndex] === "#" || (boardState.board_state[cellIndex] >= "A" && boardState.board_state[cellIndex] <= "Z")) {
        continue;
      }
      // If key, log key and skip
      if (boardState.board_state[cellIndex] >= "a" && boardState.board_state[cellIndex] <= "z") {
        keyMap[boardState.board_state[cellIndex]] = {"dist": cellDist, "robot": "@"};
        console.log("Found key " + boardState.board_state[cellIndex]);
        continue;
      }
      // Otherwise, for all four directions, if not in already mapped cells, add neighbor and marked as mapped
      if (cellIndex >= cols && !mappedCellIndexes.hasOwnProperty(cellIndex - cols)) { // Up
        cellsToVisit.push({index: cellIndex - cols, dist: cellDist + 1});
        mappedCellIndexes[cellIndex - cols] = true;
      }
      if (cellIndex < (rows-1)*cols && !mappedCellIndexes.hasOwnProperty(cellIndex + cols)) { // Down
        cellsToVisit.push({index: cellIndex + cols, dist: cellDist + 1});
        mappedCellIndexes[cellIndex + cols] = true;
      }
      if (cellIndex % cols > 0 && !mappedCellIndexes.hasOwnProperty(cellIndex - 1)) { // Left
        cellsToVisit.push({index: cellIndex - 1, dist: cellDist + 1});
        mappedCellIndexes[cellIndex - 1] = true;
      }
      if (cellIndex % cols < cols - 1 && !mappedCellIndexes.hasOwnProperty(cellIndex + 1)) { // Right
        cellsToVisit.push({index: cellIndex + 1, dist: cellDist + 1});
        mappedCellIndexes[cellIndex + 1] = true;
      }
    }
    // Do again for $ symbol
    cellsToVisit.push({index: boardState.board_state.indexOf("$"), dist: 0});
    mappedCellIndexes[boardState.board_state.indexOf("$")] = true;
    while (cellsToVisit.length > 0) {
      var cell = cellsToVisit[0];
      var cellIndex = cell.index;
      var cellDist = cell.dist;
      cellsToVisit = cellsToVisit.slice(1);
      // If wall or impassible, skip
      if (boardState.board_state[cellIndex] === "#" || (boardState.board_state[cellIndex] >= "A" && boardState.board_state[cellIndex] <= "Z")) {
        continue;
      }
      // If key, log key and skip
      if (boardState.board_state[cellIndex] >= "a" && boardState.board_state[cellIndex] <= "z") {
        keyMap[boardState.board_state[cellIndex]] = {"dist": cellDist, "robot": "$"};
        console.log("Found key " + boardState.board_state[cellIndex]);
        continue;
      }
      // Otherwise, for all four directions, if not in already mapped cells, add neighbor and marked as mapped
      if (cellIndex >= cols && !mappedCellIndexes.hasOwnProperty(cellIndex - cols)) { // Up
        cellsToVisit.push({index: cellIndex - cols, dist: cellDist + 1});
        mappedCellIndexes[cellIndex - cols] = true;
      }
      if (cellIndex < (rows-1)*cols && !mappedCellIndexes.hasOwnProperty(cellIndex + cols)) { // Down
        cellsToVisit.push({index: cellIndex + cols, dist: cellDist + 1});
        mappedCellIndexes[cellIndex + cols] = true;
      }
      if (cellIndex % cols > 0 && !mappedCellIndexes.hasOwnProperty(cellIndex - 1)) { // Left
        cellsToVisit.push({index: cellIndex - 1, dist: cellDist + 1});
        mappedCellIndexes[cellIndex - 1] = true;
      }
      if (cellIndex % cols < cols - 1 && !mappedCellIndexes.hasOwnProperty(cellIndex + 1)) { // Right
        cellsToVisit.push({index: cellIndex + 1, dist: cellDist + 1});
        mappedCellIndexes[cellIndex + 1] = true;
      }
    }
    // Do again for % symbol
    cellsToVisit.push({index: boardState.board_state.indexOf("%"), dist: 0});
    mappedCellIndexes[boardState.board_state.indexOf("%")] = true;
    while (cellsToVisit.length > 0) {
      var cell = cellsToVisit[0];
      var cellIndex = cell.index;
      var cellDist = cell.dist;
      cellsToVisit = cellsToVisit.slice(1);
      // If wall or impassible, skip
      if (boardState.board_state[cellIndex] === "#" || (boardState.board_state[cellIndex] >= "A" && boardState.board_state[cellIndex] <= "Z")) {
        continue;
      }
      // If key, log key and skip
      if (boardState.board_state[cellIndex] >= "a" && boardState.board_state[cellIndex] <= "z") {
        keyMap[boardState.board_state[cellIndex]] = {"dist": cellDist, "robot": "%"};
        console.log("Found key " + boardState.board_state[cellIndex]);
        continue;
      }
      // Otherwise, for all four directions, if not in already mapped cells, add neighbor and marked as mapped
      if (cellIndex >= cols && !mappedCellIndexes.hasOwnProperty(cellIndex - cols)) { // Up
        cellsToVisit.push({index: cellIndex - cols, dist: cellDist + 1});
        mappedCellIndexes[cellIndex - cols] = true;
      }
      if (cellIndex < (rows-1)*cols && !mappedCellIndexes.hasOwnProperty(cellIndex + cols)) { // Down
        cellsToVisit.push({index: cellIndex + cols, dist: cellDist + 1});
        mappedCellIndexes[cellIndex + cols] = true;
      }
      if (cellIndex % cols > 0 && !mappedCellIndexes.hasOwnProperty(cellIndex - 1)) { // Left
        cellsToVisit.push({index: cellIndex - 1, dist: cellDist + 1});
        mappedCellIndexes[cellIndex - 1] = true;
      }
      if (cellIndex % cols < cols - 1 && !mappedCellIndexes.hasOwnProperty(cellIndex + 1)) { // Right
        cellsToVisit.push({index: cellIndex + 1, dist: cellDist + 1});
        mappedCellIndexes[cellIndex + 1] = true;
      }
    }
    // Do again for ^ symbol
    cellsToVisit.push({index: boardState.board_state.indexOf("^"), dist: 0});
    mappedCellIndexes[boardState.board_state.indexOf("^")] = true;
    while (cellsToVisit.length > 0) {
      var cell = cellsToVisit[0];
      var cellIndex = cell.index;
      var cellDist = cell.dist;
      cellsToVisit = cellsToVisit.slice(1);
      // If wall or impassible, skip
      if (boardState.board_state[cellIndex] === "#" || (boardState.board_state[cellIndex] >= "A" && boardState.board_state[cellIndex] <= "Z")) {
        continue;
      }
      // If key, log key and skip
      if (boardState.board_state[cellIndex] >= "a" && boardState.board_state[cellIndex] <= "z") {
        keyMap[boardState.board_state[cellIndex]] = {"dist": cellDist, "robot": "^"};
        console.log("Found key " + boardState.board_state[cellIndex]);
        continue;
      }
      // Otherwise, for all four directions, if not in already mapped cells, add neighbor and marked as mapped
      if (cellIndex >= cols && !mappedCellIndexes.hasOwnProperty(cellIndex - cols)) { // Up
        cellsToVisit.push({index: cellIndex - cols, dist: cellDist + 1});
        mappedCellIndexes[cellIndex - cols] = true;
      }
      if (cellIndex < (rows-1)*cols && !mappedCellIndexes.hasOwnProperty(cellIndex + cols)) { // Down
        cellsToVisit.push({index: cellIndex + cols, dist: cellDist + 1});
        mappedCellIndexes[cellIndex + cols] = true;
      }
      if (cellIndex % cols > 0 && !mappedCellIndexes.hasOwnProperty(cellIndex - 1)) { // Left
        cellsToVisit.push({index: cellIndex - 1, dist: cellDist + 1});
        mappedCellIndexes[cellIndex - 1] = true;
      }
      if (cellIndex % cols < cols - 1 && !mappedCellIndexes.hasOwnProperty(cellIndex + 1)) { // Right
        cellsToVisit.push({index: cellIndex + 1, dist: cellDist + 1});
        mappedCellIndexes[cellIndex + 1] = true;
      }
    }
    
    // Final result is a completed keymap.
    if (Object.keys(keyMap) === 0) {
      continue; // Skip, no available keys
    }
    for (key in keyMap) {
      var tempBoardState = JSON.parse(JSON.stringify(boardState));
      // Navigate to key:
      tempBoardState.board_state = tempBoardState.board_state.replaceAt(tempBoardState.board_state.indexOf(keyMap[key].robot), ".");
      tempBoardState.board_state = tempBoardState.board_state.replaceAt(tempBoardState.board_state.indexOf(key), keyMap[key].robot);
      // Unlock door on map:
      tempBoardState.board_state = tempBoardState.board_state.replaceAt(tempBoardState.board_state.indexOf(key.toUpperCase()), ".");
      // Add +1 keys:
      tempBoardState.keys_gathered++;
      // Add steps:
      tempBoardState.steps_taken += Number(keyMap[key].dist);
      // Check if done:
      if (tempBoardState.keys_gathered === totalKeys) {
        best_steps = Math.min(best_steps, tempBoardState.steps_taken);
      } else {
        // If the same board state exists already, only keep the min steps one
        var foundBoardState = false;
        for (var i = 0; i < boardStates.length; i++) {
          if (boardStates[i].board_state === tempBoardState.board_state) {
            console.log("*** Found equal state!");
            boardStates[i].steps_taken = Math.min(boardStates[i].steps_taken, tempBoardState.steps_taken);
            foundBoardState = true;
          }
        }
        if (!foundBoardState) {
          boardStates.push(tempBoardState);
        }
      }
    }
  }
  
  console.log("done: " + best_steps);
}
String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

//day18(24, 5, 6, "#########################f.D.E.e.C.b.A.@.a.B.c.#######################.##d.....................#########################");
//day18(24, 5, 7, "#########################...............b.C.D.f##.#######################.....@.a.B.c.d.A.e.F.g#########################");
//day18(17, 9, 16, "##################i.G..c...e..H.p#########.#########j.A..b...f..D.o#########@#########k.E..a...g..B.n#########.#########l.F..d...h..C.m##################");
//day18(24, 6, 9, "#########################@..............ac.GI.b####d#e#f###################A#B#C###################g#h#i########################################");
day18(81, 81, 26, "##################################################################################...#.......#.....#.......#...#.........#.......#.......#..q............#...#...##.#.#.#.###.###.#.#.#####.#.#.#.#######.#####.#.###.###Y###.#######.#####I#.#.#.##.#.#.#...#.....#.#.....#.#.#...#...#...#.....#.....#.#.....#.......#...#.#...#.##.#.#####.#######.#####.#.#.#####.#.#.#.#.#####.#####.###.#######.###N#.#.#####.##.#....f#.....#.#.#.#...#.#...#...#...#.#...#...#...#...#.#.....#.#...#.#...#...##.#####.###.#.#.#.#.#.###.#####.###########.#####.#.#.###.#.###.###.###.###.#.####.....#...#.#.#.#...#...#.....#.#.......#...#...#.#.#.....#.#.#.......#.....#.F.######.###.###.#.###.###.#####.#.#.#####.#.###.#.#.#.#######.#.#############.###.##...#.#.#.#...#.....#.....#...#.#...#...#...#.#.#.#.......#.#.....#.......#.#a..##.#.#.#.#.#.###.#####.#####.###.#.###.#.#.#.#.#.#.#######.#.#.#.###.#####.###.####.#...#.#...#.#...#...#.....#...#.#...#.#.#...#.#.....#...#.#.#...#.....#.....#.##.#####.#####.#.###.###.#######.#.#.###.#######.#.#####.#.#.#####.#####.#######.##...#.........#.#...#.#.......#...#.#.#.#.....#...#...#.#.#...........#.#.......####.#########.#.#.###.#######.#.###.#.#.#.###.#####.#.#.###########.###.#.#####.##...#.....#...#.#.......#...#.#.#...#.#.#.#.....#...#...#...#.......#...#...#...##.#.#.###.#.###.#######.#.###.#.#.###.#.#.#####.#.#####.#.#.#.#######.#####.######.#.#...#.#.....#.#.......#...#.#.#.#...#...#.....#.....#.#.......#...#...#.....##.#####.#.###.###.#.#######.#####.#.#.###.#.#########.###.#########.###.#.#####.##.......#...#.....#.#.......#.....#...#.#.#.....#...#.#.#...#.....#.#...#.......##.#######.#.#######.#.#########.###.###.#.#####.#.#.#.#.###.#.###.#.#.#.#######.##...#...#.#.......#.#.#...L...#.#.#...#.#...#.#...#.#.....#.#.#.#.#.#.#...#...#.##.###.#.#####.###.#.#######.#.#.#.###.#.###.#.#####.#####.#.###.#.#.#####.#.#.####.#...#.....#...#.#.......#.#...#.......#.#.......#...#...#.#...#...#.....#.#...##.#.#######.###.#.#######.#.###########.#.#######.###.#.###.#.#.#####.#.###.###.##.#.#.#.....#...#...#.....#.........#...#.#...#.....#.#...#.#.#.....#.#.#...#.#.####.#.#.#########.###.###########.#.###.#.#.#.#.#####.###.#.#####.#.#.###.###.#.##...#...J.#.......#...#.........#.#...#.#...#...#.....#.#.#.#.....#...#...#s..#.##.#######.#.#####S#.#######.###.#.###.###.#######.#####.#.#.#.#####.###.#####.#.##.#.....#...#...#.#.#.....#.#.#.#...#...#...#.#...#.......#.#...#...#...#.....#.##.#T###.#####.#.###.###.#.#.#.#.#.#####.###.#.#.#########.#.###.#####.###.#####.##.#.#...#.....#.#...#...#...#...#.#...#.#.#.#.#.#.......#.#...#.......#.....#..w##.#.#.###.#####.#.###.#######.#####.#.#.#.#.#.#.#.#####.#####.#.###########.#.#.##...#.#.B.#...#.#.#.#...#.#...#.....#.#.#.#.#.#.#.#r..#.....#.#.#...#.......#.#.##.###.#.###.#.#.#.#.#.#.#.#.###.#####.#.#.#.#.#.#.#.#######.#.#.#.#.#.###.###.#.##...#.#...#.#.#...#...#.#.#.#.......#...#.#...#...#.......#.#.#.#.#.#.#...#...#.####.#.###.###.#########.#.#.#.#####.#####.###.#####.#####.#.#.#.#.#.#.#####.###.##...#...#...#.....W...#.#.#.#c#...#.....#...#.....#.#.....#...#...#...#...#...#.##.###.#####.###.#####.#.#.#.###.#.#####.#.#.#####.###.###.#############.#.###.#.##o..#...........#.......#.......#......@#$#...........#.................#.....#.###################################################################################...#.....#...#.........#.............#%#^........#.....#............j....#...#.##.#.#P###.###.#.###.###.#.###.#######.#.#.#####.###.#.#.###.#.###.#######.#.#.#.##.#...#.#...#.#.#.#...#.#...#.#.....#.#.#.#...#.....#.#...#.#.#...#..t..#...#...##G#####.###.#.#.#.###.#.#.###.#.#.#.#.#.#.###.#######.###C###.#.###.###.###.######.#...#...#.#.#.....#.#.#.#...#.#.#.#.#.#...#.....#...#.#...#.#.#...#...#...#...##.#.###.#.#.#.#####.#.#.###.#####.###.#.###.#.#####.###.###.#.###.###.#######.#.##.#.....#.#.#...#...#.#...#.....#...#.#.#.....#...#.#.....#.#.......#.#.......#.##.#######.#.#.###.###.###.#####.###.#.#.#.#####.#.#.#.#####.#.#####.#.#.#######.##.......#...#...#.#.#.#.#.....#...#...#.#...#...#.#.#.....#.#.#...#.#...#.......##.#####.#.#####.#.#.#.#.#####.###.#.###.#.###.###.#.#####.#.###.#.#######.#####.##.#...#.#.....#...#.#.#.....#.....#.#...#.#...#.#.#.....#...#...#.........#.....##.#.#.#.#####.#.###.#.#####.#######.#.#.#.#.###.#.#.###.#.###.#############.######...#.#.#.....#.....#.....#...#.....#.#.#.#.#.....#.#.#.#.#...#...#.O.#...#b..#.######.#.###.###.#########.###.#.#####.#.#.#.#.#####.#.#.#.#.###.#.###.#.#.###.#.##...#.#...#...#.#.........#...#...#...#.#.#.#...#.....#.#...#...#..d#.#.#...#.#.##.###.###.###.#.#.#########.#.###.#.###.###.###.#######.###.#.#####.#.#.#.###.#.##.#.X.#.#.#...#.#...#.#.....#...#.#...#.#...#.....#.....#...#.#...#.#...#...#...##.#.###.#.#.###.###.#.#.###.###.#.#.#.#.#.#.#####.#.#####.###.###.#.#######.###.##.......#.#.#.#...#.#...#.#.#...#.#.#.#.#.#.#...#.#.#...#...#...#k#.......#...#.##.#####.#.#.#.#.###.###.#.#.#####.#.#.###.###.#.#.#.#.#.#######.#.#######.#.#.#.##.#...#.#.#.#...#...#.#...#.#...#.#.#...#.#...#.#...#.#.....U.#.#.....#...#.#...##.#.#.###.#.#.###.#.#.###.#.#.#.#.#####.#.#.###.###.#.#########.#.#####.##########.#.#.....#.#.#...#.#.#...#...#...#...#.#.....#...#.#...#......h#.......#.......##.#.#######.###.###.#.#######.#####.#.#.#########.#.###.###.#####.#######.#####.##.#.#...#.....#.#...#u......#...#...#.R.#.......#.#.#...#...#...#........x#...#.##.#.#.#.#####.#.#.#########.###.#.#.###.#.#####.#.###.###.###.#Z###########.#.#.##.#...#...#.#...#...#...#.E.#.#.#.#.#...#...#...#...#.#.......#.#.....#....g#.#.##K#######.#.#####.###.#.#.###.#.#.#.#.#####.#.#####.#.#####.###.#.###.###.#####.##.#z....#.#.......#..v#.#...#.#.#.#.#...#...#.....#.#.#..e#...#.#...#...#.......##.#.###.#.#########.###.###.#.#.#.#.###.#.#######.#.#.#.#.###.#.#.#####.#.########.#.#...#.......#...#.#.....#.#.#.#.#...#...#.......#...#...#.#...#...M.#.......##.###H#.#######.#.###.#######.#.###.#.###.#.###############V#######.###########.##...#.#.#.....#.#.....#.........#...#l#.#.#...#.........Q.#.........#.......#...####.#.###.#.###.#####.#.#####.###.###.#.#####.#.#######.#############.#####.#.####.#.#.....#.#.....#.#.#.#...#...#.#.....#.....#.#...#...#.......#.........#.#..p##.#.#######.#.###.#.#.###.#.###.#.#####.#.###.#.###.#.###.###.#.#.#######.#.###.##.#...D.....#.#.....#m....#.#...#...#.#.#y#...#.#...#n..#...#i#.#.#.......#.#...##.#########.#.#############.#.#####.#.#.#.#####.#.#.###.###.#.###.#.#########.####...........#...............#.......#...#.........#...#.....#.....#.......A.....##################################################################################");