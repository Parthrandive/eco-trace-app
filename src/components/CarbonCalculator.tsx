import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Home, UtensilsCrossed, ShoppingCart, Calculator, Leaf } from "lucide-react";

interface EmissionData {
  transport: number;
  energy: number;
  food: number;
  lifestyle: number;
}

const CarbonCalculator = () => {
  const [emissions, setEmissions] = useState<EmissionData>({
    transport: 0,
    energy: 0,
    food: 0,
    lifestyle: 0,
  });

  const [inputs, setInputs] = useState({
    carMiles: "",
    flights: "",
    electricity: "",
    gas: "",
    meatMeals: "",
    dairyServings: "",
    shopping: "",
    waste: "",
  });

  const calculateTransport = () => {
    const carEmissions = (parseFloat(inputs.carMiles) || 0) * 0.4; // kg CO2 per mile
    const flightEmissions = (parseFloat(inputs.flights) || 0) * 90; // kg CO2 per hour
    return carEmissions + flightEmissions;
  };

  const calculateEnergy = () => {
    const electricityEmissions = (parseFloat(inputs.electricity) || 0) * 0.5; // kg CO2 per kWh
    const gasEmissions = (parseFloat(inputs.gas) || 0) * 2.2; // kg CO2 per therm
    return electricityEmissions + gasEmissions;
  };

  const calculateFood = () => {
    const meatEmissions = (parseFloat(inputs.meatMeals) || 0) * 6.6; // kg CO2 per meal
    const dairyEmissions = (parseFloat(inputs.dairyServings) || 0) * 3.2; // kg CO2 per serving
    return meatEmissions + dairyEmissions;
  };

  const calculateLifestyle = () => {
    const shoppingEmissions = (parseFloat(inputs.shopping) || 0) * 0.5; // kg CO2 per dollar
    const wasteEmissions = (parseFloat(inputs.waste) || 0) * 0.8; // kg CO2 per kg waste
    return shoppingEmissions + wasteEmissions;
  };

  const updateCalculations = () => {
    setEmissions({
      transport: calculateTransport(),
      energy: calculateEnergy(),
      food: calculateFood(),
      lifestyle: calculateLifestyle(),
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const totalEmissions = Object.values(emissions).reduce((sum, val) => sum + val, 0);
  const averageAnnual = 16000; // kg CO2 global average
  const progressPercentage = Math.min((totalEmissions / averageAnnual) * 100, 100);

  const getEmissionLevel = () => {
    if (totalEmissions < 8000) return { level: "Excellent", color: "success" };
    if (totalEmissions < 16000) return { level: "Good", color: "primary" };
    if (totalEmissions < 24000) return { level: "Average", color: "warning" };
    return { level: "High", color: "destructive" };
  };

  const emissionLevel = getEmissionLevel();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Carbon Footprint Calculator</h2>
        <p className="text-muted-foreground">Track your annual CO₂ emissions and discover ways to reduce your impact</p>
      </div>

      <Tabs defaultValue="transport" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="transport" className="flex items-center gap-2">
            <Car className="w-4 h-4" />
            Transport
          </TabsTrigger>
          <TabsTrigger value="energy" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Energy
          </TabsTrigger>
          <TabsTrigger value="food" className="flex items-center gap-2">
            <UtensilsCrossed className="w-4 h-4" />
            Food
          </TabsTrigger>
          <TabsTrigger value="lifestyle" className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Lifestyle
          </TabsTrigger>
        </TabsList>

        <TabsContent value="transport" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="w-5 h-5" />
                Transportation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="carMiles">Car Miles per Year</Label>
                  <Input
                    id="carMiles"
                    type="number"
                    placeholder="e.g., 12000"
                    value={inputs.carMiles}
                    onChange={(e) => handleInputChange("carMiles", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="flights">Flight Hours per Year</Label>
                  <Input
                    id="flights"
                    type="number"
                    placeholder="e.g., 10"
                    value={inputs.flights}
                    onChange={(e) => handleInputChange("flights", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="energy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                Home Energy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="electricity">Electricity (kWh/month)</Label>
                  <Input
                    id="electricity"
                    type="number"
                    placeholder="e.g., 900"
                    value={inputs.electricity}
                    onChange={(e) => handleInputChange("electricity", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gas">Natural Gas (therms/month)</Label>
                  <Input
                    id="gas"
                    type="number"
                    placeholder="e.g., 50"
                    value={inputs.gas}
                    onChange={(e) => handleInputChange("gas", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="food" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UtensilsCrossed className="w-5 h-5" />
                Diet & Food
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="meatMeals">Meat Meals per Week</Label>
                  <Input
                    id="meatMeals"
                    type="number"
                    placeholder="e.g., 7"
                    value={inputs.meatMeals}
                    onChange={(e) => handleInputChange("meatMeals", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dairyServings">Dairy Servings per Day</Label>
                  <Input
                    id="dairyServings"
                    type="number"
                    placeholder="e.g., 3"
                    value={inputs.dairyServings}
                    onChange={(e) => handleInputChange("dairyServings", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lifestyle" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Lifestyle & Consumption
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shopping">Shopping per Month ($)</Label>
                  <Input
                    id="shopping"
                    type="number"
                    placeholder="e.g., 500"
                    value={inputs.shopping}
                    onChange={(e) => handleInputChange("shopping", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waste">Waste per Week (kg)</Label>
                  <Input
                    id="waste"
                    type="number"
                    placeholder="e.g., 20"
                    value={inputs.waste}
                    onChange={(e) => handleInputChange("waste", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center">
        <Button onClick={updateCalculations} className="px-8 py-6 text-lg" size="lg">
          <Calculator className="w-5 h-5 mr-2" />
          Calculate My Footprint
        </Button>
      </div>

      {totalEmissions > 0 && (
        <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Leaf className="w-6 h-6" />
              Your Carbon Footprint Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {totalEmissions.toFixed(1)} kg CO₂
              </div>
              <div className="text-lg text-muted-foreground">per year</div>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                emissionLevel.color === 'success' ? 'bg-success/10 text-success' :
                emissionLevel.color === 'primary' ? 'bg-primary/10 text-primary' :
                emissionLevel.color === 'warning' ? 'bg-warning/10 text-warning' :
                'bg-destructive/10 text-destructive'
              }`}>
                {emissionLevel.level}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Your footprint vs. global average</span>
                <span>{progressPercentage.toFixed(0)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <div className="text-xs text-muted-foreground text-center">
                Global average: {averageAnnual.toLocaleString()} kg CO₂/year
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-card rounded-lg border">
                <Car className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="font-semibold">{emissions.transport.toFixed(1)}</div>
                <div className="text-xs text-muted-foreground">Transport</div>
              </div>
              <div className="text-center p-3 bg-card rounded-lg border">
                <Home className="w-8 h-8 mx-auto mb-2 text-secondary" />
                <div className="font-semibold">{emissions.energy.toFixed(1)}</div>
                <div className="text-xs text-muted-foreground">Energy</div>
              </div>
              <div className="text-center p-3 bg-card rounded-lg border">
                <UtensilsCrossed className="w-8 h-8 mx-auto mb-2 text-accent" />
                <div className="font-semibold">{emissions.food.toFixed(1)}</div>
                <div className="text-xs text-muted-foreground">Food</div>
              </div>
              <div className="text-center p-3 bg-card rounded-lg border">
                <ShoppingCart className="w-8 h-8 mx-auto mb-2 text-warning" />
                <div className="font-semibold">{emissions.lifestyle.toFixed(1)}</div>
                <div className="text-xs text-muted-foreground">Lifestyle</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {totalEmissions > 0 && (
        <Card className="bg-gradient-to-br from-success/5 to-primary/5 border-success/20">
          <CardHeader>
            <CardTitle className="text-success">💡 Reduction Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Transport</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Use public transport or bike</li>
                  <li>• Consider electric vehicles</li>
                  <li>• Reduce air travel</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-secondary">Energy</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Switch to renewable energy</li>
                  <li>• Improve home insulation</li>
                  <li>• Use energy-efficient appliances</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-accent">Food</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Reduce meat consumption</li>
                  <li>• Choose local, seasonal produce</li>
                  <li>• Minimize food waste</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-warning">Lifestyle</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Buy less, choose quality</li>
                  <li>• Recycle and compost</li>
                  <li>• Support sustainable brands</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CarbonCalculator;