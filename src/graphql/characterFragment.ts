// Þar sem við erum að sækja nokkrum sinnum character/Person (af hverju ekki samræmt??)
// þá er gott að hafa á einum stað og sækja alltaf sömu gögnin, lendum þá ekki í að stundum hafi
// við gögn og stundum ekki.
export const characterFragment = `
  fragment character on Person {
    id
    name
    birthYear
    hairColor
    eyeColor
    height
    mass
  }
`;
