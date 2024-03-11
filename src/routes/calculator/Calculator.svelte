<script>
// @ts-nocheck

    let displayValue = "0";
    let storedValue = "0";
    let operator = "";
    // @ts-ignore
    // @ts-ignore
    let hasResult = false;
    let isClear = true

    // @ts-ignore
    function handleInputNumber(number) {
    if (displayValue === "0" || hasResult) {
        displayValue = String(number);
        hasResult = false; // Reset the flag as we're now starting a new number entry
    } else {
        displayValue += String(number);
    }
}




    // @ts-ignore
    function handleSelectOperator(selectedOperator) {
    if (operator && displayValue !== "0") {
        // If there's an existing operation pending, calculate it first
        calculateResult();
    }
    
    operator = selectedOperator;
    storedValue = displayValue; // Store the current value to use in the calculation
    hasResult = true; // Set this flag to true indicating the next number should start fresh
}

    function calculateResult() {
        let result = 0;
        switch (operator) {
            case "+":
                // @ts-ignore
                result = parseFloat(storedValue) + parseFloat(displayValue);
                displayValue = String(result);
                break;
            case "-":
                // @ts-ignore
                result = parseFloat(storedValue) - parseFloat(displayValue);
                displayValue = String(result);
                break;
            case "*":
                // @ts-ignore
                result = parseFloat(storedValue) * parseFloat(displayValue);
                displayValue= String(result);
                break;
            case "/":
                // @ts-ignore
                if (parseFloat(displayValue) === 0) {
                    // @ts-ignore
                    displayValue = "Cannot divide by zero";
                    setTimeout(() => {
                        clearCalculator();
                    }, 2000); // Reset after 2 seconds
                } else {
                    // @ts-ignore
                    result = parseFloat(storedValue) / parseFloat(displayValue);
                    displayValue = String(result)
                }
                break;
        }
        hasResult = true;
        return result;
    }

    function clearCalculator() {
    displayValue = "0";
    storedValue = "0";
    operator = "";
    isClear = true; // Ensure the clear button resets to "AC" after clearing
    }

    function handleDecimal() {
        // @ts-ignore
        if (!displayValue.includes(".")) {
            // @ts-ignore
            displayValue += ".";
        }
    }

    function handlePositiveNegative(){
        // @ts-ignore
        displayValue = String(parseFloat(displayValue) * -1);
    }

    function deleteLastInput() {
    // @ts-ignore
    if (typeof displayValue === 'string' && displayValue.length > 1) {
        // Remove the last character from the displayValue
        // @ts-ignore
        displayValue = displayValue.slice(0, -1);
    } else {
        // If displayValue is a single digit or not a string, reset it to 0
        // @ts-ignore
        displayValue = '0';
    }
}


    function handleEquals() {
        calculateResult();
        operator = "";
    }

    function handlePercentage() {
        // @ts-ignore
        displayValue = parseFloat(displayValue) / 100;
    }


    
</script>

<style>
    .calculator-grid {
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(4, 1fr);
        max-width: 400px;
        margin: auto;
        border: 2px solid #000;
    }

    .button{
        padding: 20px;
        font-size: 2em;
        cursor: pointer;
        border: 1px solid #000;
    }

    .output {
        grid-column: span 4;
        background-color: #f0f0f0;
        padding: 20px;
        text-align: right;
        font-size: 2rem;
    }

    .zero-button {
    grid-column: span 2; 
}

    .highlighted {
    border: 3px solid black; 
}
</style>

<div class="calculator-grid">
    <div class="output" style="grid-column: span 4;">
        <div>{displayValue}</div>
    </div>
    {#if displayValue !== "0"}
        <button class="button" on:click={() => deleteLastInput()}>C</button>
    {:else}
        <button class="button" on:click={() => clearCalculator()}>AC</button>
    {/if}
   
    
    <button class = "button" on:click={() => handlePositiveNegative()}>+/-</button>
    <button class = "button" on:click={() => handlePercentage()}>%</button>
    <button class="button {operator === '/' ? 'highlighted' : ''}" on:click={() => handleSelectOperator('/')}>÷</button>
    <button class="button" on:click={() => handleInputNumber(7)}>7</button>
    <button class="button" on:click={() => handleInputNumber(8)}>8</button>
    <button class="button" on:click={() => handleInputNumber(9)}>9</button>
    
    
    <button class="button {operator === '*' ? 'highlighted' : ''}" on:click={() => handleSelectOperator('*')}>*</button>
    <button class="button" on:click={() => handleInputNumber(4)}>4</button>
    <button class="button" on:click={() => handleInputNumber(5)}>5</button>
    <button class="button" on:click={() => handleInputNumber(6)}>6</button>
    <button class="button {operator === '-' ? 'highlighted' : ''}" on:click={() => handleSelectOperator('-')}>-</button>
    <button class="button" on:click={() => handleInputNumber(1)}>1</button>
    <button class="button" on:click={() => handleInputNumber(2)}>2</button>
    <button class="button" on:click={() => handleInputNumber(3)}>3</button>
    <button class="button {operator === '+' ? 'highlighted' : ''}" on:click={() => handleSelectOperator('+')}>+</button>
    <button class="button zero-button" on:click={() => handleInputNumber(0)}>0</button>
    <button class="button" on:click={() => handleDecimal()}>.</button>
    <button class="button" on:click={() => handleEquals()}>=</button>
</div>