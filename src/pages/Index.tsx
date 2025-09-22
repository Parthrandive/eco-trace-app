import CarbonCalculator from "@/components/CarbonCalculator";
import heroEarth from "@/assets/hero-earth.jpg";
import { Leaf, Target, Users, TrendingDown } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroEarth})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-secondary/80"></div>
        </div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Track Your Carbon Footprint
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in">
              Calculate your environmental impact and discover actionable ways to reduce your carbon emissions
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5" />
                <span>Science-based calculations</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                <span>Personalized recommendations</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5" />
                <span>Track your progress</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">16 tons</div>
              <div className="text-muted-foreground">Global average CO₂ per person/year</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-secondary">2°C</div>
              <div className="text-muted-foreground">Critical warming limit to avoid</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent">50%</div>
              <div className="text-muted-foreground">Emissions reduction needed by 2030</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Calculator Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <CarbonCalculator />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="w-6 h-6" />
            <span className="text-lg font-semibold">Carbon Calculator</span>
          </div>
          <p className="text-sm text-primary-foreground/80">
            Join the movement towards a sustainable future. Every action counts.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
