import { Link } from 'react-router-dom';
import { 
  UserPlus, 
  Calendar, 
  FileText, 
  Stethoscope,
  FileSpreadsheet,
  Send,
  ClipboardList,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

const actions = [
  {
    icon: UserPlus,
    label: 'Nova Admissão',
    description: 'Cadastrar colaborador',
    path: '/colaboradores/admissao',
    color: 'bg-primary/10 text-primary hover:bg-primary/20',
  },
  {
    icon: Calendar,
    label: 'Agendar Férias',
    description: 'Programar período',
    path: '/ferias/solicitacoes',
    color: 'bg-accent/10 text-accent hover:bg-accent/20',
  },
  {
    icon: FileText,
    label: 'Gerar Contrato',
    description: 'Novo documento',
    path: '/documentos/contratos',
    color: 'bg-secondary/10 text-secondary hover:bg-secondary/20',
  },
  {
    icon: Stethoscope,
    label: 'Exame Médico',
    description: 'Agendar exame',
    path: '/saude/exames',
    color: 'bg-success/10 text-success hover:bg-success/20',
  },
  {
    icon: Send,
    label: 'Enviar Holerite',
    description: 'Distribuir documentos',
    path: '/documentos/holerites',
    color: 'bg-info/10 text-info hover:bg-info/20',
  },
  {
    icon: ClipboardList,
    label: 'Novo Atestado',
    description: 'Registrar afastamento',
    path: '/saude/atestados',
    color: 'bg-warning/10 text-warning-foreground hover:bg-warning/20',
  },
  {
    icon: FileSpreadsheet,
    label: 'Relatório',
    description: 'Gerar relatório',
    path: '/documentos/relatorios',
    color: 'bg-chart-5/10 text-chart-5 hover:bg-chart-5/20',
  },
  {
    icon: Users,
    label: 'Ver Equipe',
    description: 'Lista completa',
    path: '/colaboradores',
    color: 'bg-muted text-foreground hover:bg-muted/80',
  },
];

export function QuickActions() {
  return (
    <div className="bg-card rounded-xl shadow-card p-6 animate-fade-in">
      <h3 className="font-semibold text-foreground mb-4">Ações Rápidas</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {actions.map((action) => (
          <Link
            key={action.label}
            to={action.path}
            className={cn(
              'flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200 group',
              action.color
            )}
          >
            <action.icon className="w-6 h-6 transition-transform group-hover:scale-110" />
            <div className="text-center">
              <p className="font-medium text-sm">{action.label}</p>
              <p className="text-xs opacity-70">{action.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
