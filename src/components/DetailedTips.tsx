import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Lightbulb, Zap, Leaf, Globe } from "lucide-react";
import { useState } from "react";

interface EmissionData {
  transport: number;
  energy: number;
  food: number;
  lifestyle: number;
}

interface DetailedTipsProps {
  emissions: EmissionData;
  totalEmissions: number;
}

const DetailedTips = ({ emissions, totalEmissions }: DetailedTipsProps) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  if (totalEmissions === 0) return null;

  const getHighestEmissionCategory = () => {
    const categories = [
      { name: 'transport', value: emissions.transport, icon: Globe },
      { name: 'energy', value: emissions.energy, icon: Zap },
      { name: 'food', value: emissions.food, icon: Leaf },
      { name: 'lifestyle', value: emissions.lifestyle, icon: Lightbulb }
    ];
    return categories.reduce((max, cat) => cat.value > max.value ? cat : max);
  };

  const highestCategory = getHighestEmissionCategory();

  const tipSections = [
    {
      id: 'transport',
      title: 'Transportation',
      icon: Globe,
      color: 'primary',
      emissions: emissions.transport,
      tips: [
        { action: 'Walk or bike for trips under 3 miles', impact: 'High', savings: '2,400 kg CO₂/year' },
        { action: 'Use public transportation', impact: 'High', savings: '1,800 kg CO₂/year' },
        { action: 'Work from home 2 days/week', impact: 'Medium', savings: '1,200 kg CO₂/year' },
        { action: 'Combine errands into one trip', impact: 'Medium', savings: '600 kg CO₂/year' },
        { action: 'Maintain proper tire pressure', impact: 'Low', savings: '300 kg CO₂/year' },
        { action: 'Consider electric or hybrid vehicle', impact: 'Very High', savings: '3,500 kg CO₂/year' }
      ]
    },
    {
      id: 'energy',
      title: 'Home Energy',
      icon: Zap,
      color: 'secondary',
      emissions: emissions.energy,
      tips: [
        { action: 'Switch to LED lighting', impact: 'Medium', savings: '400 kg CO₂/year' },
        { action: 'Use programmable thermostat', impact: 'High', savings: '800 kg CO₂/year' },
        { action: 'Air dry clothes instead of using dryer', impact: 'Medium', savings: '500 kg CO₂/year' },
        { action: 'Unplug electronics when not in use', impact: 'Low', savings: '200 kg CO₂/year' },
        { action: 'Improve home insulation', impact: 'Very High', savings: '1,500 kg CO₂/year' },
        { action: 'Install solar panels', impact: 'Very High', savings: '2,000 kg CO₂/year' }
      ]
    },
    {
      id: 'food',
      title: 'Diet & Food',
      icon: Leaf,
      color: 'accent',
      emissions: emissions.food,
      tips: [
        { action: 'Reduce meat consumption by 50%', impact: 'Very High', savings: '1,200 kg CO₂/year' },
        { action: 'Buy local, seasonal produce', impact: 'Medium', savings: '500 kg CO₂/year' },
        { action: 'Reduce food waste by meal planning', impact: 'High', savings: '800 kg CO₂/year' },
        { action: 'Start a home compost bin', impact: 'Medium', savings: '300 kg CO₂/year' },
        { action: 'Choose organic when possible', impact: 'Low', savings: '200 kg CO₂/year' },
        { action: 'Grow your own herbs and vegetables', impact: 'Low', savings: '150 kg CO₂/year' }
      ]
    },
    {
      id: 'lifestyle',
      title: 'Lifestyle & Consumption',
      icon: Lightbulb,
      color: 'warning',
      emissions: emissions.lifestyle,
      tips: [
        { action: 'Buy second-hand clothing', impact: 'Medium', savings: '400 kg CO₂/year' },
        { action: 'Repair items instead of replacing', impact: 'Medium', savings: '600 kg CO₂/year' },
        { action: 'Use digital receipts and bills', impact: 'Low', savings: '100 kg CO₂/year' },
        { action: 'Choose quality over quantity', impact: 'High', savings: '800 kg CO₂/year' },
        { action: 'Share or rent instead of buying', impact: 'Medium', savings: '500 kg CO₂/year' },
        { action: 'Recycle electronics properly', impact: 'Low', savings: '200 kg CO₂/year' }
      ]
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Very High': return 'bg-success/10 text-success border-success/30';
      case 'High': return 'bg-primary/10 text-primary border-primary/30';
      case 'Medium': return 'bg-warning/10 text-warning border-warning/30';
      case 'Low': return 'bg-muted/40 text-muted-foreground border-muted/60';
      default: return 'bg-muted/40 text-muted-foreground border-muted/60';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-success/5 to-primary/5 border-success/20 animate-scale-in">
      <CardHeader>
        <CardTitle className="text-success flex items-center gap-2">
          <Lightbulb className="w-6 h-6" />
          Personalized Action Plan
        </CardTitle>
        {highestCategory.value > 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <highestCategory.icon className="w-4 h-4" />
            <span>Focus area: {highestCategory.name} ({highestCategory.value.toFixed(0)} kg CO₂)</span>
            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
              Priority
            </Badge>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {tipSections.map((section, index) => {
          const IconComponent = section.icon;
          const isOpen = openSections[section.id];
          const isPriority = section.id === highestCategory.name;
          
          return (
            <Collapsible 
              key={section.id} 
              open={isOpen} 
              onOpenChange={() => toggleSection(section.id)}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className={`w-full justify-between p-4 h-auto border rounded-lg transition-all duration-200 hover:shadow-md ${
                    isPriority ? 'bg-destructive/5 border-destructive/30' : 'bg-card border-border'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full bg-${section.color}/20`}>
                      <IconComponent className={`w-5 h-5 text-${section.color}`} />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold">{section.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {section.emissions.toFixed(0)} kg CO₂ • {section.tips.length} tips
                      </p>
                    </div>
                    {isPriority && (
                      <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
                        Priority
                      </Badge>
                    )}
                  </div>
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4">
                <div className="space-y-3 mt-3">
                  {section.tips.map((tip, tipIndex) => (
                    <div 
                      key={tipIndex}
                      className="flex items-center justify-between p-3 bg-card border rounded-lg hover:shadow-sm transition-all duration-200 animate-fade-in"
                      style={{ animationDelay: `${tipIndex * 50}ms` }}
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{tip.action}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Potential savings: {tip.savings}
                        </p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getImpactColor(tip.impact)}`}
                      >
                        {tip.impact} Impact
                      </Badge>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
        
        <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <h4 className="font-semibold text-primary mb-2">Quick Start Recommendations</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Start with 2-3 "High Impact" actions from your priority category</li>
            <li>• Track your progress monthly to stay motivated</li>
            <li>• Small changes add up - every action matters!</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailedTips;