import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = () => (
	<div
		style={{
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			height: 'calc(100vh - 64px)'
		}}
	>
		<CircularProgress />
	</div>
);

export default Loader;
