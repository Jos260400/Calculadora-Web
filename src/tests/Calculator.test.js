
import { render, fireEvent, screen } from '@testing-library/react';
import Calculator from '../components/Calculator';

describe('Calculator', () => {
    // Prueba de suma
    test('calculates addition correctly', () => {
        render(<Calculator />);
        
        fireEvent.click(screen.getByText('1'));
        fireEvent.click(screen.getByText('+'));
        fireEvent.click(screen.getByText('2'));
        fireEvent.click(screen.getByText('='));
        
        expect(screen.getByText('3')).toBeInTheDocument();
    });

    // Prueba de resta
    test('calculates subtraction correctly', () => {
        render(<Calculator />);
        
        fireEvent.click(screen.getByText('5'));
        fireEvent.click(screen.getByText('-'));
        fireEvent.click(screen.getByText('3'));
        fireEvent.click(screen.getByText('='));
        
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    // Prueba de multiplicación
    test('calculates multiplication correctly', () => {
        render(<Calculator />);
        
        fireEvent.click(screen.getByText('4'));
        fireEvent.click(screen.getByText('*'));
        fireEvent.click(screen.getByText('5'));
        fireEvent.click(screen.getByText('='));
        
        expect(screen.getByText('20')).toBeInTheDocument();
    });

    // Prueba de mostrar ERROR al exceder 9 dígitos
    test('shows ERROR when more than 9 digits are entered', () => {
        render(<Calculator />);
        
        '1234567890'.split('').forEach(digit => fireEvent.click(screen.getByText(digit)));
        
        expect(screen.getByText('ERROR')).toBeInTheDocument();
    });

    // Prueba de mostrar ERROR cuando el resultado es negativo
    test('shows ERROR for negative result', () => {
        render(<Calculator />);
        
        fireEvent.click(screen.getByText('1'));
        fireEvent.click(screen.getByText('-'));
        fireEvent.click(screen.getByText('2'));
        fireEvent.click(screen.getByText('='));
        
        expect(screen.getByText('ERROR')).toBeInTheDocument();
    });

    // Prueba de mostrar ERROR cuando el resultado es mayor a 999999999
    test('shows ERROR for result greater than 999999999', () => {
        render(<Calculator />);
        
        fireEvent.click(screen.getByText('9'));
        fireEvent.click(screen.getByText('*'));
        fireEvent.click(screen.getByText('9'));
        '12345678'.split('').forEach(() => fireEvent.click(screen.getByText('9')));
        fireEvent.click(screen.getByText('='));
        
        expect(screen.getByText('ERROR')).toBeInTheDocument();
    });

    // Prueba del botón de borrar
    test('clears the display when C is pressed', () => {
        render(<Calculator />);
        
        fireEvent.click(screen.getByText('1'));
        fireEvent.click(screen.getByText('C'));
        
        expect(screen.getByText('0')).toBeInTheDocument();
    });
});
