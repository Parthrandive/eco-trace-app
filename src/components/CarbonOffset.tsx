import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DollarSign, TreePine, Plane, Zap } from "lucide-react";

interface CarbonOffsetProps {
  totalEmissions: number;
}

const CarbonOffset = ({ totalEmissions }: CarbonOffsetProps) => {
  if (totalEmissions === 0) return null;

  // Average offset costs per ton CO₂
  const forestationCost = 15; // $15 per ton
  const renewableCost = 25; // $25 per ton
  const directCaptureCost = 100; // $100 per ton

  const emissionsInTons = totalEmissions / 1000;

  const offsetOptions = [
    {
      title: "Tree Planting",
      description: "Support reforestation projects",
      icon: TreePine,
      cost: forestationCost,
      totalCost: emissionsInTons * forestationCost,
      color: "success",
      timeframe: "20+ years impact"
    },
    {
      title: "Renewable Energy",
      description: "Fund solar & wind projects",
      icon: Zap,
      cost: renewableCost,
      totalCost: emissionsInTons * renewableCost,
      color: "primary",
      timeframe: "Immediate impact"
    },
    {
      title: "Direct Air Capture",
      description: "Advanced carbon removal technology",
      icon: Plane,
      cost: directCaptureCost,
      totalCost: emissionsInTons * directCaptureCost,
      color: "secondary",
      timeframe: "Permanent removal"
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-secondary/5 to-accent/5 border-secondary/20 animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-secondary">
          <DollarSign className="w-6 h-6" />
          Carbon Offset Calculator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Offset your {emissionsInTons.toFixed(1)} tons of CO₂ emissions
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {offsetOptions.map((option, index) => {
          const IconComponent = option.icon;
          return (
            <div
              key={option.title}
              className="animate-slide-in-right"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center justify-between p-4 rounded-lg bg-card border transition-all duration-200 hover:shadow-card hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full bg-${option.color}/20`}>
                    <IconComponent className={`w-5 h-5 text-${option.color}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold">{option.title}</h4>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{option.timeframe}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">
                    ${option.totalCost.toFixed(0)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ${option.cost}/ton
                  </div>
                </div>
              </div>
              {index < offsetOptions.length - 1 && <Separator className="my-2" />}
            </div>
          );
        })}
        
        <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-primary">Recommended Option</h4>
              <p className="text-sm text-muted-foreground">Balanced cost and impact</p>
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
              ${offsetOptions[1].totalCost.toFixed(0)} - Tree Planting + Renewables
            </Badge>
          </div>
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Offset costs are estimates based on current market rates</p>
          <p>• Combining multiple offset types provides the best impact</p>
          <p>• Reducing emissions is always better than offsetting</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarbonOffset;