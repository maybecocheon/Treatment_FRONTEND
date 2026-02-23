import MainTrend from './components/MainTrend';
import OptimizationStrategy from './components/OptimizationStrategy';

export default async function SchedulingPage() {
    return (
        <div className="h-full grid grid-cols-1 xl:grid-cols-12 gap-4" >
            <div className="xl:col-span-8">
                <OptimizationStrategy />
            </div>
            <div className="xl:col-span-4 border-t pt-6 border-slate-200 xl:border-t-0 xl:pt-0 xl:border-l xl:pl-6">
                <MainTrend />
            </div>
        </div>
    );
};