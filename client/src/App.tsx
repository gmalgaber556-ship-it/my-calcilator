import React, { useState } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Calculator as CalcIcon, Beaker, Ruler, Cake, DollarSign, ChevronUp, ChevronDown } from 'lucide-react';
import BasicCalculator from '@/components/Calculator';
import ScientificCalculator from '@/components/ScientificCalculator';
import UnitConverter from '@/components/UnitConverter';
import AgeCalculator from '@/components/AgeCalculator';
import CurrencyConverter from '@/components/CurrencyConverter';
import { ThemeProvider } from "./contexts/ThemeContext";

type TabType = 'basic' | 'scientific' | 'converter' | 'age' | 'currency';

interface Tab {
  id: TabType;
  label: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-4 text-red-600">حدث خطأ ما. يرجى تحديث الصفحة.</div>;
    }
    return this.props.children;
  }
}

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('basic');
  const [navVisible, setNavVisible] = useState<boolean>(true);

  const tabs: Tab[] = [
    {
      id: 'basic',
      label: 'حاسبة عادية',
      icon: <CalcIcon size={24} />,
      component: <BasicCalculator />,
    },
    {
      id: 'scientific',
      label: 'حاسبة علمية',
      icon: <Beaker size={24} />,
      component: <ScientificCalculator />,
    },
    {
      id: 'converter',
      label: 'تحويل الوحدات',
      icon: <Ruler size={24} />,
      component: <UnitConverter />,
    },
    {
      id: 'currency',
      label: 'محول العملات',
      icon: <DollarSign size={24} />,
      component: <CurrencyConverter />,
    },
    {
      id: 'age',
      label: 'حاسبة العمر',
      icon: <Cake size={24} />,
      component: <AgeCalculator />,
    },
  ];

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <div className="w-screen h-screen flex flex-col bg-white">
            {/* Main Content */}
            <div className="flex-1 overflow-hidden flex flex-col">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`flex-1 w-full overflow-hidden flex flex-col ${activeTab === tab.id ? 'flex' : 'hidden'}`}
                >
                  {tab.component}
                </div>
              ))}
            </div>

            {/* Toggle Navigation Button */}
            <button
              onClick={() => setNavVisible(!navVisible)}
              className="flex-shrink-0 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 transition-all duration-200 flex items-center justify-center"
            >
              {navVisible ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
            </button>

            {/* Bottom Navigation Bar */}
            {navVisible && (
              <div className="flex-shrink-0 border-t border-slate-200 bg-white h-14">
                <div className="flex justify-around items-center h-full overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-shrink-0 h-full flex flex-col items-center justify-center gap-0.5 transition-all duration-200 px-3 ${
                        activeTab === tab.id
                          ? 'bg-blue-50 border-t-2 border-blue-500 text-blue-600'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className={activeTab === tab.id ? 'text-blue-600' : 'text-slate-600'}>
                        {tab.icon}
                      </div>
                      <span className="text-xs font-semibold whitespace-nowrap">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
