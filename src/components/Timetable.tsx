
import React from 'react';
import { useTimetable } from '@/context/TimetableContext';
import TimetableEntry from './TimetableEntry';
import { findTimetableEntry, days, timeSlots } from '@/utils/timetableData';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Timetable: React.FC = () => {
  const { timetableEntries, selectedClass, moveTimetableEntry, addTimetableEntry } = useTimetable();
  const isMobile = useIsMobile();

  const handleDrop = (dayId: string, timeSlotId: string) => (e: React.DragEvent) => {
    e.preventDefault();
    const entryId = e.dataTransfer.getData('entryId');
    if (entryId) {
      moveTimetableEntry(entryId, dayId, timeSlotId);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleAddTimetableEntry = (dayId: string, timeSlotId: string) => {
    // Simplified version - in a real app, this would open a form
    const subjectId = prompt('ID de la matière:');
    const teacherId = prompt('ID du professeur:');
    const roomId = prompt('ID de la salle:');
    
    if (subjectId && teacherId && roomId) {
      addTimetableEntry({
        subjectId,
        teacherId,
        roomId,
        classId: selectedClass,
        dayId,
        timeSlotId
      });
    }
  };

  // Filter entries for the selected class
  const filteredEntries = timetableEntries.filter(entry => entry.classId === selectedClass);

  return (
    <div className="overflow-x-auto mb-8">
      <div className={`timetable-grid ${isMobile ? 'min-w-[800px]' : ''}`}>
        {/* Empty corner cell */}
        <div className="bg-gray-200"></div>
        
        {/* Time slots header */}
        {timeSlots.map((timeSlot) => (
          <div key={timeSlot.id} className="timetable-header">
            {timeSlot.startTime} - {timeSlot.endTime}
          </div>
        ))}
        
        {/* Days and cells */}
        {days.map((day) => (
          <React.Fragment key={day.id}>
            {/* Day header */}
            <div className="timetable-time">
              {day.name}
            </div>
            
            {/* Cells for each time slot */}
            {timeSlots.map((timeSlot) => {
              const entry = findTimetableEntry(day.id, timeSlot.id, selectedClass);
              
              return (
                <div 
                  key={`${day.id}-${timeSlot.id}`} 
                  className="timetable-cell"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop(day.id, timeSlot.id)}
                >
                  {entry ? (
                    <TimetableEntry entry={entry} />
                  ) : (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full h-full flex items-center justify-center text-gray-400 hover:text-gray-600"
                      onClick={() => handleAddTimetableEntry(day.id, timeSlot.id)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      <span className="text-xs">Ajouter</span>
                    </Button>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Timetable;
