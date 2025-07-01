import { useState, useEffect } from 'react';
import Papa from 'papaparse';

const VERBS_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR4qY-yh7UWtV9SEmIrW4pGD_QuKBAONFkZz3VNmxwh6gKY6QEM7AqMvZwivDeqrniGAMG-GhEFNM7Q/pub?output=csv';


const useFetchVerbs = () => {
  const [verbs, setVerbs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVerbs = async () => {
      try {
        const response = await fetch(VERBS_SHEET_URL);
        const csvText = await response.text();

        const parsed = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
        });

        const data = parsed.data.map((row, index) => ({
          id: index + 1,
          verb: row['Verb'] || '',
          past: row['Past'] || '',
          participle: row['Participle'] || '',
          meaning: row['Meaning'] || '',
          phrase: row['Phrase'] || '',
        }));

        setVerbs(data);
      } catch (err) {
        console.error('Error loading verb CSV:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVerbs();
  }, []);

  return { verbs, loading };
};

export default useFetchVerbs;
