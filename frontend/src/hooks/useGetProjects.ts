import { useEffect, useState } from "react";
import { Project } from "../models/project";
import { Tag } from "../models/tag";
import { User } from "../models/user";

const useGetProjects = () => {
  const [data, setData] = useState<Project[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getDataMock = (): Project[] => {
    const tags: Tag[] = [
      {
        name: "tag1",
      },
      {
        name: "tag2 longer",
      },
      {
        name: "tag3 much much longer",
      },
    ];

    const firstUser: User = {
      username: "ohad8353@gmail.com",
      password: "123123",
      displayName: "Ohad",
    };

    const secondUser: User = {
      username: "avi8353@gmail.com",
      password: "123123",
      displayName: "Avi",
    };

    const projects: Project[] = [
      {
        author: firstUser,
        title: "Project 1",
        description: "Project 1 description",
        tags: [tags[0], tags[1]],
      },
      {
        author: secondUser,
        title: "Project 2",
        description:
          "Project 2 description, very very very long description!!!!",
        tags: [tags[2]],
      },
    ];

    return projects;
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      // const response = await fetch("/api/projects");
      // const data = await response.json();

      const resData = getDataMock();

      setData(resData);
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
    loading,
  };
};

export default useGetProjects;
