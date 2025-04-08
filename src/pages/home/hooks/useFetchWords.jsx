import { useState, useEffect } from 'react';
import Papa from 'papaparse';

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1Z74I_qA2gpbW6Ol65yxRXhtvMrakeRDMnkFKo7Wg_ng/gviz/tq?tqx=out:csv&sheet=Sheet1';

const useFetchWords = () => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch(SHEET_URL);
        const csvText = await response.text();

        const parsed = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
        });

        const data = parsed.data.map((row, index) => ({
          id: index + 1,
          phrase: row['phrase'] || '',
          usage: row['usage'] || '',
          description: row['description'] || '',
        }));

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
