import { useState, useCallback, useMemo } from 'react';

interface AgeDetails {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  nextBirthday: number;
}

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<string>('');
  const [ageDetails, setAgeDetails] = useState<AgeDetails | null>(null);

  const calculateAge = useCallback(() => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();

    if (birth > today) {
      alert('تاريخ الميلاد لا يمكن أن يكون في المستقبل');
      return;
    }

    // Calculate years, months, days
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate total days
    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    // Calculate days until next birthday
    let nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) {
      nextBirthday = new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    setAgeDetails({
      years,
      months,
      days,
      totalDays,
      totalHours,
      totalMinutes,
      nextBirthday: daysUntilBirthday,
    });
  }, [birthDate]);

  const handleDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDate(e.target.value);
    setAgeDetails(null);
  }, []);

  const today = useMemo(() => {
    const date = new Date();
    return date.toISOString().split('T')[0];
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Display Area */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 flex-shrink-0 p-6 text-right">
        <div className="text-blue-200 text-lg font-medium mb-2">حاسبة العمر</div>
        {ageDetails ? (
          <div className="text-white text-4xl font-bold">
            {ageDetails.years} سنة و {ageDetails.months} شهر و {ageDetails.days} يوم
          </div>
        ) : (
          <div className="text-blue-100 text-lg">أدخل تاريخ ميلادك</div>
        )}
      </div>

      {/* Input Section */}
      <div className="flex-shrink-0 p-6 border-b border-slate-200">
        <label className="block text-slate-700 font-semibold mb-3">تاريخ الميلاد:</label>
        <div className="flex gap-3">
          <input
            type="date"
            value={birthDate}
            onChange={handleDateChange}
            max={today}
            className="flex-1 px-4 py-3 border-2 border-blue-300 rounded-lg font-semibold focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={calculateAge}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-all duration-200 active:scale-95 shadow-lg"
          >
            احسب
          </button>
        </div>
      </div>

      {/* Results Section */}
      {ageDetails && (
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {/* Main Age Display */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-300">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600">{ageDetails.years}</div>
                <div className="text-slate-600 font-semibold mt-2">سنة</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600">{ageDetails.months}</div>
                <div className="text-slate-600 font-semibold mt-2">شهر</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600">{ageDetails.days}</div>
                <div className="text-slate-600 font-semibold mt-2">يوم</div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-3">
            <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-purple-500">
              <div className="text-slate-600 font-semibold">إجمالي الأيام:</div>
              <div className="text-2xl font-bold text-purple-600">{ageDetails.totalDays.toLocaleString('ar-EG')} يوم</div>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-pink-500">
              <div className="text-slate-600 font-semibold">إجمالي الساعات:</div>
              <div className="text-2xl font-bold text-pink-600">{ageDetails.totalHours.toLocaleString('ar-EG')} ساعة</div>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-cyan-500">
              <div className="text-slate-600 font-semibold">إجمالي الدقائق:</div>
              <div className="text-2xl font-bold text-cyan-600">{ageDetails.totalMinutes.toLocaleString('ar-EG')} دقيقة</div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border-2 border-green-500">
              <div className="text-slate-600 font-semibold mb-2">الأيام المتبقية حتى عيد الميلاد القادم:</div>
              <div className="text-3xl font-bold text-green-600">{ageDetails.nextBirthday} يوم</div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!ageDetails && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-slate-500">
            <div className="text-5xl mb-4">📅</div>
            <p className="text-lg font-semibold">أدخل تاريخ ميلادك لحساب عمرك</p>
          </div>
        </div>
      )}
    </div>
  );
}
