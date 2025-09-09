import React, { useState } from "react";

function App() {
  // Puzzle categories with hidden themes
  const categories = [
    {
      theme: "Synonyms",
      words: ["Big", "Large", "Huge", "Enormous"],
    },
    {
      theme: "Colors",
      words: ["Emerald", "Sapphire", "Ruby", "Amethyst"],
    },
    {
      theme: "Phrases with 'Go'",
      words: ["GoBack", "GoAhead", "GoFetch", "GoAway"],
    },
    {
      theme: "Fruits",
      words: ["Apple", "Banana", "Orange", "Pear"],
    },
  ];

  // Flatten into one shuffled word list
  const allWords = categories
    .map((cat) => cat.words)
    .flat()
    .sort(() => Math.random() - 0.5);

  const [selected, setSelected] = useState([]);
  const [foundGroups, setFoundGroups] = useState([]);
  const [message, setMessage] = useState("");

  const handleSelect = (word) => {
    if (selected.includes(word)) {
      setSelected(selected.filter((w) => w !== word));
    } else if (selected.length < 4) {
      setSelected([...selected, word]);
    }
  };

  const handleSubmit = () => {
    if (selected.length !== 4) {
      setMessage("Pick exactly 4 words!");
      return;
    }

    // Check if selection matches a category
    const match = categories.find(
      (cat) =>
        cat.words.every((w) => selected.includes(w)) &&
        !foundGroups.includes(cat.theme)
    );

    if (match) {
      setFoundGroups([...foundGroups, match.theme]);
      setMessage("✅ Correct group found!");
    } else {
      setMessage("❌ Those words don’t form a group.");
    }
    setSelected([]);
  };

  // Hide words that belong to completed groups
  const visibleWords = allWords.filter(
    (word) =>
      !categories
        .filter((cat) => foundGroups.includes(cat.theme))
        .some((cat) => cat.words.includes(word))
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Word Group Puzzle</h1>

      <div className="grid grid-cols-4 gap-3 mb-4">
        {visibleWords.map((word) => (
          <button
            key={word}
            onClick={() => handleSelect(word)}
            className={`px-4 py-2 rounded-lg shadow ${
              selected.includes(word)
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
          >
            {word}
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-green-500 text-white rounded-lg shadow"
      >
        Submit
      </button>

      {message && <p className="mt-3 text-lg">{message}</p>}

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Groups Found:</h2>
        <ul>
          {foundGroups.map((theme) => (
            <li key={theme}>✅ {theme}</li>
          ))}
        </ul>
      </div>

      {foundGroups.length === categories.length && (
        <p className="mt-6 text-2xl font-bold">🎉 You win! All groups found.</p>
      )}
    </div>
  );
}

export default App;
