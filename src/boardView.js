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
          let text = document.createTextNode(`${cell.value}( ${cell.state})`);
          
          let cellView = document.createElement("div");
          cellView.appendChild(text);
          cellView.className = 'cell'
          
          this.container.appendChild(cellView);
          cell.addView(cellView);
        }
    }
  }
}
