const vars = JSON.parse(process.argv[2])

for (const [key, value] of Object.entries(vars)) {
  console.log(`${key}="${value}"`);
}
