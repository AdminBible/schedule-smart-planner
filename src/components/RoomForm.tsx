
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTimetable } from '@/context/TimetableContext';

interface RoomFormProps {
  onClose: () => void;
  editRoom?: {
    id: string;
    name: string;
    capacity: number;
    features: string[];
  };
}

const RoomForm: React.FC<RoomFormProps> = ({ onClose, editRoom }) => {
  const { addRoom, updateRoom } = useTimetable();
  const [name, setName] = useState(editRoom?.name || '');
  const [capacity, setCapacity] = useState(editRoom?.capacity || 0);
  const [features, setFeatures] = useState<string[]>(editRoom?.features || []);
  const [newFeature, setNewFeature] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) {
      alert('Veuillez entrer un nom de salle');
      return;
    }

    if (editRoom) {
      updateRoom({
        id: editRoom.id,
        name,
        capacity,
        features
      });
    } else {
      addRoom({
        name,
        capacity,
        features
      });
    }
    
    onClose();
  };

  const addFeature = () => {
    if (newFeature && !features.includes(newFeature)) {
      setFeatures([...features, newFeature]);
      setNewFeature('');
    }
  };

  const removeFeature = (feature: string) => {
    setFeatures(features.filter(f => f !== feature));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nom de la salle
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
        <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
          Capacité
        </label>
        <input
          type="number"
          id="capacity"
          min="0"
          value={capacity}
          onChange={(e) => setCapacity(parseInt(e.target.value) || 0)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Équipements
        </label>
        <div className="flex mb-2">
          <input
            type="text"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            className="flex-1 p-2 border rounded-l"
            placeholder="Ex: projecteur"
          />
          <Button 
            type="button" 
            onClick={addFeature} 
            className="rounded-l-none"
            disabled={!newFeature}
          >
            Ajouter
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
              <span className="text-sm">{feature}</span>
              <button
                type="button"
                onClick={() => removeFeature(feature)}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
          ))}
          {features.length === 0 && (
            <span className="text-sm text-gray-500">Aucun équipement ajouté</span>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" type="button" onClick={onClose}>
          Annuler
        </Button>
        <Button type="submit">
          {editRoom ? 'Mettre à jour' : 'Ajouter'}
        </Button>
      </div>
    </form>
  );
};

export default RoomForm;
