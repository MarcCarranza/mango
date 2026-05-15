"use client";

// Components
import { Range } from "@components";
import { useEffect, useState } from "react";

type ExerciseOneData = {
  min: number;
  max: number;
};

// TODO: This into utils?
// TODO: Error handling
async function getData(): Promise<ExerciseOneData | null> {
  const res = await fetch("/api/minMax");

  if (!res.ok) {
    console.error("There was an error fetching the data");
    return null;
  }

  return res.json();
}

export default function ExerciseOne(): React.ReactNode {
  const [data, setData] = useState<ExerciseOneData | null>(null);

  // TODO: Look into SSR instead of use client
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data
  const fetchData = async () => {
    const mockedValues = await getData();
    setData(mockedValues);
  };

  return (
    <main>
      <h1>Exercise 1</h1>
      <Range {...data} />
    </main>
  );
}
