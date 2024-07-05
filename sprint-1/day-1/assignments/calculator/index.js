// Import the crypto module
const crypto = require('crypto');

// Get the command line arguments
const args = process.argv.slice(2);
console.log(args);


// Function to perform the operations
function performOperation(operation, operands) {
    switch (operation) {
        case 'add':
            return operands.reduce((acc, num) => acc + num, 0);
        case 'sub':
            return operands.reduce((acc, num) => acc - num);
        case 'mult':
            return operands.reduce((acc, num) => acc * num, 1);
        case 'divide':
            return operands.reduce((acc, num) => acc / num);
        case 'sin':
            return Math.sin(operands[0]);
        case 'cos':
            return Math.cos(operands[0]);
        case 'tan':
            return Math.tan(operands[0]);
        case 'random':
            if (operands.length === 0) {
                return 'Provide length for random number generation.';
            } else {
                return crypto.randomBytes(operands[0]).toString('hex');
            }
        default:
            return 'Invalid operation';
    }
}

// Ensure we have at least an operation and one operand
if (args.length < 1) {
    console.log('Invalid operation');
} else {
    const operation = args[0];
    const operands = args.slice(1).map(arg => parseFloat(arg));

    // Validate operands for the random operation
    if (operation === 'random' && operands.some(isNaN)) {
        console.log('Invalid length for random number generation');
    } else {
        // Perform the operation and log the result
        const result = performOperation(operation, operands);
        console.log(result);
    }
}
