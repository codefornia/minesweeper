const possibleValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', 'B']
class Cell {
  constructor(state, value) {
    this.state = state;
    this.value = value;
  }
  
  getValue() {
    return this.value;
  }
  
  setValue(v) {
    if(this.isValueValid(v)) {
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
}
