const possibleValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', 'B']

class Cell {
  constructor(state, value) {
    this.state = state;
    this.value = value;
    this.neighbours = [];
  }

  setNeighbours(neighbours) {
    this.neighbours = neighbours;
  }

  getValue() {
    return this.value;
  }

  setValue(v) {
    if (this.isValueValid(v)) {
      this.value = v;
    } else {
      console.log('wrong value')
    }
  }

  isBomb() {
    return this.value === 'B';
  }

  isValueValid(v) {
    return possibleValues.filter(e => e === v).length > 0;
  }

  hasBombInNeighbours() {
    for (let i = 0; i < this.neighbours.length; i++) {
      if (this.neighbours[i].isBomb()) {
        return true;
      }
    }
    return false;
  }

  openAllNeighbours() {
    this.neighbours.forEach(n => {
      if (n.state === 'closed') {
        n.openCell();
      }
    });
  }

  addView(view) {
    this.view = view;

    view.addEventListener('mousedown', (e) => {
        if (e.button === 0) {
          if (this.state === 'closed') {
            if (this.isBomb()) {
              this.state = 'open';
              this.view.className = 'cell-bomb';
            } else {
              this.openCell();
            }
          }
        } else if (e.button === 2) {
          if (this.state === 'closed') {
            this.state = 'marked';
            this.view.className = 'cell-marked';
          } else if (this.state === 'marked') {
            this.view.className = 'cell';
            this.state = 'closed';
          }
        }
      }
    )
  }

  openCell() {
    this.state = 'open';
    this.view.className = 'cell-open';
    if (!this.hasBombInNeighbours()) {
      this.openAllNeighbours();
    }
  }
}
