document.addEventListener('DOMContentLoaded', () => {
  const display = document.querySelector('.value');
  const buttons = Array.from(document.querySelectorAll('.button'));
  let currentInput = '';
  let previousInput = '';
  let bracketOpen = 0;

  function updateDisplay(value) {
    display.textContent = value;
  }

  function handleButtonClick(button) {
    const buttonValue = button.textContent;

    if (button.classList.contains('number')) {
      currentInput += buttonValue;
      updateDisplay(currentInput);
    } else if (button.classList.contains('decimal')) {
      if (!currentInput.includes('.')) {
        currentInput += buttonValue;
        updateDisplay(currentInput);
      }
    } else if (button.classList.contains('operator')) {
      if (currentInput) {
        previousInput = previousInput ? `${previousInput} ${currentInput}` : currentInput;
        currentInput = '';
      }
    } else if (button.classList.contains('equal')) {
      if (previousInput && currentInput) {
        previousInput = `${previousInput} ${currentInput}`;
        const result = calculate(previousInput);
        updateDisplay(result);
        currentInput = result;
        previousInput = '';
        
        window.location.href = 'https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.youtube.com/watch%3Fv%3DxvFZjo5PgG0&ved=2ahUKEwi_jeK8roiIAxWu_aACHV2RBg0QtwJ6BAgPEAI&usg=AOvVaw1bR_FN-SnfIGtKD3fjAA5P';
      }
    } else if (button.classList.contains('ac')) {
      currentInput = '';
      previousInput = '';
      bracketOpen = 0;
      updateDisplay('0');
    } else if (button.classList.contains('pm')) {
      currentInput = currentInput.startsWith('-') ? currentInput.slice(1) : `-${currentInput}`;
      updateDisplay(currentInput);
    } else if (button.classList.contains('percent')) {
      if (currentInput) {
        currentInput = String(parseFloat(currentInput) / 100);
        updateDisplay(currentInput);
      }
    } else if (button.classList.contains('bracket')) {
      handleBracket(buttonValue);
    }
  }

  function handleBracket(bracket) {
    if (bracket === '(') {
      currentInput += bracket;
      bracketOpen++;
    } else if (bracket === ')') {
      if (bracketOpen > 0) {
        currentInput += bracket;
        bracketOpen--;
      }
    }
    updateDisplay(currentInput);
  }

  function calculate(expression) {
    try {
      const sanitizedExpression = expression.replace(/×/g, '*').replace(/÷/g, '/');
      return new Function('return ' + sanitizedExpression)();
    } catch (e) {
      return 'Error';
    }
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button));
  });
});
