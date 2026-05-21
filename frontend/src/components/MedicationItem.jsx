import { useState } from 'react';
import { updateMedication, deleteMedication } from '../adapters/medication-adapters';

function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{message}</p>
        <div className="modal-actions">
          <button className="modal-cancel" onClick={onCancel}>Cancel</button>
          <button className="modal-confirm" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

function MedicationItem({ medication, loadMedications }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = async (e) => {
    const { error } = await updateMedication(medication.medication_id, { is_taken: e.target.checked });
    if (error) return console.error(error);
    loadMedications();
  };

  const handleDelete = async () => {
    const { error } = await deleteMedication(medication.medication_id);
    if (error) return console.error(error);
    loadMedications();
  };

  return (
    <>
      {showConfirm && (
        <ConfirmModal
          message="Are you sure you want to delete this medication?"
          onConfirm={() => { setShowConfirm(false); handleDelete(); }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      <li className="medication-item">
        <input
          type="checkbox"
          checked={medication.is_taken}
          onChange={handleChange}
        />
        <span className={medication.is_taken ? 'completed' : ''}>
          {medication.name} — {medication.dosage} · {medication.frequency}
        </span>
        <button className="delete-btn" onClick={() => setShowConfirm(true)}>Delete</button>
      </li>
    </>
  );
}

export default MedicationItem;