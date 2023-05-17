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
      <div className='explore-audio-cards-container'>
        {data.map((project) => (
          <ExploreAudioCard project={project} key={project._id} />
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
