
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTimetable } from '@/context/TimetableContext';

interface ClassFormProps {
  onClose: () => void;
  editClass?: {
    id: string;
    name: string;
    numberOfStudents: number;
  };
}

const ClassForm: React.FC<ClassFormProps> = ({ onClose, editClass }) => {
  const { addClass, updateClass } = useTimetable();
  const [name, setName] = useState(editClass?.name || '');
  const [numberOfStudents, setNumberOfStudents] = useState(editClass?.numberOfStudents || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) {
      alert('Veuillez entrer un nom de classe');
      return;
    }

    if (editClass) {
      updateClass({
        id: editClass.id,
        name,
        numberOfStudents
      });
    } else {
      addClass({
        name,
        numberOfStudents
      });
    }
    
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nom de la classe
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="numberOfStudents" className="block text-sm font-medium text-gray-700 mb-1">
          Nombre d'élèves
        </label>
        <input
          type="number"
          id="numberOfStudents"
          min="0"
          value={numberOfStudents}
          onChange={(e) => setNumberOfStudents(parseInt(e.target.value) || 0)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" type="button" onClick={onClose}>
          Annuler
        </Button>
        <Button type="submit">
          {editClass ? 'Mettre à jour' : 'Ajouter'}
        </Button>
      </div>
    </form>
  );
};

export default ClassForm;
