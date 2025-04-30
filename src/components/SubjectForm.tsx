
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTimetable } from '@/context/TimetableContext';

interface SubjectFormProps {
  onClose: () => void;
  editSubject?: {
    id: string;
    name: string;
    color: string;
  };
}

const SubjectForm: React.FC<SubjectFormProps> = ({ onClose, editSubject }) => {
  const { addSubject, updateSubject } = useTimetable();
  const [name, setName] = useState(editSubject?.name || '');
  const [color, setColor] = useState(editSubject?.color || 'bg-subject-math');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) {
      alert('Veuillez entrer un nom de matière');
      return;
    }

    if (editSubject) {
      updateSubject({ id: editSubject.id, name, color });
    } else {
      addSubject({ name, color });
    }
    
    onClose();
  };

  const colorOptions = [
    { value: 'bg-subject-math', label: 'Orange' },
    { value: 'bg-subject-physics', label: 'Gris' },
    { value: 'bg-subject-chemistry', label: 'Bleu-Vert' },
    { value: 'bg-subject-biology', label: 'Vert' },
    { value: 'bg-subject-literature', label: 'Violet' },
    { value: 'bg-subject-history', label: 'Jaune-Orange' },
    { value: 'bg-subject-geography', label: 'Turquoise' },
    { value: 'bg-subject-languages', label: 'Rouge' },
    { value: 'bg-subject-art', label: 'Rose' },
    { value: 'bg-subject-music', label: 'Violet Clair' },
    { value: 'bg-subject-pe', label: 'Bleu Clair' },
    { value: 'bg-subject-cs', label: 'Bleu' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nom de la matière
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
        <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
          Couleur
        </label>
        <div className="grid grid-cols-6 gap-2">
          {colorOptions.map((option) => (
            <div
              key={option.value}
              className={`h-8 rounded cursor-pointer ${option.value} ${
                color === option.value ? 'ring-2 ring-offset-2 ring-timetable-primary' : ''
              }`}
              onClick={() => setColor(option.value)}
              title={option.label}
            ></div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" type="button" onClick={onClose}>
          Annuler
        </Button>
        <Button type="submit">
          {editSubject ? 'Mettre à jour' : 'Ajouter'}
        </Button>
      </div>
    </form>
  );
};

export default SubjectForm;
