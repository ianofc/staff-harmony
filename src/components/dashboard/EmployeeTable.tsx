import { Employee, roleLabels, statusLabels } from '@/types/employee';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface EmployeeTableProps {
  employees: Employee[];
  limit?: number;
}

const statusStyles = {
  ativo: 'badge-success',
  ferias: 'badge-info',
  afastado: 'badge-warning',
  desligado: 'badge-danger',
};

export function EmployeeTable({ employees, limit }: EmployeeTableProps) {
  const displayedEmployees = limit ? employees.slice(0, limit) : employees;

  return (
    <div className="bg-card rounded-xl shadow-card overflow-hidden animate-fade-in">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">
                Colaborador
              </th>
              <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                Cargo
              </th>
              <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                Departamento
              </th>
              <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                Status
              </th>
              <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                Admissão
              </th>
              <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedEmployees.map((employee) => (
              <tr key={employee.id} className="table-row-hover border-b border-border last:border-0">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 avatar-ring">
                      <AvatarImage src={employee.avatarUrl} alt={employee.name} />
                      <AvatarFallback>
                        {employee.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{employee.name}</p>
                      <p className="text-sm text-muted-foreground">{employee.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-foreground">
                    {roleLabels[employee.role]}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-muted-foreground">
                    {employee.department}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={cn(statusStyles[employee.status])}>
                    {statusLabels[employee.status]}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-muted-foreground">
                    {new Date(employee.hireDate).toLocaleDateString('pt-BR')}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Perfil
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remover
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
