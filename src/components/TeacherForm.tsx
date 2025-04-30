
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTimetable } from '@/context/TimetableContext';

interface TeacherFormProps {
  onClose: () => void;
  editTeacher?: {
    id: string;
    name: string;
    email: string;
    subjects: string[];
  };
}

const TeacherForm: React.FC<TeacherFormProps> = ({ onClose, editTeacher }) => {
  const { addTeacher, updateTeacher, subjects } = useTimetable();
  const [name, setName] = useState(editTeacher?.name || '');
  const [email, setEmail] = useState(editTeacher?.email || '');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(editTeacher?.subjects || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) {
      alert('Veuillez entrer un nom de professeur');
      return;
    }

    if (editTeacher) {
      updateTeacher({
        id: editTeacher.id,
        name,
        email,
        subjects: selectedSubjects
      });
    } else {
      addTeacher({
        name,
        email,
        subjects: selectedSubjects
      });
    }
    
    onClose();
  };

  const toggleSubject = (subjectId: string) => {
    if (selectedSubjects.includes(subjectId)) {
      setSelectedSubjects(selectedSubjects.filter(id => id !== subjectId));
    } else {
      setSelectedSubjects([...selectedSubjects, subjectId]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nom du professeur
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
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Matières enseignées
        </label>
        <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded p-2">
          {subjects.map((subject) => (
            <div key={subject.id} className="flex items-center">
              <input
                type="checkbox"
                id={`subject-${subject.id}`}
                checked={selectedSubjects.includes(subject.id)}
                onChange={() => toggleSubject(subject.id)}
                className="mr-2"
              />
              <label htmlFor={`subject-${subject.id}`} className="text-sm">
                {subject.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" type="button" onClick={onClose}>
          Annuler
        </Button>
        <Button type="submit">
          {editTeacher ? 'Mettre à jour' : 'Ajouter'}
        </Button>
      </div>
    </form>
  );
};

export default TeacherForm;
