import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  DollarSign, 
  Package, 
  Users, 
  Star, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp 
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar 
} from 'recharts';
import Button from '../../components/ui/Button';

const KPI_DATA = [
  { label: 'Gross Merchandise Value (GMV)', value: '₹42,80,000', change: '+24.5%', icon: DollarSign, color: 'bg-blush text-rose-deep' },
  { label: 'Active Pipeline Orders', value: '184 Outfits', change: '+12%', icon: Package, color: 'bg-lavender text-plum' },
  { label: 'Verified Master Tailors', value: '350 Karigars', change: '+18 this mo', icon: Users, color: 'bg-mint text-emerald-900' },
  { label: 'Client Satisfaction Index', value: '4.95 / 5', change: '99.4% SLA', icon: Star, color: 'bg-butter text-amber-900' },
];

const REVENUE_SERIES = [
  { month: 'Apr', revenue: 18000, orders: 42 },
  { month: 'May', revenue: 24000, orders: 58 },
  { month: 'Jun', revenue: 31000, orders: 74 },
  { month: 'Jul', revenue: 38000, orders: 96 },
  { month: 'Aug', revenue: 49000, orders: 128 },
  { month: 'Sep', revenue: 64000, orders: 184 },
];

export const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-4xl bg-gradient-to-r from-sky/50 via-cream to-lavender/30 border border-sky-dark/40 p-6 sm:p-8 shadow-pastel-sky flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-950 bg-white/80 px-3 py-1 rounded-full shadow-xs">
            Marketplace Control Console
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-plum mt-2">
            Operations & Health Overview
          </h1>
          <p className="text-xs sm:text-sm text-plum-soft mt-1">
            System Actors: AI Service (Online) • Courier Concierge (98.6% On-time)
          </p>
        </div>

        <Button
          onClick={() => navigate('/admin/tailors')}
          variant="admin"
          size="md"
          icon={AlertCircle}
        >
          Review 1 Pending KYC Application
        </Button>
      </div>

      {/* 4 KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_DATA.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="p-5 rounded-3xl bg-white/85 border border-sky-dark/30 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${kpi.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-mint/50 px-2 py-0.5 rounded-full flex items-center">
                    <TrendingUp className="w-3 h-3 mr-0.5" />
                    {kpi.change}
                  </span>
                </div>
                <div className="font-serif text-2xl font-bold text-plum">
                  {kpi.value}
                </div>
              </div>
              <div className="text-xs text-plum-soft mt-2">{kpi.label}</div>
            </div>
          );
        })}
      </div>

      {/* Recharts Analytics Section */}
      <div className="rounded-4xl bg-white/85 border border-sky-dark/30 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-blush/60">
          <div>
            <h3 className="font-serif text-lg font-bold text-plum">
              Marketplace Monthly GMV Growth
            </h3>
            <p className="text-xs text-plum-soft">
              Direct commission flow across 42 Indian craft clusters (in ₹ thousands)
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-mint px-3 py-1 rounded-full">
            +32% QoQ
          </span>
        </div>

        {/* Recharts Responsive Area Chart */}
        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={REVENUE_SERIES}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D9718A" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#D9718A" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#8A7F9C" fontSize={11} tickLine={false} />
              <YAxis stroke="#8A7F9C" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFF9F5',
                  borderRadius: '16px',
                  border: '1px solid #F9D5DC',
                  boxShadow: '0 8px 30px rgba(249, 213, 220, 0.4)',
                  fontSize: '12px',
                  color: '#4A3F5C',
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                name="GMV (₹k)"
                stroke="#D9718A"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
