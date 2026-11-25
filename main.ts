// Writes one joke about office life to /output/entry.txt.
// One line, under 200 characters, deterministic, no dependencies.
const fs = require('node:fs');
const path = require('node:path');

const JOKE = "My calendar is so full I booked 15 minutes to cry in my car.";

function main() {
  const lines = JOKE.split('\n');
  if (lines.length !== 1) {
    throw new Error('joke must be exactly one line');
  }
  if (JOKE.length === 0 || JOKE.length >= 200) {
    throw new Error('joke must be 1-199 characters, got ' + JOKE.length);
  }
  if (JOKE.trim().length === 0) {
    throw new Error('joke must not be only whitespace');
  }

  const outDir = '/output';
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'entry.txt');
  fs.writeFileSync(outPath, JOKE, 'utf8');

  // Verify the file round-trips byte-identical: what the judge reads is
  // exactly the validated joke, one line, no trailing newline added.
  const written = fs.readFileSync(outPath, 'utf8');
  if (written !== JOKE) {
    throw new Error('written entry does not match the validated joke');
  }
  if (written.includes('\n')) {
    throw new Error('written entry must contain no newline');
  }
}

main();
