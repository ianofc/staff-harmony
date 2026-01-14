import { Cake, Gift } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface Birthday {
  id: string;
  name: string;
  birthDate: string;
  role: string;
  avatarUrl?: string;
}

interface BirthdayCardProps {
  birthdays: Birthday[];
}

export function BirthdayCard({ birthdays }: BirthdayCardProps) {
  const today = new Date();
  const currentMonth = today.toLocaleDateString('pt-BR', { month: 'long' });

  return (
    <div className="bg-card rounded-xl shadow-card p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-secondary/10">
          <Cake className="w-5 h-5 text-secondary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Aniversariantes</h3>
          <p className="text-sm text-muted-foreground capitalize">{currentMonth}</p>
        </div>
      </div>

      {birthdays.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          Nenhum aniversariante este mês
        </p>
      ) : (
        <div className="space-y-4">
          {birthdays.map((birthday) => {
            const birthDay = new Date(birthday.birthDate).getDate();
            const isToday = birthDay === today.getDate();

            return (
              <div 
                key={birthday.id} 
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  isToday ? 'bg-secondary/10 ring-1 ring-secondary/30' : 'hover:bg-muted/50'
                }`}
              >
                <Avatar className="w-10 h-10">
                  <AvatarImage src={birthday.avatarUrl} />
                  <AvatarFallback>
                    {birthday.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{birthday.name}</p>
                  <p className="text-sm text-muted-foreground">{birthday.role}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${isToday ? 'text-secondary' : 'text-foreground'}`}>
                    {isToday ? 'Hoje!' : `Dia ${birthDay}`}
                  </p>
                  {isToday && (
                    <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">
                      <Gift className="w-3 h-3 mr-1" />
                      Enviar
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
