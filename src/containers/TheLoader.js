import React from 'react';
import {useSelector} from 'react-redux';

const TheLoader = () => {
	let isLoaderActive = useSelector((state) => state.Loader.isLoader);

	const loaderTemplate = () => {
		return (
            <div className="center">
  <div className="wave"></div>
  <div className="wave"></div>
  <div className="wave"></div>
  <div className="wave"></div>
  <div className="wave"></div>
  <div className="wave"></div>
  <div className="wave"></div>
  <div className="wave"></div>
  <div className="wave"></div>
  <div className="wave"></div>
</div>

        );
	};

	return (<>
    {isLoaderActive ? loaderTemplate() : ''}
    </>);
};

export default TheLoader;
