import { useEffect, useState } from 'react';
import { Project } from '../models/project';
import http from '../services/http';
import useSWR from 'swr';
import { Tag } from '../models/tag';

const useGetTags = () => {
  const fetcher = async (url: string) => {
    const res = await http.get(url);
    return res.data as Promise<Tag[]>;
  };

  const { data, error, isLoading } = useSWR<Tag[]>('/tag', fetcher);

  return {
    data,
    error,
    loading: isLoading
  };
};

export default useGetTags;
