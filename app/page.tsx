"use client";
import { useEffect, useState } from "react";
import CatCard from "./components/CatCard";
type Cat = { id: number; url: string; score: number };
import './styles/globals.css';

export default function HomePage() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [pair, setPair] = useState<Cat[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cats`)
      .then(res => res.json())
      .then((data) => {
        setCats(data);
        pickTwo(data);
      });
  }, []);

  const pickTwo = (list: Cat[]) => {
    const first = list[Math.floor(Math.random() * list.length)];
    let second;
    do {
      second = list[Math.floor(Math.random() * list.length)];
    } while (second.id === first.id);
    setPair([first, second]);
  };

  const handleVote = (id: number) => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ winnerId: id })
    }).then(() => pickTwo(cats));
  };

  return (
    <div>
      <h1>Vote pour le chat le plus mignon 🐱</h1>
      <div className="cat-container">
        {pair.map((cat) => (
          <CatCard key={cat.id} {...cat} onVote={handleVote} />
        ))}
      </div>
    </div>
  );
}
