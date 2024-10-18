'use client'
import Navber from "./components/Navber/Navber";
import Maincotent from "./components/Main _content/maincotent";
import { useState } from "react";


export default function Home() {
  const [query, setQuery] = useState("nature");
  return (
    <div>
    <Navber  setQuery={setQuery}/>
    <Maincotent query={query}/>
    </div>
  );
}
