import { useEffect, useState } from 'react';
import { Project } from '../models/project';
import http from '../services/http';

const useGetProjects = () => {
  const [data, setData] = useState<Project[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await http.get('/projects');

      setData(response.data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    error,
    loading
  };
};

export default useGetProjects;
