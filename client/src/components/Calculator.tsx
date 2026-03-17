import { useState, useCallback } from 'react';
import { Delete, RotateCcw } from 'lucide-react';

/**
 * Modern Elegant Calculator Component
 * Design: Clean, professional interface with smooth interactions
 * Features: Basic operations, percentage, square root, power, decimal precision
 */

type CalculatorState = {
  display: string;
  previousValue: number | null;
  operation: string | null;
  waitingForNewValue: boolean;
  history: string[];
};

export default function Calculator() {
  const [state, setState] = useState<CalculatorState>({
    display: '0',
    previousValue: null,
    operation: null,
    waitingForNewValue: false,
    history: [],
  });

  // Handle number input
  const handleNumber = useCallback((num: string) => {
    setState((prev) => {
      const newDisplay =
        prev.waitingForNewValue || prev.display === '0'
          ? num
          : prev.display + num;

      return {
        ...prev,
        display: newDisplay,
        waitingForNewValue: false,
      };
    });
  }, []);

  // Handle decimal point
  const handleDecimal = useCallback(() => {
    setState((prev) => {
      if (prev.waitingForNewValue) {
        return { ...prev, display: '0.', waitingForNewValue: false };
      }
      if (prev.display.includes('.')) {
        return prev;
      }
      return { ...prev, display: prev.display + '.' };
    });
  }, []);

  // Handle basic operations
  const handleOperation = useCallback((op: string) => {
    setState((prev) => {
      const currentValue = parseFloat(prev.display);

      if (prev.previousValue === null) {
        return {
          ...prev,
          previousValue: currentValue,
          operation: op,
          waitingForNewValue: true,
        };
      }

      // If there's already an operation, calculate first
      if (prev.operation) {
        const result = calculate(prev.previousValue, currentValue, prev.operation);
        return {
          ...prev,
          display: formatResult(result),
          previousValue: result,
          operation: op,
          waitingForNewValue: true,
        };
      }

      return {
        ...prev,
        previousValue: currentValue,
        operation: op,
        waitingForNewValue: true,
      };
    });
  }, []);

  // Calculate result
  const handleEquals = useCallback(() => {
    setState((prev) => {
      if (prev.operation === null || prev.previousValue === null) {
        return prev;
      }

      const currentValue = parseFloat(prev.display);
      const result = calculate(prev.previousValue, currentValue, prev.operation);
      const resultStr = formatResult(result);

      return {
        ...prev,
        display: resultStr,
        previousValue: null,
        operation: null,
        waitingForNewValue: true,
        history: [...prev.history, `${prev.previousValue} ${prev.operation} ${currentValue} = ${resultStr}`],
      };
    });
  }, []);

  // Handle special operations
  const handleSpecialOperation = useCallback((op: string) => {
    setState((prev) => {
      const currentValue = parseFloat(prev.display);
      let result: number;

      switch (op) {
        case 'sqrt':
          result = Math.sqrt(currentValue);
          break;
        case 'square':
          result = currentValue * currentValue;
          break;
        case 'percent':
          result = currentValue / 100;
          break;
        case 'reciprocal':
          result = currentValue === 0 ? 0 : 1 / currentValue;
          break;
        case 'negate':
          result = -currentValue;
          break;
        default:
          result = currentValue;
      }

      return {
        ...prev,
        display: formatResult(result),
        waitingForNewValue: true,
      };
    });
  }, []);

  // Clear all
  const handleClear = useCallback(() => {
    setState({
      display: '0',
      previousValue: null,
      operation: null,
      waitingForNewValue: false,
      history: [],
    });
  }, []);

  // Delete last digit
  const handleBackspace = useCallback(() => {
    setState((prev) => {
      if (prev.waitingForNewValue) return prev;

      const newDisplay = prev.display.slice(0, -1) || '0';
      return { ...prev, display: newDisplay };
    });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-sm">
        {/* Main Calculator Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Display Area */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 text-right">
            <div className="text-slate-300 text-sm font-medium mb-2 h-6">
              {state.operation && state.previousValue !== null
                ? `${state.previousValue} ${state.operation}`
                : ''}
            </div>
            <div className="text-white text-6xl font-bold break-words overflow-hidden">
              {state.display.length > 12
                ? parseFloat(state.display).toExponential(6)
                : state.display}
            </div>
          </div>

          {/* Buttons Area */}
          <div className="p-6 space-y-4">
            {/* Row 1: Special Functions */}
            <div className="grid grid-cols-4 gap-3">
              <button
                onClick={handleClear}
                className="col-span-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl"
              >
                مسح
              </button>
              <button
                onClick={handleBackspace}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <Delete size={20} />
              </button>
              <button
                onClick={() => handleSpecialOperation('negate')}
                className="bg-slate-400 hover:bg-slate-500 text-white font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl"
              >
                ±
              </button>
            </div>

            {/* Row 2: Advanced Operations */}
            <div className="grid grid-cols-4 gap-3">
              <button
                onClick={() => handleSpecialOperation('sqrt')}
                className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl text-sm"
              >
                √
              </button>
              <button
                onClick={() => handleSpecialOperation('square')}
                className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl text-sm"
              >
                x²
              </button>
              <button
                onClick={() => handleSpecialOperation('reciprocal')}
                className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl text-sm"
              >
                1/x
              </button>
              <button
                onClick={() => handleSpecialOperation('percent')}
                className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl"
              >
                %
              </button>
            </div>

            {/* Row 3: Numbers 7-9 and Division */}
            <div className="grid grid-cols-4 gap-3">
              <button
                onClick={() => handleNumber('7')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
              >
                7
              </button>
              <button
                onClick={() => handleNumber('8')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
              >
                8
              </button>
              <button
                onClick={() => handleNumber('9')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
              >
                9
              </button>
              <button
                onClick={() => handleOperation('/')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl text-xl"
              >
                ÷
              </button>
            </div>

            {/* Row 4: Numbers 4-6 and Multiplication */}
            <div className="grid grid-cols-4 gap-3">
              <button
                onClick={() => handleNumber('4')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
              >
                4
              </button>
              <button
                onClick={() => handleNumber('5')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
              >
                5
              </button>
              <button
                onClick={() => handleNumber('6')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
              >
                6
              </button>
              <button
                onClick={() => handleOperation('*')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl text-xl"
              >
                ×
              </button>
            </div>

            {/* Row 5: Numbers 1-3 and Subtraction */}
            <div className="grid grid-cols-4 gap-3">
              <button
                onClick={() => handleNumber('1')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
              >
                1
              </button>
              <button
                onClick={() => handleNumber('2')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
              >
                2
              </button>
              <button
                onClick={() => handleNumber('3')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
              >
                3
              </button>
              <button
                onClick={() => handleOperation('-')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl text-xl"
              >
                −
              </button>
            </div>

            {/* Row 6: Zero, Decimal and Addition */}
            <div className="grid grid-cols-4 gap-3">
              <button
                onClick={() => handleNumber('0')}
                className="col-span-2 bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
              >
                0
              </button>
              <button
                onClick={handleDecimal}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
              >
                .
              </button>
              <button
                onClick={() => handleOperation('+')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl text-xl"
              >
                +
              </button>
            </div>

            {/* Equals Button */}
            <button
              onClick={handleEquals}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl text-lg"
            >
              =
            </button>
          </div>
        </div>

        {/* Info Text */}
        <div className="text-center mt-6 text-slate-600 text-sm">
          <p>آلة حاسبة متقدمة مع عمليات رياضية متنوعة</p>
        </div>
      </div>
    </div>
  );
}

// Helper function to calculate results
function calculate(prev: number, current: number, operation: string): number {
  switch (operation) {
    case '+':
      return prev + current;
    case '-':
      return prev - current;
    case '*':
      return prev * current;
    case '/':
      return current === 0 ? 0 : prev / current;
    default:
      return current;
  }
}

// Helper function to format results
function formatResult(num: number): string {
  // Handle very large or very small numbers
  if (Math.abs(num) > 1e10 || (Math.abs(num) < 1e-6 && num !== 0)) {
    return num.toExponential(6);
  }

  // Round to 10 decimal places to avoid floating point errors
  const rounded = Math.round(num * 1e10) / 1e10;

  // Convert to string and remove trailing zeros
  let str = rounded.toString();

  // If it has a decimal point, remove trailing zeros
  if (str.includes('.')) {
    str = str.replace(/\.?0+$/, '');
  }

  return str;
}
