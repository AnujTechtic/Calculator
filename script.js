let displayValue = '';

function updatedisplay() {
    document.getElementById('display').value = displayValue;
}

function showvalue(value) {
    displayValue += value;
    updatedisplay();
}

function readvalue(){
    displayValue= document.getElementById('display').value;
}

function setoperator(operator) {
    displayValue += `${operator}`;
    updatedisplay();
}

function cleardisplay() {
    displayValue = '';
    updatedisplay();
}

function calculateresult() {
    const result = evaluateexpression(displayValue);
    displayValue = result;
    updatedisplay();
}

function evaluateexpression(expression) {
    const tokens = expression.split('');
    let resul = parseInt(tokens[0]);

    for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const operand = parseInt(tokens[i + 1]);
        switch (operator) {
            case '+':
                resul += operand;
                break;
            case '-':
                resul -= operand;
                break;
            case '*':
                resul *= operand;
                break;
            case '/':
                    resul /= operand;
                break;
            default:
                continue;
        }
    }
    return resul;
}