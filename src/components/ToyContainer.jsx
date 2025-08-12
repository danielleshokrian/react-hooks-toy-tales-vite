import { useState, useEffect } from "react";
import ToyCard from "./ToyCard";
import ToyForm from "./ToyForm";

function ToyContainer() {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, []);

    function handleAddToy(newToy) {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newToy, likes: 0 }),
    })
      .then((r) => r.json())
      .then((createdToy) => setToys((toys) => [...toys, createdToy]));
  }


  return (
    <div>
      <ToyForm onAddToy={handleAddToy} />
      <div className="toy-container">
        {toys.map((toy) => (
          <ToyCard key={toy.id} toy={toy} />
        ))}
      </div>
    </div>
  );
}

export default ToyContainer;
