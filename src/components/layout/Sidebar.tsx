import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  ClipboardCheck,
  Briefcase,
  Heart,
  TrendingUp,
  Settings,
  HelpCircle,
  Wallet,
  GraduationCap,
  MessageSquare,
  FolderKanban,
  FileSpreadsheet,
  ChevronDown,
  ChevronRight,
  Building2,
  Cake,
  Stethoscope,
  UserPlus,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path?: string;
  submenu?: { label: string; path: string }[];
}

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { 
    icon: Users, 
    label: 'Colaboradores',
    submenu: [
      { label: 'Lista de Colaboradores', path: '/colaboradores' },
      { label: 'Nova Admissão', path: '/colaboradores/admissao' },
      { label: 'Aniversariantes', path: '/colaboradores/aniversariantes' },
    ]
  },
  { 
    icon: Calendar, 
    label: 'Férias',
    submenu: [
      { label: 'Solicitações', path: '/ferias/solicitacoes' },
      { label: 'Calendário', path: '/ferias/calendario' },
      { label: 'Programação', path: '/ferias/programacao' },
    ]
  },
  { 
    icon: Stethoscope, 
    label: 'Saúde',
    submenu: [
      { label: 'Atestados Médicos', path: '/saude/atestados' },
      { label: 'Exames Periódicos', path: '/saude/exames' },
      { label: 'Aptidão', path: '/saude/aptidao' },
    ]
  },
  { 
    icon: FileText, 
    label: 'Documentos',
    submenu: [
      { label: 'Contratos', path: '/documentos/contratos' },
      { label: 'Holerites', path: '/documentos/holerites' },
      { label: 'Relatórios', path: '/documentos/relatorios' },
    ]
  },
  { icon: Wallet, label: 'Folha de Pagamento', path: '/folha-pagamento' },
  { icon: GraduationCap, label: 'Competências', path: '/competencias' },
  { icon: FolderKanban, label: 'Projetos', path: '/projetos' },
  { icon: MessageSquare, label: 'Ouvidoria', path: '/ouvidoria' },
  { icon: TrendingUp, label: 'Indicadores', path: '/indicadores' },
  { icon: FileSpreadsheet, label: 'Currículos', path: '/curriculos' },
  { icon: Building2, label: 'Contabilidade', path: '/contabilidade' },
];

const bottomMenuItems: MenuItem[] = [
  { icon: Settings, label: 'Configurações', path: '/configuracoes' },
  { icon: HelpCircle, label: 'Suporte', path: '/suporte' },
];

export function Sidebar() {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(['Colaboradores']);

  const toggleExpand = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isSubmenuActive = (submenu?: { label: string; path: string }[]) => {
    if (!submenu) return false;
    return submenu.some(item => location.pathname.startsWith(item.path));
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <GraduationCap className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-semibold text-sidebar-foreground">EduRH</h1>
          <p className="text-xs text-sidebar-foreground/60">Gestão de Pessoas</p>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => toggleExpand(item.label)}
                    className={cn(
                      'sidebar-item w-full justify-between',
                      (expandedItems.includes(item.label) || isSubmenuActive(item.submenu)) && 'bg-sidebar-accent text-sidebar-foreground'
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </span>
                    {expandedItems.includes(item.label) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  {expandedItems.includes(item.label) && (
                    <ul className="mt-1 ml-5 pl-4 border-l border-sidebar-border space-y-1">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.path}>
                          <Link
                            to={subItem.path}
                            className={cn(
                              'block px-3 py-2 text-sm rounded-lg transition-colors',
                              isActive(subItem.path)
                                ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                                : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent'
                            )}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path!}
                  className={cn(
                    'sidebar-item',
                    isActive(item.path) && 'sidebar-item-active'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-sidebar-border px-3 py-4">
        <ul className="space-y-1">
          {bottomMenuItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.path!}
                className={cn(
                  'sidebar-item',
                  isActive(item.path) && 'sidebar-item-active'
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <button className="sidebar-item w-full text-destructive hover:bg-destructive/10">
              <LogOut className="w-5 h-5" />
              Sair
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}
