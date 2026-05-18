// REMIX: renamed from TodoList.jsx to MedicationList.jsx
// REMIX: renamed from TodoItem to MedicationItem
import MedicationItem from './MedicationItem';

// REMIX: renamed from TodoList to MedicationList
// REMIX: renamed props from todos/loadTodos to medications/loadMedications
function MedicationList({ medications, loadMedications }) {
  return (
    // REMIX: renamed id from todo-list to medication-list
    <ul id="medication-list">
      {/* REMIX: renamed todos.map to medications.map */}
      {/* REMIX: renamed todo to medication, todo_id to medication_id */}
      {/* REMIX: passes loadMedications instead of loadTodos */}
      {medications.map((medication) => (
        <MedicationItem
          key={medication.medication_id}
          medication={medication}
          loadMedications={loadMedications}
        />
      ))}
    </ul>
  );
}

export default MedicationList;