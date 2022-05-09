function startGame () {
  const cfg = new Config(5,10,15);
  console.log(cfg);
  let board = new Board(cfg);
  board.generate();
}
