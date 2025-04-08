import { useState, useEffect } from 'react';

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1Z74I_qA2gpbW6Ol65yxRXhtvMrakeRDMnkFKo7Wg_ng/gviz/tq?tqx=out:csv&sheet=Sheet1';

const useFetchWords = () => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch(SHEET_URL);
        const text = await response.text();
        const lines = text.trim().split('\n');
        const data = lines.slice(1).map((line, index) => {
          const values = line.split(',').map(value => 
            value.trim().replace(/^"|"$/g, '') 
          );
          return {
            id: index + 1,
            phrase: values[0],
            usage: values[1],
            description: values[2],
          };
        });
        setWords(data);
      } catch (err) {
        console.error('Error loading CSV:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, []);

  return { words, loading };
};

export default useFetchWords;
