// hooks/useFetchCategories.js
import { useEffect, useState } from 'react';
import Papa from 'papaparse';

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSOAUHXPc4_IQpmM0C49x4aPNj-9h2vlq0GL67LCqZOIfXtnCmzGoDgRCmLq3EfvzaqMSLdzBdAuhnB/pub?gid=878542973&single=true&output=csv';

const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const res = await fetch(SHEET_URL);
        const text = await res.text();
        const parsed = Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
        });

        const values = parsed.data.map((row) => row['Categories']?.trim()).filter(Boolean);

        const unique = Array.from(new Set(values));
        setCategories(unique);
      } catch (e) {
        console.error('Error loading categories:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchCSV();
  }, []);

  return { categories, loading };
};

export default useFetchCategories;
