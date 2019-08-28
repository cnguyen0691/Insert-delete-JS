// Operation Types
const INSERT = 'INSERT' // appends text
const DELETE = 'DELETE' // removes one character from the end
const UNDO = 'UNDO' // reverses the last operation
const REDO = 'REDO' // applies the previously undone operation


class TextEditor {
  constructor() {
    this.text = '';
    this.memoizedValues = [this.text];
    this.pointer = 0;
  }

  input(o) {
    if (o.text) {
      this.text += o.text;
    }

    switch (o.type) {
      case INSERT:
        return this.insert();
      case DELETE:
        return this.deleteText();
      case UNDO:
        return this.undo();
      case REDO:
        return this.redo();
      default:
        break;
    }
    // operation { type: string, text: string }
    // type - will match one of the Operation Types
    // text - is used for the INSERT operation
  }

  insert() {
    this.memoizedValues.push(this.text);
    this.pointer = this.memoizedValues.length - 1;
    return this.text;
  }

  deleteText() {
    this.text = this.text.slice(0, -1);
    this.memoizedValues.push(this.text);
    this.pointer = this.memoizedValues.length - 1;
  }

  undo() {
    const index = this.memoizedValues.length - (this.pointer - 1);
    this.text = this.memoizedValues.slice(-index)[0];
    this.pointer--;
  }

  redo() {
    const index = this.memoizedValues.length - (this.pointer + 1);
    this.text = this.memoizedValues.slice(-index)[0];
    this.pointer++;
  }

  print() {
    // should return a string
    console.log(this.text);
    return this.text;
  }
}
const textEditor = new TextEditor();
const operations = ([{ type: INSERT, text: 'hello world' }, { type: DELETE }, { type: DELETE }, { type: UNDO }, { type: REDO }, { type: DELETE }, { type: UNDO }]);
operations.forEach(operation => textEditor.input(operation));
textEditor.print();


// DON'T EDIT THIS SOLUTION FUNCTION
const solution = operations => {
  const parseOperations = operations => JSON.parse(operations.replace('"', '"'));

  const textEditor = new TextEditor();

  parseOperations(operations).forEach(operation => textEditor.input(operation));
  return textEditor.print();
};