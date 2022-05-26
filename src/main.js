function startGame() {
  const cfg = new Config(15, 10, 15);
  let board = new Board(cfg);
  board.generate();
  let boardView = new BoardView(board, cfg);
  boardView.draw();
}
