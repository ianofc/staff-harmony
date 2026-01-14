import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Cake, Gift, Mail, ChevronLeft, ChevronRight, PartyPopper } from 'lucide-react';
import { mockEmployees } from '@/data/mockData';
import { roleLabels } from '@/types/employee';
import { cn } from '@/lib/utils';

const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export default function Aniversariantes() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const today = new Date();

  const birthdaysInMonth = mockEmployees
    .filter((employee) => {
      const birthMonth = new Date(employee.birthDate).getMonth();
      return birthMonth === selectedMonth;
    })
    .sort((a, b) => {
      const dayA = new Date(a.birthDate).getDate();
      const dayB = new Date(b.birthDate).getDate();
      return dayA - dayB;
    });

  const previousMonth = () => {
    setSelectedMonth((prev) => (prev === 0 ? 11 : prev - 1));
  };

  const nextMonth = () => {
    setSelectedMonth((prev) => (prev === 11 ? 0 : prev + 1));
  };

  const isToday = (birthDate: string) => {
    const date = new Date(birthDate);
    return date.getDate() === today.getDate() && selectedMonth === today.getMonth();
  };

  return (
    <MainLayout
      title="Aniversariantes"
      subtitle="Celebre com a equipe"
    >
      {/* Month Navigation */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={previousMonth}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3 min-w-48 justify-center">
          <PartyPopper className="w-6 h-6 text-secondary" />
          <h2 className="text-2xl font-semibold text-foreground">{months[selectedMonth]}</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={nextMonth}>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Birthday Cards */}
      {birthdaysInMonth.length === 0 ? (
        <div className="text-center py-16">
          <Cake className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">
            Nenhum aniversariante em {months[selectedMonth]}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {birthdaysInMonth.map((employee) => {
            const birthDay = new Date(employee.birthDate).getDate();
            const isBirthdayToday = isToday(employee.birthDate);

            return (
              <Card 
                key={employee.id}
                className={cn(
                  'overflow-hidden transition-all duration-300 hover:shadow-card-hover',
                  isBirthdayToday && 'ring-2 ring-secondary shadow-lg'
                )}
              >
                {isBirthdayToday && (
                  <div className="bg-gradient-to-r from-secondary to-amber-400 text-secondary-foreground text-center py-2 text-sm font-medium">
                    🎉 Aniversariante do Dia! 🎉
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16 ring-2 ring-primary/10">
                      <AvatarImage src={employee.avatarUrl} alt={employee.name} />
                      <AvatarFallback className="text-lg">
                        {employee.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{employee.name}</h3>
                      <p className="text-sm text-muted-foreground">{roleLabels[employee.role]}</p>
                      <p className="text-sm text-muted-foreground">{employee.department}</p>
                      
                      <div className="flex items-center gap-2 mt-3">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                          <Cake className="w-4 h-4" />
                          Dia {birthDay}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                    <Button variant="outline" size="sm" className="flex-1 gap-1.5">
                      <Mail className="w-4 h-4" />
                      Parabenizar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 gap-1.5">
                      <Gift className="w-4 h-4" />
                      Presente
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Summary */}
      <div className="mt-8 p-4 bg-muted/50 rounded-lg text-center">
        <p className="text-muted-foreground">
          <span className="font-semibold text-foreground">{birthdaysInMonth.length}</span> aniversariante{birthdaysInMonth.length !== 1 ? 's' : ''} em {months[selectedMonth]}
        </p>
      </div>
    </MainLayout>
  );
}
