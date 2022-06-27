/*
A JavaScript class is not an object.
It is a template for JavaScript objects.
*/
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }
  //when we hit clear button these values will be defaulted.
  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }
    //selects number when we click a button
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return //this will stop period from appending multiple times
    this.currentOperand = this.currentOperand.toString() + number.toString() //because JS will try to add numbers
  }
    //selects the operation when we click
  chooseOperation(operation) {
    if (this.currentOperand === '') return //stops from entering mutliple operands
    //if previous operand is not empty string do the calculation and append operand
    if (this.previousOperand !== '') {
      this.compute()  
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }


  //to add commas after if a number becomes "longer" 
  getDisplayNumber(number) {
    const stringNumber = number.toString() // because decimal numbers like 0.2 are not appending
    const integerDigits = parseFloat(stringNumber.split('.')[0])//the number (now string) will be split and added to array
    const decimalDigits = stringNumber.split('.')[1] //appending number after decimal place
    let integerDisplay
    if (isNaN(integerDigits)) { 
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 /*there can be 0 decimal places after a decimal*/})
    }
        //check if we have decimal digits
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  //updatesDisplay elements when called
  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` //$ is document.getelementbyid
    } else {
      this.previousOperandTextElement.innerText = '' //to clear previous operand after calculation
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

//adding event listener for buttons and call updateDisplay()
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})



operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})
