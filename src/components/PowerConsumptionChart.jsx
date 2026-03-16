import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Mock data: 30 days of power consumption (kWh per day)
const generateMockData = () => {
  const data = [];
  const now = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    // Realistic-ish daily consumption: base 8–25 kWh with some variation
    const base = 12 + Math.random() * 10;
    const weekend = date.getDay() === 0 || date.getDay() === 6;
    const consumption = Math.round((base + (weekend ? 3 : 0) + (Math.random() - 0.5) * 4) * 10) / 10;

    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      fullDate: date.toLocaleDateString(),
      powerKwh: Math.max(5, Math.min(35, consumption)),
    });
  }

  return data;
};

const MOCK_DATA = generateMockData();

function PowerConsumptionChart() {
  return (
    <div className="power-chart">
      <h2 className="power-chart__title">Power consumption (last 30 days)</h2>
      <p className="power-chart__subtitle">Daily usage in kWh</p>
      <div className="power-chart__container">
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart
            data={MOCK_DATA}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="powerGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent, #646cff)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="var(--accent, #646cff)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border, #eee)" />
            <XAxis
              dataKey="date"
              tick={{ fill: 'var(--text, #333)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--border, #eee)' }}
              tickLine={{ stroke: 'var(--border, #eee)' }}
            />
            <YAxis
              unit=" kWh"
              tick={{ fill: 'var(--text, #333)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--border, #eee)' }}
              tickLine={{ stroke: 'var(--border, #eee)' }}
              domain={['dataMin - 2', 'dataMax + 2']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--surface, #fff)',
                border: '1px solid var(--border, #eee)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
              labelStyle={{ color: 'var(--text-h, #111)' }}
              formatter={(value) => [`${value} kWh`, 'Power']}
              labelFormatter={(_, payload) =>
                payload?.[0]?.payload?.fullDate ?? ''
              }
            />
            <Area
              type="monotone"
              dataKey="powerKwh"
              stroke="var(--accent, #646cff)"
              strokeWidth={2}
              fill="url(#powerGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="power-chart__summary">
        Total (30 days):{' '}
        <strong>
          {MOCK_DATA.reduce((sum, d) => sum + d.powerKwh, 0).toFixed(1)} kWh
        </strong>
      </div>
    </div>
  );
}

export default PowerConsumptionChart;
