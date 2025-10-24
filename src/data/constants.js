// src/data/constants.js

// List of formations with player count constraints
export const formations = [
    { name: "4-3-3", formation: { Forward: 3, Midfielder: 3, Defender: 4, Goalkeeper: 1 } },
    { name: "4-4-2", formation: { Forward: 2, Midfielder: 4, Defender: 4, Goalkeeper: 1 } },
    { name: "3-5-2", formation: { Forward: 2, Midfielder: 5, Defender: 3, Goalkeeper: 1 } },
    { name: "3-4-3", formation: { Forward: 3, Midfielder: 4, Defender: 3, Goalkeeper: 1 } },
    { name: "5-3-2", formation: { Forward: 2, Midfielder: 3, Defender: 5, Goalkeeper: 1 } },
    // Add more formations if needed
];

// Sample player pool (sorted by ID)
export const samplePlayers = [
    { id: 1, name: 'Lionel Messi', position: 'Forward', number: 10 },
    { id: 2, name: 'Cristiano Ronaldo', position: 'Forward', number: 7 },
    { id: 3, name: 'Kylian Mbappé', position: 'Forward', number: 9 },
    { id: 4, name: 'Erling Haaland', position: 'Forward', number: 9 },
    { id: 5, name: 'Robert Lewandowski', position: 'Forward', number: 9 },
    { id: 6, name: 'Neymar Jr.', position: 'Forward', number: 11 },
    { id: 7, name: 'Mohamed Salah', position: 'Forward', number: 11 },
    { id: 8, name: 'Harry Kane', position: 'Forward', number: 9 },
    { id: 9, name: 'Karim Benzema', position: 'Forward', number: 9 },
    { id: 10, name: 'Luka Modrić', position: 'Midfielder', number: 10 },
    { id: 11, name: 'Kevin De Bruyne', position: 'Midfielder', number: 17 },
    { id: 12, name: 'Paul Pogba', position: 'Midfielder', number: 6 },
    { id: 13, name: 'Bruno Fernandes', position: 'Midfielder', number: 8 },
    { id: 14, name: 'Thomas Müller', position: 'Midfielder', number: 25 },
    { id: 15, name: 'Joshua Kimmich', position: 'Midfielder', number: 6 },
    { id: 16, name: 'Phil Foden', position: 'Midfielder', number: 47 },
    { id: 17, name: 'Jack Grealish', position: 'Midfielder', number: 10 },
    { id: 18, name: 'Toni Kroos', position: 'Midfielder', number: 8 },
    { id: 19, name: 'Sergio Busquets', position: 'Midfielder', number: 5 },
    { id: 20, name: 'Virgil van Dijk', position: 'Defender', number: 4 },
    { id: 21, name: 'Sergio Ramos', position: 'Defender', number: 4 },
    { id: 22, name: 'Raphaël Varane', position: 'Defender', number: 5 },
    { id: 23, name: 'Mats Hummels', position: 'Defender', number: 5 },
    { id: 24, name: 'Andrew Robertson', position: 'Defender', number: 26 },
    { id: 25, name: 'Trent Arnold', position: 'Defender', number: 66 },
    { id: 26, name: 'Alphonso Davies', position: 'Defender', number: 19 },
    { id: 27, name: 'João Cancelo', position: 'Defender', number: 7 },
    { id: 28, name: 'Thiago Silva', position: 'Defender', number: 6 },
    { id: 29, name: 'Kalidou Koulibaly', position: 'Defender', number: 26 },
    { id: 30, name: 'Manuel Neuer', position: 'Goalkeeper', number: 1 },
    { id: 31, name: 'Gianluigi Donnarumma', position: 'Goalkeeper', number: 99 },
    { id: 32, name: 'Thibaut Courtois', position: 'Goalkeeper', number: 1 },
    { id: 33, name: 'Jan Oblak', position: 'Goalkeeper', number: 13 },
    { id: 34, name: 'Alisson Becker', position: 'Goalkeeper', number: 1 },
    { id: 35, name: 'Ederson', position: 'Goalkeeper', number: 31 },
    { id: 36, name: 'Keylor Navas', position: 'Goalkeeper', number: 1 },
    { id: 37, name: 'Hugo Lloris', position: 'Goalkeeper', number: 1 },
    { id: 38, name: 'Marc-André ter Stegen', position: 'Goalkeeper', number: 1 },
    { id: 39, name: 'David de Gea', position: 'Goalkeeper', number: 1 },
    { id: 40, name: 'Diego Carlos', position: 'Defender', number: 3 },
    { id: 41, name: 'Benjamin Pavard', position: 'Defender', number: 5 },
    { id: 42, name: 'Fikayo Tomori', position: 'Defender', number: 23 },
    { id: 43, name: 'Jules Koundé', position: 'Defender', number: 23 },
    { id: 44, name: 'Aaron Wan-Bissaka', position: 'Defender', number: 29 },
    { id: 45, name: 'Luke Shaw', position: 'Defender', number: 23 },
    { id: 46, name: 'César Azpilicueta', position: 'Defender', number: 28 },
    { id: 47, name: 'Marco Verratti', position: 'Midfielder', number: 6 },
    { id: 48, name: 'Frenkie de Jong', position: 'Midfielder', number: 21 },
    { id: 49, name: 'David Silva', position: 'Midfielder', number: 21 },
    { id: 50, name: 'Xavi Hernández', position: 'Midfielder', number: 6 },
    { id: 51, name: 'Kai Havertz', position: 'Midfielder', number: 29 },
    { id: 52, name: 'Rodri', position: 'Midfielder', number: 16 },
    { id: 53, name: 'Jude Bellingham', position: 'Midfielder', number: 22 },
    { id: 54, name: 'Mohamed Elneny', position: 'Midfielder', number: 4 },
    { id: 55, name: 'Emre Can', position: 'Midfielder', number: 23 },
    { id: 56, name: 'Adrien Rabiot', position: 'Midfielder', number: 25 },
    { id: 57, name: 'N\\\'Golo Kanté', position: 'Midfielder', number: 7 },
    { id: 58, name: 'Arthur Melo', position: 'Midfielder', number: 29 },
    { id: 59, name: 'Danilo Pereira', position: 'Midfielder', number: 15 },
    { id: 60, name: 'Philippe Coutinho', position: 'Midfielder', number: 14 },
    { id: 61, name: 'Gareth Bale', position: 'Forward', number: 11 },
    { id: 62, name: 'Marco Asensio', position: 'Forward', number: 20 },
    { id: 63, name: 'Lucas Vázquez', position: 'Forward', number: 17 },
    { id: 64, name: 'Isco', position: 'Midfielder', number: 22 },
    { id: 65, name: 'Casemiro', position: 'Midfielder', number: 14 },
    { id: 66, name: 'Mateo Kovačić', position: 'Midfielder', number: 23 },
    { id: 67, name: 'Marcelo', position: 'Defender', number: 12 },
    { id: 68, name: 'Dani Carvajal', position: 'Defender', number: 2 },
    { id: 69, name: 'Nacho Fernández', position: 'Defender', number: 6 },
    { id: 70, name: 'Theo Hernández', position: 'Defender', number: 15 },
    { id: 71, name: 'Kiko Casilla', position: 'Goalkeeper', number: 13 }
];

// Optional: Move name generation arrays here too if desired
export const adjectives = ["Royal", "Mighty", "Supreme", "Imperial", "Eternal", "Legendary", "Elite", "Ultimate", "Invincible", "Majestic"];
export const nouns = ["Dragons", "Lions", "Eagles", "Titans", "Warriors", "Wolves", "Hornets", "Vipers", "Phoenix", "Rockets", "Sharks", "Cobras", "Knights", "Gladiators", "Legends", "Masters", "Champions", "Raiders"];
export const suffixes = ["FC", "United", "City", "Athletic", "Rovers", "Wanderers", "Alliance", "Academy", "Elite", "Stars"];

// Helper function for random team name generation
export const generateRandomTeamName = () => {
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    return `${randomAdjective} ${randomNoun} ${randomSuffix}`;
}; 