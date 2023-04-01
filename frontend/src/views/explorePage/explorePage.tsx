import React from "react";
import DisplayUser from "../../components/DisplayUser/displayUser";
import ExploreAudioCard from "../../components/ExploreAudioCard/exploreAudioCard";
import UserAvatar from "../../components/UserAvatar/userAvatar";
import useGetProjects from "../../hooks/useGetProjects";
import "./explorePage.scss";

const ExplorePage = () => {
  const { data, loading, error } = useGetProjects();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  console.log("data:", data);

  return (
    <div className="explore-page-container">
      {data.map((project) => (
        <ExploreAudioCard project={project} />
      ))}
    </div>
  );
};

export default ExplorePage;
