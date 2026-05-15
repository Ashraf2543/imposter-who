export const WORD_BANK = {
  "🍕 Food": [
    "Pizza", "Sushi", "Hamburger", "Pasta", "Tacos", "Ramen", "Steak", "Curry",
    "Croissant", "Cheesecake", "Waffles", "Nachos", "Dim Sum", "Kebab", "Paella",
    "Burrito", "Falafel", "Pho", "Tiramisu", "Gelato", "Biryani", "Momos",
    "Dosa", "Pani Puri", "Samosa", "Noodles", "Sandwich", "Pancakes", "Spaghetti",
    "Fried Rice", "Cheeseburger", "Hot Dog", "Donut", "Brownie", "Lasagna",
  ],
  "🎬 Movies": [
    "Titanic", "Avatar", "Inception", "Interstellar", "The Matrix", "Joker",
    "Avengers", "Parasite", "Dune", "Top Gun", "Oppenheimer", "The Godfather",
    "Gladiator", "Fight Club", "Forrest Gump", "The Dark Knight", "Pulp Fiction",
    "Schindler's List", "La La Land", "Black Panther", "Spider-Man", "Iron Man",
    "Toy Story", "The Lion King", "Shrek", "Jurassic Park", "Harry Potter",
    "Lord of the Rings", "Star Wars", "Indiana Jones",
  ],
  "💼 Jobs": [
    "Doctor", "Engineer", "Teacher", "Chef", "Pilot", "Astronaut", "Lawyer",
    "Firefighter", "Scientist", "Architect", "Journalist", "Nurse", "Police Officer",
    "Artist", "Programmer", "Banker", "Dentist", "Pharmacist", "Psychologist",
    "Electrician", "Plumber", "Veterinarian", "Actor", "Singer", "Athlete",
    "Photographer", "Chef", "Mechanic", "Accountant", "Marketing Manager",
  ],
  "🐾 Animals": [
    "Elephant", "Tiger", "Penguin", "Dolphin", "Giraffe", "Cheetah", "Panda",
    "Kangaroo", "Gorilla", "Flamingo", "Crocodile", "Octopus", "Eagle", "Wolf",
    "Chimpanzee", "Koala", "Polar Bear", "Shark", "Chameleon", "Peacock",
    "Jaguar", "Platypus", "Meerkat", "Sloth", "Axolotl", "Capybara", "Narwhal",
    "Fennec Fox", "Snow Leopard", "Red Panda",
  ],
  "⚽ Sports": [
    "Cricket", "Football", "Basketball", "Tennis", "Swimming", "Badminton",
    "Boxing", "Wrestling", "Cycling", "Golf", "Volleyball", "Baseball", "Rugby",
    "Archery", "Skating", "Gymnastics", "Surfing", "Skiing", "Table Tennis",
    "Kabaddi", "Chess", "Snooker", "F1 Racing", "Martial Arts", "Fencing",
    "Weightlifting", "Marathon", "Triathlon", "Handball",
  ],
  "🌍 Countries": [
    "India", "Japan", "Brazil", "France", "Australia", "Canada", "Egypt",
    "Mexico", "South Korea", "Germany", "Italy", "Russia", "Argentina", "Nigeria",
    "Turkey", "Spain", "Indonesia", "Thailand", "Sweden", "Morocco", "China",
    "USA", "UK", "Portugal", "Netherlands", "Switzerland", "Saudi Arabia",
    "South Africa", "New Zealand", "Colombia",
  ],
  "📺 TV Shows": [
    "Breaking Bad", "Game of Thrones", "Money Heist", "Stranger Things", "Dark",
    "Squid Game", "Sherlock", "Friends", "The Office", "Narcos", "Peaky Blinders",
    "Mindhunter", "Chernobyl", "Succession", "Ozark", "The Crown", "Mirzapur",
    "Sacred Games", "Scam 1992", "Better Call Saul", "House of Cards",
    "Black Mirror", "The Boys", "Euphoria", "Severance", "Ted Lasso", "Fleabag",
    "Westworld", "True Detective", "Mr. Robot",
  ],
  "💻 Tech": [
    "Artificial Intelligence", "Blockchain", "Cloud Computing", "Cybersecurity",
    "Machine Learning", "Virtual Reality", "Smartphone", "Laptop", "Internet",
    "Robot", "Quantum Computing", "Metaverse", "Cryptocurrency", "Algorithm",
    "Database", "Firewall", "API", "Microchip", "Satellite", "ChatGPT",
    "Augmented Reality", "5G Network", "Self-Driving Car", "Smart Home",
    "Wearable Tech", "Neural Network", "Data Science", "Open Source", "DevOps",
  ],
  "🎵 Music": [
    "Guitar", "Piano", "Drums", "Violin", "Concert", "Album", "Podcast",
    "Rap", "Jazz", "Opera", "Remix", "Playlist", "Melody", "Karaoke",
    "Orchestra", "DJ", "Music Video", "Grammy", "Vinyl Record", "Studio",
    "Acoustic", "Beatboxing", "Saxophone", "Trumpet", "Bass Guitar",
    "Music Festival", "Song Cover", "Choir", "Jingle", "Soundtrack",
  ],
  "🏙️ Places": [
    "Eiffel Tower", "Colosseum", "Taj Mahal", "Great Wall", "Statue of Liberty",
    "Big Ben", "Burj Khalifa", "Pyramids", "Machu Picchu", "Niagara Falls",
    "Grand Canyon", "Amazon Rainforest", "Mount Everest", "Vatican",
    "Santorini", "Bali", "Tokyo", "Hollywood", "Times Square", "Las Vegas",
    "Dubai Mall", "Louvre Museum", "Angkor Wat", "Stonehenge", "Alhambra",
    "Petra", "Sydney Opera House", "Galápagos Islands", "Yellowstone", "Sahara",
  ],
  "🎮 Gaming": [
    "Minecraft", "Among Us", "Fortnite", "BGMI", "Valorant", "GTA V",
    "The Witcher", "Red Dead Redemption", "Cyberpunk 2077", "Call of Duty",
    "FIFA", "League of Legends", "Overwatch", "Elden Ring", "God of War",
    "Zelda", "Mario", "Pokemon", "Halo", "Battlefield", "Apex Legends",
    "PUBG", "CS:GO", "Roblox", "Terraria", "Stardew Valley", "Dark Souls",
    "Hollow Knight", "Celeste", "Rocket League",
  ],
  "🔬 Science": [
    "Black Hole", "DNA", "Evolution", "Gravity", "Photosynthesis", "Atom",
    "Relativity", "Big Bang", "Vaccine", "Climate Change", "Telescope",
    "Periodic Table", "Chemical Reaction", "Fossil", "Chromosome",
    "Supernova", "Magnetic Field", "Radioactivity", "Ecosystem", "Cell",
    "Neuron", "Tectonic Plate", "Aurora Borealis", "Dark Matter", "Quasar",
  ],
};

export const CATEGORIES = Object.keys(WORD_BANK);

export const getRandomWord = (category) => {
  const words = WORD_BANK[category];
  return words[Math.floor(Math.random() * words.length)];
};

export const getRandomCategory = () => {
  return CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
};
