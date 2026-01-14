export type EmployeeRole = 
  | 'professor'
  | 'coordenador'
  | 'diretor'
  | 'vice_diretor'
  | 'psicologo'
  | 'cozinha'
  | 'portaria'
  | 'seguranca'
  | 'administrativo'
  | 'limpeza'
  | 'manutencao';

export type EmployeeStatus = 'ativo' | 'ferias' | 'afastado' | 'desligado';

export type ContractType = 'clt' | 'pj' | 'temporario' | 'estagio';

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  rg: string;
  birthDate: string;
  hireDate: string;
  role: EmployeeRole;
  department: string;
  status: EmployeeStatus;
  contractType: ContractType;
  salary: number;
  avatarUrl?: string;
  address?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  bankInfo?: {
    bank: string;
    agency: string;
    account: string;
    accountType: 'corrente' | 'poupanca';
  };
  documents?: {
    ctps?: string;
    pis?: string;
    voterRegistration?: string;
  };
}

export interface VacationRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  startDate: string;
  endDate: string;
  status: 'pendente' | 'aprovado' | 'rejeitado';
  daysRequested: number;
  daysAvailable: number;
  createdAt: string;
}

export interface MedicalCertificate {
  id: string;
  employeeId: string;
  employeeName: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  cid?: string;
  doctorName: string;
  crm: string;
  status: 'pendente' | 'validado' | 'rejeitado';
  createdAt: string;
}

export const roleLabels: Record<EmployeeRole, string> = {
  professor: 'Professor(a)',
  coordenador: 'Coordenador(a)',
  diretor: 'Diretor(a)',
  vice_diretor: 'Vice-Diretor(a)',
  psicologo: 'Psicólogo(a)',
  cozinha: 'Cozinha',
  portaria: 'Portaria',
  seguranca: 'Segurança',
  administrativo: 'Administrativo',
  limpeza: 'Limpeza',
  manutencao: 'Manutenção',
};

export const statusLabels: Record<EmployeeStatus, string> = {
  ativo: 'Ativo',
  ferias: 'Férias',
  afastado: 'Afastado',
  desligado: 'Desligado',
};

export const contractTypeLabels: Record<ContractType, string> = {
  clt: 'CLT',
  pj: 'PJ',
  temporario: 'Temporário',
  estagio: 'Estágio',
};
