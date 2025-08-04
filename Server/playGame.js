const fs = require('fs');
const path = require('path');

let vowelCount = 0;
let consonantCount = 0;
let dictionary = [];

// const filePath = path.join((__dirname, './parole/parole.txt'));
const filePath = path.join(__dirname, 'parole', 'parole.txt');

// Leggi il file e converti in JSON
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Errore nella lettura del file:', err);
    return;
  }

  dictionary = data
    .split('\n')
    .map(word => word.trim())
    .filter(word => word.length > 0);
});

// Converti in JSON
const jsonOutput = JSON.stringify({ dictionary }, null, 2);

// console.log('Risultato JSON:');
console.log(jsonOutput);

// (Facoltativo) Salva su file
//   fs.writeFile('parole.json', jsonOutput, (err) => {
//     if (err) console.error('Errore nel salvataggio:', err);
//     else console.log('File JSON salvato come parole.json');
//   });


function playGame(req, res) {
  try {
    const { type, count = 1 } = req.body;
    const vowels = ["A", "E", "I", "O", "U"];
    const consonants = "BCDFGHJKLMNPQRSTVWXYZ".split("");
    const MAX = 90;
    const MIN = 65;
    if (type === "vowel") {
      console.log("vowelCount " + vowelCount);
      if (vowelCount >= 3) {
        return res.status(400).json({ error: "Hai già raggiunto il massimo di 3 vocali" });
      }
      console.log("vowel");
      vowelCount++;
      const letter = {
        id: Date.now() + Math.random().toString(36).substring(2, 9),
        value: vowels[Math.floor(Math.random() * vowels.length)],
        imgUrl: "",
        selected: false
      };
      return res.status(200).json({ letter });
    }else if (type === "consonant") {
      if (consonantCount >= 5) {
        return res.status(400).json({ error: "Hai già raggiunto il massimo di 4 consonanti" });
      }
      console.log("consonantCount " + consonantCount);

      console.log("consonant");
      consonantCount++;
      const letter = {
        id: Date.now() + Math.random().toString(36).substring(2, 9),
        value: consonants[Math.floor(Math.random() * consonants.length)],
        imgUrl: "",
        selected: false
      };
      return res.status(200).json({ letter });
    } else if (type === "mycard") {
      console.log("server my card");

      const letters = Array.from({ length: count }, (_, i) => ({
        id: `card-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 5)}`,
        value: String.fromCharCode(Math.floor(Math.random() * (MAX - MIN + 1)) + MIN),
        imgUrl: "",
        selected: false
      }));
      return res.status(200).json({ letters });
    } else if (type === "reset") {
      console.log("reset");
      vowelCount = 0;
      consonantCount = 0;
      return res.status(200).json({ success: true });
    } else if (type === "verifyWords") {
      let myword = req.body.letters.join("").toLowerCase().trim();
      console.log("Parola da verificare:", myword);

      const isValid = dictionary.includes(myword);
      console.log(`${myword}: ${isValid ? 'VALIDA' : 'NON VALIDA'}`);

      return res.status(200).json({
        isValid,
        word: myword
      });
    } else {
      return res.status(400).json({ error: "Tipo non valido" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Errore interno del server" });
  }
}

module.exports = playGame;


