import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

interface ExchangeRates {
  [key: string]: number;
}

interface CurrencyInfo {
  code: string;
  name: string;
}

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>('1');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [rates, setRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [error, setError] = useState<string>('');

  const currenciesMap: Record<string, string> = {
    'USD': 'دولار أمريكي',
    'EUR': 'يورو',
    'GBP': 'جنيه إسترليني',
    'JPY': 'ين ياباني',
    'AUD': 'دولار أسترالي',
    'CAD': 'دولار كندي',
    'CHF': 'فرنك سويسري',
    'CNY': 'يوان صيني',
    'SEK': 'كرونة سويدية',
    'NZD': 'دولار نيوزيلندي',
    'MXN': 'بيزو مكسيكي',
    'SGD': 'دولار سنغافوري',
    'HKD': 'دولار هونج كونج',
    'NOK': 'كرونة نرويجية',
    'KRW': 'وون كوري',
    'TRY': 'ليرة تركية',
    'RUB': 'روبل روسي',
    'INR': 'روبية هندية',
    'BRL': 'ريال برازيلي',
    'ZAR': 'راند جنوب أفريقي',
    'AED': 'درهم إماراتي',
    'SAR': 'ريال سعودي',
    'EGP': 'جنيه مصري',
    'KWD': 'دينار كويتي',
    'QAR': 'ريال قطري'
  };

  const currencies = Object.keys(currenciesMap);

  const fetchExchangeRates = async () => {
    setLoading(true);
    setError('');
    try {
      // Using exchangerate-api.com free tier
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      if (!response.ok) throw new Error('Failed to fetch rates');
      const data = await response.json();
      setRates(data.rates);
      setLastUpdate(new Date());
    } catch (err) {
      setError('خطأ في جلب أسعار الصرف. تحقق من الاتصال بالإنترنت.');
      console.error('Error fetching rates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
    // Refresh rates every 5 minutes
    const interval = setInterval(fetchExchangeRates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fromCurrency]);

  const convertedAmount = () => {
    if (!rates[toCurrency] || !amount) return '0';
    const result = (parseFloat(amount) * rates[toCurrency]).toFixed(2);
    return result;
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex-shrink-0">
        <h1 className="text-2xl font-bold mb-2">محول العملات</h1>
        <p className="text-blue-100 text-sm">أسعار صرف حية ومحدثة</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* From Currency Section */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-3">من</label>
          <div className="flex gap-3">
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 font-semibold"
            >
              {currencies.map((curr) => (
                <option key={curr} value={curr}>
                  {curr} - {currenciesMap[curr]}
                </option>
              ))}
            </select>
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="أدخل المبلغ"
            className="w-full mt-3 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg font-semibold"
          />
        </div>

        {/* Swap Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleSwapCurrencies}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            ⇅ تبديل
          </button>
        </div>

        {/* To Currency Section */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-3">إلى</label>
          <div className="flex gap-3">
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 font-semibold"
            >
              {currencies.map((curr) => (
                <option key={curr} value={curr}>
                  {curr} - {currenciesMap[curr]}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full mt-3 px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-lg font-semibold text-gray-700">
            {loading ? 'جاري التحديث...' : convertedAmount()}
          </div>
        </div>

        {/* Exchange Rate Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-gray-700 text-sm mb-2">
            <span className="font-semibold">سعر الصرف:</span> 1 {fromCurrency} = {loading ? '...' : rates[toCurrency]?.toFixed(4)} {toCurrency}
          </p>
          <p className="text-gray-500 text-xs">
            آخر تحديث: {lastUpdate.toLocaleTimeString('ar-EG')}
          </p>
        </div>

        {/* Refresh Button */}
        <button
          onClick={fetchExchangeRates}
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
        >
          <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          تحديث الأسعار
        </button>
      </div>
    </div>
  );
}
