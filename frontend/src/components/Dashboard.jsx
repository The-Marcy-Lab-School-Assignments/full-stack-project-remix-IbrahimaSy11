import { useState, useEffect } from 'react';
// REMIX: renamed from todo-adapters to medication-adapters
// REMIX: renamed from fetchAllTodos to fetchAllMedications
import { fetchAllMedications } from '../adapters/medication-adapters';
// REMIX: renamed from AddTodoForm to AddMedicationForm
import AddMedicationForm from './AddMedicationForm';
// REMIX: renamed from TodoList to MedicationList
import MedicationList from './MedicationList';

// REMIX: renamed from TodoPage to Dashboard
function Dashboard({ currentUser, handleLogout }) {
  // REMIX: renamed todos state to medications
  const [medications, setMedications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // This helper fetches medications on page load with useEffect
  // It is also passed down to AddMedicationForm and MedicationList
  // to re-fetch medications when a mutation action is performed
  // such as creating, deleting, or updating a medication.
  // REMIX: renamed from loadTodos to loadMedications
  // REMIX: calls fetchAllMedications instead of fetchAllTodos
  const loadMedications = async () => {
    setIsLoading(true);
    setError(null);
    const { data, error: fetchError } = await fetchAllMedications();
    if (fetchError) {
      setError(fetchError.message);
    } else {
      setMedications(data);
    }
    setIsLoading(false);
  };

  // unchanged — same useEffect pattern as the case study
  useEffect(() => {
    loadMedications();
  }, []);

  return (
    <section>
      {/* unchanged — same user controls pattern as the case study */}
      <div id="user-controls">
        <span>Welcome, <strong>{currentUser.username}</strong>!</span>
        <button onClick={handleLogout}>Log Out</button>
      </div>

      {/* REMIX: replaced AddTodoForm with AddMedicationForm */}
      {/* REMIX: passes loadMedications instead of loadTodos */}
      <AddMedicationForm loadMedications={loadMedications} />

      {/* REMIX: updated loading message from todos to medications */}
      {isLoading && <p>Loading medications...</p>}
      {error && <p className="error">Something went wrong: {error}</p>}

      {/* REMIX: replaced TodoList with MedicationList */}
      {/* REMIX: passes medications and loadMedications instead of todos and loadTodos */}
      <MedicationList medications={medications} loadMedications={loadMedications} />
    </section>
  );
}

export default Dashboard;