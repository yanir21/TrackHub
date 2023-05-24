import React from 'react';
import ExploreAudioCard from '../../components/ExploreAudioCard/exploreAudioCard';
import useGetProjects from '../../hooks/useGetProjects';
import './explorePage.scss';

const ExplorePage = () => {
  const { data, loading, error } = useGetProjects();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className='explore-page-container'>
      {data.map((project) => (
        <ExploreAudioCard project={project} key={project._id} />
      ))}
    </div>
  );
};

export default ExplorePage;
