import client from './client';

export const createPatient = async (patientData) => {
  const response = await client.post('patients/', patientData);
  return response.data;
};

export const searchPatients = async (query) => {
  const response = await client.get('patients/', { params: { search: query } });
  return response.data;
};
