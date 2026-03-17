import { useState, useCallback } from 'react';

type Conversion = {
  name: string;
  fromUnit: string;
  toUnit: string;
  factor: number;
};

const conversions: Record<string, Conversion[]> = {
  length: [
    { name: 'ملليمتر إلى سنتيمتر', fromUnit: 'mm', toUnit: 'cm', factor: 0.1 },
    { name: 'سنتيمتر إلى متر', fromUnit: 'cm', toUnit: 'm', factor: 0.01 },
    { name: 'متر إلى كيلومتر', fromUnit: 'm', toUnit: 'km', factor: 0.001 },
    { name: 'كيلومتر إلى متر', fromUnit: 'km', toUnit: 'm', factor: 1000 },
    { name: 'بوصة إلى سنتيمتر', fromUnit: 'in', toUnit: 'cm', factor: 2.54 },
    { name: 'قدم إلى متر', fromUnit: 'ft', toUnit: 'm', factor: 0.3048 },
    { name: 'ميل إلى كيلومتر', fromUnit: 'mi', toUnit: 'km', factor: 1.60934 },
    { name: 'ياردة إلى متر', fromUnit: 'yd', toUnit: 'm', factor: 0.9144 },
  ],
  weight: [
    { name: 'ملليجرام إلى جرام', fromUnit: 'mg', toUnit: 'g', factor: 0.001 },
    { name: 'جرام إلى كيلوجرام', fromUnit: 'g', toUnit: 'kg', factor: 0.001 },
    { name: 'كيلوجرام إلى جرام', fromUnit: 'kg', toUnit: 'g', factor: 1000 },
    { name: 'كيلوجرام إلى طن', fromUnit: 'kg', toUnit: 't', factor: 0.001 },
    { name: 'أونصة إلى جرام', fromUnit: 'oz', toUnit: 'g', factor: 28.3495 },
    { name: 'باوند إلى كيلوجرام', fromUnit: 'lb', toUnit: 'kg', factor: 0.453592 },
    { name: 'حجر إلى كيلوجرام', fromUnit: 'st', toUnit: 'kg', factor: 6.35029 },
  ],
  temperature: [
    { name: 'سيليزيوس إلى فهرنهايت', fromUnit: '°C', toUnit: '°F', factor: 0 },
    { name: 'فهرنهايت إلى سيليزيوس', fromUnit: '°F', toUnit: '°C', factor: 0 },
    { name: 'سيليزيوس إلى كيلفن', fromUnit: '°C', toUnit: 'K', factor: 0 },
  ],
  volume: [
    { name: 'ملليلتر إلى لتر', fromUnit: 'ml', toUnit: 'L', factor: 0.001 },
    { name: 'لتر إلى ملليلتر', fromUnit: 'L', toUnit: 'ml', factor: 1000 },
    { name: 'ملليلتر إلى سنتيمتر مكعب', fromUnit: 'ml', toUnit: 'cm³', factor: 1 },
    { name: 'لتر إلى متر مكعب', fromUnit: 'L', toUnit: 'm³', factor: 0.001 },
    { name: 'جالون إلى لتر', fromUnit: 'gal', toUnit: 'L', factor: 3.78541 },
    { name: 'باينت إلى لتر', fromUnit: 'pt', toUnit: 'L', factor: 0.473176 },
  ],
  area: [
    { name: 'سنتيمتر مربع إلى متر مربع', fromUnit: 'cm²', toUnit: 'm²', factor: 0.0001 },
    { name: 'متر مربع إلى كيلومتر مربع', fromUnit: 'm²', toUnit: 'km²', factor: 0.000001 },
    { name: 'هكتار إلى متر مربع', fromUnit: 'ha', toUnit: 'm²', factor: 10000 },
    { name: 'فدان إلى متر مربع', fromUnit: 'acre', toUnit: 'm²', factor: 4046.86 },
  ],
  speed: [
    { name: 'متر/ثانية إلى كيلومتر/ساعة', fromUnit: 'm/s', toUnit: 'km/h', factor: 3.6 },
    { name: 'كيلومتر/ساعة إلى متر/ثانية', fromUnit: 'km/h', toUnit: 'm/s', factor: 0.27778 },
    { name: 'ميل/ساعة إلى كيلومتر/ساعة', fromUnit: 'mph', toUnit: 'km/h', factor: 1.60934 },
    { name: 'عقدة إلى كيلومتر/ساعة', fromUnit: 'knot', toUnit: 'km/h', factor: 1.852 },
  ],
  energy: [
    { name: 'جول إلى كيلوجول', fromUnit: 'J', toUnit: 'kJ', factor: 0.001 },
    { name: 'كيلوجول إلى جول', fromUnit: 'kJ', toUnit: 'J', factor: 1000 },
    { name: 'كالوري إلى جول', fromUnit: 'cal', toUnit: 'J', factor: 4.184 },
    { name: 'كيلوواط/ساعة إلى جول', fromUnit: 'kWh', toUnit: 'J', factor: 3600000 },
  ],
};

export default function UnitConverter() {
  const [selectedCategory, setSelectedCategory] = useState<string>('length');
  const [selectedConversion, setSelectedConversion] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('0');
  const [outputValue, setOutputValue] = useState<string>('0');

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value === '' || value === '-') {
      setOutputValue('0');
      return;
    }

    const num = parseFloat(value);
    if (isNaN(num)) {
      setOutputValue('0');
      return;
    }

    const conversionList = conversions[selectedCategory];
    const conversion = conversionList[selectedConversion];

    let result: number;

    // Special handling for temperature
    if (selectedCategory === 'temperature') {
      if (conversion.fromUnit === '°C' && conversion.toUnit === '°F') {
        result = (num * 9) / 5 + 32;
      } else if (conversion.fromUnit === '°F' && conversion.toUnit === '°C') {
        result = ((num - 32) * 5) / 9;
      } else if (conversion.fromUnit === '°C' && conversion.toUnit === 'K') {
        result = num + 273.15;
      } else {
        result = num * conversion.factor;
      }
    } else {
      result = num * conversion.factor;
    }

    setOutputValue(formatResult(result));
  }, [selectedCategory, selectedConversion]);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    setSelectedConversion(0);
    setInputValue('0');
    setOutputValue('0');
  }, []);

  const handleConversionChange = useCallback((index: number) => {
    setSelectedConversion(index);
    setInputValue('0');
    setOutputValue('0');
  }, []);

  const conversionList = conversions[selectedCategory];
  const currentConversion = conversionList[selectedConversion];

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Display Area */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 flex-shrink-0 p-6 text-right">
        <div className="text-blue-200 text-lg font-medium mb-2">
          {currentConversion.name}
        </div>
        <div className="text-white text-4xl font-bold mb-4">
          {outputValue} {currentConversion.toUnit}
        </div>
      </div>

      {/* Category Selection */}
      <div className="flex-shrink-0 px-4 pt-4 pb-2 border-b border-slate-200">
        <p className="text-slate-700 font-semibold mb-2 text-sm">الفئة:</p>
        <div className="grid grid-cols-4 gap-2">
          {Object.keys(conversions).map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`py-2 px-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              {category === 'length' && 'طول'}
              {category === 'weight' && 'وزن'}
              {category === 'temperature' && 'حرارة'}
              {category === 'volume' && 'حجم'}
              {category === 'area' && 'مساحة'}
              {category === 'speed' && 'سرعة'}
              {category === 'energy' && 'طاقة'}
            </button>
          ))}
        </div>
      </div>

      {/* Conversion Selection */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-slate-200 overflow-y-auto max-h-24">
        <p className="text-slate-700 font-semibold mb-2 text-sm">التحويل:</p>
        <div className="grid grid-cols-2 gap-2">
          {conversionList.map((conv, index) => (
            <button
              key={index}
              onClick={() => handleConversionChange(index)}
              className={`py-2 px-3 rounded-lg font-semibold text-xs transition-all duration-200 ${
                selectedConversion === index
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              {conv.fromUnit} → {conv.toUnit}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="flex-1 p-4 flex flex-col space-y-4">
        <div className="flex-1 flex flex-col">
          <label className="text-slate-700 font-semibold mb-2 text-sm">
            {currentConversion.fromUnit}
          </label>
          <input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            className="flex-1 px-4 py-3 border-2 border-blue-300 rounded-lg text-2xl font-bold focus:outline-none focus:border-blue-500"
            placeholder="أدخل القيمة"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <label className="text-slate-700 font-semibold mb-2 text-sm">
            {currentConversion.toUnit}
          </label>
          <div className="flex-1 px-4 py-3 border-2 border-green-300 rounded-lg text-2xl font-bold bg-slate-50 flex items-center">
            {outputValue}
          </div>
        </div>
      </div>
    </div>
  );
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
