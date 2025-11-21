import { useEffect, useState } from "react";

const TestApi = () => {
  const [status, setStatus] = useState("Testing...");

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/test")
      .then((res) => res.json())
      .then((data) => setStatus(data.message || "API Connected"))
      .catch(() => setStatus("API Connection Failed"));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-xl font-bold">
      {status}
    </div>
  );
};

export default TestApi;
