import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  changeType?: 'up' | 'down';
  color?: 'white' | 'orange' | 'blue' | 'green' | 'purple' | 'yellow' | 'red';
}

export default function StatCard({ title, value, icon: Icon, change, changeType, color = 'white' }: StatCardProps) {
  const colorClasses = {
    white: 'bg-white border-gray-200',
    orange: 'bg-orange text-white border-orange',
    blue: 'bg-dark-blue text-white border-dark-blue',
    green: 'bg-green text-white border-green',
    purple: 'bg-purple text-white border-purple',
    yellow: 'bg-yellow text-white border-yellow',
    red: 'bg-red text-white border-red',
  };

  const textColor = color === 'white' ? 'text-gray-800' : 'text-white';
  const subTextColor = color === 'white' ? 'text-gray-500' : 'text-white/80';

  return (
    <div className={`rounded-xl shadow-sm p-6 border ${colorClasses[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${subTextColor}`}>{title}</p>
          <p className={`text-2xl font-bold mt-2 ${textColor}`}>{value}</p>
          {change && (
            <p className={`text-xs mt-2 ${changeType === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {changeType === 'up' ? '↑' : '↓'} {change} from last month
            </p>
          )}
        </div>
        <div className={`text-4xl ${color === 'white' ? 'text-orange' : 'text-white/70'}`}>
          <Icon className="w-10 h-10" />
        </div>
      </div>
    </div>
  );
}