import React from 'react';
import ExploreAudioCard from '../../components/ExploreAudioCard/exploreAudioCard';
import useGetProjects from '../../hooks/useGetProjects';
import './explorePage.scss';
import Loader from '../../components/Loader/loader';

const ExplorePage = () => {
  const { data, loading, error } = useGetProjects();

  if (loading)
    return (
      <div className='loader-container-explore-page'>
        <Loader />
      </div>
    );
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
