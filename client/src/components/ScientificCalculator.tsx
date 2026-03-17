import { useState, useCallback } from 'react';
import { Delete } from 'lucide-react';

type ScientificState = {
  display: string;
  previousValue: number | null;
  operation: string | null;
  waitingForNewValue: boolean;
  angleMode: 'deg' | 'rad';
};

export default function ScientificCalculator() {
  const [state, setState] = useState<ScientificState>({
    display: '0',
    previousValue: null,
    operation: null,
    waitingForNewValue: false,
    angleMode: 'deg',
  });

  const handleNumber = useCallback((num: string) => {
    setState((prev) => {
      const newDisplay =
        prev.waitingForNewValue || prev.display === '0'
          ? num
          : prev.display + num;
      return { ...prev, display: newDisplay, waitingForNewValue: false };
    });
  }, []);

  const handleDecimal = useCallback(() => {
    setState((prev) => {
      if (prev.waitingForNewValue) {
        return { ...prev, display: '0.', waitingForNewValue: false };
      }
      if (prev.display.includes('.')) return prev;
      return { ...prev, display: prev.display + '.' };
    });
  }, []);

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

  const handleEquals = useCallback(() => {
    setState((prev) => {
      if (prev.operation === null || prev.previousValue === null) return prev;
      const currentValue = parseFloat(prev.display);
      const result = calculate(prev.previousValue, currentValue, prev.operation);
      return {
        ...prev,
        display: formatResult(result),
        previousValue: null,
        operation: null,
        waitingForNewValue: true,
      };
    });
  }, []);

  const handleScientific = useCallback((func: string) => {
    setState((prev) => {
      const currentValue = parseFloat(prev.display);
      let result: number;

      const toRad = (deg: number) => (deg * Math.PI) / 180;
      const toDeg = (rad: number) => (rad * 180) / Math.PI;

      switch (func) {
        case 'sin':
          result = prev.angleMode === 'deg'
            ? Math.sin(toRad(currentValue))
            : Math.sin(currentValue);
          break;
        case 'cos':
          result = prev.angleMode === 'deg'
            ? Math.cos(toRad(currentValue))
            : Math.cos(currentValue);
          break;
        case 'tan':
          result = prev.angleMode === 'deg'
            ? Math.tan(toRad(currentValue))
            : Math.tan(currentValue);
          break;
        case 'asin':
          result = prev.angleMode === 'deg'
            ? toDeg(Math.asin(currentValue))
            : Math.asin(currentValue);
          break;
        case 'acos':
          result = prev.angleMode === 'deg'
            ? toDeg(Math.acos(currentValue))
            : Math.acos(currentValue);
          break;
        case 'atan':
          result = prev.angleMode === 'deg'
            ? toDeg(Math.atan(currentValue))
            : Math.atan(currentValue);
          break;
        case 'log':
          result = Math.log10(currentValue);
          break;
        case 'ln':
          result = Math.log(currentValue);
          break;
        case 'exp':
          result = Math.exp(currentValue);
          break;
        case 'factorial':
          result = factorial(Math.round(currentValue));
          break;
        case 'pi':
          return { ...prev, display: formatResult(Math.PI), waitingForNewValue: true };
        case 'e':
          return { ...prev, display: formatResult(Math.E), waitingForNewValue: true };
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

  const handleClear = useCallback(() => {
    setState((prev) => ({
      ...prev,
      display: '0',
      previousValue: null,
      operation: null,
      waitingForNewValue: false,
    }));
  }, []);

  const handleBackspace = useCallback(() => {
    setState((prev) => {
      if (prev.waitingForNewValue) return prev;
      const newDisplay = prev.display.slice(0, -1) || '0';
      return { ...prev, display: newDisplay };
    });
  }, []);

  const toggleAngleMode = useCallback(() => {
    setState((prev) => ({
      ...prev,
      angleMode: prev.angleMode === 'deg' ? 'rad' : 'deg',
    }));
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Display Area */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 flex-shrink-0 p-6 text-right flex flex-col justify-end min-h-[15%]">
        <div className="text-blue-200 text-lg font-medium mb-2 h-8">
          {state.angleMode === 'rad' ? 'راديان' : 'درجات'}
        </div>
        <div className="text-white text-5xl font-bold break-words overflow-hidden leading-tight">
          {state.display.length > 12
            ? parseFloat(state.display).toExponential(6)
            : state.display}
        </div>
      </div>

      {/* Buttons Area */}
      <div className="flex-1 p-4 space-y-2 overflow-hidden bg-white flex flex-col">
        {/* Row 1: Mode and Clear */}
        <div className="grid grid-cols-4 gap-2 flex-shrink-0">
          <button
            onClick={toggleAngleMode}
            className="col-span-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm py-2 rounded-lg transition-all duration-200 active:scale-95 shadow-lg"
          >
            {state.angleMode === 'deg' ? 'راديان' : 'درجات'}
          </button>
          <button
            onClick={handleClear}
            className="bg-red-500 hover:bg-red-600 text-white font-bold text-lg py-2 rounded-lg transition-all duration-200 active:scale-95 shadow-lg"
          >
            مسح
          </button>
          <button
            onClick={handleBackspace}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg transition-all duration-200 active:scale-95 shadow-lg flex items-center justify-center"
          >
            <Delete size={20} />
          </button>
        </div>

        {/* Row 2: Trigonometric Functions */}
        <div className="grid grid-cols-4 gap-2 flex-shrink-0">
          <button
            onClick={() => handleScientific('sin')}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold text-sm py-2 rounded-lg transition-all duration-200 active:scale-95 shadow-lg"
          >
            sin
          </button>
          <button
            onClick={() => handleScientific('cos')}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold text-sm py-2 rounded-lg transition-all duration-200 active:scale-95 shadow-lg"
          >
            cos
          </button>
          <button
            onClick={() => handleScientific('tan')}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold text-sm py-2 rounded-lg transition-all duration-200 active:scale-95 shadow-lg"
          >
            tan
          </button>
          <button
            onClick={() => handleScientific('log')}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold text-sm py-2 rounded-lg transition-all duration-200 active:scale-95 shadow-lg"
          >
            log
          </button>
        </div>

        {/* Row 3: Inverse Trig and Logarithm */}
        <div className="grid grid-cols-4 gap-2 flex-shrink-0">
          <button
            onClick={() => handleScientific('asin')}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs py-2 rounded-lg transition-all duration-200 active:scale-95 shadow-lg"
          >
            asin
          </button>
          <button
            onClick={() => handleScientific('acos')}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs py-2 rounded-lg transition-all duration-200 active:scale-95 shadow-lg"
          >
            acos
          </button>
          <button
            onClick={() => handleScientific('atan')}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs py-2 rounded-lg transition-all duration-200 active:scale-95 shadow-lg"
          >
            atan
          </button>
          <button
            onClick={() => handleScientific('ln')}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm py-2 rounded-lg transition-all duration-200 active:scale-95 shadow-lg"
          >
            ln
          </button>
        </div>

        {/* Row 4: Constants and Special Functions */}
        <div className="grid grid-cols-4 gap-2 flex-shrink-0">
          <button
            onClick={() => handleScientific('pi')}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-sm py-2 rounded-lg transition-all duration-200 active:scale-95 shadow-lg"
          >
            π
          </button>
          <button
            onClick={() => handleScientific('e')}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-sm py-2 rounded-lg transition-all duration-200 active:scale-95 shadow-lg"
          >
            e
          </button>
          <button
            onClick={() => handleScientific('exp')}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs py-2 rounded-lg transition-all duration-200 active:scale-95 shadow-lg"
          >
            e^x
          </button>
          <button
            onClick={() => handleScientific('factorial')}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-sm py-2 rounded-lg transition-all duration-200 active:scale-95 shadow-lg"
          >
            !
          </button>
        </div>

        {/* Row 5: Numbers 7-9 and Division */}
        <div className="grid grid-cols-4 gap-2 flex-shrink-0">
          <button
            onClick={() => handleNumber('7')}
            className="bg-slate-200 hover:bg-slate-300 text-slate-900 font-bold text-xl py-2 rounded-lg transition-all duration-200 active:scale-95 shadow-md"
          >
            7
          </button>
          <button
            onClick={() => handleNumber('8')}
            className="bg-slate-200 hover:bg-slate-300 text-slate-900 font-bold text-xl py-2 rounded-lg transition-all duration-200 active:scale-95 shadow-md"
          >
            8
          </button>
          <button
            onClick={() => handleNumber('9')}
            className="bg-slate-200 hover:bg-slate-300 text-slate-900 font-bold text-xl py-2 rounded-lg transition-all duration-200 active:scale-95 shadow-md"
          >
            9
          </button>
          <button
            onClick={() => handleOperation('/')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-2xl py-2 rounded-lg transition-all duration-200 active:scale-95 shadow-lg"
          >
            ÷
          </button>
        </div>

        {/* Row 6: Numbers 4-6 and Multiplication */}
        <div className="grid grid-cols-4 gap-2 flex-shrink-0">
          <button
            onClick={() => handleNumber('4')}
            className="bg-slate-200 hover:bg-slate-300 text-slate-900 font-bold text-xl py-2 rounded-lg transition-all duration-200 active:scale-95 shadow-md"
          >
            4
          </button>
          <button
            onClick={() => handleNumber('5')}
            className="bg-slate-200 hover:bg-slate-300 text-slate-900 font-bold text-xl py-2 rounded-lg transition-all duration-200 active:scale-95 shadow-md"
          >
            5
          </button>
          <button
            onClick={() => handleNumber('6')}
            className="bg-slate-200 hover:bg-slate-300 text-slate-900 font-bold text-xl py-2 rounded-lg transition-all duration-200 active:scale-95 shadow-md"
          >
            6
          </button>
          <button
            onClick={() => handleOperation('*')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-2xl py-2 rounded-lg transition-all duration-200 active:scale-95 shadow-lg"
          >
            ×
          </button>
        </div>

        {/* Row 7: Numbers 1-3 and Subtraction */}
        <div className="grid grid-cols-4 gap-2 flex-shrink-0">
          <button
            onClick={() => handleNumber('1')}
            className="bg-slate-200 hover:bg-slate-300 text-slate-900 font-bold text-xl py-2 rounded-lg transition-all duration-200 active:scale-95 shadow-md"
          >
            1
          </button>
          <button
            onClick={() => handleNumber('2')}
            className="bg-slate-200 hover:bg-slate-300 text-slate-900 font-bold text-xl py-2 rounded-lg transition-all duration-200 active:scale-95 shadow-md"
          >
            2
          </button>
          <button
            onClick={() => handleNumber('3')}
            className="bg-slate-200 hover:bg-slate-300 text-slate-900 font-bold text-xl py-2 rounded-lg transition-all duration-200 active:scale-95 shadow-md"
          >
            3
          </button>
          <button
            onClick={() => handleOperation('-')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-2xl py-2 rounded-lg transition-all duration-200 active:scale-95 shadow-lg"
          >
            −
          </button>
        </div>

        {/* Row 8: Zero, Decimal and Addition */}
        <div className="grid grid-cols-4 gap-2 flex-shrink-0">
          <button
            onClick={() => handleNumber('0')}
            className="col-span-2 bg-slate-200 hover:bg-slate-300 text-slate-900 font-bold text-xl py-2 rounded-lg transition-all duration-200 active:scale-95 shadow-md"
          >
            0
          </button>
          <button
            onClick={handleDecimal}
            className="bg-slate-200 hover:bg-slate-300 text-slate-900 font-bold text-xl py-2 rounded-lg transition-all duration-200 active:scale-95 shadow-md"
          >
            .
          </button>
          <button
            onClick={() => handleOperation('+')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-2xl py-2 rounded-lg transition-all duration-200 active:scale-95 shadow-lg"
          >
            +
          </button>
        </div>

        {/* Equals Button */}
        <button
          onClick={handleEquals}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-2xl py-2 rounded-lg transition-all duration-200 active:scale-95 shadow-lg flex-shrink-0"
        >
          =
        </button>
      </div>
    </div>
  );
}

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
    case '^':
      return Math.pow(prev, current);
    default:
      return current;
  }
}

function factorial(n: number): number {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

function formatResult(num: number): string {
  if (Math.abs(num) > 1e10 || (Math.abs(num) < 1e-6 && num !== 0)) {
    return num.toExponential(6);
  }
  const rounded = Math.round(num * 1e10) / 1e10;
  let str = rounded.toString();
  if (str.includes('.')) {
    str = str.replace(/\.?0+$/, '');
  }
  return str;
}
