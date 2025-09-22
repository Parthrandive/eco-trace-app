import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Award, Target } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  threshold: number;
  achieved: boolean;
  color: string;
}

interface AchievementSystemProps {
  totalEmissions: number;
  emissions: {
    transport: number;
    energy: number;
    food: number;
    lifestyle: number;
  };
}

const AchievementSystem = ({ totalEmissions, emissions }: AchievementSystemProps) => {
  const achievements: Achievement[] = [
    {
      id: "low_transport",
      title: "Eco Commuter",
      description: "Keep transport emissions under 2000 kg CO₂/year",
      icon: Target,
      threshold: 2000,
      achieved: emissions.transport < 2000,
      color: "success"
    },
    {
      id: "energy_efficient",
      title: "Energy Saver",
      description: "Maintain energy emissions under 3000 kg CO₂/year",
      icon: Star,
      threshold: 3000,
      achieved: emissions.energy < 3000,
      color: "primary"
    },
    {
      id: "sustainable_diet",
      title: "Plant Hero",
      description: "Keep food emissions under 2500 kg CO₂/year",
      icon: Award,
      threshold: 2500,
      achieved: emissions.food < 2500,
      color: "accent"
    },
    {
      id: "climate_champion",
      title: "Climate Champion",
      description: "Total emissions under 8000 kg CO₂/year",
      icon: Trophy,
      threshold: 8000,
      achieved: totalEmissions < 8000,
      color: "success"
    }
  ];

  const achievedCount = achievements.filter(a => a.achieved).length;

  if (totalEmissions === 0) return null;

  return (
    <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20 animate-scale-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-accent">
          <Trophy className="w-6 h-6" />
          Achievements ({achievedCount}/{achievements.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            return (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  achievement.achieved
                    ? `bg-${achievement.color}/10 border-${achievement.color}/30 animate-pulse`
                    : 'bg-muted/20 border-muted/40 opacity-60'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${
                    achievement.achieved 
                      ? `bg-${achievement.color}/20` 
                      : 'bg-muted/40'
                  }`}>
                    <IconComponent className={`w-5 h-5 ${
                      achievement.achieved 
                        ? `text-${achievement.color}` 
                        : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm">{achievement.title}</h4>
                      {achievement.achieved && (
                        <Badge variant="outline" className={`text-xs bg-${achievement.color}/10 text-${achievement.color} border-${achievement.color}/30 animate-bounce`}>
                          ✓ Achieved
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {achievement.description}
                    </p>
                    {!achievement.achieved && (
                      <div className="mt-2">
                        <div className="text-xs text-muted-foreground">
                          Target: {achievement.threshold.toLocaleString()} kg CO₂
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementSystem;