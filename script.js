let displayValue = '0';
const default_operators = ['+' , '-', '*','/']
flag = true;
let currentfontsize = 4;
/* Function to update the display on each turn */
function updatedisplay() {
    document.getElementById('display').value = displayValue;
    if(displayValue.length >= 18){
        currentfontsize-= 0.175;
        document.getElementById('display').style.fontSize = currentfontsize + 'rem';
    }
}

/* Function to display the number button pressed by the user on inputbox*/
function showvalue(value) {    
    if (displayValue == '0') {
        displayValue = value;
    }
    else{
        displayValue += value;
        
    }
    updatedisplay();
}

/* Function to read the value in input box*/
function readvalue(){
    displayValue= document.getElementById('display').value;
    
}
function braces() {
    if (flag) {
        setoperator("(")
        flag = false;    
    }
    else{
        setoperator(")")
        flag = true;
    }
}
/* Function to display the operator on user screen*/
function setoperator(operator) {
    if (displayValue == '0') {
        displayValue = `${operator}`;
    }
    else{
        displayValue += `${operator}`;
    }
    updatedisplay();
}

/* Function to clear the values of input screen*/
function cleardisplay() {
    displayValue = 0;
    currentfontsize = 4;    
    updatedisplay();
}

/* Function to perform calculation each time user presses = */
function calculateresult() {
    const result = parseFloat(evaluateexpression(displayValue));
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
            values.push(parseFloat(ones_place, 10));
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
            return parseFloat(a / b, 10);
    }
}
function changefontsize() {
    var myInput =  document.getElementById('display');
    if(isOverflown(myInput)) {
      while (isOverflown(myInput)){
      currentfontsize--;
      myInput.style.fontSize = currentfontsize + 'px';
      }
    }else {
      currentfontsize = 13;
      myInput.style.fontSize = currentfontsize + 'px';
      while (isOverflown(myInput)){
      currentfontsize--;
      myInput.style.fontSize = currentfontsize + 'px';
      }
    }	
  }
  
  function isOverflown(element) {
      return element.scrollWidth > element.clientWidth;
  }
window.onload = updatedisplay();
