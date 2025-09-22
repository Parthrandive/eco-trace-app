import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface EmissionData {
  transport: number;
  energy: number;
  food: number;
  lifestyle: number;
}

interface EmissionChartsProps {
  emissions: EmissionData;
  totalEmissions: number;
}

const EmissionCharts = ({ emissions, totalEmissions }: EmissionChartsProps) => {
  if (totalEmissions === 0) return null;

  const pieData = [
    { name: "Transport", value: emissions.transport, color: "#10b981" },
    { name: "Energy", value: emissions.energy, color: "#3b82f6" },
    { name: "Food", value: emissions.food, color: "#f59e0b" },
    { name: "Lifestyle", value: emissions.lifestyle, color: "#ef4444" }
  ].filter(item => item.value > 0);

  const barData = [
    { category: "Transport", current: emissions.transport, average: 4000 },
    { category: "Energy", current: emissions.energy, average: 5000 },
    { category: "Food", current: emissions.food, average: 3500 },
    { category: "Lifestyle", current: emissions.lifestyle, average: 3500 }
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6 animate-fade-in">
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-primary">Emissions Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={800}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value.toFixed(1)} kg CO₂`, ""]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-muted-foreground">{item.name}</span>
                <span className="font-semibold ml-auto">{item.value.toFixed(0)} kg</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-accent/5 to-warning/5 border-accent/20">
        <CardHeader>
          <CardTitle className="text-accent">vs. Global Average</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="category" 
                tick={{ fontSize: 12 }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  `${value.toFixed(0)} kg CO₂`, 
                  name === 'current' ? 'Your Emissions' : 'Global Average'
                ]}
              />
              <Legend />
              <Bar 
                dataKey="current" 
                fill="hsl(var(--primary))" 
                name="Your Emissions"
                animationDuration={800}
                animationBegin={200}
              />
              <Bar 
                dataKey="average" 
                fill="hsl(var(--muted))" 
                name="Global Average"
                animationDuration={800}
                animationBegin={400}
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 text-xs text-muted-foreground">
            <p>• Global averages based on 2023 climate data</p>
            <p>• Your goal: Stay below the global average in each category</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmissionCharts;