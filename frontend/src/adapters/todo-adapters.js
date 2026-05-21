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

export const fetchAllMedications = async () => {
  return handleFetch('/api/medications');
};

export const createMedication = async (name, dosage, frequency) => {
  return handleFetch('/api/medications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, dosage, frequency }),
  });
};

export const updateMedication = async (medication_id, updates) => {
  return handleFetch(`/api/medications/${medication_id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
};

export const deleteMedication = async (medication_id) => {
  return handleFetch(`/api/medications/${medication_id}`, { method: 'DELETE' });
};