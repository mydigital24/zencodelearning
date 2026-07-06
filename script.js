import { lessons_html } from './lessons_html.js';
import { lessons_css } from './lessons_css.js';
import { lessons_js } from './lessons_script.js';
import {
    auth,
    db,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    doc,
    getDoc,
    setDoc,
    onSnapshot,
    serverTimestamp
} from './firebase.js';

const courseData = {
    html: lessons_html,
    css: lessons_css,
    js: lessons_js
};

const STORAGE_KEY = 'zenCodeState';
const defaultSandboxCode = '<!DOCTYPE html>\n<html>\n  <body>\n    <h1>Sandbox</h1>\n    <p>Schreibe hier frei.</p>\n  </body>\n</html>';
let userState = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
    xp: 0,
    streak: 0,
    lastActiveDate: null,
    completedLessons: [],
    correctAnswers: 0,
    wrongAnswers: 0,
    theme: 'light',
    font: 'JetBrains Mono',
    accent: 'mint',
    soundEnabled: true,
    pausedLesson: null,
    lastFocus: 'Lernen',
    sandboxProjects: [{ name: 'Projekt 1', code: defaultSandboxCode }],
    activeSandboxProject: 0,
    sandboxCode: defaultSandboxCode
};

let currentCourse = 'html';
let currentLesson = null;
let currentLessonIndex = 0;
let currentTaskIndex = 0;
let lessonTasks = [];
let selectedAnswer = null;
let currentTask = null;
let answeredTask = false;
let currentLessonStats = { correct: 0, wrong: 0 };

let authMode = 'login';
let currentUser = null;
let cloudSyncTimer = null;
let remoteUnsubscribe = null;
let appHasStarted = false;

const grid = document.getElementById('lesson-grid');
const modal = document.getElementById('lesson-modal');
const theoryPanel = document.getElementById('modal-theory-panel');
const practicePanel = document.getElementById('modal-practice-panel');
const summaryPanel = document.getElementById('modal-summary-panel');
const inputArea = document.getElementById('input-area');
const taskQuestion = document.getElementById('task-question');
const taskIntro = document.getElementById('task-intro');
const taskDetail = document.getElementById('task-detail');
const taskCounter = document.getElementById('task-counter');
const taskXp = document.getElementById('task-xp');
const taskProgress = document.getElementById('task-progress');
const taskTimeline = document.getElementById('task-timeline');
const feedbackBanner = document.getElementById('feedback-banner');
const livePreview = document.getElementById('live-preview');
const sandboxEditor = document.getElementById('sandbox-editor');
const sandboxPreview = document.getElementById('sandbox-preview');
const sandboxSaveButton = document.getElementById('sandbox-save');
const sandboxResetButton = document.getElementById('sandbox-reset');
const exportButton = document.getElementById('export-data');
const importButton = document.getElementById('import-data');
const importFile = document.getElementById('import-file');
const modalTitle = document.getElementById('modal-title');
const modalTheory = document.getElementById('modal-theory');
const summaryText = document.getElementById('summary-text');
const courseSwitcher = document.getElementById('course-switcher');
const navButtons = document.querySelectorAll('.nav-button');
const views = document.querySelectorAll('.view');
const themeToggle = document.getElementById('theme-toggle');
const themeSelect = document.getElementById('theme-select');
const fontSelect = document.getElementById('font-select');
const accentSelect = document.getElementById('accent-select');
const soundToggle = document.getElementById('sound-toggle');
const knowledgeGrid = document.getElementById('knowledge-grid');
const resumeLessonButton = document.getElementById('resume-lesson-button');
const projectNameInput = document.getElementById('project-name');
const projectCreateButton = document.getElementById('project-create');
const projectList = document.getElementById('project-list');
const authScreen = document.getElementById('auth-screen');
const appShell = document.getElementById('app-shell');
const authForm = document.getElementById('auth-form');
const authEmailInput = document.getElementById('auth-email');
const authPasswordInput = document.getElementById('auth-password');
const authError = document.getElementById('auth-error');
const authTitle = document.getElementById('auth-title');
const authSubmit = document.getElementById('auth-submit');
const authSwitchButton = document.getElementById('auth-switch-button');
const authSwitchText = document.getElementById('auth-switch-text');
const logoutButton = document.getElementById('logout-button');
const accountEmail = document.getElementById('account-email');

function renderAll() {
    ensureSandboxState();
    restoreSettings();
    updateUIStats();
    initSandbox();
    renderCourseSwitcher();
    renderGrid(courseData[currentCourse]);
    renderKnowledge();
    updateResumeButton();
    renderSandboxProjects();
}

function init() {
    renderAll();
    checkStreak();
    bindEvents();
}

function bindEvents() {
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            views.forEach(view => view.classList.remove('active'));
            const target = button.dataset.view;
            document.getElementById(`view-${target}`).classList.add('active');
            document.getElementById('view-title').textContent = button.textContent;
        });
    });

    themeToggle.addEventListener('click', toggleTheme);
    themeSelect.addEventListener('change', (event) => {
        userState.theme = event.target.value;
        applyTheme();
        saveState();
    });
    fontSelect.addEventListener('change', (event) => {
        userState.font = event.target.value;
        document.body.style.fontFamily = userState.font;
        saveState();
    });
    accentSelect.addEventListener('change', (event) => {
        userState.accent = event.target.value;
        applyTheme();
        saveState();
    });
    soundToggle.addEventListener('change', (event) => {
        userState.soundEnabled = event.target.checked;
        saveState();
    });

    sandboxEditor.addEventListener('input', () => {
        ensureSandboxState();
        userState.sandboxCode = sandboxEditor.value;
        const activeProject = userState.sandboxProjects?.[userState.activeSandboxProject];
        if (activeProject) {
            activeProject.code = sandboxEditor.value;
        }
        saveState();
        renderSandboxPreview();
    });
    sandboxSaveButton.addEventListener('click', () => {
        ensureSandboxState();
        userState.sandboxCode = sandboxEditor.value;
        const activeProject = userState.sandboxProjects?.[userState.activeSandboxProject];
        if (activeProject) {
            activeProject.code = sandboxEditor.value;
        }
        saveState();
        renderSandboxPreview();
        renderSandboxProjects();
    });
    sandboxResetButton.addEventListener('click', () => {
        ensureSandboxState();
        userState.sandboxCode = defaultSandboxCode;
        const activeProject = userState.sandboxProjects?.[userState.activeSandboxProject];
        if (activeProject) {
            activeProject.code = defaultSandboxCode;
        }
        sandboxEditor.value = userState.sandboxCode;
        saveState();
        renderSandboxPreview();
        renderSandboxProjects();
    });
    exportButton.addEventListener('click', handleExportData);
    importButton.addEventListener('click', () => importFile.click());
    importFile.addEventListener('change', handleImportData);
    document.getElementById('btn-pause-lesson').addEventListener('click', pauseLessonAndClose);
    document.getElementById('btn-pause-lesson-practice').addEventListener('click', pauseLessonAndClose);
    resumeLessonButton.addEventListener('click', resumePausedLesson);
    projectCreateButton.addEventListener('click', createSandboxProject);
    projectNameInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') createSandboxProject();
    });
}

function renderCourseSwitcher() {
    courseSwitcher.innerHTML = '';
    Object.entries(courseData).forEach(([key, lessons]) => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = `course-chip ${key === currentCourse ? 'active' : ''}`;
        chip.textContent = key.toUpperCase();
        chip.addEventListener('click', () => {
            currentCourse = key;
            renderCourseSwitcher();
            renderGrid(courseData[currentCourse]);
        });
        courseSwitcher.appendChild(chip);
    });
}

function renderGrid(lessons) {
    grid.innerHTML = '';
    lessons.forEach((lesson, index) => {
        const isCompleted = userState.completedLessons.includes(lesson.id);
        const isLocked = index > 0 && !userState.completedLessons.includes(lessons[index - 1].id);
        const card = document.createElement('button');
        card.type = 'button';
        card.className = `lesson-card ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}`;

        const content = document.createElement('div');
        const title = document.createElement('h3');
        title.textContent = lesson.title;
        const description = document.createElement('p');
        description.textContent = `${lesson.theory.split(' ').slice(0, 10).join(' ')}...`;
        content.appendChild(title);
        content.appendChild(description);

        const meta = document.createElement('div');
        meta.className = 'card-meta';
        const status = document.createElement('span');
        status.textContent = isCompleted ? '✓ Abgeschlossen' : `${lesson.xpReward} XP`;
        const taskCount = document.createElement('span');
        taskCount.textContent = `${lesson.tasks.length} Aufgaben`;
        meta.appendChild(status);
        meta.appendChild(taskCount);

        card.appendChild(content);
        card.appendChild(meta);

        if (!isLocked) {
            card.addEventListener('click', () => openLesson(lesson));
        }
        grid.appendChild(card);
    });
}

function openLesson(lesson) {
    currentLesson = lesson;
    currentLessonIndex = courseData[currentCourse].findIndex(item => item.id === lesson.id);
    lessonTasks = lesson.tasks;
    currentTaskIndex = userState.pausedLesson && userState.pausedLesson.lessonId === lesson.id && userState.pausedLesson.course === currentCourse
        ? Math.max(0, Math.min(userState.pausedLesson.taskIndex || 0, lessonTasks.length - 1))
        : 0;
    currentLessonStats = { correct: 0, wrong: 0 };
    modalTheory.textContent = lesson.theory;
    document.getElementById('modal-theory-wrapper').classList.remove('hidden');
    document.getElementById('btn-toggle-theory').textContent = 'Erklärung ausblenden';
    document.getElementById('btn-show-explanation').textContent = 'Erklärung ausblenden';
    modalTitle.textContent = lesson.title;
    theoryPanel.classList.remove('hidden');
    practicePanel.classList.add('hidden');
    summaryPanel.classList.add('hidden');
    modal.classList.remove('hidden');
    userState.lastFocus = lesson.title;
    saveState();
    updateUIStats();
}

function startLessonPractice() {
    theoryPanel.classList.add('hidden');
    practicePanel.classList.remove('hidden');
    renderTask();
}

function renderTask() {
    currentTask = lessonTasks[currentTaskIndex];
    if (!currentTask) {
        finishLesson();
        return;
    }
    answeredTask = false;
    selectedAnswer = null;
    feedbackBanner.className = 'feedback-banner hidden';
    feedbackBanner.textContent = '';
    document.getElementById('btn-check').classList.remove('hidden');
    document.getElementById('btn-next-task').classList.add('hidden');
    taskQuestion.textContent = currentTask.question;
    taskIntro.textContent = currentTask.intro || 'Schau dir die Aufgabe an, löse sie und prüfe dein Ergebnis direkt in der Live-Vorschau.';
    taskCounter.textContent = `${currentTaskIndex + 1}/${lessonTasks.length}`;
    taskXp.textContent = `+${currentLesson.xpReward} XP`;
    taskProgress.style.width = `${((currentTaskIndex + 1) / lessonTasks.length) * 100}%`;
    renderTimeline();
    inputArea.innerHTML = '';
    modal.classList.remove('is-correct', 'is-wrong');

    if (currentTask.taskType === 'mc') {
        const options = document.createElement('div');
        options.className = 'option-grid';
        currentTask.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'option-button';
            button.dataset.index = index;
            button.textContent = option;
            button.addEventListener('click', () => {
                selectedAnswer = index;
                [...options.children].forEach(child => child.classList.remove('selected'));
                button.classList.add('selected');
            });
            options.appendChild(button);
        });
        inputArea.appendChild(options);
    } else if (currentTask.taskType === 'code') {
        const editor = document.createElement('textarea');
        editor.placeholder = 'Schreibe deinen Code...';
        editor.rows = 6;
        editor.className = 'code-editor';
        editor.name = 'code-answer';
        editor.addEventListener('input', () => {
            livePreview.srcdoc = `<!DOCTYPE html><html><body style="font-family: sans-serif; padding: 16px;">${editor.value}</body></html>`;
        });
        inputArea.appendChild(editor);
        livePreview.srcdoc = `<!DOCTYPE html><html><body style="font-family:sans-serif;padding:16px;">${currentTask.correctAnswer || 'Vorschau'}</body></html>`;
    } else if (currentTask.taskType === 'sort') {
        const sortedItems = [...currentTask.options].sort(() => Math.random() - 0.5);
        selectedAnswer = sortedItems.join(' -> ');
        const order = document.createElement('div');
        order.className = 'sort-order';
        let dragSourceIndex = null;

        const rebuildSortChips = () => {
            order.innerHTML = '';
            sortedItems.forEach((item, index) => {
                const chip = document.createElement('button');
                chip.type = 'button';
                chip.className = 'sort-chip';
                chip.textContent = `${index + 1}. ${item}`;
                chip.draggable = true;
                chip.dataset.index = index;

                chip.addEventListener('dragstart', (e) => {
                    dragSourceIndex = index;
                    e.dataTransfer.effectAllowed = 'move';
                });

                chip.addEventListener('dragenter', (e) => {
                    e.preventDefault();
                    chip.classList.add('drag-over');
                });

                chip.addEventListener('dragleave', () => {
                    chip.classList.remove('drag-over');
                });

                chip.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'move';
                });

                chip.addEventListener('drop', (e) => {
                    e.preventDefault();
                    chip.classList.remove('drag-over');
                    if (dragSourceIndex === null || dragSourceIndex === index) return;
                    const [moved] = sortedItems.splice(dragSourceIndex, 1);
                    sortedItems.splice(index, 0, moved);
                    selectedAnswer = sortedItems.join(' -> ');
                    rebuildSortChips();
                });

                order.appendChild(chip);
            });
        };

        rebuildSortChips();
        inputArea.appendChild(order);
    } else if (currentTask.taskType === 'select') {
        livePreview.srcdoc = currentTask.preview || '<!DOCTYPE html><html><body>Vorschau</body></html>';
        const options = document.createElement('div');
        options.className = 'option-grid';
        currentTask.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'option-button';
            button.dataset.index = index;
            button.textContent = option;
            button.addEventListener('click', () => {
                selectedAnswer = index;
                [...options.children].forEach(child => child.classList.remove('selected'));
                button.classList.add('selected');
            });
            options.appendChild(button);
        });
        inputArea.appendChild(options);
    }
}

function renderTimeline() {
    taskTimeline.innerHTML = '';
    lessonTasks.forEach((_, index) => {
        const step = document.createElement('div');
        step.className = 'timeline-step';
        if (index === currentTaskIndex) step.classList.add('active');
        step.innerHTML = `<span class="timeline-dot"></span><span>Task ${index + 1}</span>`;
        taskTimeline.appendChild(step);
    });
}

function toggleTheoryExplanation() {
    const wrapper = document.getElementById('modal-theory-wrapper');
    const isHidden = wrapper.classList.toggle('hidden');
    const label = isHidden ? 'Erklärung einblenden' : 'Erklärung ausblenden';
    document.getElementById('btn-toggle-theory').textContent = label;
    document.getElementById('btn-show-explanation').textContent = label;
}

function handleNextTask() {
    document.getElementById('btn-next-task').classList.add('hidden');
    document.getElementById('btn-check').classList.remove('hidden');
    currentTaskIndex += 1;
    renderTask();
}

function handleCheck() {
    if (answeredTask) return;
    answeredTask = true;
    const answerValue = inputArea.querySelector('textarea')?.value || inputArea.querySelector('input')?.value || selectedAnswer;
    const isCorrect = evaluateAnswer(currentTask, answerValue);
    if (isCorrect) {
        currentLessonStats.correct += 1;
        userState.correctAnswers += 1;
        userState.xp += currentLesson.xpReward;
        playSound(true);
        feedbackBanner.textContent = 'Richtig! Weiter geht es zur nächsten Aufgabe.';
        feedbackBanner.className = 'feedback-banner success';
        modal.classList.add('is-correct');
        setTimeout(() => {
            currentTaskIndex += 1;
            renderTask();
        }, 700);
    } else {
        currentLessonStats.wrong += 1;
        userState.wrongAnswers += 1;
        playSound(false);
        if (currentTask.taskType === 'code') {
            livePreview.srcdoc = `<!DOCTYPE html><html><body style="font-family:sans-serif;padding:16px;">${currentTask.correctAnswer || ''}</body></html>`;
        }
        const twr = (currentTask.tellwhatright || 'keine Erklärung in Übung gefunden').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        feedbackBanner.innerHTML = `<strong>Nicht ganz richtig</strong><br><br>${twr}`;
        feedbackBanner.className = 'feedback-banner error';
        modal.classList.add('is-wrong');
        document.getElementById('btn-check').classList.add('hidden');
        document.getElementById('btn-next-task').classList.remove('hidden');
    }
    if (currentTask.taskType === 'mc' || currentTask.taskType === 'select') {
        inputArea.querySelectorAll('.option-button').forEach((button, index) => {
            if (index === currentTask.correctAnswer) {
                button.classList.add('correct');
            } else if (Number(button.dataset.index) === Number(selectedAnswer) && Number(selectedAnswer) !== currentTask.correctAnswer) {
                button.classList.add('wrong');
            }
        });
    }
    const currentStep = taskTimeline.children[currentTaskIndex];
    if (currentStep) {
        currentStep.classList.remove('active');
        currentStep.classList.add(isCorrect ? 'done-correct' : 'done-wrong');
    }
    saveState();
    updateUIStats();
}

function evaluateAnswer(task, value) {
    if (!task) return false;
    if (task.taskType === 'mc' || task.taskType === 'select') {
        return Number(value) === task.correctAnswer;
    }
    if (task.taskType === 'sort') {
        return String(value).toLowerCase() === String(task.correctAnswer).toLowerCase();
    }
    if (task.taskType === 'code') {
        return String(value || '').replace(/\s+/g, '').toLowerCase() === String(task.correctAnswer).replace(/\s+/g, '').toLowerCase();
    }
    return false;
}

function finishLesson() {
    practicePanel.classList.add('hidden');
    summaryPanel.classList.remove('hidden');
    if (!userState.completedLessons.includes(currentLesson.id)) {
        userState.completedLessons.push(currentLesson.id);
        saveState();
        renderGrid(courseData[currentCourse]);
    }
    const nextLesson = courseData[currentCourse][currentLessonIndex + 1];
    const accuracy = currentLessonStats.correct + currentLessonStats.wrong === 0
        ? 0
        : Math.round((currentLessonStats.correct / (currentLessonStats.correct + currentLessonStats.wrong)) * 100);
    summaryText.innerHTML = `
        <strong>${currentLesson.title} abgeschlossen</strong>
        <div class="summary-stats">
            <span>Richtig: ${currentLessonStats.correct}</span>
            <span>Falsch: ${currentLessonStats.wrong}</span>
            <span>Genauigkeit: ${accuracy}%</span>
            <span>Aufgaben: ${lessonTasks.length}</span>
        </div>
        <p>${nextLesson ? `Die nächste Lektion ist bereit: ${nextLesson.title}.` : 'Super gemacht! Du kannst direkt mit der nächsten Herausforderung starten.'}</p>
    `;
    userState.pausedLesson = null;
    saveState();
    updateUIStats();
}

function toggleTheme() {
    const nextTheme = userState.theme === 'dark' ? 'light' : 'dark';
    userState.theme = nextTheme;
    applyTheme();
    saveState();
}

function applyTheme() {
    document.body.dataset.theme = userState.theme;
    document.documentElement.style.setProperty('--accent', getAccentColor(userState.accent || 'blue'));
    document.documentElement.style.setProperty('--accent-soft', getAccentSoftColor(userState.accent || 'blue'));
    themeToggle.textContent = userState.theme === 'dark' ? '🌙' : '☀️';
    themeSelect.value = userState.theme;
    accentSelect.value = userState.accent || 'blue';
    soundToggle.checked = userState.soundEnabled !== false;
}

function restoreSettings() {
    applyTheme();
    document.body.style.fontFamily = userState.font || 'JetBrains Mono';
    fontSelect.value = userState.font || 'JetBrains Mono';
}

function updateResumeButton() {
    if (resumeLessonButton) {
        resumeLessonButton.style.display = userState.pausedLesson ? 'inline-flex' : 'none';
        resumeLessonButton.textContent = userState.pausedLesson ? `Fortsetzen: ${userState.pausedLesson.title}` : 'Fortsetzen';
    }
}

function updateUIStats() {
    document.getElementById('sidebar-xp').textContent = userState.xp;
    document.getElementById('sidebar-streak').textContent = userState.streak;
    document.getElementById('sidebar-correct').textContent = userState.correctAnswers;
    document.getElementById('sidebar-wrong').textContent = userState.wrongAnswers;
    document.getElementById('stats-xp').textContent = userState.xp;
    document.getElementById('stats-streak').textContent = userState.streak;
    document.getElementById('stats-correct').textContent = userState.correctAnswers;
    document.getElementById('stats-wrong').textContent = userState.wrongAnswers;
    document.getElementById('stats-completed').textContent = userState.completedLessons.length;
    const accuracy = userState.correctAnswers + userState.wrongAnswers === 0 ? 0 : Math.round((userState.correctAnswers / (userState.correctAnswers + userState.wrongAnswers)) * 100);
    document.getElementById('stats-accuracy').textContent = `${accuracy}%`;
    const progress = userState.completedLessons.length === 0 ? 0 : Math.round((userState.completedLessons.length / Object.values(courseData).reduce((sum, lessons) => sum + lessons.length, 0)) * 100);
    document.getElementById('stats-progress').textContent = `${progress}%`;
    document.getElementById('stats-current-lesson').textContent = userState.lastFocus || '—';
    document.getElementById('stats-focus').textContent = userState.pausedLesson ? userState.pausedLesson.title : '—';
    renderStatsBreakdown();
}

function checkStreak() {
    const today = new Date().toDateString();
    if (userState.lastActiveDate !== today) {
        userState.streak += 1;
        userState.lastActiveDate = today;
        saveState();
    }
}

function renderKnowledge() {
    knowledgeGrid.innerHTML = '';
    Object.entries(courseData).forEach(([courseKey, lessons]) => {
        lessons.forEach(lesson => {
            const card = document.createElement('article');
            card.className = 'knowledge-card';
            const titleEl = document.createElement('h4');
            titleEl.textContent = lesson.title;
            const theoryEl = document.createElement('p');
            theoryEl.textContent = lesson.theory;
            const buttonEl = document.createElement('button');
            buttonEl.className = 'btn secondary';
            buttonEl.type = 'button';
            buttonEl.textContent = 'Zur Lektion';
            card.appendChild(titleEl);
            card.appendChild(theoryEl);
            card.appendChild(buttonEl);
            card.querySelector('button').addEventListener('click', () => {
                currentCourse = courseKey;
                renderCourseSwitcher();
                renderGrid(courseData[currentCourse]);
                openLesson(lesson);
                document.querySelector('[data-view="learn"]').click();
            });
            knowledgeGrid.appendChild(card);
        });
    });
}

function renderStatsBreakdown() {
    const breakdown = document.getElementById('stats-breakdown');
    breakdown.innerHTML = '';
    Object.entries(courseData).forEach(([key, lessons]) => {
        const completed = lessons.filter(lesson => userState.completedLessons.includes(lesson.id)).length;
        const item = document.createElement('div');
        item.className = 'stats-breakdown-item';
        item.innerHTML = `<span>${key.toUpperCase()}</span><strong>${completed}/${lessons.length}</strong>`;
        breakdown.appendChild(item);
    });
}

function getAccentColor(accent) {
    return {
        mint: '#2dd4bf',
        blue: '#268bd2',
        green: '#2aa198',
        orange: '#cb4b16',
        purple: '#6c71c4'
    }[accent] || '#2dd4bf';
}

function getAccentSoftColor(accent) {
    return {
        mint: '#e7fdf8',
        blue: '#e3f2fd',
        green: '#e6f7f2',
        orange: '#fff1e8',
        purple: '#f2ebff'
    }[accent] || '#e7fdf8';
}

function pauseLessonAndClose() {
    if (currentLesson && lessonTasks.length) {
        userState.pausedLesson = {
            course: currentCourse,
            lessonId: currentLesson.id,
            title: currentLesson.title,
            taskIndex: currentTaskIndex || 0
        };
        saveState();
        updateUIStats();
        updateResumeButton();
    }
    closeModal();
}

function resumePausedLesson() {
    if (!userState.pausedLesson) return;
    const lesson = Object.values(courseData).flat().find(item => item.id === userState.pausedLesson.lessonId);
    if (!lesson) return;
    currentCourse = userState.pausedLesson.course || currentCourse;
    renderCourseSwitcher();
    renderGrid(courseData[currentCourse]);
    openLesson(lesson);
    document.querySelector('[data-view="learn"]').click();
    startLessonPractice();
}

function ensureSandboxState() {
    if (!Array.isArray(userState.sandboxProjects) || userState.sandboxProjects.length === 0) {
        userState.sandboxProjects = [{ name: 'Projekt 1', code: userState.sandboxCode || defaultSandboxCode }];
    }

    if (typeof userState.activeSandboxProject !== 'number' || userState.activeSandboxProject < 0 || userState.activeSandboxProject >= userState.sandboxProjects.length) {
        userState.activeSandboxProject = 0;
    }

    const activeProject = userState.sandboxProjects[userState.activeSandboxProject];
    if (!activeProject) {
        userState.sandboxProjects[0] = { name: 'Projekt 1', code: userState.sandboxCode || defaultSandboxCode };
        userState.activeSandboxProject = 0;
    }

    if (!userState.sandboxCode || userState.sandboxCode !== activeProject.code) {
        userState.sandboxCode = activeProject.code || defaultSandboxCode;
    }
}

function renderSandboxProjects() {
    ensureSandboxState();
    projectList.innerHTML = '';
    if (!userState.sandboxProjects?.length) return;
    userState.sandboxProjects.forEach((project, index) => {
        const pill = document.createElement('button');
        pill.type = 'button';
        pill.className = `project-pill ${index === userState.activeSandboxProject ? 'active' : ''}`;
        pill.textContent = project.name;
        pill.addEventListener('click', () => {
            ensureSandboxState();
            userState.activeSandboxProject = index;
            userState.sandboxCode = project.code || defaultSandboxCode;
            sandboxEditor.value = userState.sandboxCode;
            saveState();
            renderSandboxPreview();
            renderSandboxProjects();
        });
        projectList.appendChild(pill);
    });
}

function createSandboxProject() {
    ensureSandboxState();
    const name = projectNameInput.value.trim() || `Projekt ${userState.sandboxProjects.length + 1}`;
    const project = { name, code: defaultSandboxCode.replace('Sandbox', name) };
    userState.sandboxProjects = [...userState.sandboxProjects, project];
    userState.activeSandboxProject = userState.sandboxProjects.length - 1;
    userState.sandboxCode = project.code;
    sandboxEditor.value = project.code;
    projectNameInput.value = '';
    saveState();
    renderSandboxProjects();
    renderSandboxPreview();
}

function saveState() {
    saveLocal();
    scheduleCloudSync();
}

function saveLocal() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userState));
}

function scheduleCloudSync() {
    if (!currentUser) return;
    clearTimeout(cloudSyncTimer);
    cloudSyncTimer = setTimeout(pushStateToCloud, 800);
}

async function pushStateToCloud() {
    if (!currentUser) return;
    try {
        await setDoc(doc(db, 'users', currentUser.uid), {
            state: userState,
            updatedAt: serverTimestamp()
        }, { merge: true });
    } catch (error) {
        console.error('Cloud-Sync fehlgeschlagen:', error);
    }
}

async function loadStateFromCloud(uid) {
    try {
        const snap = await getDoc(doc(db, 'users', uid));
        if (snap.exists() && snap.data().state) {
            userState = { ...userState, ...snap.data().state };
            saveLocal();
        } else {
            await pushStateToCloud();
        }
    } catch (error) {
        console.error('Konnte Cloud-Stand nicht laden, nutze lokalen Stand:', error);
    }
}

function listenToRemoteChanges(uid) {
    if (remoteUnsubscribe) remoteUnsubscribe();
    remoteUnsubscribe = onSnapshot(doc(db, 'users', uid), (snap) => {
        if (!snap.exists() || snap.metadata.hasPendingWrites) return;
        const remoteState = snap.data().state;
        if (!remoteState) return;
        userState = { ...userState, ...remoteState };
        saveLocal();
        renderAll();
    }, (error) => {
        console.error('Realtime-Sync-Fehler:', error);
    });
}

function initSandbox() {
    ensureSandboxState();
    const currentProject = userState.sandboxProjects?.[userState.activeSandboxProject] || userState.sandboxProjects?.[0];
    if (currentProject) {
        userState.sandboxCode = currentProject.code || defaultSandboxCode;
    }
    sandboxEditor.value = userState.sandboxCode || defaultSandboxCode;
    renderSandboxProjects();
    renderSandboxPreview();
}

function renderSandboxPreview() {
    sandboxPreview.srcdoc = userState.sandboxCode || '<!DOCTYPE html><html><body></body></html>';
}

function handleExportData() {
    const blob = new Blob([JSON.stringify(userState, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'zen-code-export.json';
    anchor.click();
    URL.revokeObjectURL(url);
}

function handleImportData(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        try {
            const imported = JSON.parse(reader.result);
            userState = { ...userState, ...imported };
            saveState();
            applyTheme();
            updateUIStats();
            initSandbox();
            renderGrid(courseData[currentCourse]);
            document.getElementById('view-title').textContent = 'Einstellungen';
        } catch (error) {
            alert('Die Datei konnte nicht importiert werden.');
        }
    };
    reader.readAsText(file);
}

let audioCtx = null;

function playSound(isCorrect) {
    if (!userState.soundEnabled) return;
    try {
        const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtxClass) return;
        if (!audioCtx || audioCtx.state === 'closed') {
            audioCtx = new AudioCtxClass();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.value = isCorrect ? 880 : 220;
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.2);
    } catch (_) {}
}

function closeModal() {
    modal.classList.add('hidden');
    userState.lastFocus = currentLesson?.title || 'Lernen';
    saveState();
    updateUIStats();
}

document.getElementById('btn-toggle-theory').addEventListener('click', toggleTheoryExplanation);
document.getElementById('btn-start-lesson').addEventListener('click', startLessonPractice);
document.getElementById('btn-check').addEventListener('click', handleCheck);
document.getElementById('btn-next-task').addEventListener('click', handleNextTask);
document.getElementById('btn-show-explanation').addEventListener('click', toggleTheoryExplanation);
document.getElementById('btn-close').addEventListener('click', closeModal);
document.getElementById('btn-next-lesson').addEventListener('click', () => {
    const nextLesson = courseData[currentCourse][currentLessonIndex + 1];
    if (nextLesson) {
        openLesson(nextLesson);
    } else {
        closeModal();
    }
});
document.getElementById('btn-close-summary').addEventListener('click', closeModal);

function updateAuthModeUI() {
    if (authMode === 'login') {
        authTitle.textContent = 'Anmelden';
        authSubmit.textContent = 'Anmelden';
        authSwitchText.textContent = 'Noch kein Konto?';
        authSwitchButton.textContent = 'Registrieren';
        authPasswordInput.autocomplete = 'current-password';
    } else {
        authTitle.textContent = 'Registrieren';
        authSubmit.textContent = 'Konto erstellen';
        authSwitchText.textContent = 'Schon ein Konto?';
        authSwitchButton.textContent = 'Anmelden';
        authPasswordInput.autocomplete = 'new-password';
    }
    authError.classList.add('hidden');
    authError.textContent = '';
}

function getAuthErrorMessage(error) {
    const messages = {
        'auth/invalid-email': 'Diese E-Mail-Adresse ist ungültig.',
        'auth/user-not-found': 'Kein Konto mit dieser E-Mail gefunden.',
        'auth/wrong-password': 'Falsches Passwort.',
        'auth/invalid-credential': 'E-Mail oder Passwort ist falsch.',
        'auth/email-already-in-use': 'Diese E-Mail wird bereits verwendet.',
        'auth/weak-password': 'Das Passwort muss mindestens 6 Zeichen haben.',
        'auth/missing-password': 'Bitte gib ein Passwort ein.',
        'auth/too-many-requests': 'Zu viele Versuche. Bitte versuche es später erneut.'
    };
    return messages[error.code] || 'Etwas ist schiefgelaufen. Bitte versuche es erneut.';
}

authSwitchButton.addEventListener('click', () => {
    authMode = authMode === 'login' ? 'register' : 'login';
    updateAuthModeUI();
});

authForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    authError.classList.add('hidden');
    authError.textContent = '';
    const email = authEmailInput.value.trim();
    const password = authPasswordInput.value;
    authSubmit.disabled = true;
    try {
        if (authMode === 'login') {
            await signInWithEmailAndPassword(auth, email, password);
        } else {
            await createUserWithEmailAndPassword(auth, email, password);
        }
    } catch (error) {
        authError.textContent = getAuthErrorMessage(error);
        authError.classList.remove('hidden');
    } finally {
        authSubmit.disabled = false;
    }
});

logoutButton.addEventListener('click', () => {
    signOut(auth);
});

onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentUser = user;
        accountEmail.textContent = user.email || '—';
        await loadStateFromCloud(user.uid);

        if (!appHasStarted) {
            init();
            appHasStarted = true;
        } else {
            renderAll();
        }

        authScreen.classList.add('hidden');
        appShell.classList.remove('hidden');
        listenToRemoteChanges(user.uid);
    } else {
        currentUser = null;
        if (remoteUnsubscribe) {
            remoteUnsubscribe();
            remoteUnsubscribe = null;
        }
        clearTimeout(cloudSyncTimer);
        appShell.classList.add('hidden');
        authScreen.classList.remove('hidden');
        authForm.reset();
        authMode = 'login';
        updateAuthModeUI();
    }
});