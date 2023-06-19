import { useEffect, useState } from 'react';
import { Project, ProjectCreate } from '../models/project';
import http from '../services/http';
import useSWR from 'swr';
import { Tag } from '../models/tag';

interface UseGetUserProjectProps {
  userId: string;
}

const useGetUserSuggestions = ({ userId }: UseGetUserProjectProps) => {
  const fetcher = async (url: string) => {
    if (userId) {
      const res = await http.get(url);
      return res.data as Promise<Project[]>;
    } else {
      return [];
    }
  };

  const { data, error, isLoading } = useSWR<Project[]>(
    `/suggestions/user/${userId}`,
    fetcher
  );

  return {
    data: data || [],
    error,
    loading: isLoading
  };
};

export default useGetUserSuggestions;
