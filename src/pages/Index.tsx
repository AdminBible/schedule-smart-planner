
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Timetable from '@/components/Timetable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import SubjectForm from '@/components/SubjectForm';
import TeacherForm from '@/components/TeacherForm';
import ClassForm from '@/components/ClassForm';
import RoomForm from '@/components/RoomForm';
import { useTimetable } from '@/context/TimetableContext';
import { TimetableProvider } from '@/context/TimetableContext';
import { useIsMobile } from '@/hooks/use-mobile';

// Dashboard component
const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-2 text-timetable-primary">Classes</h3>
        <p className="text-3xl font-bold">7</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-2 text-timetable-primary">Professeurs</h3>
        <p className="text-3xl font-bold">7</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-2 text-timetable-primary">Matières</h3>
        <p className="text-3xl font-bold">12</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-2 text-timetable-primary">Salles</h3>
        <p className="text-3xl font-bold">8</p>
      </div>
    </div>
  );
};

// Subjects Tab component
const SubjectsTab = () => {
  const { subjects, deleteSubject } = useTimetable();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<any | null>(null);

  const handleEdit = (subject: any) => {
    setEditingSubject(subject);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette matière?')) {
      deleteSubject(id);
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Liste des matières</h2>
        <Button onClick={() => { setEditingSubject(null); setIsFormOpen(true); }}>
          <Plus className="h-4 w-4 mr-1" /> Ajouter une matière
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map(subject => (
          <div 
            key={subject.id} 
            className={`${subject.color} text-white p-4 rounded-lg shadow-sm flex justify-between items-center`}
          >
            <span className="font-medium">{subject.name}</span>
            <div>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-white hover:bg-white/20" 
                onClick={() => handleEdit(subject)}
              >
                Modifier
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-white hover:bg-white/20" 
                onClick={() => handleDelete(subject.id)}
              >
                Supprimer
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingSubject ? 'Modifier une matière' : 'Ajouter une matière'}</DialogTitle>
          </DialogHeader>
          <SubjectForm 
            onClose={() => setIsFormOpen(false)} 
            editSubject={editingSubject} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Teachers Tab component
const TeachersTab = () => {
  const { teachers, deleteTeacher, subjects } = useTimetable();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<any | null>(null);

  const handleEdit = (teacher: any) => {
    setEditingTeacher(teacher);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce professeur?')) {
      deleteTeacher(id);
    }
  };

  const getSubjectNames = (subjectIds: string[]) => {
    return subjectIds.map(id => {
      const subject = subjects.find(s => s.id === id);
      return subject?.name || '';
    }).filter(Boolean).join(', ');
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Liste des professeurs</h2>
        <Button onClick={() => { setEditingTeacher(null); setIsFormOpen(true); }}>
          <Plus className="h-4 w-4 mr-1" /> Ajouter un professeur
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-sm rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 text-left">Nom</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Matières enseignées</th>
              <th className="py-2 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map(teacher => (
              <tr key={teacher.id} className="border-t">
                <td className="py-2 px-4">{teacher.name}</td>
                <td className="py-2 px-4">{teacher.email}</td>
                <td className="py-2 px-4">{getSubjectNames(teacher.subjects)}</td>
                <td className="py-2 px-4 text-right">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mr-2"
                    onClick={() => handleEdit(teacher)}
                  >
                    Modifier
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDelete(teacher.id)}
                  >
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingTeacher ? 'Modifier un professeur' : 'Ajouter un professeur'}</DialogTitle>
          </DialogHeader>
          <TeacherForm 
            onClose={() => setIsFormOpen(false)} 
            editTeacher={editingTeacher} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Classes Tab component
const ClassesTab = () => {
  const { classes, deleteClass } = useTimetable();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<any | null>(null);

  const handleEdit = (cls: any) => {
    setEditingClass(cls);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette classe?')) {
      deleteClass(id);
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Liste des classes</h2>
        <Button onClick={() => { setEditingClass(null); setIsFormOpen(true); }}>
          <Plus className="h-4 w-4 mr-1" /> Ajouter une classe
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map(cls => (
          <div key={cls.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-timetable-primary">{cls.name}</h3>
            <p className="text-gray-600">{cls.numberOfStudents} élèves</p>
            <div className="mt-4 flex justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                className="mr-2"
                onClick={() => handleEdit(cls)}
              >
                Modifier
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => handleDelete(cls.id)}
              >
                Supprimer
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingClass ? 'Modifier une classe' : 'Ajouter une classe'}</DialogTitle>
          </DialogHeader>
          <ClassForm 
            onClose={() => setIsFormOpen(false)} 
            editClass={editingClass} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Rooms Tab component
const RoomsTab = () => {
  const { rooms, deleteRoom } = useTimetable();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<any | null>(null);

  const handleEdit = (room: any) => {
    setEditingRoom(room);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette salle?')) {
      deleteRoom(id);
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Liste des salles</h2>
        <Button onClick={() => { setEditingRoom(null); setIsFormOpen(true); }}>
          <Plus className="h-4 w-4 mr-1" /> Ajouter une salle
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map(room => (
          <div key={room.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-timetable-primary">{room.name}</h3>
            <p className="text-gray-600">Capacité: {room.capacity} personnes</p>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Équipements:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {room.features.map((feature, index) => (
                  <span key={index} className="bg-gray-100 text-xs px-2 py-1 rounded">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                className="mr-2"
                onClick={() => handleEdit(room)}
              >
                Modifier
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => handleDelete(room.id)}
              >
                Supprimer
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingRoom ? 'Modifier une salle' : 'Ajouter une salle'}</DialogTitle>
          </DialogHeader>
          <RoomForm 
            onClose={() => setIsFormOpen(false)} 
            editRoom={editingRoom} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Main Page Component
const Index = () => {
  const [activeTab, setActiveTab] = useState('timetable');
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const isMobile = useIsMobile();

  // Define titles for each tab
  const tabTitles: Record<string, string> = {
    dashboard: 'Tableau de bord',
    timetable: 'Emploi du temps',
    subjects: 'Matières',
    teachers: 'Professeurs',
    classes: 'Classes',
    rooms: 'Salles',
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'timetable':
        return <Timetable />;
      case 'subjects':
        return <SubjectsTab />;
      case 'teachers':
        return <TeachersTab />;
      case 'classes':
        return <ClassesTab />;
      case 'rooms':
        return <RoomsTab />;
      default:
        return <Timetable />;
    }
  };

  return (
    <TimetableProvider>
      <div className="min-h-screen bg-gray-50 flex">
        {(isSidebarVisible || !isMobile) && (
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        )}
        
        <div className="flex-1 flex flex-col">
          <Header 
            title={tabTitles[activeTab] || 'Emploi du temps'} 
            toggleSidebar={isMobile ? toggleSidebar : undefined} 
          />
          
          <main className={`flex-1 p-6 ${isMobile ? 'pb-20' : ''}`}>
            {renderContent()}
          </main>
        </div>
      </div>
    </TimetableProvider>
  );
};

export default Index;
