import { useEffect, useState } from 'react';
import axios from 'axios';

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const getRegisteredItem = async ({id}) => {
    try {
      const response = await axios.get('/search', {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzNhNGE1OTlkMzJlNGRhNjNhNTkxMWIiLCJlbWFpbCI6InN0ZXZlbkB5YWhvby5jb20iLCJpYXQiOjE3MzE4NzM0ODEsImV4cCI6MTczMjQ3ODI4MX0.4FYsxKcsvBDJncejVKRFXEAGODQuGTfL0tNUaPKTco0"
        }
      });

      setResults(response.data);
    } catch (err) {
      setErrorMessage('Something went wrong');
    }
  };

  // Call searchApi when component
  // is first rendered.  BAD CODE!
  // searchApi('pasta');
  useEffect(() => {
    getRegisteredItem(id);
  }, []);

  return [getRegisteredItem, results, errorMessage];
};