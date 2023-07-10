import React,
{
useState,
useEffect
}

from 'react';
import './tailwind.css'; // Update the import path
import data from './data.json';
import Splash from './Splash';

function App() {
	const [searchTerm,
	setSearchTerm]=useState('');
	const [searchResult,
	setSearchResult]=useState(null);
	const [validationError,
	setValidationError]=useState('');
	// eslint-disable-next-line
	const [isLoading,
	setIsLoading]=useState(true);
	;

	useEffect(()=> {

			// Simulate a delay to demonstrate the splash screen
			setTimeout(()=> {
        
					setIsLoading(false);
				}

			, 2000);
		}

		, []);

	const handleSearch=(event)=> {
		event.preventDefault();

		if ( !searchTerm) {
			setValidationError('Please enter a restaurant');
			return;
		}

		const lowerCaseSearchTerm=searchTerm.toLowerCase();
		const result=data.find((restaurant)=> restaurant.name.toLowerCase().includes(lowerCaseSearchTerm));
		setSearchResult(result || null);
		setValidationError('');
	}

	;

	const handleKeyPress=(event)=> {
		if (event.key==='Enter') {
			event.preventDefault();
			handleSearch(event); // Pass the event object to handleSearch
		}
	}

	;

	const getBackgroundColor=(status)=> {
		if (status==='closed') {
			return 'bg-red-500';
		}

		else if (status==='open') {
			return 'bg-green-500';
		}

		else {
			return 'bg-[bg-gradient-to-l from-gray-900 to-gray-600 bg-gradient-to-r]';
		}
	}

	;

	return (<> {
			isLoading ? (<Splash /> // Render the Splash component while loading

			) : (<div className="flex justify-center items-center h-screen" >           
      <div
      className={`container ${getBackgroundColor(searchResult?.status)} mx-auto px-4 py-8`}
      >
       <h1 className="text-2xl justify-center font-bold text-center text-[#B6EADA]" >IS IT OPEN?</h1> {
					searchResult && (<div className="flex justify-center mt-4" > {
							searchResult.status==='closed' ? (<img src="angryramsay.png" alt="Angry Ramsay" className="h-24" />) : (<img src="happyramsay.png" alt="Happy Ramsay" className="h-24" />)
						}

						</div>)
				}

				<form className="mt-4" onSubmit= {
					handleSearch
				}

				> <label htmlFor="default-search"
				className="mb-4 text-sm font-medium text-gray-900 sr-only dark:text-white"
				> Search </label> <div className="relative" > <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none" > <svg className="w-4 h-4 text-gray-500 dark:text-gray-400"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 20 20"
				> <path stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
				/> </svg> </div> <input type="search"
				id="default-search"
				className="block w-full flex-1 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="Search for a restaurant"

				value= {
					searchTerm
				}

				onChange= {
					(event)=> setSearchTerm(event.target.value)
				}

				onKeyPress= {
					handleKeyPress
				}

				required /> <button type="submit"
				className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"

				> Search </button> </div> </form> {
					validationError && <p className="text-red-500" > {
						validationError
					}

					</p>
				}

					{
					searchResult ? (<div className=" p-4 shadow mt-4" > <h2 className="text-lg text-center font-semibold mb-2" > {
							searchResult.name
						}

						</h2> <p className="mb-2 text-center " > Status: <span className="font-semibold" > {
							searchResult.status
						}

						</span> </p> <p className="text-sm text-center " > {
							searchResult.description
						}

						</p> </div>) : (<p className="mt-4" >No matching restaurant found.</p>)
				}

				</div> </div>)
		}

		</>);
}

export default App;