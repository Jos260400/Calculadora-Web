import React, { useState } from 'react';
import Display from './Display';
import Button from './Button';
import './Calculator.css';

const Calculator = () => {
    const [displayValue, setDisplayValue] = useState('');
    const [currentValue, setCurrentValue] = useState('');
    const [operator, setOperator] = useState(null);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(false);

    const handleNumberClick = (number) => {
        if (error) return; 
        if (displayValue.length >= 9) {
            setDisplayValue('ERROR');
            setError(true);
            return;
        }
        
        if (number === '.' && displayValue.includes('.')) return;
        const newValue = displayValue + number;
        setDisplayValue(newValue);
        setCurrentValue(newValue);
    };

    const handleOperatorClick = (operator) => {
        if (error) return; 
        if (result !== null) {
            setOperator(operator);
            setDisplayValue('');
            setCurrentValue('');
        } else {
            setOperator(operator);
            setResult(parseFloat(currentValue));
            setDisplayValue('');
            setCurrentValue('');
        }
    };

    const handleEqualClick = () => {
        if (error) return; 
        if (operator && currentValue) {
            let newResult;
            switch (operator) {
                case '+':
                    newResult = result + parseFloat(currentValue);
                    break;
                case '-':
                    newResult = result - parseFloat(currentValue);
                    break;
                case '*':
                    newResult = result * parseFloat(currentValue);
                    break;
                default:
                    return;
            }

            if (newResult < 0 || newResult > 999999999) {
                setDisplayValue('ERROR');
                setError(true);
            } else {
                const newResultStr = newResult.toString();
                if (newResultStr.length > 9) {
                    setDisplayValue('ERROR');
                    setError(true);
                } else {
                    setDisplayValue(newResultStr);
                }
            }

            setResult(null);
            setOperator(null);
            setCurrentValue('');
        }
    };

    const handleClearClick = () => {
        setDisplayValue('');
        setCurrentValue('');
        setOperator(null);
        setResult(null);
        setError(false);
    };

    const handleNegativeClick = () => {
        if (error) return; 
        if (displayValue.includes('-')) {
            
            const newValue = displayValue.substring(1);
            setDisplayValue(newValue);
            setCurrentValue(newValue);
        } else {
            
            const newValue = '-' + displayValue;
            setDisplayValue(newValue);
            setCurrentValue(newValue);
        }
    };

    const handleKeyDown = (event) => {
        const key = event.key;
        if (/^[0-9+\-*/.=]$/.test(key)) {
            event.preventDefault(); 
            const button = document.querySelector(`button[data-key="${key}"]`);
            if (button) {
                button.click();
                button.focus();
            }
        }
    };

    return (
        <div className="calculator" onKeyDown={handleKeyDown} tabIndex="0">
            <Display value={displayValue || '0'} />
            <div className="buttons">
                {['7', '8', '9', '+'].map(label => (
                    <Button key={label} label={label} onClick={label === '+' ? handleOperatorClick : handleNumberClick} />
                ))}
                {['4', '5', '6', '-'].map(label => (
                    <Button key={label} label={label} onClick={label === '-' ? handleOperatorClick : handleNumberClick} />
                ))}
                {['1', '2', '3', '*'].map(label => (
                    <Button key={label} label={label} onClick={label === '*' ? handleOperatorClick : handleNumberClick} />
                ))}
                <Button key="decimal" label="." onClick={handleNumberClick} />
                <Button key="negative" label="+/-" onClick={handleNegativeClick} />
                {['C', '0', '='].map(label => (
                    <Button key={label} label={label} onClick={label === '=' ? handleEqualClick : label === 'C' ? handleClearClick : handleNumberClick} />
                ))}
            </div>
        </div>
    );
};

export default Calculator;
