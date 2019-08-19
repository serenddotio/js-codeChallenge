import React from 'react';
import SearchBar from './SearchBar';
import List from './List';

// App wrapper
const App = () => {
	return ( 
		<div className="ui container">
			<h1>Amazon Product Information</h1>
			<p>This tool will work only with ASIN from the US store - https://www.amazon.com</p>
			<SearchBar />
			<List />
		</div>
	)
}

export default App;