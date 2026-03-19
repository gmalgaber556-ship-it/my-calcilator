import React, { useState, useCallback } from 'react';

type Conversion = {
  name: string;
  fromUnit: string;
  toUnit: string;
  factor: number;
};

const conversions: Record<string, { label: string; conversions: Conversion[] }> = {
  length: {
    label: 'الطول',
    conversions: [
      { name: 'ملليمتر إلى سنتيمتر', fromUnit: 'ملليمتر', toUnit: 'سنتيمتر', factor: 0.1 },
      { name: 'سنتيمتر إلى متر', fromUnit: 'سنتيمتر', toUnit: 'متر', factor: 0.01 },
      { name: 'متر إلى كيلومتر', fromUnit: 'متر', toUnit: 'كيلومتر', factor: 0.001 },
      { name: 'كيلومتر إلى متر', fromUnit: 'كيلومتر', toUnit: 'متر', factor: 1000 },
      { name: 'بوصة إلى سنتيمتر', fromUnit: 'بوصة', toUnit: 'سنتيمتر', factor: 2.54 },
      { name: 'قدم إلى متر', fromUnit: 'قدم', toUnit: 'متر', factor: 0.3048 },
      { name: 'ميل إلى كيلومتر', fromUnit: 'ميل', toUnit: 'كيلومتر', factor: 1.60934 },
      { name: 'ياردة إلى متر', fromUnit: 'ياردة', toUnit: 'متر', factor: 0.9144 },
      { name: 'نانومتر إلى ميكرومتر', fromUnit: 'نانومتر', toUnit: 'ميكرومتر', factor: 0.001 },
      { name: 'ميكرومتر إلى ملليمتر', fromUnit: 'ميكرومتر', toUnit: 'ملليمتر', factor: 0.001 },
    ],
  },
  weight: {
    label: 'الوزن',
    conversions: [
      { name: 'ملليجرام إلى جرام', fromUnit: 'ملليجرام', toUnit: 'جرام', factor: 0.001 },
      { name: 'جرام إلى كيلوجرام', fromUnit: 'جرام', toUnit: 'كيلوجرام', factor: 0.001 },
      { name: 'كيلوجرام إلى جرام', fromUnit: 'كيلوجرام', toUnit: 'جرام', factor: 1000 },
      { name: 'كيلوجرام إلى طن', fromUnit: 'كيلوجرام', toUnit: 'طن', factor: 0.001 },
      { name: 'أونصة إلى جرام', fromUnit: 'أونصة', toUnit: 'جرام', factor: 28.3495 },
      { name: 'باوند إلى كيلوجرام', fromUnit: 'باوند', toUnit: 'كيلوجرام', factor: 0.453592 },
      { name: 'حجر إلى كيلوجرام', fromUnit: 'حجر', toUnit: 'كيلوجرام', factor: 6.35029 },
      { name: 'ميكروجرام إلى ملليجرام', fromUnit: 'ميكروجرام', toUnit: 'ملليجرام', factor: 0.001 },
      { name: 'طن متري إلى كيلوجرام', fromUnit: 'طن متري', toUnit: 'كيلوجرام', factor: 1000 },
    ],
  },
  temperature: {
    label: 'درجة الحرارة',
    conversions: [
      { name: 'سيليزيوس إلى فهرنهايت', fromUnit: '°C', toUnit: '°F', factor: 0 },
      { name: 'فهرنهايت إلى سيليزيوس', fromUnit: '°F', toUnit: '°C', factor: 0 },
      { name: 'سيليزيوس إلى كيلفن', fromUnit: '°C', toUnit: 'K', factor: 0 },
      { name: 'كيلفن إلى سيليزيوس', fromUnit: 'K', toUnit: '°C', factor: 0 },
    ],
  },
  volume: {
    label: 'الحجم',
    conversions: [
      { name: 'ملليلتر إلى لتر', fromUnit: 'ملليلتر', toUnit: 'لتر', factor: 0.001 },
      { name: 'لتر إلى ملليلتر', fromUnit: 'لتر', toUnit: 'ملليلتر', factor: 1000 },
      { name: 'ملليلتر إلى سنتيمتر مكعب', fromUnit: 'ملليلتر', toUnit: 'سم³', factor: 1 },
      { name: 'لتر إلى متر مكعب', fromUnit: 'لتر', toUnit: 'م³', factor: 0.001 },
      { name: 'جالون إلى لتر', fromUnit: 'جالون', toUnit: 'لتر', factor: 3.78541 },
      { name: 'باينت إلى لتر', fromUnit: 'باينت', toUnit: 'لتر', factor: 0.473176 },
      { name: 'ملعقة شاي إلى ملليلتر', fromUnit: 'ملعقة شاي', toUnit: 'ملليلتر', factor: 4.92892 },
      { name: 'ملعقة طعام إلى ملليلتر', fromUnit: 'ملعقة طعام', toUnit: 'ملليلتر', factor: 14.7868 },
    ],
  },
  area: {
    label: 'المساحة',
    conversions: [
      { name: 'سنتيمتر مربع إلى متر مربع', fromUnit: 'سم²', toUnit: 'م²', factor: 0.0001 },
      { name: 'متر مربع إلى كيلومتر مربع', fromUnit: 'م²', toUnit: 'كم²', factor: 0.000001 },
      { name: 'هكتار إلى متر مربع', fromUnit: 'هكتار', toUnit: 'م²', factor: 10000 },
      { name: 'فدان إلى متر مربع', fromUnit: 'فدان', toUnit: 'م²', factor: 4046.86 },
      { name: 'ميل مربع إلى كيلومتر مربع', fromUnit: 'ميل²', toUnit: 'كم²', factor: 2.58999 },
      { name: 'بوصة مربعة إلى سنتيمتر مربع', fromUnit: 'بوصة²', toUnit: 'سم²', factor: 6.4516 },
    ],
  },
  speed: {
    label: 'السرعة',
    conversions: [
      { name: 'متر/ثانية إلى كيلومتر/ساعة', fromUnit: 'م/ث', toUnit: 'كم/س', factor: 3.6 },
      { name: 'كيلومتر/ساعة إلى متر/ثانية', fromUnit: 'كم/س', toUnit: 'م/ث', factor: 0.27778 },
      { name: 'ميل/ساعة إلى كيلومتر/ساعة', fromUnit: 'ميل/س', toUnit: 'كم/س', factor: 1.60934 },
      { name: 'عقدة إلى كيلومتر/ساعة', fromUnit: 'عقدة', toUnit: 'كم/س', factor: 1.852 },
      { name: 'قدم/ثانية إلى متر/ثانية', fromUnit: 'قدم/ث', toUnit: 'م/ث', factor: 0.3048 },
    ],
  },
  energy: {
    label: 'الطاقة',
    conversions: [
      { name: 'جول إلى كيلوجول', fromUnit: 'جول', toUnit: 'كيلوجول', factor: 0.001 },
      { name: 'كيلوجول إلى جول', fromUnit: 'كيلوجول', toUnit: 'جول', factor: 1000 },
      { name: 'كالوري إلى جول', fromUnit: 'كالوري', toUnit: 'جول', factor: 4.184 },
      { name: 'كيلوواط/ساعة إلى جول', fromUnit: 'كيلوواط/س', toUnit: 'جول', factor: 3600000 },
      { name: 'إرج إلى جول', fromUnit: 'إرج', toUnit: 'جول', factor: 0.0000001 },
      { name: 'إلكترون فولت إلى جول', fromUnit: 'إلكترون فولت', toUnit: 'جول', factor: 1.60218e-19 },
    ],
  },
  pressure: {
    label: 'الضغط',
    conversions: [
      { name: 'باسكال إلى كيلوباسكال', fromUnit: 'باسكال', toUnit: 'كيلوباسكال', factor: 0.001 },
      { name: 'بار إلى باسكال', fromUnit: 'بار', toUnit: 'باسكال', factor: 100000 },
      { name: 'أتموسفير إلى باسكال', fromUnit: 'أتموسفير', toUnit: 'باسكال', factor: 101325 },
      { name: 'ملليبار إلى باسكال', fromUnit: 'ملليبار', toUnit: 'باسكال', factor: 100 },
    ],
  },
  time: {
    label: 'الوقت',
    conversions: [
      { name: 'ثانية إلى دقيقة', fromUnit: 'ثانية', toUnit: 'دقيقة', factor: 0.01667 },
      { name: 'دقيقة إلى ساعة', fromUnit: 'دقيقة', toUnit: 'ساعة', factor: 0.01667 },
      { name: 'ساعة إلى يوم', fromUnit: 'ساعة', toUnit: 'يوم', factor: 0.04167 },
      { name: 'يوم إلى أسبوع', fromUnit: 'يوم', toUnit: 'أسبوع', factor: 0.14286 },
      { name: 'ملليثانية إلى ثانية', fromUnit: 'ملليثانية', toUnit: 'ثانية', factor: 0.001 },
    ],
  },
};

const formatResult = (value: number): string => {
  if (isNaN(value) || !isFinite(value)) return '0';
  if (Math.abs(value) < 0.0001 && value !== 0) {
    return value.toExponential(6);
  }
  return parseFloat(value.toFixed(6)).toString();
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

    const conversionList = conversions[selectedCategory].conversions;
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
      } else if (conversion.fromUnit === 'K' && conversion.toUnit === '°C') {
        result = num - 273.15;
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

  const conversionList = conversions[selectedCategory].conversions;
  const currentConversion = conversionList[selectedConversion];

  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden">
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
        <div className="grid grid-cols-4 gap-2 overflow-x-auto">
          {Object.entries(conversions).map(([category, data]) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`py-2 px-3 rounded-lg font-semibold text-sm transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              {data.label}
            </button>
          ))}
        </div>
      </div>

      {/* Conversion Selection */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-slate-200 overflow-y-auto max-h-28">
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
      <div className="flex-1 p-4 flex flex-col space-y-4 overflow-hidden">
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
