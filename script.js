const numberButton = document.querySelectorAll('[operand]')
const operatorButton = document.querySelectorAll('[operator]')
const deleteButton = document.querySelector('[delete]')
const clearButton = document.querySelector('[all-clear]')
const equalButton = document.querySelector('[equal]')
const previousInputElement = document.querySelector('[previous-input]')
const currentInputElement = document.querySelector('[current-input]')
const comma = document.getElementById('comma')
const indoLanguage = document.getElementById('indo')
const englishLanguage = document.getElementById('english')

class Calculator {
    constructor(previousInputElement, currentInputElement) {
        this.previousInputElement = previousInputElement
        this.currentInputElement = currentInputElement
        this.clear()
        this.updateDisplay()
    }

    setLanguage(){
        
    }


    clear() {
        this.previousInput = ''
        this.currentInput = ''
        this.operation = ''
    }

    delete() {
        this.currentInput = this.currentInput.slice(0, -1)
    }


    appendNumber(number) {
        if (number === comma.innerText && this.currentInput.includes(comma.innerText)) return
        this.currentInput += number
    }

    appendOperation(operation) {
        if (this.currentInput === '') return
        if (this.previousInput != '') {
            this.compute()
        }
        this.operation = operation
        this.previousInput = this.currentInput
        this.currentInput = ''
    }

    updateDisplay() {
        this.previousInputElement.innerText = `${this.previousInput} ${this.operation}`
        this.currentInputElement.innerText = this.currentInput
        // this.previousInputElement.innerText = `${this.numberDisplay(this.previousInput)} ${this.operation}`
        // this.currentInputElement.innerText = this.numberDisplay(this.currentInput)
    }

    numberDisplay(number , bahasa = 'en-US') {
        // const numberStr = number.toString()
        // const integerDigits = parseFloat(numberStr.split('.')[0])
        // const decimalDigits = numberStr.split('.')[1]
        // let integerDisplay
        // if(isNaN(integerDigits)){
        //     integerDisplay = ''
        // } else {
        //     integerDisplay = integerDigits.toLocaleString(bahasa)
        // }
        // if (decimalDigits != null) {
        //     return `${integerDisplay}.${decimalDigits}`
        // } else {
        //     return integerDisplay
        // }
    }

    compute() {
        const previousNumber = parseFloat(this.previousInput)
        const currentNumber = parseFloat(this.currentInput)
        if (isNaN(previousNumber) || isNaN(currentNumber)) return
        switch (this.operation) {
            case '+': this.currentInput = previousNumber + currentNumber
                break
            case '-': this.currentInput = previousNumber - currentNumber
                break
            case '*': this.currentInput = previousNumber * currentNumber
                break
            case '/': this.currentInput = previousNumber / currentNumber
                break
            case '%': this.currentInput = previousNumber % currentNumber
                break
            default: return
        }
        this.previousInput = ''
        this.operation = ''
    }
}
const calculator = new Calculator(previousInputElement, currentInputElement)

numberButton.forEach(number => {
    number.addEventListener('click', () => {
        calculator.appendNumber(number.innerText)
        calculator.updateDisplay()
    })
})
operatorButton.forEach(operator => {
    operator.addEventListener('click', () => {
        calculator.appendOperation(operator.innerText)
        calculator.updateDisplay()
    })
})
clearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})
equalButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})

