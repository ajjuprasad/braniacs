/**
 * Brainiacs App - UI Controller
 * Manages screen transitions, DOM updates, and user interactions
 */

(function () {
    const game = new Game();

    // Screen elements
    const screens = {
        splash: document.getElementById('splash-screen'),
        levelSelect: document.getElementById('level-select-screen'),
        game: document.getElementById('game-screen'),
        levelComplete: document.getElementById('level-complete-screen'),
        victory: document.getElementById('victory-screen')
    };

    // Game screen elements
    const els = {
        totalComics: document.getElementById('total-comics'),
        gameComics: document.getElementById('game-comics'),
        levelBadge: document.getElementById('level-badge'),
        questionCounter: document.getElementById('question-counter'),
        currentScore: document.getElementById('current-score'),
        strikesContainer: document.getElementById('strikes-container'),
        questionType: document.getElementById('question-type'),
        questionText: document.getElementById('question-text'),
        optionsContainer: document.getElementById('options-container'),
        timerBarContainer: document.getElementById('timer-bar-container'),
        timerFill: document.getElementById('timer-fill'),
        feedbackOverlay: document.getElementById('feedback-overlay'),
        feedbackIcon: document.getElementById('feedback-icon'),
        feedbackText: document.getElementById('feedback-text'),
        feedbackDetail: document.getElementById('feedback-detail'),
        hintPenny: document.getElementById('hint-penny'),
        hintHoward: document.getElementById('hint-howard'),
        resultIcon: document.getElementById('result-icon'),
        resultTitle: document.getElementById('result-title'),
        resultMessage: document.getElementById('result-message'),
        resultScore: document.getElementById('result-score'),
        resultCorrect: document.getElementById('result-correct'),
        resultComics: document.getElementById('result-comics'),
        resultAchievements: document.getElementById('result-achievements'),
        retryBtn: document.getElementById('retry-btn'),
        nextLevelBtn: document.getElementById('next-level-btn'),
        backToLevelsBtn: document.getElementById('back-to-levels-btn'),
        elevatorCar: document.getElementById('elevator-car'),
        confettiContainer: document.getElementById('confetti-container')
    };

    // ==========================================
    // Screen Management
    // ==========================================

    function showScreen(screenName) {
        Object.values(screens).forEach(s => s.classList.remove('active'));
        screens[screenName].classList.add('active');
    }

    // ==========================================
    // Splash Screen
    // ==========================================

    const playerNameInput = document.getElementById('player-name-input');

    // Pre-fill name if returning player
    if (game.state.playerName) {
        playerNameInput.value = game.state.playerName;
    }

    document.getElementById('start-btn').addEventListener('click', () => {
        const name = playerNameInput.value.trim();
        if (!name) {
            playerNameInput.classList.add('shake');
            playerNameInput.placeholder = "C'mon, even Sheldon has a name!";
            setTimeout(() => playerNameInput.classList.remove('shake'), 500);
            playerNameInput.focus();
            return;
        }
        game.setPlayerName(name);
        soundManager.init();
        soundManager.playClick();
        showScreen('levelSelect');
        updateLevelSelect();
    });

    playerNameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') document.getElementById('start-btn').click();
    });

    // ==========================================
    // Level Select Screen
    // ==========================================

    function updateLevelSelect() {
        els.totalComics.textContent = game.state.comicBooks;

        for (let level = 1; level <= 4; level++) {
            const floorEl = document.querySelector(`.floor-${level}`);
            const lockEl = document.getElementById(`lock-${level}`);
            const scoreEl = document.getElementById(`score-${level}`);
            const unlocked = game.isLevelUnlocked(level);

            if (unlocked) {
                floorEl.classList.add('unlocked');
                lockEl.style.display = 'none';

                // Add unlock icon if not present
                if (!floorEl.querySelector('.unlock-icon')) {
                    const unlockIcon = document.createElement('span');
                    unlockIcon.className = 'unlock-icon';
                    unlockIcon.innerHTML = '&#x1F513;';
                    lockEl.parentNode.insertBefore(unlockIcon, lockEl);
                }
            }

            const score = game.state.levelScores[level];
            if (score !== undefined) {
                scoreEl.textContent = `Best: ${score}%`;
                if (score >= 80) {
                    scoreEl.classList.add('passed');
                }
            }
        }

        // Update elevator
        if (game.state.levelsCompleted[4]) {
            els.elevatorCar.classList.add('fixed');
            els.elevatorCar.querySelector('.out-of-order').textContent = 'WORKING!';
        }
    }

    // Floor click handlers
    document.querySelectorAll('.floor').forEach(floor => {
        floor.addEventListener('click', () => {
            const level = parseInt(floor.dataset.level);
            if (!game.isLevelUnlocked(level)) {
                shakeElement(floor);
                soundManager.playWrong();
                return;
            }
            soundManager.playClick();
            startLevel(level);
        });
    });

    // ==========================================
    // Game Screen
    // ==========================================

    function startLevel(level) {
        if (!game.startLevel(level)) return;

        const config = game.getLevelConfig();
        showScreen('game');

        els.levelBadge.textContent = `${config.name}`;
        els.levelBadge.className = `level-badge level-${level}`;
        els.gameComics.textContent = game.state.comicBooks;

        // Show/hide timer
        if (config.timeLimit) {
            els.timerBarContainer.style.display = 'block';
        } else {
            els.timerBarContainer.style.display = 'none';
        }

        // Show/hide Howard hint based on timer
        els.hintHoward.style.display = config.timeLimit ? 'flex' : 'none';

        updateStrikes();
        game.state.questionStartTime = Date.now();
        displayQuestion();
    }

    function displayQuestion() {
        const question = game.getCurrentQuestion();
        if (!question) {
            endLevel();
            return;
        }

        const config = game.getLevelConfig();
        const qNum = game.state.currentQuestionIndex + 1;
        const total = config.questionCount;
        const scorePercent = total > 0 ?
            Math.round((game.state.correctAnswers / total) * 100) : 0;

        els.questionCounter.textContent = `${qNum}/${total}`;
        els.currentScore.textContent = `${scorePercent}%`;
        els.gameComics.textContent = game.state.comicBooks;

        // Question type badge
        els.questionType.textContent = game.getQuestionTypeLabel(question.type);
        els.questionType.className = `question-type-badge type-${question.type}`;

        // Question text
        if (question.type === 'whosaidit') {
            els.questionText.innerHTML = `Who said it?<br><span class="quote-text">"${question.question}"</span>`;
        } else {
            els.questionText.textContent = question.question;
        }

        // Options
        els.optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = `btn btn-option option-${index}`;
            btn.textContent = option;
            btn.addEventListener('click', () => handleAnswer(option, btn));
            els.optionsContainer.appendChild(btn);
        });

        // Reset hint state for this question
        updateHintButtons();

        // Start timer for timed levels
        if (config.timeLimit) {
            game.startTimer(
                (remaining, total) => {
                    const percent = (remaining / total) * 100;
                    els.timerFill.style.width = `${Math.max(0, percent)}%`;
                    if (percent < 25) {
                        els.timerFill.classList.add('critical');
                    } else {
                        els.timerFill.classList.remove('critical');
                    }
                },
                () => handleTimeUp()
            );
            els.timerFill.style.width = '100%';
            els.timerFill.classList.remove('critical');
        }

        // Entrance animation
        const whiteboard = document.querySelector('.whiteboard');
        whiteboard.classList.remove('slide-in');
        void whiteboard.offsetWidth; // Force reflow
        whiteboard.classList.add('slide-in');
    }

    function handleAnswer(selectedAnswer, btnElement) {
        // Disable all option buttons
        const optionBtns = els.optionsContainer.querySelectorAll('.btn-option');
        optionBtns.forEach(btn => btn.disabled = true);

        const result = game.submitAnswer(selectedAnswer);
        if (!result) return;

        // Visual feedback on buttons
        optionBtns.forEach(btn => {
            if (btn.textContent === result.correctAnswer) {
                btn.classList.add('correct');
            }
            if (btn === btnElement && !result.correct) {
                btn.classList.add('wrong');
            }
        });

        // Sound
        if (result.correct) {
            soundManager.playCorrect();
        } else {
            soundManager.playWrong();
            updateStrikes();
        }

        // Show feedback overlay
        showFeedback(result);

        // Update comics display
        els.gameComics.textContent = game.state.comicBooks;

        // Check for achievements
        if (result.achievements.length > 0) {
            result.achievements.forEach(a => showAchievementToast(a));
        }

        // Proceed after delay
        setTimeout(() => {
            hideFeedback();

            if (result.isStrikeOut) {
                // Three strikes - level failed
                handleStrikeOut();
                return;
            }

            if (game.nextQuestion()) {
                displayQuestion();
            } else {
                endLevel();
            }
        }, 2000);
    }

    function handleTimeUp() {
        // Auto-submit wrong answer when time runs out
        const optionBtns = els.optionsContainer.querySelectorAll('.btn-option');
        optionBtns.forEach(btn => btn.disabled = true);

        const result = game.submitAnswer(null);
        if (!result) return;

        optionBtns.forEach(btn => {
            if (btn.textContent === result.correctAnswer) {
                btn.classList.add('correct');
            }
        });

        soundManager.playWrong();
        updateStrikes();

        showFeedback({
            correct: false,
            correctAnswer: result.correctAnswer,
            funFact: result.funFact,
            comicsEarned: 0,
            isTimeUp: true
        });

        els.gameComics.textContent = game.state.comicBooks;

        setTimeout(() => {
            hideFeedback();

            if (result.isStrikeOut) {
                handleStrikeOut();
                return;
            }

            if (game.nextQuestion()) {
                displayQuestion();
            } else {
                endLevel();
            }
        }, 2000);
    }

    function handleStrikeOut() {
        game.clearTimer();
        soundManager.playFail();

        const config = game.getLevelConfig();
        showScreen('levelComplete');

        els.resultIcon.innerHTML = '<div class="strike-out-icon">&#x26A0;&#x26A0;&#x26A0;</div>';
        els.resultTitle.textContent = "Three Strikes! You're Out!";
        els.resultMessage.textContent = `Sheldon would not approve. You got ${game.state.correctAnswers} right before striking out of ${config.name}.`;
        els.resultScore.textContent = 'FAIL';
        els.resultScore.className = 'result-stat-value fail';
        els.resultCorrect.textContent = `${game.state.correctAnswers}/${config.questionCount}`;
        els.resultComics.textContent = `+${game.state.correctAnswers * config.comicsPerCorrect}`;
        els.resultAchievements.innerHTML = '';

        els.retryBtn.style.display = 'inline-block';
        els.nextLevelBtn.style.display = 'none';
        els.backToLevelsBtn.style.display = 'inline-block';
    }

    function endLevel() {
        game.clearTimer();
        const result = game.completeLevel();

        if (result.isGameComplete) {
            showVictoryScreen();
            return;
        }

        if (result.passed) {
            soundManager.playLevelComplete();
        } else {
            soundManager.playFail();
        }

        showScreen('levelComplete');

        if (result.passed) {
            els.resultIcon.innerHTML = '<div class="result-pass-icon">&#x1F389;</div>';
            els.resultTitle.textContent = 'Level Complete!';
            els.resultMessage.textContent = `Bazinga! You've unlocked ${result.milestone}!`;
        } else {
            els.resultIcon.innerHTML = '<div class="result-fail-icon">&#x1F61E;</div>';
            els.resultTitle.textContent = 'Not Quite...';
            els.resultMessage.textContent = `You need 80% to pass. As Sheldon would say, "You're in my spot... of failure."`;
        }

        els.resultScore.textContent = `${result.score}%`;
        els.resultScore.className = `result-stat-value ${result.passed ? 'pass' : 'fail'}`;
        els.resultCorrect.textContent = `${result.correctAnswers}/${result.totalQuestions}`;
        els.resultComics.textContent = `+${result.comicsEarned}`;

        // Achievements
        els.resultAchievements.innerHTML = '';
        result.achievements.forEach(a => {
            const div = document.createElement('div');
            div.className = 'achievement-badge';
            div.innerHTML = `<span class="achievement-icon">&#x1F3C6;</span> ${a.name}: ${a.description}`;
            els.resultAchievements.appendChild(div);
        });

        els.retryBtn.style.display = 'inline-block';
        els.nextLevelBtn.style.display = result.passed && game.state.currentLevel < 4 ? 'inline-block' : 'none';
        els.backToLevelsBtn.style.display = 'inline-block';

        // Update leaderboard after each level completion
        game.addToLeaderboard();
    }

    function showVictoryScreen() {
        soundManager.playVictory();
        showScreen('victory');
        createConfetti();

        // Set player name on diploma
        document.getElementById('diploma-player-name').textContent = game.getPlayerName().toUpperCase();

        // Add to leaderboard
        game.addToLeaderboard();

        // Show native share button if available
        if (navigator.share) {
            document.getElementById('share-native-btn').style.display = 'inline-block';
        }
    }

    // ==========================================
    // Feedback Overlay
    // ==========================================

    function showFeedback(result) {
        els.feedbackOverlay.classList.remove('hidden');

        if (result.correct) {
            els.feedbackOverlay.className = 'feedback-overlay correct';
            els.feedbackIcon.innerHTML = '&#x2705;';
            els.feedbackText.textContent = getCorrectMessage();
            els.feedbackDetail.textContent = result.funFact || `+${result.comicsEarned} Comic Books!`;
        } else {
            els.feedbackOverlay.className = 'feedback-overlay wrong';
            els.feedbackIcon.innerHTML = result.isTimeUp ? '&#x23F0;' : '&#x274C;';
            els.feedbackText.textContent = result.isTimeUp ? "Time's up!" : getWrongMessage();
            els.feedbackDetail.textContent = `The answer was: ${result.correctAnswer}`;
        }
    }

    function hideFeedback() {
        els.feedbackOverlay.classList.add('hidden');
    }

    function getCorrectMessage() {
        const messages = [
            "Bazinga!",
            "That's my spot... of genius!",
            "You're smarter than Howard's belt buckle collection!",
            "Even Sheldon would approve!",
            "Leonard would be impressed!",
            "Correct! Unlike Penny's acting career, you nailed it!",
            "Right! Your brain is firing on all neurons!",
            "Excellent! You'd dominate Physics Bowl!"
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    }

    function getWrongMessage() {
        const messages = [
            "Strike! Sheldon is disappointed.",
            "Wrong! As Sheldon says, that's 'Roommate Strike' territory.",
            "Nope! Even Penny knew that one.",
            "Incorrect! Time to re-watch the series.",
            "Wrong answer! The Roommate Agreement has been violated.",
            "That's a strike! Raj's dog could do better."
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    }

    // ==========================================
    // Strikes Display
    // ==========================================

    function updateStrikes() {
        const strikes = game.state.strikes;
        const strikeEls = els.strikesContainer.querySelectorAll('.strike');
        strikeEls.forEach((el, i) => {
            if (i < strikes) {
                el.classList.add('active');
                el.innerHTML = '&#x274C;';
            } else {
                el.classList.remove('active');
                el.innerHTML = '&#x26A0;';
            }
        });

        if (strikes > 0) {
            shakeElement(els.strikesContainer);
        }
    }

    // ==========================================
    // Hints
    // ==========================================

    function updateHintButtons() {
        // Penny hint
        const canUsePenny = game.state.comicBooks >= HINT_COSTS.penny && !game.state.hintUsedThisQuestion;
        els.hintPenny.disabled = !canUsePenny;
        els.hintPenny.classList.toggle('affordable', canUsePenny);

        // Howard hint
        const config = game.getLevelConfig();
        const canUseHoward = game.state.comicBooks >= HINT_COSTS.howard && config.timeLimit;
        els.hintHoward.disabled = !canUseHoward;
        els.hintHoward.classList.toggle('affordable', canUseHoward);
    }

    els.hintPenny.addEventListener('click', () => {
        const eliminated = game.usePennyHint();
        if (!eliminated) return;

        soundManager.playHint();
        els.gameComics.textContent = game.state.comicBooks;

        // Disable eliminated options
        const optionBtns = els.optionsContainer.querySelectorAll('.btn-option');
        optionBtns.forEach(btn => {
            if (eliminated.includes(btn.textContent)) {
                btn.classList.add('eliminated');
                btn.disabled = true;
            }
        });

        updateHintButtons();
    });

    els.hintHoward.addEventListener('click', () => {
        if (!game.useHowardHint()) return;

        soundManager.playHint();
        els.gameComics.textContent = game.state.comicBooks;

        // Flash timer bar to show extra time
        els.timerBarContainer.classList.add('flash');
        setTimeout(() => els.timerBarContainer.classList.remove('flash'), 500);

        updateHintButtons();
    });

    // ==========================================
    // Navigation Buttons
    // ==========================================

    document.getElementById('back-btn').addEventListener('click', () => {
        game.clearTimer();
        soundManager.playClick();
        showScreen('levelSelect');
        updateLevelSelect();
    });

    els.retryBtn.addEventListener('click', () => {
        soundManager.playClick();
        startLevel(game.state.currentLevel);
    });

    els.nextLevelBtn.addEventListener('click', () => {
        soundManager.playClick();
        startLevel(game.state.currentLevel + 1);
    });

    els.backToLevelsBtn.addEventListener('click', () => {
        soundManager.playClick();
        showScreen('levelSelect');
        updateLevelSelect();
    });

    document.getElementById('play-again-btn').addEventListener('click', () => {
        soundManager.playClick();
        game.resetProgress();
        showScreen('levelSelect');
        updateLevelSelect();
    });

    // ==========================================
    // Leaderboard
    // ==========================================

    const leaderboardModal = document.getElementById('leaderboard-modal');

    document.getElementById('leaderboard-btn').addEventListener('click', () => {
        soundManager.playClick();
        renderLeaderboard();
        leaderboardModal.classList.remove('hidden');
    });

    document.getElementById('close-leaderboard').addEventListener('click', () => {
        leaderboardModal.classList.add('hidden');
    });

    leaderboardModal.querySelector('.modal-backdrop').addEventListener('click', () => {
        leaderboardModal.classList.add('hidden');
    });

    function renderLeaderboard() {
        const list = document.getElementById('leaderboard-list');
        const entries = game.getLeaderboard();

        if (entries.length === 0) {
            list.innerHTML = '<p class="leaderboard-empty">No scores yet. Be the first!</p>';
            return;
        }

        list.innerHTML = entries.map((entry, i) => {
            const medal = i === 0 ? '&#x1F947;' : i === 1 ? '&#x1F948;' : i === 2 ? '&#x1F949;' : `#${i + 1}`;
            const dateStr = new Date(entry.date).toLocaleDateString();
            return `
                <div class="leaderboard-entry ${i < 3 ? 'top-three' : ''}">
                    <span class="lb-rank">${medal}</span>
                    <div class="lb-info">
                        <span class="lb-name">${escapeHtml(entry.name)}</span>
                        <span class="lb-detail">${entry.levelsCompleted}/4 levels | ${dateStr}</span>
                    </div>
                    <div class="lb-score-col">
                        <span class="lb-score">${entry.score}%</span>
                        <span class="lb-comics">${entry.comicBooks} &#x1F4D6;</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // ==========================================
    // Share Certificate
    // ==========================================

    function generateCertificateCanvas() {
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 500;
        const ctx = canvas.getContext('2d');

        // Background
        const grad = ctx.createLinearGradient(0, 0, 800, 500);
        grad.addColorStop(0, '#f5e6c8');
        grad.addColorStop(1, '#e8d5a8');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 800, 500);

        // Border
        ctx.strokeStyle = '#c4a96a';
        ctx.lineWidth = 6;
        ctx.strokeRect(20, 20, 760, 460);
        ctx.strokeStyle = '#d4b97a';
        ctx.lineWidth = 2;
        ctx.strokeRect(30, 30, 740, 440);

        // Corner decorations
        const corners = [[40, 40], [750, 40], [40, 450], [750, 450]];
        corners.forEach(([x, y]) => {
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.fillStyle = '#c4a96a';
            ctx.fill();
        });

        // Title
        ctx.textAlign = 'center';
        ctx.fillStyle = '#8b7355';
        ctx.font = '16px serif';
        ctx.fillText('BRAINIACS: THE ULTIMATE TRIVIA APP', 400, 80);

        // Certifies
        ctx.fillStyle = '#8b7355';
        ctx.font = '18px serif';
        ctx.fillText('This certifies that', 400, 140);

        // Player name
        ctx.fillStyle = '#2c1810';
        ctx.font = 'bold 48px serif';
        ctx.fillText(game.getPlayerName().toUpperCase(), 400, 200);

        // Award text
        ctx.fillStyle = '#8b7355';
        ctx.font = '18px serif';
        ctx.fillText('has been awarded the title of', 400, 250);

        // Title
        ctx.fillStyle = '#4a3520';
        ctx.font = 'bold 28px serif';
        ctx.fillText('Honorary Ph.D. in Television Comedy', 400, 300);

        // Bazinga
        ctx.fillStyle = '#ff6b35';
        ctx.font = 'bold 22px serif';
        ctx.fillText('Bazinga! You\'ve mastered the trivia universe!', 400, 350);

        // Footer
        ctx.fillStyle = '#a08060';
        ctx.font = 'italic 14px serif';
        ctx.fillText('Caltech Department of Theoretical Laughs', 400, 410);

        // Score
        ctx.fillStyle = '#8b7355';
        ctx.font = '14px serif';
        ctx.fillText(`Total Score: ${game.getTotalScore()}% | Comic Books: ${game.state.comicBooks}`, 400, 440);

        return canvas;
    }

    function getShareText() {
        return `Bazinga! I just earned an Honorary Ph.D. in Television Comedy from Brainiacs! Score: ${game.getTotalScore()}% | Can you beat me? https://ajjuprasad.github.io/braniacs/`;
    }

    document.getElementById('share-whatsapp-btn').addEventListener('click', () => {
        // Use native share with image if available (mobile), otherwise text-only link
        if (navigator.share && navigator.canShare) {
            const canvas = generateCertificateCanvas();
            canvas.toBlob(async (blob) => {
                const file = new File([blob], 'brainiacs-certificate.png', { type: 'image/png' });
                const shareData = {
                    text: getShareText(),
                    files: [file]
                };
                try {
                    if (navigator.canShare(shareData)) {
                        await navigator.share(shareData);
                    } else {
                        // Files not supported, share text only
                        const text = encodeURIComponent(getShareText());
                        window.open(`https://wa.me/?text=${text}`, '_blank');
                    }
                } catch (e) {
                    if (e.name !== 'AbortError') {
                        const text = encodeURIComponent(getShareText());
                        window.open(`https://wa.me/?text=${text}`, '_blank');
                    }
                }
            }, 'image/png');
        } else {
            const text = encodeURIComponent(getShareText());
            window.open(`https://wa.me/?text=${text}`, '_blank');
        }
    });

    document.getElementById('share-twitter-btn').addEventListener('click', () => {
        const text = encodeURIComponent(getShareText());
        window.open(`https://x.com/intent/tweet?text=${text}`, '_blank');
    });

    document.getElementById('share-download-btn').addEventListener('click', () => {
        const canvas = generateCertificateCanvas();
        const link = document.createElement('a');
        link.download = `brainiacs-certificate-${game.getPlayerName()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });

    document.getElementById('share-native-btn').addEventListener('click', async () => {
        const canvas = generateCertificateCanvas();
        canvas.toBlob(async (blob) => {
            const file = new File([blob], 'brainiacs-certificate.png', { type: 'image/png' });
            try {
                await navigator.share({
                    title: 'Brainiacs Certificate',
                    text: getShareText(),
                    files: [file]
                });
            } catch (e) {
                // User cancelled or share failed, fall back to download
                if (e.name !== 'AbortError') {
                    const link = document.createElement('a');
                    link.download = 'brainiacs-certificate.png';
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                }
            }
        }, 'image/png');
    });

    // ==========================================
    // Visual Effects
    // ==========================================

    function shakeElement(el) {
        el.classList.remove('shake');
        void el.offsetWidth;
        el.classList.add('shake');
        setTimeout(() => el.classList.remove('shake'), 500);
    }

    function showAchievementToast(achievement) {
        const toast = document.createElement('div');
        toast.className = 'achievement-toast';
        toast.innerHTML = `
            <span class="achievement-toast-icon">&#x1F3C6;</span>
            <div>
                <strong>${achievement.name}</strong>
                <p>${achievement.description}</p>
            </div>
        `;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    function createConfetti() {
        els.confettiContainer.innerHTML = '';
        const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6eb4', '#a66cff'];
        for (let i = 0; i < 60; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            els.confettiContainer.appendChild(confetti);
        }
    }
})();
