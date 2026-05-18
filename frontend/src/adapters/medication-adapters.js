// REMIX: renamed from todo-adapters.js to medication-adapters.js
// REMIX: all endpoints changed from /api/todos to /api/medications
// REMIX: all function names changed from todo to medication

// unchanged — same handleFetch helper as the case study
const handleFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`Fetch failed. ${response.status} ${response.statusText}`);
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

// REMIX: renamed from fetchAllTodos to fetchAllMedications
// REMIX: changed /api/todos to /api/medications
export const fetchAllMedications = async () => {
  return handleFetch('/api/medications');
};

// REMIX: renamed from createTodo to createMedication
// REMIX: changed /api/todos to /api/medications
// REMIX: body now sends name, dosage, frequency instead of just title
export const createMedication = async (name, dosage, frequency) => {
  return handleFetch('/api/medications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, dosage, frequency }),
  });
};

// REMIX: renamed from updateTodo to updateMedication
// REMIX: changed /api/todos/${todo_id} to /api/medications/${medication_id}
export const updateMedication = async (medication_id, updates) => {
  return handleFetch(`/api/medications/${medication_id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
};

// REMIX: renamed from deleteTodo to deleteMedication
// REMIX: changed /api/todos/${todo_id} to /api/medications/${medication_id}
export const deleteMedication = async (medication_id) => {
  return handleFetch(`/api/medications/${medication_id}`, { method: 'DELETE' });
};