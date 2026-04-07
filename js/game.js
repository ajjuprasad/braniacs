/**
 * Brainiacs Game Engine
 * Handles level progression, scoring, strikes, hints, and game state
 */

const LEVEL_CONFIG = {
    1: {
        name: "The Cheesecake Factory",
        difficulty: "Easy",
        questionCount: 10,
        passThreshold: 0.8,
        timeLimit: null, // No timer for easy
        comicsPerCorrect: 2,
        milestone: "Sheldon and Leonard's Apartment (Floor 2)",
        description: "Basic character traits, relationships, and catchphrases"
    },
    2: {
        name: "The Comic Center",
        difficulty: "Medium",
        questionCount: 10,
        passThreshold: 0.8,
        timeLimit: null,
        comicsPerCorrect: 3,
        milestone: "University Cafeteria (Floor 3)",
        description: "Plot points, guest stars, and specific episodes"
    },
    3: {
        name: "The Physics Bowl",
        difficulty: "Hard",
        questionCount: 10,
        passThreshold: 0.8,
        timeLimit: null,
        comicsPerCorrect: 5,
        milestone: "The Roof (Floor 4)",
        description: "Obscure lore, science concepts, and character backstories"
    },
    4: {
        name: "The Roommate Agreement",
        difficulty: "Expert",
        questionCount: 10,
        passThreshold: 0.8,
        timeLimit: 15, // 15 seconds per question
        comicsPerCorrect: 8,
        milestone: "FIX THE ELEVATOR!",
        description: "Rapid-fire, highly specific trivia with timed questions"
    }
};

const HINT_COSTS = {
    penny: 5,  // Eliminate 2 wrong answers
    howard: 3  // Extra time (+10 seconds)
};

const MAX_STRIKES = 3;

// Easter egg achievements
const ACHIEVEMENTS = {
    speedDemon: { name: "Speed Demon", description: "Answer in under 2 seconds", icon: "lightning" },
    softKitty: { name: "Soft Kitty", description: "Answer a Soft Kitty question in under 2 seconds", icon: "cat" },
    perfectLevel: { name: "Bazinga Master", description: "Complete a level with 100% score", icon: "star" },
    noHints: { name: "Pure Genius", description: "Complete a level without using hints", icon: "brain" },
    comicHoarder: { name: "Comic Hoarder", description: "Accumulate 100 Comic Books", icon: "book" }
};

class Game {
    constructor() {
        this.state = {
            currentLevel: null,
            questions: [],
            currentQuestionIndex: 0,
            correctAnswers: 0,
            strikes: 0,
            comicBooks: 0,
            levelsCompleted: {},
            levelScores: {},
            hintsUsedThisLevel: false,
            achievements: [],
            questionStartTime: null,
            timerInterval: null,
            timeRemaining: 0,
            gameOver: false,
            hintUsedThisQuestion: false
        };

        this.loadState();
    }

    /**
     * Save game state to localStorage
     */
    saveState() {
        const saveData = {
            comicBooks: this.state.comicBooks,
            levelsCompleted: this.state.levelsCompleted,
            levelScores: this.state.levelScores,
            achievements: this.state.achievements
        };
        localStorage.setItem('brainiacs_save', JSON.stringify(saveData));
    }

    /**
     * Load game state from localStorage
     */
    loadState() {
        const saved = localStorage.getItem('brainiacs_save');
        if (saved) {
            const data = JSON.parse(saved);
            this.state.comicBooks = data.comicBooks || 0;
            this.state.levelsCompleted = data.levelsCompleted || {};
            this.state.levelScores = data.levelScores || {};
            this.state.achievements = data.achievements || [];
        }
    }

    /**
     * Reset all progress
     */
    resetProgress() {
        this.state.comicBooks = 0;
        this.state.levelsCompleted = {};
        this.state.levelScores = {};
        this.state.achievements = [];
        this.saveState();
    }

    /**
     * Check if a level is unlocked
     */
    isLevelUnlocked(level) {
        if (level === 1) return true;
        return this.state.levelsCompleted[level - 1] === true;
    }

    /**
     * Start a level
     */
    startLevel(level) {
        if (!this.isLevelUnlocked(level)) return false;

        const config = LEVEL_CONFIG[level];
        this.state.currentLevel = level;
        this.state.questions = getQuestionsForLevel(level, config.questionCount);
        this.state.currentQuestionIndex = 0;
        this.state.correctAnswers = 0;
        this.state.strikes = 0;
        this.state.hintsUsedThisLevel = false;
        this.state.gameOver = false;
        this.state.hintUsedThisQuestion = false;

        return true;
    }

    /**
     * Get current question
     */
    getCurrentQuestion() {
        if (this.state.currentQuestionIndex >= this.state.questions.length) return null;
        return this.state.questions[this.state.currentQuestionIndex];
    }

    /**
     * Get level config
     */
    getLevelConfig() {
        return LEVEL_CONFIG[this.state.currentLevel];
    }

    /**
     * Start timer for timed questions
     */
    startTimer(onTick, onTimeUp) {
        const config = this.getLevelConfig();
        if (!config.timeLimit) return;

        this.state.timeRemaining = config.timeLimit;
        this.clearTimer();

        this.state.timerInterval = setInterval(() => {
            this.state.timeRemaining -= 0.1;
            if (onTick) onTick(this.state.timeRemaining, config.timeLimit);

            if (this.state.timeRemaining <= 0) {
                this.clearTimer();
                if (onTimeUp) onTimeUp();
            }
        }, 100);
    }

    /**
     * Add extra time (Howard's hint)
     */
    addExtraTime(seconds) {
        this.state.timeRemaining += seconds;
    }

    /**
     * Clear the timer
     */
    clearTimer() {
        if (this.state.timerInterval) {
            clearInterval(this.state.timerInterval);
            this.state.timerInterval = null;
        }
    }

    /**
     * Submit an answer
     * @returns {{ correct: boolean, correctAnswer: string, comicsEarned: number, funFact: string, isStrikeOut: boolean, achievements: Array }}
     */
    submitAnswer(selectedAnswer) {
        const question = this.getCurrentQuestion();
        if (!question) return null;

        this.clearTimer();

        const correct = selectedAnswer === question.answer;
        const config = this.getLevelConfig();
        let comicsEarned = 0;
        const newAchievements = [];

        const answerTime = (Date.now() - this.state.questionStartTime) / 1000;

        if (correct) {
            this.state.correctAnswers++;
            comicsEarned = config.comicsPerCorrect;
            this.state.comicBooks += comicsEarned;

            // Speed demon achievement
            if (answerTime < 2) {
                if (!this.state.achievements.includes('speedDemon')) {
                    this.state.achievements.push('speedDemon');
                    newAchievements.push(ACHIEVEMENTS.speedDemon);
                }

                // Soft Kitty easter egg
                if (question.question.toLowerCase().includes('soft kitty') ||
                    question.answer.toLowerCase().includes('soft kitty')) {
                    if (!this.state.achievements.includes('softKitty')) {
                        this.state.achievements.push('softKitty');
                        newAchievements.push(ACHIEVEMENTS.softKitty);
                    }
                }
            }

            // Comic hoarder
            if (this.state.comicBooks >= 100 && !this.state.achievements.includes('comicHoarder')) {
                this.state.achievements.push('comicHoarder');
                newAchievements.push(ACHIEVEMENTS.comicHoarder);
            }
        } else {
            this.state.strikes++;
        }

        const isStrikeOut = this.state.strikes >= MAX_STRIKES;

        this.saveState();

        return {
            correct,
            correctAnswer: question.answer,
            comicsEarned,
            funFact: question.funFact,
            isStrikeOut,
            achievements: newAchievements,
            answerTime
        };
    }

    /**
     * Move to next question
     * @returns {boolean} true if there are more questions
     */
    nextQuestion() {
        this.state.currentQuestionIndex++;
        this.state.hintUsedThisQuestion = false;
        this.state.questionStartTime = Date.now();
        return this.state.currentQuestionIndex < this.state.questions.length;
    }

    /**
     * Complete the level and calculate results
     */
    completeLevel() {
        const config = this.getLevelConfig();
        const score = this.state.correctAnswers / config.questionCount;
        const passed = score >= config.passThreshold;

        const newAchievements = [];

        if (passed) {
            this.state.levelsCompleted[this.state.currentLevel] = true;

            // Perfect score achievement
            if (score === 1 && !this.state.achievements.includes('perfectLevel')) {
                this.state.achievements.push('perfectLevel');
                newAchievements.push(ACHIEVEMENTS.perfectLevel);
            }

            // No hints achievement
            if (!this.state.hintsUsedThisLevel && !this.state.achievements.includes('noHints')) {
                this.state.achievements.push('noHints');
                newAchievements.push(ACHIEVEMENTS.noHints);
            }
        }

        this.state.levelScores[this.state.currentLevel] = Math.max(
            this.state.levelScores[this.state.currentLevel] || 0,
            Math.round(score * 100)
        );

        this.saveState();

        const isGameComplete = this.state.currentLevel === 4 && passed;

        return {
            score: Math.round(score * 100),
            passed,
            correctAnswers: this.state.correctAnswers,
            totalQuestions: config.questionCount,
            comicsEarned: this.state.correctAnswers * config.comicsPerCorrect,
            levelName: config.name,
            milestone: passed ? config.milestone : null,
            achievements: newAchievements,
            isGameComplete
        };
    }

    /**
     * Use Penny's Common Sense hint (eliminate 2 wrong answers)
     * @returns {Array|null} Array of options to eliminate, or null if can't use
     */
    usePennyHint() {
        if (this.state.comicBooks < HINT_COSTS.penny) return null;
        if (this.state.hintUsedThisQuestion) return null;

        const question = this.getCurrentQuestion();
        if (!question) return null;

        this.state.comicBooks -= HINT_COSTS.penny;
        this.state.hintsUsedThisLevel = true;
        this.state.hintUsedThisQuestion = true;
        this.saveState();

        // Get wrong answers to eliminate
        const wrongOptions = question.options.filter(opt => opt !== question.answer);
        const toEliminate = shuffleArray(wrongOptions).slice(0, 2);

        return toEliminate;
    }

    /**
     * Use Howard's Engineering hint (add extra time)
     * @returns {boolean} Success
     */
    useHowardHint() {
        if (this.state.comicBooks < HINT_COSTS.howard) return false;

        const config = this.getLevelConfig();
        if (!config.timeLimit) return false;

        this.state.comicBooks -= HINT_COSTS.howard;
        this.state.hintsUsedThisLevel = true;
        this.addExtraTime(10);
        this.saveState();

        return true;
    }

    /**
     * Get question type label
     */
    getQuestionTypeLabel(type) {
        switch (type) {
            case 'multiple': return 'Multiple Choice';
            case 'truefalse': return 'True or False';
            case 'whosaidit': return 'Who Said It?';
            default: return 'Trivia';
        }
    }
}
