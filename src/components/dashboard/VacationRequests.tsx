import { Calendar, Check, X, Clock } from 'lucide-react';
import { VacationRequest } from '@/types/employee';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VacationRequestsProps {
  requests: VacationRequest[];
}

const statusConfig = {
  pendente: {
    label: 'Pendente',
    className: 'badge-warning',
    icon: Clock,
  },
  aprovado: {
    label: 'Aprovado',
    className: 'badge-success',
    icon: Check,
  },
  rejeitado: {
    label: 'Rejeitado',
    className: 'badge-danger',
    icon: X,
  },
};

export function VacationRequests({ requests }: VacationRequestsProps) {
  const pendingRequests = requests.filter(r => r.status === 'pendente');

  return (
    <div className="bg-card rounded-xl shadow-card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10">
            <Calendar className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Solicitações de Férias</h3>
            <p className="text-sm text-muted-foreground">
              {pendingRequests.length} pendente{pendingRequests.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm">Ver Todas</Button>
      </div>

      <div className="space-y-4">
        {requests.slice(0, 3).map((request) => {
          const config = statusConfig[request.status];
          const StatusIcon = config.icon;

          return (
            <div 
              key={request.id}
              className="p-4 rounded-lg border border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-xs">
                      {request.employeeName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground text-sm">{request.employeeName}</p>
                    <p className="text-xs text-muted-foreground">
                      {request.daysRequested} dias solicitados
                    </p>
                  </div>
                </div>
                <span className={cn(config.className, 'flex items-center gap-1')}>
                  <StatusIcon className="w-3 h-3" />
                  {config.label}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="text-muted-foreground">
                  <span>{new Date(request.startDate).toLocaleDateString('pt-BR')}</span>
                  <span className="mx-2">→</span>
                  <span>{new Date(request.endDate).toLocaleDateString('pt-BR')}</span>
                </div>
                {request.status === 'pendente' && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="h-7 px-2 text-success hover:text-success hover:bg-success/10">
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-7 px-2 text-destructive hover:text-destructive hover:bg-destructive/10">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
