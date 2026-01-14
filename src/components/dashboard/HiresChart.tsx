import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface HiresData {
  month: string;
  hires: number;
  terminations: number;
}

interface HiresChartProps {
  data: HiresData[];
}

export function HiresChart({ data }: HiresChartProps) {
  return (
    <div className="bg-card rounded-xl shadow-card p-6 animate-fade-in">
      <h3 className="font-semibold text-foreground mb-6">Admissões e Desligamentos</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={4}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false}
              stroke="hsl(var(--border))"
            />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: 'var(--shadow-md)',
              }}
              cursor={{ fill: 'hsl(var(--muted) / 0.3)' }}
            />
            <Legend 
              iconType="circle"
              wrapperStyle={{ paddingTop: '16px' }}
            />
            <Bar 
              dataKey="hires" 
              name="Admissões"
              fill="hsl(var(--success))" 
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
            <Bar 
              dataKey="terminations" 
              name="Desligamentos"
              fill="hsl(var(--destructive))" 
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
