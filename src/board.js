class Board {
  constructor(config) {
    this.config = config;
  }
  generate() {
    this.initEmpty();
    this.fillWithCells();
    this.generateBombs();
    this.calculateNumbers();
    console.log(this.matrix);
  }
  initEmpty() {
    this.matrix = new Array(this.config.height);
    for (let i = 0; i < this.matrix.length; i++) {
      this.matrix[i] = new Array(this.config.width);
    }
  }
  fillWithCells() {
    for (let i = 0; i < this.matrix.length; i++) {
      let row = this.matrix[i];
      for (let j = 0; j < row.length; j++) {
        row[j] = new Cell('closed',0)
      }
    }
  }
  generateBombs() {
    let bCount = this.config.bombsCount
    while (bCount > 0) {
      let rRow = this.generateRandomInteger(this.config.height-1);
      let rCol = this.generateRandomInteger(this.config.width-1);
      let rCell = this.matrix[rRow][rCol];
      if (!rCell.isBomb()){
        rCell.setValue('B');
        bCount--;
      }
    }
  }
  
  calculateNumbers() {
    for (let i = 0; i < this.matrix.length; i++) {
      let row = this.matrix[i];
      for (let j = 0; j < row.length; j++) {
        //TODO:: Dorogaya dodelay)
        let foundBombs = 0;
        let cCell = row[j];
        if(cCell.isBomb()) {
          continue;
        }
        //top cell
        if(row[i-1] && this.matrix[i-1][j]) {
          let topCell = this.matrix[i - 1][j];
          if (topCell.isBomb()) {
            ++foundBombs;
          }
        }
        //top left cell
          
          cCell.setValue(foundBombs+"");
      }
    }
  }
  
  generateRandomInteger(max) {
    return Math.floor(Math.random() * max) + 1;
  }
}
