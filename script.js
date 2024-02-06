let displayValue = '';
const default_operators = ['+' , '-', '*','/']

/* Function to update the display on each turn */
function updatedisplay() {
    document.getElementById('display').value = displayValue;
}

/* Function to display the number button pressed by the user on inputbox*/
function showvalue(value) {
    displayValue += value;
    updatedisplay();
}

/* Function to read the value in input box*/
function readvalue(){
    displayValue= document.getElementById('display').value;
}

/* Function to display the operator on user screen*/
function setoperator(operator) {
    displayValue += `${operator}`;
    updatedisplay();
}

/* Function to clear the values of input screen*/
function cleardisplay() {
    displayValue = '';
    updatedisplay();
}

/* Function to perform calculation each time user presses = */
function calculateresult() {
    const result = evaluateexpression(displayValue);
    displayValue = result;
    updatedisplay();
}

/* Function to evaluate the Expression */
function evaluateexpression(expression) {
    const tokens = expression.split(''); // Convert the string of expression into a list
    let values =[]; // Stack to store the numbers
    let operators = []; // Stack to store the operator 
    for (let i = 0; i < tokens.length; i ++) { // iterating the value of each character in the string
        if (tokens[i] == ' ') { // Whitespace condition
            continue;
        }
        if (tokens[i] >= '0' && tokens[i] <= '9') { //Numbers Condition
            let ones_place = "";
            while (i < tokens.length && tokens[i] >= '0' && tokens[i] <= '9') { 
                ones_place = ones_place + tokens[i++];
            }
            values.push(parseInt(ones_place, 10));
            i--;
        }
        else if (tokens[i] == '(') {
            operators.push(tokens[i]);
        }
        else if (tokens[i] == ')') {
            while (operators[operators.length - 1] != '(') {
            values.push(applyOp(operators.pop(),values.pop(),values.pop()));
            }
            operators.pop();
        }
        else if (default_operators.includes(tokens[i])) {                    
            while (operators.length > 0 && hasPrecedence(tokens[i], operators[operators.length - 1])) {
                values.push(applyOp(operators.pop(),values.pop(),values.pop()));
            }
                operators.push(tokens[i]);
        }
    }
    while (operators.length > 0) {
        values.push(applyOp(operators.pop(),values.pop(),values.pop()));
    }
    return values.pop();
}

function hasPrecedence(operator1, operator2){
    if (operator2 == '(' || operator2 == ')') {
        return false        
    }
    if((operator1 == '*'|| operator1 == '/') || (operator1 == '*' || operator1 == '-')){
        return false
    }
    else{
        return true
    }
}

function applyOp(op, b, a){
    switch (op){
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b == 0)
            {
                return "Error"
            }
            return parseInt(a / b, 10);
    }
}
