const currentYear = new Date().getFullYear();
const startYear = 1950;
const years = [];

for (let i = currentYear; i >= startYear; i--) {
  years.push({ value: i, label: i });
}

export default years as { value: number, label: number }[];
