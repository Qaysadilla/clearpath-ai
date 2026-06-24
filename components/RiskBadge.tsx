import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';
import { AnalysisResult } from '@/lib/types';

interface RiskBadgeProps {
  riskLevel: AnalysisResult['riskLevel'];
  riskExplanation: string;
}

export default function RiskBadge({ riskLevel, riskExplanation }: RiskBadgeProps) {
  const getRiskConfig = () => {
    switch (riskLevel) {
      case 'high':
        return {
          icon: <AlertTriangle className="w-6 h-6" />,
          badge: <Badge variant="destructive" className="text-lg px-4 py-1">HIGH RISK</Badge>,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200'
        };
      case 'medium':
        return {
          icon: <AlertCircle className="w-6 h-6" />,
          badge: <Badge className="bg-orange-500 hover:bg-orange-600 text-lg px-4 py-1">MEDIUM RISK</Badge>,
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200'
        };
      case 'low':
        return {
          icon: <CheckCircle className="w-6 h-6" />,
          badge: <Badge className="bg-green-500 hover:bg-green-600 text-lg px-4 py-1">LOW RISK</Badge>,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        };
    }
  };

  const config = getRiskConfig();

  return (
    <Card className={`${config.borderColor} border-2`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className={config.color}>{config.icon}</span>
          Risk Level
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          {config.badge}
        </div>
        <div className={`${config.bgColor} p-4 rounded-lg border ${config.borderColor}`}>
          <p className="text-sm text-gray-700 leading-relaxed">{riskExplanation}</p>
        </div>
      </CardContent>
    </Card>
  );
}

// Made with Bob
