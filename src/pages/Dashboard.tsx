import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { EmployeeTable } from '@/components/dashboard/EmployeeTable';
import { BirthdayCard } from '@/components/dashboard/BirthdayCard';
import { VacationRequests } from '@/components/dashboard/VacationRequests';
import { DepartmentChart } from '@/components/dashboard/DepartmentChart';
import { HiresChart } from '@/components/dashboard/HiresChart';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { 
  Users, 
  UserCheck, 
  Palmtree, 
  AlertCircle, 
  TrendingDown, 
  Clock,
  Calendar,
  Stethoscope
} from 'lucide-react';
import { 
  mockEmployees, 
  mockVacationRequests, 
  hrIndicators, 
  departmentDistribution,
  monthlyHires
} from '@/data/mockData';

const birthdaysThisMonth = [
  { 
    id: '5', 
    name: 'Fernanda Costa Almeida', 
    birthDate: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-25`, 
    role: 'Professor(a)',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop'
  },
];

export default function Dashboard() {
  return (
    <MainLayout 
      title="Dashboard" 
      subtitle="Visão geral do departamento de RH"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total de Colaboradores"
          value={hrIndicators.totalEmployees}
          subtitle="Ativos e inativos"
          icon={Users}
          variant="primary"
        />
        <StatCard
          title="Colaboradores Ativos"
          value={hrIndicators.activeEmployees}
          subtitle={`${Math.round((hrIndicators.activeEmployees / hrIndicators.totalEmployees) * 100)}% do total`}
          icon={UserCheck}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Em Férias"
          value={hrIndicators.onVacation}
          subtitle="Atualmente"
          icon={Palmtree}
        />
        <StatCard
          title="Afastados"
          value={hrIndicators.onLeave}
          subtitle="Licença médica"
          icon={AlertCircle}
          variant={hrIndicators.onLeave > 2 ? 'warning' : 'default'}
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <QuickActions />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <HiresChart data={monthlyHires} />
        <DepartmentChart data={departmentDistribution} />
      </div>

      {/* Indicators Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Taxa de Turnover"
          value={`${hrIndicators.turnoverRate}%`}
          subtitle="Últimos 12 meses"
          icon={TrendingDown}
          trend={{ value: 0.5, isPositive: false }}
        />
        <StatCard
          title="Absenteísmo"
          value={`${hrIndicators.absenteeismRate}%`}
          subtitle="Média mensal"
          icon={Clock}
        />
        <StatCard
          title="Férias Pendentes"
          value={hrIndicators.pendingVacations}
          subtitle="Aguardando aprovação"
          icon={Calendar}
          variant={hrIndicators.pendingVacations > 3 ? 'warning' : 'default'}
        />
        <StatCard
          title="Exames Vencendo"
          value={hrIndicators.pendingMedicalExams}
          subtitle="Próximos 30 dias"
          icon={Stethoscope}
          variant={hrIndicators.pendingMedicalExams > 2 ? 'danger' : 'default'}
        />
      </div>

      {/* Content Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <VacationRequests requests={mockVacationRequests} />
        </div>
        <BirthdayCard birthdays={birthdaysThisMonth} />
      </div>

      {/* Employees Table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Colaboradores Recentes</h2>
          <a href="/colaboradores" className="text-sm text-primary hover:underline">
            Ver todos →
          </a>
        </div>
        <EmployeeTable employees={mockEmployees} limit={5} />
      </div>
    </MainLayout>
  );
}
