
import { useTimetable } from '@/context/TimetableContext';
import { TimetableEntry as TimetableEntryType, findSubject, findTeacher, findRoom } from '@/utils/timetableData';
import React from 'react';

interface TimetableEntryProps {
  entry: TimetableEntryType;
}

const TimetableEntry: React.FC<TimetableEntryProps> = ({ entry }) => {
  const { deleteTimetableEntry } = useTimetable();
  
  const subject = findSubject(entry.subjectId);
  const teacher = findTeacher(entry.teacherId);
  const room = findRoom(entry.roomId);

  if (!subject || !teacher || !room) return null;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
      deleteTimetableEntry(entry.id);
    }
  };

  return (
    <div 
      className={`timetable-entry ${subject.color} p-2 text-white text-sm flex flex-col h-full rounded shadow relative`} 
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('entryId', entry.id);
      }}
    >
      <div className="font-bold mb-1 truncate">{subject.name}</div>
      <div className="text-xs opacity-90 truncate">{teacher.name}</div>
      <div className="text-xs opacity-90 truncate">{room.name}</div>
      <button 
        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs opacity-0 hover:opacity-100 transition-opacity"
        onClick={handleDelete}
      >
        ×
      </button>
    </div>
  );
};

export default TimetableEntry;
