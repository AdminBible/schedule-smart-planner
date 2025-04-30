
import React, { createContext, useContext, useState } from 'react';
import { 
  Subject, Teacher, Room, Class, TimetableEntry, 
  subjects as initialSubjects, 
  teachers as initialTeachers, 
  rooms as initialRooms, 
  classes as initialClasses,
  timetableEntries as initialTimetableEntries,
  generateUniqueId
} from '../utils/timetableData';
import { toast } from '@/components/ui/sonner';

interface TimetableContextType {
  subjects: Subject[];
  teachers: Teacher[];
  rooms: Room[];
  classes: Class[];
  timetableEntries: TimetableEntry[];
  selectedClass: string;
  setSelectedClass: (classId: string) => void;
  addSubject: (subject: Omit<Subject, 'id'>) => void;
  updateSubject: (subject: Subject) => void;
  deleteSubject: (subjectId: string) => void;
  addTeacher: (teacher: Omit<Teacher, 'id'>) => void;
  updateTeacher: (teacher: Teacher) => void;
  deleteTeacher: (teacherId: string) => void;
  addRoom: (room: Omit<Room, 'id'>) => void;
  updateRoom: (room: Room) => void;
  deleteRoom: (roomId: string) => void;
  addClass: (cls: Omit<Class, 'id'>) => void;
  updateClass: (cls: Class) => void;
  deleteClass: (classId: string) => void;
  addTimetableEntry: (entry: Omit<TimetableEntry, 'id'>) => void;
  updateTimetableEntry: (entry: TimetableEntry) => void;
  deleteTimetableEntry: (entryId: string) => void;
  moveTimetableEntry: (entryId: string, newDayId: string, newTimeSlotId: string) => void;
}

const TimetableContext = createContext<TimetableContextType | undefined>(undefined);

export const TimetableProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [classes, setClasses] = useState<Class[]>(initialClasses);
  const [timetableEntries, setTimetableEntries] = useState<TimetableEntry[]>(initialTimetableEntries);
  const [selectedClass, setSelectedClass] = useState<string>(initialClasses[0]?.id || '');

  // Subject functions
  const addSubject = (subject: Omit<Subject, 'id'>) => {
    const newSubject = { ...subject, id: generateUniqueId() };
    setSubjects([...subjects, newSubject]);
    toast.success('Matière ajoutée avec succès');
  };

  const updateSubject = (subject: Subject) => {
    setSubjects(subjects.map(s => (s.id === subject.id ? subject : s)));
    toast.success('Matière mise à jour avec succès');
  };

  const deleteSubject = (subjectId: string) => {
    // Check if the subject is used in any timetable entries
    if (timetableEntries.some(entry => entry.subjectId === subjectId)) {
      toast.error('Cette matière est utilisée dans l\'emploi du temps et ne peut pas être supprimée');
      return;
    }
    setSubjects(subjects.filter(s => s.id !== subjectId));
    toast.success('Matière supprimée avec succès');
  };

  // Teacher functions
  const addTeacher = (teacher: Omit<Teacher, 'id'>) => {
    const newTeacher = { ...teacher, id: generateUniqueId() };
    setTeachers([...teachers, newTeacher]);
    toast.success('Professeur ajouté avec succès');
  };

  const updateTeacher = (teacher: Teacher) => {
    setTeachers(teachers.map(t => (t.id === teacher.id ? teacher : t)));
    toast.success('Professeur mis à jour avec succès');
  };

  const deleteTeacher = (teacherId: string) => {
    // Check if the teacher is used in any timetable entries
    if (timetableEntries.some(entry => entry.teacherId === teacherId)) {
      toast.error('Ce professeur est utilisé dans l\'emploi du temps et ne peut pas être supprimé');
      return;
    }
    setTeachers(teachers.filter(t => t.id !== teacherId));
    toast.success('Professeur supprimé avec succès');
  };

  // Room functions
  const addRoom = (room: Omit<Room, 'id'>) => {
    const newRoom = { ...room, id: generateUniqueId() };
    setRooms([...rooms, newRoom]);
    toast.success('Salle ajoutée avec succès');
  };

  const updateRoom = (room: Room) => {
    setRooms(rooms.map(r => (r.id === room.id ? room : r)));
    toast.success('Salle mise à jour avec succès');
  };

  const deleteRoom = (roomId: string) => {
    // Check if the room is used in any timetable entries
    if (timetableEntries.some(entry => entry.roomId === roomId)) {
      toast.error('Cette salle est utilisée dans l\'emploi du temps et ne peut pas être supprimée');
      return;
    }
    setRooms(rooms.filter(r => r.id !== roomId));
    toast.success('Salle supprimée avec succès');
  };

  // Class functions
  const addClass = (cls: Omit<Class, 'id'>) => {
    const newClass = { ...cls, id: generateUniqueId() };
    setClasses([...classes, newClass]);
    toast.success('Classe ajoutée avec succès');
  };

  const updateClass = (cls: Class) => {
    setClasses(classes.map(c => (c.id === cls.id ? cls : c)));
    toast.success('Classe mise à jour avec succès');
  };

  const deleteClass = (classId: string) => {
    // Check if the class is used in any timetable entries
    if (timetableEntries.some(entry => entry.classId === classId)) {
      toast.error('Cette classe est utilisée dans l\'emploi du temps et ne peut pas être supprimée');
      return;
    }
    setClasses(classes.filter(c => c.id !== classId));
    // If the deleted class was selected, select another class
    if (selectedClass === classId) {
      setSelectedClass(classes[0]?.id || '');
    }
    toast.success('Classe supprimée avec succès');
  };

  // Timetable entry functions
  const addTimetableEntry = (entry: Omit<TimetableEntry, 'id'>) => {
    // Check if there's already an entry for this day, time slot and class
    const existingEntry = timetableEntries.find(
      e => e.dayId === entry.dayId && e.timeSlotId === entry.timeSlotId && e.classId === entry.classId
    );
    if (existingEntry) {
      toast.error('Il y a déjà un cours prévu à ce créneau pour cette classe');
      return;
    }

    // Check if the teacher is already assigned at this time
    const teacherConflict = timetableEntries.find(
      e => e.dayId === entry.dayId && e.timeSlotId === entry.timeSlotId && e.teacherId === entry.teacherId
    );
    if (teacherConflict) {
      toast.error('Ce professeur a déjà un cours à ce créneau');
      return;
    }

    // Check if the room is already booked at this time
    const roomConflict = timetableEntries.find(
      e => e.dayId === entry.dayId && e.timeSlotId === entry.timeSlotId && e.roomId === entry.roomId
    );
    if (roomConflict) {
      toast.error('Cette salle est déjà occupée à ce créneau');
      return;
    }

    const newEntry = { ...entry, id: generateUniqueId() };
    setTimetableEntries([...timetableEntries, newEntry]);
    toast.success('Cours ajouté avec succès');
  };

  const updateTimetableEntry = (entry: TimetableEntry) => {
    // Similar conflict checks as in addTimetableEntry
    // ...

    setTimetableEntries(timetableEntries.map(e => (e.id === entry.id ? entry : e)));
    toast.success('Cours mis à jour avec succès');
  };

  const deleteTimetableEntry = (entryId: string) => {
    setTimetableEntries(timetableEntries.filter(e => e.id !== entryId));
    toast.success('Cours supprimé avec succès');
  };

  const moveTimetableEntry = (entryId: string, newDayId: string, newTimeSlotId: string) => {
    const entryToMove = timetableEntries.find(e => e.id === entryId);
    if (!entryToMove) {
      toast.error('Cours non trouvé');
      return;
    }

    // Check for conflicts at the new position
    const classConflict = timetableEntries.find(
      e => e.id !== entryId && e.dayId === newDayId && e.timeSlotId === newTimeSlotId && e.classId === entryToMove.classId
    );
    if (classConflict) {
      toast.error('Cette classe a déjà un cours à ce créneau');
      return;
    }

    const teacherConflict = timetableEntries.find(
      e => e.id !== entryId && e.dayId === newDayId && e.timeSlotId === newTimeSlotId && e.teacherId === entryToMove.teacherId
    );
    if (teacherConflict) {
      toast.error('Ce professeur a déjà un cours à ce créneau');
      return;
    }

    const roomConflict = timetableEntries.find(
      e => e.id !== entryId && e.dayId === newDayId && e.timeSlotId === newTimeSlotId && e.roomId === entryToMove.roomId
    );
    if (roomConflict) {
      toast.error('Cette salle est déjà occupée à ce créneau');
      return;
    }

    const updatedEntry = { ...entryToMove, dayId: newDayId, timeSlotId: newTimeSlotId };
    setTimetableEntries(timetableEntries.map(e => (e.id === entryId ? updatedEntry : e)));
    toast.success('Cours déplacé avec succès');
  };

  const value = {
    subjects,
    teachers,
    rooms,
    classes,
    timetableEntries,
    selectedClass,
    setSelectedClass,
    addSubject,
    updateSubject,
    deleteSubject,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    addRoom,
    updateRoom,
    deleteRoom,
    addClass,
    updateClass,
    deleteClass,
    addTimetableEntry,
    updateTimetableEntry,
    deleteTimetableEntry,
    moveTimetableEntry,
  };

  return <TimetableContext.Provider value={value}>{children}</TimetableContext.Provider>;
};

export const useTimetable = () => {
  const context = useContext(TimetableContext);
  if (context === undefined) {
    throw new Error('useTimetable must be used within a TimetableProvider');
  }
  return context;
};
