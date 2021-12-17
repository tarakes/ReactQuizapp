import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useSolutions() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    async function fetchSolutions() {
      // database related works
      const db = getDatabase();
      const quizRef = ref(db, "solution");
      const quizQuery = query(quizRef, orderByKey());

      try {
        setError(false);
        //  console.log("Hello");
        setLoading(true);
        // request firebase database
        const snapshot = await get(quizQuery);
        setLoading(false);
        //   console.log(snapshot);
        if (snapshot.exists()) {
          setSolutions((prevSolutions) => {
            return [...prevSolutions, ...Object.values(snapshot.val())];
          });
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }

    fetchSolutions();
  }, []);

  return {
    loading,
    error,
    solutions,
  };
}
