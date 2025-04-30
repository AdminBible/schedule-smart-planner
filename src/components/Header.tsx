
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useTimetable } from '@/context/TimetableContext';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeaderProps {
  title: string;
  toggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, toggleSidebar }) => {
  const { classes, selectedClass, setSelectedClass } = useTimetable();
  const isMobile = useIsMobile();
  
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      {isMobile && toggleSidebar && (
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
          <Menu className="h-5 w-5" />
        </Button>
      )}
      
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      
      {title === "Emploi du temps" && (
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Classe:</span>
          <select
            className="border rounded px-2 py-1"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </header>
  );
};

export default Header;
