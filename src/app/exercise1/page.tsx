// Components
import { Range } from "@components";

type ExerciseOneData = {
  min: number;
  max: number;
};

// TODO: This into utils?
// TODO: Error handling
async function getData(): Promise<ExerciseOneData | null> {
  const res = await fetch("http://localhost:8080/api/minMax");

  if (!res.ok) {
    console.error("There was an error fetching the data");
    return null;
  }

  return res.json();
}

export default async function ExerciseOne(): Promise<React.ReactNode> {
  const mockData = await getData();

  return (
    <main>
      <h1>Exercise 1</h1>
      <Range {...mockData} />
    </main>
  );
}
