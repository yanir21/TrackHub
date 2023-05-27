import { useEffect, useState } from 'react';
import { ProjectCreate } from '../models/project';
import http from '../services/http';
import useSWR from 'swr';
import { Tag } from '../models/tag';

const useGetTags = () => {
  const fetcher = async (url: string) => {
    const res = await http.get(url);
    return res.data as Promise<Tag[]>;
  };

  const { data, error, isLoading } = useSWR<Tag[]>('/tags', fetcher);

  return {
    data,
    error,
    loading: isLoading
  };
};

export default useGetTags;
