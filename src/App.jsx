import { useState } from 'react';
import './App.css';

function Calculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  function evaluate(expression) {
    let stack = [];
    let num = 0;
    let sign = '+';

    for (let i = 0; i < expression.length; i++) {
      let ch = expression[i];

      if (ch >= '0' && ch <= '9') {
        num = num * 10 + Number(ch);
      }

      if (
        ch === '+' ||
        ch === '-' ||
        ch === '*' ||
        ch === '/' ||
        i === expression.length - 1
      ) {
        switch (sign) {
          case '+':
            stack.push(num);
            break;

          case '-':
            stack.push(-num);
            break;

          case '*':
            stack.push(stack.pop() * num);
            break;

          case '/':
            stack.push(stack.pop() / num);
            break;
        }

        sign = ch;
        num = 0;
      }
    }

    return stack.reduce((sum, val) => sum + val, 0);
  }

  const buttons = [
    '7',
    '8',
    '9',
    '+',
    '4',
    '5',
    '6',
    '-',
    '1',
    '2',
    '3',
    '*',
    'C',
    '0',
    '=',
    '/',
  ];

  const handleClick = (value) => {
    if (value === 'C') {
      setExpression('');
      setResult('');
      return;
    }

    if (value === '=') {
      if (expression === '') {
        setResult('Error');
        return;
      }

      try {
        const ans = evaluate(expression);
        setResult(ans.toString());
      } catch {
        setResult('Error');
      }
      return;
    }

    setExpression((prev) => prev + value);
  };

  return (
    <div className="calculator">
      <h1>React Calculator</h1>
      <input value={expression} readOnly />

      <div className="result">{result}</div>

      <div className="buttons">
        {buttons.map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)}>
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Calculator;
