
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, School, User, Home, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick }) => (
  <Button
    variant="ghost"
    className={cn(
      'w-full justify-start px-4 py-2 h-12',
      active && 'bg-timetable-primary text-white'
    )}
    onClick={onClick}
  >
    <div className="flex items-center">
      <div className="mr-2 h-5 w-5">{icon}</div>
      <span>{label}</span>
    </div>
  </Button>
);

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useIsMobile();

  if (isMobile && isCollapsed) {
    return (
      <Button
        className="fixed left-0 top-4 z-10 p-2 rounded-r-md bg-timetable-primary text-white"
        onClick={() => setIsCollapsed(false)}
      >
        <Calendar />
      </Button>
    );
  }

  return (
    <div className={cn(
      "flex flex-col h-screen bg-white border-r border-gray-200",
      isMobile ? (isCollapsed ? "hidden" : "fixed left-0 top-0 z-50 w-64 shadow-lg") : "w-64"
    )}>
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-timetable-primary flex items-center">
          <Calendar className="mr-2 h-5 w-5" />
          Schedule Smart
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          <SidebarItem 
            icon={<Home />} 
            label="Tableau de bord" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <SidebarItem 
            icon={<Calendar />} 
            label="Emploi du temps" 
            active={activeTab === 'timetable'} 
            onClick={() => setActiveTab('timetable')} 
          />
          <SidebarItem 
            icon={<BookOpen />} 
            label="Matières" 
            active={activeTab === 'subjects'} 
            onClick={() => setActiveTab('subjects')} 
          />
          <SidebarItem 
            icon={<User />} 
            label="Professeurs" 
            active={activeTab === 'teachers'} 
            onClick={() => setActiveTab('teachers')} 
          />
          <SidebarItem 
            icon={<School />} 
            label="Classes" 
            active={activeTab === 'classes'} 
            onClick={() => setActiveTab('classes')} 
          />
          <SidebarItem 
            icon={<Clock />} 
            label="Salles" 
            active={activeTab === 'rooms'} 
            onClick={() => setActiveTab('rooms')} 
          />
        </nav>
      </div>

      {isMobile && (
        <div className="p-4 border-t border-gray-200">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => setIsCollapsed(true)}
          >
            Réduire
          </Button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
