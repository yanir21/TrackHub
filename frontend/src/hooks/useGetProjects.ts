import { useEffect, useState } from 'react';
import { Project } from '../models/project';
import http from '../services/http';
import useSWR from 'swr';

const useGetProjects = () => {
  const fetcher = async (url: string) => {
    const res = await http.get(url);
    return res.data as Promise<Project[]>;
  };

  const { data, error, isLoading } = useSWR<Project[]>('/projects', fetcher);

  return {
    data: data || [],
    error,
    loading: isLoading
  };
};

export default useGetProjects;
