class Board {
  constructor(config) {
    this.config = config;
  }
  
  getMatrix() {
    return this.matrix;
  }

  generate() {
    this.initEmpty();
    this.fillWithCells();
    this.generateBombs();
    this.calculateNumbers();
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
        row[j] = new Cell('closed', 0)
      }
    }
  }

  generateBombs() {
    let bCount = this.config.bombsCount;
    while (bCount > 0) {
      let rRow = this.generateRandomInteger(this.config.height - 1);
      let rCol = this.generateRandomInteger(this.config.width - 1);
      let rCell = this.matrix[rRow][rCol];
      if (!rCell.isBomb()) {
        rCell.setValue('B');
        bCount--;
      }
    }
  }

  calculateNumbers() {
    for (let i = 0; i < this.matrix.length; i++) {
      let row = this.matrix[i];
      for (let j = 0; j < row.length; j++) {
        let bombsCount = 0;
        let cCell = row[j];
        if (cCell.isBomb()) {
          continue;
        }
        this.getAllNeighbours(i,j).forEach(el => {
          if (el.isBomb()) {
            bombsCount++;
          }
        })
        cCell.setValue(bombsCount + "");
      }
    }
  }

  doesCellExist(rowIndex, colIndex) {
    return rowIndex >= 0 && rowIndex < this.config.height && colIndex >= 0 && colIndex < this.config.width;
  }

  generateRandomInteger(max) {
    return Math.floor(Math.random() * max) + 1;
  }

  getAllNeighbours(rowIndex, colIndex) {
    let neighbours = [];
    //top cell
    if (this.doesCellExist(rowIndex - 1, colIndex)) {
      neighbours.push(this.matrix[rowIndex - 1][colIndex]);
    }
    //top right cell
    if (this.doesCellExist(rowIndex - 1, colIndex + 1)) {
      neighbours.push(this.matrix[rowIndex - 1][colIndex + 1]);
    }
    //right cell
    if (this.doesCellExist(rowIndex, colIndex + 1)) {
      neighbours.push(this.matrix[rowIndex][colIndex + 1]);
    }
    //right bottom cell
    if (this.doesCellExist(rowIndex + 1, colIndex + 1)) {
      neighbours.push(this.matrix[rowIndex + 1][colIndex + 1]);
    }
    //bottom cell
    if (this.doesCellExist(rowIndex + 1, colIndex)) {
      neighbours.push(this.matrix[rowIndex + 1][colIndex]);
    }
    //left bottom cell
    if (this.doesCellExist(rowIndex + 1, colIndex - 1)) {
      neighbours.push(this.matrix[rowIndex + 1][colIndex - 1]);
    }
    //left cell
    if (this.doesCellExist(rowIndex, colIndex - 1)) {
      neighbours.push(this.matrix[rowIndex][colIndex - 1]);
    }
    //left top cell
    if (this.doesCellExist(rowIndex - 1, colIndex - 1)) {
      neighbours.push(this.matrix[rowIndex - 1][colIndex - 1]);
    }
    return neighbours;
  }
}
