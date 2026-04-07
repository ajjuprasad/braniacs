/**
 * Brainiacs Trivia Question Database
 * Each question has: id, question, type, options, answer, difficulty, category, funFact
 * Types: "multiple", "truefalse", "whosaidit"
 * Difficulties: 1 (Easy), 2 (Medium), 3 (Hard), 4 (Expert)
 */
const TRIVIA_QUESTIONS = [
    // ========================================
    // LEVEL 1: The Cheesecake Factory (Easy)
    // Focus: Basic character traits, relationships, catchphrases
    // ========================================
    {
        id: 1,
        question: "What is Sheldon Cooper's catchphrase?",
        type: "multiple",
        options: ["Bazinga!", "Cowabunga!", "Eureka!", "Wubba Lubba Dub Dub!"],
        answer: "Bazinga!",
        difficulty: 1,
        category: "catchphrases",
        funFact: "Jim Parsons said 'Bazinga' over 100 times throughout the series."
    },
    {
        id: 2,
        question: "Where does Penny work when she first meets Leonard and Sheldon?",
        type: "multiple",
        options: ["The Cheesecake Factory", "A coffee shop", "A bookstore", "A bar"],
        answer: "The Cheesecake Factory",
        difficulty: 1,
        category: "characters",
        funFact: "Penny was a waitress for years before landing an acting gig... in a hemorrhoid commercial."
    },
    {
        id: 3,
        question: "Sheldon and Leonard are roommates.",
        type: "truefalse",
        options: ["True", "False"],
        answer: "True",
        difficulty: 1,
        category: "characters",
        funFact: "Their roommate agreement is one of the most referenced documents in TV history."
    },
    {
        id: 4,
        question: "What is the name of the comic book store the guys frequently visit?",
        type: "multiple",
        options: ["Stuart's Comic Book Store", "The Comic Center of Pasadena", "Nerd Haven Comics", "Heroes & Villains"],
        answer: "The Comic Center of Pasadena",
        difficulty: 1,
        category: "locations",
        funFact: "Stuart is the perpetually sad owner who can never seem to catch a break."
    },
    {
        id: 5,
        question: "'I'm not crazy. My mother had me tested.'",
        type: "whosaidit",
        options: ["Sheldon", "Howard", "Leonard", "Raj"],
        answer: "Sheldon",
        difficulty: 1,
        category: "quotes",
        funFact: "This became one of the most quoted lines from the entire series."
    },
    {
        id: 6,
        question: "What is Howard Wolowitz's profession?",
        type: "multiple",
        options: ["Theoretical Physicist", "Aerospace Engineer", "Experimental Physicist", "Neurobiologist"],
        answer: "Aerospace Engineer",
        difficulty: 1,
        category: "characters",
        funFact: "Howard is the only one of the main guys without a Ph.D., which Sheldon never lets him forget."
    },
    {
        id: 7,
        question: "Raj can talk to women without drinking alcohol in the early seasons.",
        type: "truefalse",
        options: ["True", "False"],
        answer: "False",
        difficulty: 1,
        category: "characters",
        funFact: "Raj's selective mutism around women was a running gag for the first six seasons."
    },
    {
        id: 8,
        question: "What is the name of Sheldon's favorite spot on the couch?",
        type: "multiple",
        options: ["The Left Cushion", "His Spot", "Seat Zero", "The Throne"],
        answer: "His Spot",
        difficulty: 1,
        category: "iconic",
        funFact: "Sheldon claims it's in a location with optimal TV viewing and minimal draft exposure."
    },
    {
        id: 9,
        question: "'Knock knock knock, Penny! Knock knock knock, Penny! Knock knock knock, Penny!'",
        type: "whosaidit",
        options: ["Leonard", "Sheldon", "Howard", "Raj"],
        answer: "Sheldon",
        difficulty: 1,
        category: "quotes",
        funFact: "Sheldon always knocks three times and says the person's name three times."
    },
    {
        id: 10,
        question: "What game do the guys frequently play together?",
        type: "multiple",
        options: ["Monopoly", "Halo", "Chess", "Call of Duty"],
        answer: "Halo",
        difficulty: 1,
        category: "culture",
        funFact: "Halo night is a sacred tradition in the apartment."
    },
    {
        id: 11,
        question: "What day of the week is pizza night?",
        type: "multiple",
        options: ["Monday", "Tuesday", "Thursday", "Saturday"],
        answer: "Thursday",
        difficulty: 1,
        category: "iconic",
        funFact: "Sheldon's schedule: Monday - Thai, Tuesday - Tacos, Wednesday - Cheesecake Factory..."
    },
    {
        id: 12,
        question: "Penny's last name is never revealed in the show.",
        type: "truefalse",
        options: ["True", "False"],
        answer: "True",
        difficulty: 1,
        category: "characters",
        funFact: "Even after marrying Leonard, the show never officially revealed her maiden name."
    },
    {
        id: 13,
        question: "What university do Sheldon and Leonard work at?",
        type: "multiple",
        options: ["MIT", "Caltech", "Stanford", "Princeton"],
        answer: "Caltech",
        difficulty: 1,
        category: "locations",
        funFact: "The California Institute of Technology is a real university in Pasadena."
    },

    // ========================================
    // LEVEL 2: The Comic Center (Medium)
    // Focus: Plot points, guest stars, specific episodes
    // ========================================
    {
        id: 14,
        question: "Who is Sheldon's arch-nemesis who plays himself on the show?",
        type: "multiple",
        options: ["Nathan Fillion", "Wil Wheaton", "Stan Lee", "Neil deGrasse Tyson"],
        answer: "Wil Wheaton",
        difficulty: 2,
        category: "guest_stars",
        funFact: "Wil Wheaton eventually becomes friends with Sheldon after years of rivalry."
    },
    {
        id: 15,
        question: "What is the name of Howard's wife?",
        type: "multiple",
        options: ["Bernadette", "Emily", "Lucy", "Alex"],
        answer: "Bernadette",
        difficulty: 2,
        category: "relationships",
        funFact: "Bernadette's voice gets squeakier when she's angry, which is terrifyingly adorable."
    },
    {
        id: 16,
        question: "'I'm a physicist. I have a working knowledge of the entire universe and everything it contains.'",
        type: "whosaidit",
        options: ["Sheldon", "Leonard", "Amy", "Raj"],
        answer: "Sheldon",
        difficulty: 2,
        category: "quotes",
        funFact: "Sheldon's ego is inversely proportional to his social awareness."
    },
    {
        id: 17,
        question: "What is Barry Kripke's speech impediment?",
        type: "multiple",
        options: ["He stutters", "He replaces R's and L's with W's", "He speaks too fast", "He has a lisp"],
        answer: "He replaces R's and L's with W's",
        difficulty: 2,
        category: "characters",
        funFact: "Kripke calls himself 'Bawwy Kwipke' due to his rhotacism."
    },
    {
        id: 18,
        question: "Howard went to space on a real NASA mission.",
        type: "truefalse",
        options: ["True", "False"],
        answer: "True",
        difficulty: 2,
        category: "plot",
        funFact: "Howard went to the International Space Station aboard a Soyuz rocket."
    },
    {
        id: 19,
        question: "What is the name of Raj's dog?",
        type: "multiple",
        options: ["Buddy", "Cinnamon", "Pepper", "Cocoa"],
        answer: "Cinnamon",
        difficulty: 2,
        category: "characters",
        funFact: "Raj treats Cinnamon like royalty, including buying her designer outfits."
    },
    {
        id: 20,
        question: "What board game causes major arguments among the group?",
        type: "multiple",
        options: ["Risk", "Settlers of Catan", "Dungeons & Dragons", "Monopoly"],
        answer: "Dungeons & Dragons",
        difficulty: 2,
        category: "culture",
        funFact: "Their D&D sessions have caused everything from shouting matches to broken friendships."
    },
    {
        id: 21,
        question: "What does Amy Farrah Fowler study?",
        type: "multiple",
        options: ["Theoretical Physics", "Neurobiology", "Engineering", "Mathematics"],
        answer: "Neurobiology",
        difficulty: 2,
        category: "characters",
        funFact: "Mayim Bialik, who plays Amy, actually has a real Ph.D. in neuroscience."
    },
    {
        id: 22,
        question: "'You're in my spot.'",
        type: "whosaidit",
        options: ["Leonard", "Sheldon", "Penny", "Howard"],
        answer: "Sheldon",
        difficulty: 2,
        category: "quotes",
        funFact: "Nobody dares sit in Sheldon's spot. Nobody."
    },
    {
        id: 23,
        question: "What instrument does Leonard play?",
        type: "multiple",
        options: ["Guitar", "Violin", "Cello", "Piano"],
        answer: "Cello",
        difficulty: 2,
        category: "characters",
        funFact: "Leonard's cello skills are... well, his friends try to be supportive."
    },
    {
        id: 24,
        question: "Sheldon has a twin sister named Missy.",
        type: "truefalse",
        options: ["True", "False"],
        answer: "True",
        difficulty: 2,
        category: "characters",
        funFact: "Missy is the complete opposite of Sheldon in almost every way."
    },
    {
        id: 25,
        question: "What song does Sheldon's mother sing to him when he's sick?",
        type: "multiple",
        options: ["Twinkle Twinkle Little Star", "Soft Kitty", "Hush Little Baby", "Rock-a-Bye Baby"],
        answer: "Soft Kitty",
        difficulty: 2,
        category: "iconic",
        funFact: "Soft Kitty is actually based on a real children's song from Australia."
    },
    {
        id: 26,
        question: "What country is Raj originally from?",
        type: "multiple",
        options: ["Pakistan", "Sri Lanka", "India", "Bangladesh"],
        answer: "India",
        difficulty: 2,
        category: "characters",
        funFact: "Raj comes from a wealthy family in New Delhi."
    },

    // ========================================
    // LEVEL 3: The Physics Bowl (Hard)
    // Focus: Obscure lore, science, families, childhoods
    // ========================================
    {
        id: 27,
        question: "What is Sheldon's IQ?",
        type: "multiple",
        options: ["170", "178", "187", "192"],
        answer: "187",
        difficulty: 3,
        category: "characters",
        funFact: "For reference, Einstein's IQ is estimated at around 160."
    },
    {
        id: 28,
        question: "What is the name of Howard's mother? (We never see her face on screen.)",
        type: "multiple",
        options: ["Debbie", "Gloria", "Estelle", "Mildred"],
        answer: "Debbie",
        difficulty: 3,
        category: "characters",
        funFact: "Mrs. Wolowitz is known only by her booming voice from offscreen."
    },
    {
        id: 29,
        question: "In which state did Sheldon grow up?",
        type: "multiple",
        options: ["Georgia", "Alabama", "Texas", "Oklahoma"],
        answer: "Texas",
        difficulty: 3,
        category: "backstory",
        funFact: "Sheldon grew up in Galveston, Texas, which he considers intellectually barren."
    },
    {
        id: 30,
        question: "'I cry because others are stupid and it makes me sad.'",
        type: "whosaidit",
        options: ["Sheldon", "Amy", "Howard", "Bernadette"],
        answer: "Sheldon",
        difficulty: 3,
        category: "quotes",
        funFact: "Sheldon's emotional range is... limited but honest."
    },
    {
        id: 31,
        question: "What type of particle is Sheldon trying to prove the existence of in his string theory research?",
        type: "multiple",
        options: ["Graviton", "Magnetic Monopole", "Tachyon", "Higgs Boson"],
        answer: "Magnetic Monopole",
        difficulty: 3,
        category: "science",
        funFact: "String theory predicts the existence of magnetic monopoles, but none have been observed."
    },
    {
        id: 32,
        question: "Leonard is lactose intolerant.",
        type: "truefalse",
        options: ["True", "False"],
        answer: "True",
        difficulty: 3,
        category: "characters",
        funFact: "Leonard also has asthma, a transverse myelitis, and about 400 other conditions."
    },
    {
        id: 33,
        question: "What is the apartment number of Sheldon and Leonard's apartment?",
        type: "multiple",
        options: ["3A", "4A", "4B", "5A"],
        answer: "4A",
        difficulty: 3,
        category: "locations",
        funFact: "It was originally 5A but was changed to 4A to match the floor the set represented."
    },
    {
        id: 34,
        question: "What was Howard's astronaut nickname?",
        type: "multiple",
        options: ["Rocket Man", "Froot Loops", "Space Cowboy", "Astro-nerd"],
        answer: "Froot Loops",
        difficulty: 3,
        category: "plot",
        funFact: "The other astronauts called him Froot Loops because he threw up a lot in zero gravity."
    },
    {
        id: 35,
        question: "What is the name of the cat in Sheldon's thought experiment about Schrodinger?",
        type: "multiple",
        options: ["Mr. Whiskers", "Chester", "Zazzles", "Patches"],
        answer: "Zazzles",
        difficulty: 3,
        category: "iconic",
        funFact: "Sheldon named the cat Zazzles because 'he's so zazzy.'"
    },
    {
        id: 36,
        question: "What year did Sheldon start college?",
        type: "multiple",
        options: ["When he was 11", "When he was 14", "When he was 12", "When he was 9"],
        answer: "When he was 11",
        difficulty: 3,
        category: "backstory",
        funFact: "Sheldon was a child prodigy who graduated from college at 14."
    },
    {
        id: 37,
        question: "'One cries because one is sad. For example, I cry because others are stupid and it makes me sad.'",
        type: "whosaidit",
        options: ["Amy", "Sheldon", "Leonard", "Raj"],
        answer: "Sheldon",
        difficulty: 3,
        category: "quotes",
        funFact: "Sheldon's emotional intelligence is a work in progress."
    },
    {
        id: 38,
        question: "What does Raj's father do for a living?",
        type: "multiple",
        options: ["Doctor", "Lawyer", "Gynecologist", "Businessman"],
        answer: "Gynecologist",
        difficulty: 3,
        category: "backstory",
        funFact: "Dr. V.M. Koothrappali is a successful gynecologist in New Delhi."
    },
    {
        id: 39,
        question: "Penny sold her car to pay for acting classes.",
        type: "truefalse",
        options: ["True", "False"],
        answer: "False",
        difficulty: 3,
        category: "plot",
        funFact: "Penny's car was a beaten-up vehicle that the guys once tried to fix."
    },

    // ========================================
    // LEVEL 4: The Roommate Agreement (Expert)
    // Focus: Rapid-fire, highly specific, timed
    // ========================================
    {
        id: 40,
        question: "What is the name of the university president who Sheldon constantly annoys?",
        type: "multiple",
        options: ["President Siebert", "President Davis", "President Morris", "President Hawking"],
        answer: "President Siebert",
        difficulty: 4,
        category: "characters",
        funFact: "President Siebert has the patience of a saint dealing with Sheldon."
    },
    {
        id: 41,
        question: "What is the exact address of Sheldon and Leonard's apartment building?",
        type: "multiple",
        options: ["2311 Los Robles Avenue", "2311 North Los Robles Avenue", "2311 South Los Robles Avenue", "2311 East Los Robles Avenue"],
        answer: "2311 North Los Robles Avenue",
        difficulty: 4,
        category: "locations",
        funFact: "The real building used for exterior shots is in Pasadena, California."
    },
    {
        id: 42,
        question: "'At my age, do you know how I'm handling rejection from a woman? Much better than at 15.'",
        type: "whosaidit",
        options: ["Stuart", "Leonard", "Howard", "Raj"],
        answer: "Stuart",
        difficulty: 4,
        category: "quotes",
        funFact: "Stuart's love life is as depressing as his bank account."
    },
    {
        id: 43,
        question: "In the episode 'The Bath Item Gift Hypothesis,' what does Sheldon give Penny for Christmas?",
        type: "multiple",
        options: ["A rare comic book", "Multiple bath gift baskets", "A Spock collectible", "A coupon book for favors"],
        answer: "Multiple bath gift baskets",
        difficulty: 4,
        category: "episodes",
        funFact: "Sheldon bought every bath basket size at the store because he didn't know the gift's value."
    },
    {
        id: 44,
        question: "What is Howard's belt buckle collection most commonly featuring?",
        type: "multiple",
        options: ["Superhero logos", "NASA emblems", "Alien designs", "Various geeky designs"],
        answer: "Various geeky designs",
        difficulty: 4,
        category: "characters",
        funFact: "Howard's fashion sense is... uniquely terrible, including his famous turtlenecks and belt buckles."
    },
    {
        id: 45,
        question: "The Roommate Agreement includes a clause about what happens in a zombie apocalypse.",
        type: "truefalse",
        options: ["True", "False"],
        answer: "True",
        difficulty: 4,
        category: "iconic",
        funFact: "The zombie clause states that if one roommate becomes a zombie, the other can kill them."
    },
    {
        id: 46,
        question: "What was the name of the app the guys developed?",
        type: "multiple",
        options: ["Nerd Alert", "What's That Molecule?", "Physics Phreak", "Bazinga App"],
        answer: "What's That Molecule?",
        difficulty: 4,
        category: "plot",
        funFact: "The app never took off, which was probably for the best."
    },
    {
        id: 47,
        question: "What flavor of hot beverage does Sheldon typically offer when someone is upset?",
        type: "multiple",
        options: ["Coffee", "Hot chocolate", "A hot beverage (unspecified)", "Tea"],
        answer: "A hot beverage (unspecified)",
        difficulty: 4,
        category: "iconic",
        funFact: "Sheldon offers hot beverages because it's a social convention he learned to navigate emotions."
    },
    {
        id: 48,
        question: "'I'm the cute one. I can't be the smart one too. That's not fair to you guys.'",
        type: "whosaidit",
        options: ["Penny", "Bernadette", "Amy", "Raj"],
        answer: "Penny",
        difficulty: 4,
        category: "quotes",
        funFact: "Penny's self-awareness game is actually pretty strong."
    },
    {
        id: 49,
        question: "What prize do Sheldon and Amy win in the series finale?",
        type: "multiple",
        options: ["Fields Medal", "Nobel Prize", "MacArthur Fellowship", "Breakthrough Prize"],
        answer: "Nobel Prize",
        difficulty: 4,
        category: "plot",
        funFact: "They win the Nobel Prize in Physics for their work on super-asymmetry."
    },
    {
        id: 50,
        question: "What is the elevator in the building broken because of?",
        type: "multiple",
        options: ["Old age", "A rocket fuel experiment gone wrong", "An earthquake", "Howard crashed into it"],
        answer: "A rocket fuel experiment gone wrong",
        difficulty: 4,
        category: "plot",
        funFact: "Leonard's rocket fuel experiment exploded and destroyed the elevator years ago."
    },
    {
        id: 51,
        question: "In the Roommate Agreement, who has to drive whom to work?",
        type: "multiple",
        options: ["Sheldon drives Leonard", "Leonard drives Sheldon", "They take turns", "Raj drives everyone"],
        answer: "Leonard drives Sheldon",
        difficulty: 4,
        category: "iconic",
        funFact: "Sheldon doesn't drive because he considers the roads too dangerous for someone of his intellect."
    },
    {
        id: 52,
        question: "What is Sheldon's mother's name?",
        type: "multiple",
        options: ["Mary", "Martha", "Margaret", "Mildred"],
        answer: "Mary",
        difficulty: 3,
        category: "characters",
        funFact: "Mary Cooper is a devout Christian who prays for her 'poor, godless' son."
    },
    {
        id: 53,
        question: "Leonard and Penny get married in which city?",
        type: "multiple",
        options: ["Pasadena", "Las Vegas", "New York", "San Francisco"],
        answer: "Las Vegas",
        difficulty: 3,
        category: "plot",
        funFact: "They eloped to Las Vegas for a spontaneous wedding."
    },
    {
        id: 54,
        question: "'I would have been here sooner but the bus kept stopping for other people to get on it.'",
        type: "whosaidit",
        options: ["Sheldon", "Amy", "Stuart", "Raj"],
        answer: "Sheldon",
        difficulty: 2,
        category: "quotes",
        funFact: "Public transportation is one of Sheldon's many nemeses."
    },
    {
        id: 55,
        question: "What superhero does Raj dress up as for the costume contest?",
        type: "multiple",
        options: ["Thor", "Aquaman", "Green Lantern", "The Flash"],
        answer: "Aquaman",
        difficulty: 2,
        category: "culture",
        funFact: "Raj has a love-hate relationship with being Aquaman."
    },
    {
        id: 56,
        question: "Howard speaks multiple languages fluently.",
        type: "truefalse",
        options: ["True", "False"],
        answer: "True",
        difficulty: 2,
        category: "characters",
        funFact: "Howard speaks French, Mandarin, Arabic, Persian, Russian, Japanese, and Klingon."
    },
    {
        id: 57,
        question: "What is Bernadette's speaking voice often compared to?",
        type: "multiple",
        options: ["A cartoon character", "Howard's mother", "A mouse", "A child"],
        answer: "Howard's mother",
        difficulty: 3,
        category: "characters",
        funFact: "The irony that Howard married someone who sounds like his mother is not lost on the group."
    },
    {
        id: 58,
        question: "What floor is Sheldon and Leonard's apartment on?",
        type: "multiple",
        options: ["3rd", "4th", "5th", "2nd"],
        answer: "4th",
        difficulty: 1,
        category: "locations",
        funFact: "With the elevator broken, the guys always have to take the stairs."
    },
    {
        id: 59,
        question: "'I am the sword master!'",
        type: "whosaidit",
        options: ["Sheldon", "Howard", "Raj", "Leonard"],
        answer: "Raj",
        difficulty: 4,
        category: "quotes",
        funFact: "Raj gets way too into medieval fantasy reenactments."
    },
    {
        id: 60,
        question: "What scientific theory is Sheldon obsessed with throughout much of the series?",
        type: "multiple",
        options: ["Quantum Mechanics", "String Theory", "General Relativity", "Dark Matter Theory"],
        answer: "String Theory",
        difficulty: 1,
        category: "science",
        funFact: "Sheldon eventually switches focus, which causes him a major existential crisis."
    }
];

/**
 * Get questions for a specific level
 * @param {number} level - Level number (1-4)
 * @param {number} count - Number of questions to return
 * @returns {Array} Shuffled array of questions
 */
function getQuestionsForLevel(level, count = 10) {
    const levelQuestions = TRIVIA_QUESTIONS.filter(q => q.difficulty === level);
    return shuffleArray(levelQuestions).slice(0, count);
}

/**
 * Fisher-Yates shuffle
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
