// REMIX: renamed from TodoItem.jsx to MedicationItem.jsx
// REMIX: replaced todo-adapters with medication-adapters
// REMIX: replaced updateTodo/deleteTodo with updateMedication/deleteMedication
import { updateMedication, deleteMedication } from '../adapters/medication-adapters';

// REMIX: renamed from TodoItem to MedicationItem
// REMIX: renamed props from todo/loadTodos to medication/loadMedications
function MedicationItem({ medication, loadMedications }) {

  // REMIX: renamed from handleChange — now toggles is_taken instead of is_complete
  // REMIX: calls updateMedication instead of updateTodo
  // REMIX: uses medication.medication_id instead of todo.todo_id
  const handleChange = async (e) => {
    const { error } = await updateMedication(medication.medication_id, { is_taken: e.target.checked });
    if (error) return console.error(error);
    // REMIX: calls loadMedications instead of loadTodos
    loadMedications();
  };

  // REMIX: calls deleteMedication instead of deleteTodo
  // REMIX: uses medication.medication_id instead of todo.todo_id
  const handleDelete = async () => {
    const { error } = await deleteMedication(medication.medication_id);
    if (error) return console.error(error);
    // REMIX: calls loadMedications instead of loadTodos
    loadMedications();
  };

  return (
    // REMIX: renamed class from todo-item to medication-item
    <li className="medication-item">
      {/* REMIX: checkbox now reflects is_taken instead of is_complete */}
      <input
        type="checkbox"
        checked={medication.is_taken}
        onChange={handleChange}
      />
      {/* REMIX: shows name, dosage, frequency instead of just title */}
      {/* REMIX: strike-through applies when is_taken is true */}
      <span className={medication.is_taken ? 'completed' : ''}>
        {medication.name} — {medication.dosage} · {medication.frequency}
      </span>
      <button className="delete-btn" onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default MedicationItem;