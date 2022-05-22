class BoardView {
  constructor (board, config) {
    this.board = board;
    this.config = config;
  }
  
  draw(){
    this.container = document.getElementById("container");
    this.container.style.gridTemplateColumns = `repeat(${this.config.width}, 1fr)`;
    
    let matrix = this.board.getMatrix();
    
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length ; j++) {
          let cell = matrix[i][j];
          let text = document.createTextNode(cell.value + " ");
          
          let cellCont = document.createElement("div");
          cellCont.appendChild(text);
          cellCont.className = 'cell'
          this.container.appendChild(cellCont);
          console.log(cell);
          cell.addView(cellCont);
          //cell.addView(cellCont);        
        }
    }
  }
}
