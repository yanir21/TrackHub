import { useEffect, useState } from 'react';
import { ProjectCreate } from '../models/project';
import http from '../services/http';
import useSWR from 'swr';

const useGetProjects = () => {
  const fetcher = async (url: string) => {
    const res = await http.get(url);
    return res.data as Promise<ProjectCreate[]>;
  };

  const { data, error, isLoading } = useSWR<ProjectCreate[]>(
    '/projects',
    fetcher
  );

  return {
    data: data || [],
    error,
    loading: isLoading
  };
};

export default useGetProjects;
