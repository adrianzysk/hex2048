import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

async function fetchRandomNumbers(hostname, radius, body = "[]") {
  const response = await fetch(`https://${hostname}/${radius}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: body,
  });
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const numbers = await response.json();
  return numbers;
}

const createGrid = (radius) => {
  // function to change later
  let grid = [];
  if (radius === "2") {
    grid = [
      { x: 0, y: 1, z: -1, value: 0 },
      { x: -1, y: 1, z: 0, value: 0 },
      { x: 0, y: 0, z: 0, value: 0 },
      { x: 1, y: 0, z: -1, value: 0 },
      { x: -1, y: 0, z: 1, value: 0 },
      { x: 1, y: -1, z: 0, value: 0 },
      { x: 0, y: -1, z: 1, value: 0 },
    ];
  }
  return grid;
};

const fillNumbersGrid = (grid, numbers) => {
  let hexgrid = grid;
  console.log(grid);
  for (let i = 0; i < numbers.length; i++) {
    let objIndex = grid.findIndex(
      (obj) =>
        obj.x === numbers[i].x &&
        obj.y === numbers[i].y &&
        obj.z === numbers[i].z
    );
    hexgrid[objIndex].value = numbers[i].value;
  }
  return hexgrid;
};

export const Game = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [grid, setGrid] = useState(createGrid(searchParams.get("radius")));

  useEffect(() => {
    setGrid(createGrid(searchParams.get("radius")));
  }, []);

  useEffect(() => {
    const startGame = async () => {
      const numbers = await fetchRandomNumbers(
        searchParams.get("hostname"),
        searchParams.get("radius")
      );
      const newGrid = fillNumbersGrid(grid, numbers);
      setGrid(newGrid);
    };
    startGame();
  }, []);

  return (
    <div>
      {grid.map((hex) => (
        <div>{hex.value}</div>
      ))}
    </div>
  );
};
