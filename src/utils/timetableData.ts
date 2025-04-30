
// Types and interfaces
export interface Teacher {
  id: string;
  name: string;
  email: string;
  subjects: string[];
  availability?: Availability[];
}

export interface Room {
  id: string;
  name: string;
  capacity: number;
  features: string[];
}

export interface Subject {
  id: string;
  name: string;
  color: string;
  requiredFeatures?: string[];
}

export interface Class {
  id: string;
  name: string;
  numberOfStudents: number;
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
}

export interface Day {
  id: string;
  name: string;
  shortName: string;
}

export interface Availability {
  dayId: string;
  timeSlotIds: string[];
}

export interface TimetableEntry {
  id: string;
  subjectId: string;
  teacherId: string;
  roomId: string;
  classId: string;
  dayId: string;
  timeSlotId: string;
}

// Sample data
export const days: Day[] = [
  { id: '1', name: 'Lundi', shortName: 'LUN' },
  { id: '2', name: 'Mardi', shortName: 'MAR' },
  { id: '3', name: 'Mercredi', shortName: 'MER' },
  { id: '4', name: 'Jeudi', shortName: 'JEU' },
  { id: '5', name: 'Vendredi', shortName: 'VEN' },
  { id: '6', name: 'Samedi', shortName: 'SAM' },
];

export const timeSlots: TimeSlot[] = [
  { id: '1', startTime: '08:00', endTime: '09:00' },
  { id: '2', startTime: '09:00', endTime: '10:00' },
  { id: '3', startTime: '10:00', endTime: '11:00' },
  { id: '4', startTime: '11:00', endTime: '12:00' },
  { id: '5', startTime: '12:00', endTime: '13:00' },
  { id: '6', startTime: '13:00', endTime: '14:00' },
  { id: '7', startTime: '14:00', endTime: '15:00' },
  { id: '8', startTime: '15:00', endTime: '16:00' },
  { id: '9', startTime: '16:00', endTime: '17:00' },
  { id: '10', startTime: '17:00', endTime: '18:00' },
];

export const subjects: Subject[] = [
  { id: '1', name: 'Mathématiques', color: 'bg-subject-math' },
  { id: '2', name: 'Physique', color: 'bg-subject-physics' },
  { id: '3', name: 'Chimie', color: 'bg-subject-chemistry' },
  { id: '4', name: 'Biologie', color: 'bg-subject-biology' },
  { id: '5', name: 'Littérature', color: 'bg-subject-literature' },
  { id: '6', name: 'Histoire', color: 'bg-subject-history' },
  { id: '7', name: 'Géographie', color: 'bg-subject-geography' },
  { id: '8', name: 'Langues', color: 'bg-subject-languages' },
  { id: '9', name: 'Art', color: 'bg-subject-art' },
  { id: '10', name: 'Musique', color: 'bg-subject-music' },
  { id: '11', name: 'Éducation Physique', color: 'bg-subject-pe' },
  { id: '12', name: 'Informatique', color: 'bg-subject-cs' },
];

export const teachers: Teacher[] = [
  { id: '1', name: 'Dr. Martin', email: 'martin@example.com', subjects: ['1', '2'] },
  { id: '2', name: 'Mme. Dubois', email: 'dubois@example.com', subjects: ['5', '8'] },
  { id: '3', name: 'M. Bernard', email: 'bernard@example.com', subjects: ['6', '7'] },
  { id: '4', name: 'Dr. Thomas', email: 'thomas@example.com', subjects: ['3', '4'] },
  { id: '5', name: 'Mme. Petit', email: 'petit@example.com', subjects: ['9', '10'] },
  { id: '6', name: 'M. Robert', email: 'robert@example.com', subjects: ['11'] },
  { id: '7', name: 'Mme. Richard', email: 'richard@example.com', subjects: ['12'] },
];

export const rooms: Room[] = [
  { id: '1', name: 'Salle 101', capacity: 30, features: ['tableau', 'projecteur'] },
  { id: '2', name: 'Salle 102', capacity: 25, features: ['tableau'] },
  { id: '3', name: 'Salle 103', capacity: 35, features: ['tableau', 'projecteur', 'ordinateurs'] },
  { id: '4', name: 'Labo Physique', capacity: 20, features: ['équipement_labo', 'projecteur'] },
  { id: '5', name: 'Labo Chimie', capacity: 20, features: ['équipement_labo', 'projecteur'] },
  { id: '6', name: 'Salle Art', capacity: 15, features: ['espace_art'] },
  { id: '7', name: 'Gymnase', capacity: 50, features: ['équipement_sport'] },
  { id: '8', name: 'Salle Info', capacity: 25, features: ['ordinateurs', 'projecteur'] },
];

export const classes: Class[] = [
  { id: '1', name: '6ème A', numberOfStudents: 28 },
  { id: '2', name: '5ème A', numberOfStudents: 26 },
  { id: '3', name: '4ème A', numberOfStudents: 24 },
  { id: '4', name: '3ème A', numberOfStudents: 22 },
  { id: '5', name: '2nde 1', numberOfStudents: 30 },
  { id: '6', name: '1ère S', numberOfStudents: 25 },
  { id: '7', name: 'Term S', numberOfStudents: 20 },
];

// Sample timetable entries
export const timetableEntries: TimetableEntry[] = [
  { id: '1', subjectId: '1', teacherId: '1', roomId: '1', classId: '1', dayId: '1', timeSlotId: '1' },
  { id: '2', subjectId: '5', teacherId: '2', roomId: '2', classId: '1', dayId: '1', timeSlotId: '2' },
  { id: '3', subjectId: '8', teacherId: '2', roomId: '2', classId: '1', dayId: '1', timeSlotId: '3' },
  { id: '4', subjectId: '6', teacherId: '3', roomId: '1', classId: '1', dayId: '1', timeSlotId: '4' },
  { id: '5', subjectId: '11', teacherId: '6', roomId: '7', classId: '1', dayId: '1', timeSlotId: '6' },
  { id: '6', subjectId: '3', teacherId: '4', roomId: '5', classId: '1', dayId: '2', timeSlotId: '1' },
  { id: '7', subjectId: '2', teacherId: '1', roomId: '4', classId: '1', dayId: '2', timeSlotId: '2' },
  { id: '8', subjectId: '4', teacherId: '4', roomId: '3', classId: '1', dayId: '2', timeSlotId: '3' },
  { id: '9', subjectId: '12', teacherId: '7', roomId: '8', classId: '1', dayId: '2', timeSlotId: '4' },
  { id: '10', subjectId: '1', teacherId: '1', roomId: '1', classId: '1', dayId: '3', timeSlotId: '1' },
  { id: '11', subjectId: '9', teacherId: '5', roomId: '6', classId: '1', dayId: '3', timeSlotId: '2' },
  { id: '12', subjectId: '7', teacherId: '3', roomId: '1', classId: '1', dayId: '3', timeSlotId: '3' },
  { id: '13', subjectId: '10', teacherId: '5', roomId: '3', classId: '1', dayId: '3', timeSlotId: '4' },
  { id: '14', subjectId: '5', teacherId: '2', roomId: '2', classId: '1', dayId: '4', timeSlotId: '1' },
  { id: '15', subjectId: '1', teacherId: '1', roomId: '1', classId: '1', dayId: '4', timeSlotId: '2' },
  { id: '16', subjectId: '6', teacherId: '3', roomId: '3', classId: '1', dayId: '4', timeSlotId: '3' },
  { id: '17', subjectId: '11', teacherId: '6', roomId: '7', classId: '1', dayId: '4', timeSlotId: '4' },
  { id: '18', subjectId: '8', teacherId: '2', roomId: '2', classId: '1', dayId: '5', timeSlotId: '1' },
  { id: '19', subjectId: '2', teacherId: '1', roomId: '4', classId: '1', dayId: '5', timeSlotId: '2' },
  { id: '20', subjectId: '3', teacherId: '4', roomId: '5', classId: '1', dayId: '5', timeSlotId: '3' },
];

export function findSubject(subjectId: string): Subject | undefined {
  return subjects.find(subject => subject.id === subjectId);
}

export function findTeacher(teacherId: string): Teacher | undefined {
  return teachers.find(teacher => teacher.id === teacherId);
}

export function findRoom(roomId: string): Room | undefined {
  return rooms.find(room => room.id === roomId);
}

export function findClass(classId: string): Class | undefined {
  return classes.find(cls => cls.id === classId);
}

export function findDay(dayId: string): Day | undefined {
  return days.find(day => day.id === dayId);
}

export function findTimeSlot(timeSlotId: string): TimeSlot | undefined {
  return timeSlots.find(timeSlot => timeSlot.id === timeSlotId);
}

export function findTimetableEntry(dayId: string, timeSlotId: string, classId: string): TimetableEntry | undefined {
  return timetableEntries.find(entry => 
    entry.dayId === dayId && 
    entry.timeSlotId === timeSlotId && 
    entry.classId === classId
  );
}

export function generateUniqueId(): string {
  return Math.random().toString(36).substr(2, 9);
}
