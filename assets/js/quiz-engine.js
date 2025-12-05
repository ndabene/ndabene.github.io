/**
 * Quiz Engine - Vanilla JS
 * Conversion du composant React en JavaScript pur
 * @author Nicolas Dabène
 */

class QuizEngine {
  constructor(containerId, config) {
    this.container = document.getElementById(containerId);
    this.config = config;
    this.state = {
      started: false,
      currentQIndex: 0,
      score: 0,
      selectedOption: null,
      isAnswered: false,
      showResult: false
    };

    this.init();
  }

  init() {
    this.loadFonts();
    this.render();
  }

  loadFonts() {
    if (!document.querySelector('link[href*="Poppins"]')) {
      const link = document.createElement('link');
      link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Poppins:wght@600;700&display=swap";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  handleStart() {
    this.setState({ started: true });
  }

  handleOptionClick(optionId, isCorrect) {
    if (this.state.isAnswered) return;

    this.setState({
      selectedOption: optionId,
      isAnswered: true,
      score: isCorrect ? this.state.score + 1 : this.state.score
    });
  }

  handleNext() {
    if (this.state.currentQIndex + 1 < this.config.questions.length) {
      this.setState({
        currentQIndex: this.state.currentQIndex + 1,
        selectedOption: null,
        isAnswered: false
      });
    } else {
      this.setState({ showResult: true });
    }
  }

  handleRestart() {
    this.setState({
      started: false,
      currentQIndex: 0,
      score: 0,
      selectedOption: null,
      isAnswered: false,
      showResult: false
    });
  }

  getShareUrl() {
    const currentUrl = window.location.href;
    const percentage = Math.round((this.state.score / this.config.questions.length) * 100);

    const shareText = this.config.i18n.shareText
      .replace('{score}', this.state.score)
      .replace('{total}', this.config.questions.length)
      .replace('{percentage}', percentage)
      .replace('{url}', currentUrl);

    return `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(shareText)}`;
  }

  renderStartScreen() {
    return `
      <div class="quiz-content text-center py-10 animate-fade-in">
        <div class="quiz-icon quiz-icon-start">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
        </div>
        <h2 class="quiz-title">${this.config.i18n.title}</h2>
        <p class="quiz-description">${this.config.i18n.description}</p>
        <button class="quiz-btn quiz-btn-primary" onclick="quiz.handleStart()">
          ${this.config.i18n.startButton}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    `;
  }

  renderResultScreen() {
    const percentage = Math.round((this.state.score / this.config.questions.length) * 100);
    let message = "";
    let colorClass = "";

    if (percentage >= 80) {
      message = this.config.i18n.resultExpert;
      colorClass = "result-success";
    } else if (percentage >= 50) {
      message = this.config.i18n.resultGood;
      colorClass = "result-warning";
    } else {
      message = this.config.i18n.resultNeedWork;
      colorClass = "result-error";
    }

    return `
      <div class="quiz-content text-center animate-zoom-in">
        <div class="quiz-result-icon ${colorClass}">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="8" r="7"/>
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
          </svg>
        </div>

        <h2 class="quiz-subtitle">${this.config.i18n.finalResult}</h2>

        <div class="quiz-score">
          ${this.state.score}<span class="quiz-score-total">/${this.config.questions.length}</span>
        </div>

        <p class="quiz-message ${colorClass}">${message}</p>

        <div class="quiz-actions">
          <button class="quiz-btn quiz-btn-linkedin" onclick="window.open('${this.getShareUrl()}', '_blank')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
            ${this.config.i18n.shareButton}
          </button>
          <button class="quiz-btn quiz-btn-secondary" onclick="quiz.handleRestart()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 4 23 10 17 10"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
            ${this.config.i18n.restartButton}
          </button>
        </div>
      </div>
    `;
  }

  renderQuestion() {
    const question = this.config.questions[this.state.currentQIndex];
    const progressWidth = ((this.state.currentQIndex + 1) / this.config.questions.length) * 100;

    let optionsHtml = '';
    question.options.forEach(option => {
      let stateClass = "quiz-option-default";
      let icon = "";

      if (this.state.isAnswered) {
        if (option.isCorrect) {
          stateClass = "quiz-option-correct";
          icon = `<svg class="quiz-option-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;
        } else if (this.state.selectedOption === option.id && !option.isCorrect) {
          stateClass = "quiz-option-wrong";
          icon = `<svg class="quiz-option-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
        } else {
          stateClass = "quiz-option-disabled";
        }
      } else if (this.state.selectedOption === option.id) {
        stateClass = "quiz-option-selected";
      }

      const disabled = this.state.isAnswered ? 'disabled' : '';
      optionsHtml += `
        <button
          class="quiz-option ${stateClass}"
          onclick="quiz.handleOptionClick('${option.id}', ${option.isCorrect})"
          ${disabled}
        >
          <span class="quiz-option-text">${option.text}</span>
          ${icon}
        </button>
      `;
    });

    const explanationHtml = this.state.isAnswered ? `
      <div class="quiz-explanation animate-slide-up">
        <div class="quiz-explanation-content">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
          <div>
            <span class="quiz-explanation-title">${this.config.i18n.explanation}</span>
            <p class="quiz-explanation-text">${question.explanation}</p>
          </div>
        </div>
      </div>
    ` : '';

    const nextButtonHtml = this.state.isAnswered ? `
      <button class="quiz-btn quiz-btn-primary" onclick="quiz.handleNext()">
        ${this.state.currentQIndex + 1 === this.config.questions.length ? this.config.i18n.seeResults : this.config.i18n.nextQuestion}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
    ` : '';

    return `
      <div class="quiz-content animate-slide-in">
        <div class="quiz-progress">
          <div class="quiz-progress-bar" style="width: ${progressWidth}%"></div>
        </div>

        <h3 class="quiz-question">${question.question}</h3>

        <div class="quiz-options">
          ${optionsHtml}
        </div>

        ${explanationHtml}

        <div class="quiz-next-container">
          ${nextButtonHtml}
        </div>
      </div>
    `;
  }

  render() {
    if (!this.container) return;

    const { started, showResult, currentQIndex } = this.state;

    let content = '';

    if (!started) {
      content = this.renderStartScreen();
    } else if (showResult) {
      content = this.renderResultScreen();
    } else {
      content = this.renderQuestion();
    }

    // Header
    const headerHtml = `
      <div class="quiz-header">
        <div class="quiz-logo">
          <div class="quiz-logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="16 18 22 12 16 6"/>
              <polyline points="8 6 2 12 8 18"/>
            </svg>
          </div>
          <div>
            <h1 class="quiz-logo-title">${this.config.i18n.logoTitle}</h1>
            <span class="quiz-logo-subtitle">${this.config.i18n.logoSubtitle}</span>
          </div>
        </div>
        ${started && !showResult ? `
          <span class="quiz-counter">Q${currentQIndex + 1}/${this.config.questions.length}</span>
        ` : ''}
      </div>
    `;

    // Footer
    const footerHtml = `
      <div class="quiz-footer">
        ${this.config.i18n.footer}
      </div>
    `;

    this.container.innerHTML = `
      <div class="quiz-container">
        <div class="quiz-wrapper">
          ${headerHtml}
          <div class="quiz-card">
            ${content}
          </div>
          ${footerHtml}
        </div>
      </div>
    `;
  }
}

// Rendre disponible globalement
window.QuizEngine = QuizEngine;
