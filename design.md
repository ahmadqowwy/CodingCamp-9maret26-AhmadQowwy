# Design Document: Dashboard Theme and Personalization

## Overview

This design document specifies the technical implementation for enhancing the To-Do List Life Dashboard with theme customization and personalization features. The enhancements add three key capabilities to the existing vanilla JavaScript application:

1. **Theme Toggle System**: A light/dark mode switcher that applies CSS class-based theming across all dashboard components
2. **Name Personalization**: Custom name input integrated into the greeting component with dynamic message rendering
3. **Timer Duration Configuration**: Selectable Pomodoro timer durations (25, 30, 45 minutes) with persistent preferences

All features integrate seamlessly with the existing codebase structure, maintaining the vanilla JavaScript approach without frameworks. User preferences persist across browser sessions using the Local Storage API.

### Design Goals

- Minimal invasiveness: Extend existing modules without restructuring the codebase
- CSS-driven theming: Leverage CSS custom properties and class-based theme switching
- Consistent persistence: Unified Local Storage schema for all user preferences
- Progressive enhancement: Features degrade gracefully if Local Storage is unavailable
- Maintainability: Clear separation of concerns within existing file structure


## Architecture

### High-Level Component Integration

The design extends three existing areas of the dashboard:

```
┌─────────────────────────────────────────────────────────────┐
│                    Dashboard Application                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         GREETING MODULE (Enhanced)                     │ │
│  │  - Existing: Time, Date, Greeting calculation          │ │
│  │  + NEW: Name input field                               │ │
│  │  + NEW: Personalized greeting rendering               │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         TIMER MODULE (Enhanced)                        │ │
│  │  - Existing: 25-minute countdown                       │ │
│  │  + NEW: Duration selector (25/30/45 min)              │ │
│  │  + NEW: Dynamic timer initialization                   │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         THEME MODULE (New)                             │ │
│  │  + NEW: Theme toggle button                            │ │
│  │  + NEW: CSS class application logic                    │ │
│  │  + NEW: Theme state management                         │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         PERSISTENCE LAYER                              │ │
│  │  - Existing: Local Storage utilities (to be added)     │ │
│  │  + NEW: Theme preference storage                       │ │
│  │  + NEW: User name storage                              │ │
│  │  + NEW: Timer duration storage                         │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Module Responsibilities

**Theme Module** (New addition to dashboard.js)
- Manage theme state (light/dark)
- Apply/remove CSS classes on document root
- Handle theme toggle interactions
- Persist theme preference to Local Storage
- Load theme preference on initialization

**Greeting Module** (Enhanced)
- Existing: Display time, date, and time-based greeting
- New: Capture user name from input field
- New: Render personalized greeting with name
- New: Persist user name to Local Storage
- New: Load user name on initialization

**Timer Module** (Enhanced)
- Existing: Countdown timer functionality
- New: Provide duration selection UI
- New: Update timer display based on selected duration
- New: Persist selected duration to Local Storage
- New: Load duration preference on initialization

**Persistence Layer** (Utility functions)
- Provide safe Local Storage read/write operations
- Handle Local Storage errors gracefully
- Centralize storage key management
- Validate data before persistence


## Components and Interfaces

### Theme Module Interface

```javascript
// Theme state constants
const THEMES = {
    LIGHT: 'light',
    DARK: 'dark'
};

const STORAGE_KEYS = {
    THEME: 'dashboard_theme',
    USER_NAME: 'dashboard_user_name',
    TIMER_DURATION: 'dashboard_timer_duration'
};

/**
 * Get current theme from DOM
 * @returns {string} Current theme ('light' or 'dark')
 */
function getCurrentTheme()

/**
 * Apply theme to document by adding/removing CSS classes
 * @param {string} theme - Theme to apply ('light' or 'dark')
 */
function applyTheme(theme)

/**
 * Toggle between light and dark themes
 */
function toggleTheme()

/**
 * Load theme preference from Local Storage and apply it
 */
function loadThemePreference()

/**
 * Save theme preference to Local Storage
 * @param {string} theme - Theme to save
 */
function saveThemePreference(theme)

/**
 * Initialize theme module: load preference and attach event listeners
 */
function initTheme()
```

### Enhanced Greeting Module Interface

```javascript
/**
 * Get user name from Local Storage
 * @returns {string|null} User name or null if not set
 */
function getUserName()

/**
 * Save user name to Local Storage
 * @param {string} name - User name to save
 */
function saveUserName(name)

/**
 * Update greeting message with optional personalized name
 * @param {string|null} userName - Optional user name for personalization
 */
function updateGreeting(userName = null)

/**
 * Handle name input changes and save to storage
 * @param {Event} event - Input event from name field
 */
function handleNameInput(event)

/**
 * Initialize greeting with persisted name
 */
function initGreeting()
```

### Enhanced Timer Module Interface

```javascript
// Timer duration constants (in minutes)
const TIMER_DURATIONS = {
    SHORT: 25,
    MEDIUM: 30,
    LONG: 45
};

/**
 * Get selected timer duration from Local Storage
 * @returns {number} Duration in minutes (default: 25)
 */
function getTimerDuration()

/**
 * Save timer duration to Local Storage
 * @param {number} duration - Duration in minutes
 */
function saveTimerDuration(duration)

/**
 * Update timer display to show selected duration
 * @param {number} duration - Duration in minutes
 */
function setTimerDuration(duration)

/**
 * Handle duration selector change
 * @param {Event} event - Change event from duration selector
 */
function handleDurationChange(event)

/**
 * Initialize timer with persisted duration preference
 */
function initTimer()
```

### Local Storage Utility Interface

```javascript
/**
 * Safely get item from Local Storage
 * @param {string} key - Storage key
 * @returns {string|null} Stored value or null if not found/error
 */
function getStorageItem(key)

/**
 * Safely set item in Local Storage
 * @param {string} key - Storage key
 * @param {string} value - Value to store
 * @returns {boolean} True if successful, false otherwise
 */
function setStorageItem(key, value)

/**
 * Check if Local Storage is available
 * @returns {boolean} True if available, false otherwise
 */
function isStorageAvailable()
```


## Data Models

### Local Storage Schema

All user preferences are stored in Local Storage using string key-value pairs:

```javascript
// Storage Keys
{
    "dashboard_theme": "light" | "dark",
    "dashboard_user_name": string,
    "dashboard_timer_duration": "25" | "30" | "45"
}
```

**Key: `dashboard_theme`**
- Type: String enum
- Values: `"light"` or `"dark"`
- Default: `"light"` (if not set)
- Description: User's preferred color theme

**Key: `dashboard_user_name`**
- Type: String
- Values: Any non-empty string (trimmed)
- Default: `null` (if not set)
- Description: User's personalized name for greeting
- Validation: Trimmed before storage, empty strings treated as null

**Key: `dashboard_timer_duration`**
- Type: String (numeric)
- Values: `"25"`, `"30"`, or `"45"`
- Default: `"25"` (if not set)
- Description: User's preferred Pomodoro timer duration in minutes

### Theme State Model

```javascript
// Theme is represented by CSS classes on the document root
// Light mode (default): No special class or 'theme-light' class
// Dark mode: 'theme-dark' class on <body> element

// DOM State:
<body class="theme-dark">  // Dark mode active
<body>                      // Light mode active (no class)
```

### Greeting State Model

```javascript
// Greeting component state
{
    currentTime: Date,           // Updated every second
    currentDate: Date,           // Updated every second
    greetingText: string,        // "Good morning/afternoon/evening/night"
    userName: string | null,     // Personalized name or null
    displayText: string          // Final rendered greeting
}

// Display text examples:
// Without name: "Good morning"
// With name: "Good morning, Ahmad"
```

### Timer State Model

```javascript
// Timer component state
{
    selectedDuration: number,    // Duration in minutes (25, 30, or 45)
    remainingTime: number,       // Remaining seconds
    isRunning: boolean,          // Timer active state
    intervalId: number | null    // setInterval ID or null
}

// Display format: "MM:SS"
// Examples: "25:00", "30:00", "45:00"
```


## Implementation Details

### CSS Theme System

The theme system uses CSS custom properties (variables) and class-based switching for maintainability and performance.

**CSS Structure:**

```css
/* Root variables for light theme (default) */
:root {
    --bg-gradient-start: #667eea;
    --bg-gradient-end: #764ba2;
    --component-bg: #ffffff;
    --text-primary: #333333;
    --text-secondary: #666666;
    --border-color: #e0e0e0;
    --shadow: rgba(0, 0, 0, 0.1);
    --task-item-bg: #f8f9fa;
    --task-item-hover: #e9ecef;
}

/* Dark theme overrides */
body.theme-dark {
    --bg-gradient-start: #1a1a2e;
    --bg-gradient-end: #16213e;
    --component-bg: #0f3460;
    --text-primary: #e0e0e0;
    --text-secondary: #b0b0b0;
    --border-color: #2a2a3e;
    --shadow: rgba(0, 0, 0, 0.3);
    --task-item-bg: #1a2332;
    --task-item-hover: #243447;
}

/* Apply variables to components */
body {
    background: linear-gradient(135deg, var(--bg-gradient-start), var(--bg-gradient-end));
    color: var(--text-primary);
}

.component {
    background: var(--component-bg);
    box-shadow: 0 4px 6px var(--shadow);
}

.task-input,
.link-input {
    border-color: var(--border-color);
    background: var(--component-bg);
    color: var(--text-primary);
}

.task-item {
    background: var(--task-item-bg);
}

.task-item:hover {
    background: var(--task-item-hover);
}
```

**Theme Toggle Button:**

The toggle button will be added to the greeting section for prominent visibility:

```html
<!-- Added to greeting section in index.html -->
<button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">
    <span class="theme-icon">🌙</span>
</button>
```

```css
.theme-toggle {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.theme-toggle:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
}

body.theme-dark .theme-toggle .theme-icon::before {
    content: '☀️';
}
```

### Name Personalization Implementation

**HTML Structure:**

```html
<!-- Enhanced greeting section -->
<section id="greeting-section" class="component">
    <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">
        <span class="theme-icon">🌙</span>
    </button>
    <div id="time-display" class="time-display"></div>
    <div id="date-display" class="date-display"></div>
    <div id="greeting-message" class="greeting-message"></div>
    <div class="name-input-container">
        <input 
            id="name-input" 
            type="text" 
            placeholder="Enter your name..." 
            class="name-input"
            maxlength="50"
        />
    </div>
</section>
```

**CSS Styling:**

```css
.name-input-container {
    margin-top: 16px;
}

.name-input {
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    padding: 10px 16px;
    color: white;
    font-size: 1rem;
    text-align: center;
    width: 100%;
    max-width: 300px;
    transition: all 0.3s ease;
}

.name-input::placeholder {
    color: rgba(255, 255, 255, 0.6);
}

.name-input:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
}
```

**JavaScript Logic:**

```javascript
// Enhanced updateGreeting function
function updateGreeting() {
    const now = new Date();
    const greetingDisplay = document.getElementById('greeting-message');
    if (greetingDisplay) {
        const hour = now.getHours();
        const baseGreeting = getGreeting(hour);
        const userName = getUserName();
        
        // Personalize greeting if name exists
        if (userName && userName.trim()) {
            greetingDisplay.textContent = `${baseGreeting}, ${userName}`;
        } else {
            greetingDisplay.textContent = baseGreeting;
        }
    }
}

// Name input handler with debouncing
let nameInputTimeout = null;
function handleNameInput(event) {
    const name = event.target.value.trim();
    
    // Clear existing timeout
    if (nameInputTimeout) {
        clearTimeout(nameInputTimeout);
    }
    
    // Debounce save operation (500ms)
    nameInputTimeout = setTimeout(() => {
        saveUserName(name);
        updateGreeting();
    }, 500);
}
```

### Timer Duration Configuration Implementation

**HTML Structure:**

```html
<!-- Enhanced timer section -->
<section id="timer-section" class="component">
    <h2>Focus Timer</h2>
    <div class="timer-duration-selector">
        <label for="duration-select">Duration:</label>
        <select id="duration-select" class="duration-select">
            <option value="25">25 minutes</option>
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
        </select>
    </div>
    <div id="timer-display" class="timer-display">25:00</div>
    <div id="timer-controls" class="timer-controls">
        <button id="timer-start" class="btn-timer">Start</button>
        <button id="timer-stop" class="btn-timer">Stop</button>
        <button id="timer-reset" class="btn-timer">Reset</button>
    </div>
</section>
```

**CSS Styling:**

```css
.timer-duration-selector {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 16px;
}

.timer-duration-selector label {
    font-weight: 600;
    color: var(--text-primary);
}

.duration-select {
    padding: 8px 16px;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    background: var(--component-bg);
    color: var(--text-primary);
    font-size: 1rem;
    cursor: pointer;
    transition: border-color 0.3s;
}

.duration-select:focus {
    outline: none;
    border-color: #667eea;
}
```

**JavaScript Logic:**

```javascript
// Timer state
let timerState = {
    selectedDuration: 25,  // minutes
    remainingTime: 25 * 60,  // seconds
    isRunning: false,
    intervalId: null
};

function setTimerDuration(duration) {
    timerState.selectedDuration = duration;
    timerState.remainingTime = duration * 60;
    updateTimerDisplay();
}

function handleDurationChange(event) {
    const duration = parseInt(event.target.value, 10);
    
    // Only allow change if timer is not running
    if (!timerState.isRunning) {
        setTimerDuration(duration);
        saveTimerDuration(duration);
    } else {
        // Revert selection if timer is running
        event.target.value = timerState.selectedDuration;
        alert('Stop the timer before changing duration');
    }
}

function updateTimerDisplay() {
    const minutes = Math.floor(timerState.remainingTime / 60);
    const seconds = timerState.remainingTime % 60;
    const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) {
        timerDisplay.textContent = display;
    }
}
```

### Local Storage Utilities

```javascript
// Storage availability check
function isStorageAvailable() {
    try {
        const test = '__storage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

// Safe getter
function getStorageItem(key) {
    if (!isStorageAvailable()) {
        console.warn('Local Storage not available');
        return null;
    }
    
    try {
        return localStorage.getItem(key);
    } catch (error) {
        console.error(`Error reading from Local Storage: ${error.message}`);
        return null;
    }
}

// Safe setter
function setStorageItem(key, value) {
    if (!isStorageAvailable()) {
        console.warn('Local Storage not available');
        return false;
    }
    
    try {
        localStorage.setItem(key, value);
        return true;
    } catch (error) {
        console.error(`Error writing to Local Storage: ${error.message}`);
        return false;
    }
}
```

### Initialization Sequence

```javascript
document.addEventListener('DOMContentLoaded', () => {
    console.log('Dashboard loaded');
    
    // Initialize theme first (affects visual rendering)
    initTheme();
    
    // Initialize greeting component with personalization
    initGreeting();
    
    // Initialize timer with duration preference
    initTimer();
    
    // Initialize other components (tasks, links)
    // ... existing initialization code
});
```


## Error Handling

### Local Storage Error Handling

**Availability Check:**
- Check Local Storage availability before any read/write operation
- Gracefully degrade if unavailable (use in-memory state only)
- Log warnings to console for debugging

**Quota Exceeded:**
- Catch `QuotaExceededError` when writing to storage
- Display user-friendly message if storage is full
- Continue operation with in-memory state

**Data Corruption:**
- Validate data format when reading from storage
- Use default values if stored data is invalid
- Clear corrupted keys and reinitialize with defaults

```javascript
function getStorageItem(key) {
    if (!isStorageAvailable()) {
        console.warn('Local Storage not available, using defaults');
        return null;
    }
    
    try {
        const value = localStorage.getItem(key);
        return value;
    } catch (error) {
        console.error(`Error reading ${key} from storage:`, error);
        return null;
    }
}

function setStorageItem(key, value) {
    if (!isStorageAvailable()) {
        console.warn('Local Storage not available, changes will not persist');
        return false;
    }
    
    try {
        localStorage.setItem(key, value);
        return true;
    } catch (error) {
        if (error.name === 'QuotaExceededError') {
            console.error('Local Storage quota exceeded');
            alert('Storage is full. Your preferences may not be saved.');
        } else {
            console.error(`Error writing ${key} to storage:`, error);
        }
        return false;
    }
}
```

### Theme Application Error Handling

**Missing DOM Elements:**
- Check for element existence before applying theme classes
- Log errors if critical elements are missing
- Continue with partial theme application

**Invalid Theme Values:**
- Validate theme values before application
- Fall back to default (light) theme if invalid
- Clear invalid storage values

```javascript
function applyTheme(theme) {
    // Validate theme value
    if (theme !== THEMES.LIGHT && theme !== THEMES.DARK) {
        console.warn(`Invalid theme: ${theme}, using default`);
        theme = THEMES.LIGHT;
    }
    
    const body = document.body;
    if (!body) {
        console.error('Cannot apply theme: body element not found');
        return;
    }
    
    // Apply theme class
    if (theme === THEMES.DARK) {
        body.classList.add('theme-dark');
    } else {
        body.classList.remove('theme-dark');
    }
}
```

### Name Input Error Handling

**Input Validation:**
- Trim whitespace from user input
- Treat empty strings as "no name"
- Limit input length (maxlength attribute)
- Sanitize input to prevent XSS (use textContent, not innerHTML)

**Display Errors:**
- Handle missing greeting display element gracefully
- Log errors but don't break other functionality

```javascript
function handleNameInput(event) {
    const input = event.target;
    if (!input) return;
    
    const name = input.value.trim();
    
    // Validate length
    if (name.length > 50) {
        input.value = name.substring(0, 50);
        return;
    }
    
    // Clear timeout for debouncing
    if (nameInputTimeout) {
        clearTimeout(nameInputTimeout);
    }
    
    // Debounce save
    nameInputTimeout = setTimeout(() => {
        if (name) {
            saveUserName(name);
        } else {
            // Clear name if empty
            setStorageItem(STORAGE_KEYS.USER_NAME, '');
        }
        updateGreeting();
    }, 500);
}
```

### Timer Duration Error Handling

**Invalid Duration Values:**
- Validate duration is one of allowed values (25, 30, 45)
- Fall back to default (25) if invalid
- Prevent duration change while timer is running

**State Consistency:**
- Ensure timer state remains consistent during errors
- Reset to safe state if corruption detected

```javascript
function handleDurationChange(event) {
    const select = event.target;
    if (!select) return;
    
    const duration = parseInt(select.value, 10);
    
    // Validate duration
    if (![25, 30, 45].includes(duration)) {
        console.error(`Invalid duration: ${duration}`);
        select.value = timerState.selectedDuration;
        return;
    }
    
    // Prevent change while running
    if (timerState.isRunning) {
        alert('Please stop the timer before changing duration');
        select.value = timerState.selectedDuration;
        return;
    }
    
    // Apply new duration
    setTimerDuration(duration);
    saveTimerDuration(duration);
}
```

### Graceful Degradation Strategy

If Local Storage is unavailable:
1. All features continue to work within the current session
2. User preferences are maintained in memory
3. Warning message displayed on first interaction
4. Preferences reset on page reload

If DOM elements are missing:
1. Log errors to console for debugging
2. Skip operations for missing elements
3. Continue initializing other components
4. Application remains partially functional


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Theme Toggle Alternation

*For any* current theme state (light or dark), activating the theme toggle should switch to the opposite theme state.

**Validates: Requirements 1.2**

### Property 2: Theme Persistence Round-Trip

*For any* valid theme value (light or dark), saving the theme preference to Local Storage, then reloading the dashboard, then checking the applied theme should result in the same theme being active.

**Validates: Requirements 2.1, 2.2, 2.3**

### Property 3: User Name Display Integration

*For any* non-empty user name string, when that name is set as the user name, the greeting message should contain that exact name.

**Validates: Requirements 3.3**

### Property 4: User Name Persistence Round-Trip

*For any* valid user name string, saving the name to Local Storage, then reloading the dashboard, then checking the displayed greeting should result in the greeting containing the same user name.

**Validates: Requirements 3.2, 3.4, 4.1, 4.2, 4.4**

### Property 5: Timer Duration Display Update

*For any* valid timer duration (25, 30, or 45 minutes), when that duration is selected, the timer display should show the correct time in MM:SS format corresponding to that duration.

**Validates: Requirements 5.2**

### Property 6: Timer Duration Persistence Round-Trip

*For any* valid timer duration (25, 30, or 45 minutes), saving the duration to Local Storage, then reloading the dashboard, then checking the timer display should result in the timer being initialized with that same duration.

**Validates: Requirements 5.4, 6.1, 6.2**

### Property 7: Timer Functionality Preservation

*For any* valid timer duration selection, after changing the duration, the timer's start, stop, and reset controls should continue to function correctly with the new duration.

**Validates: Requirements 5.3**

### Property 8: Timer Reset Restoration

*For any* selected timer duration, after starting and then resetting the timer, the timer display should show the full duration that was originally selected.

**Validates: Requirements 6.4**


## Testing Strategy

### Dual Testing Approach

This feature requires both unit tests and property-based tests to ensure comprehensive coverage:

**Unit Tests** focus on:
- Specific UI element existence (theme toggle button, name input, duration selector)
- Edge cases (empty name input, missing Local Storage, default values)
- Integration points (DOM manipulation, event handlers)
- Error conditions (invalid theme values, storage quota exceeded)

**Property-Based Tests** focus on:
- Universal behaviors across all valid inputs (theme persistence, name persistence, duration persistence)
- Round-trip properties (save/load cycles)
- State transitions (theme toggling, duration changes)
- Display rendering (greeting with names, timer display formats)

Together, these approaches provide comprehensive validation: unit tests catch specific bugs and edge cases, while property tests verify general correctness across the input space.

### Property-Based Testing Configuration

**Testing Library:** We will use a property-based testing library appropriate for JavaScript:
- **fast-check** (recommended for browser-based JavaScript)
- Provides generators for strings, numbers, and custom types
- Supports async testing for DOM operations
- Integrates with standard test runners (Jest, Mocha)

**Test Configuration:**
- Each property test must run a minimum of 100 iterations
- Use appropriate generators for each data type:
  - Theme: `fc.constantFrom('light', 'dark')`
  - User name: `fc.string({ minLength: 1, maxLength: 50 })`
  - Timer duration: `fc.constantFrom(25, 30, 45)`
- Each test must include a comment tag referencing the design property

**Tag Format:**
```javascript
// Feature: dashboard-theme-and-personalization, Property 1: Theme Toggle Alternation
test('theme toggle alternates between light and dark', () => {
    fc.assert(
        fc.property(fc.constantFrom('light', 'dark'), (initialTheme) => {
            // Test implementation
        }),
        { numRuns: 100 }
    );
});
```

### Unit Test Coverage

**Theme Module Tests:**
- Theme toggle button exists in DOM
- Light mode applies correct CSS class (or no class)
- Dark mode applies 'theme-dark' CSS class
- Default theme is light when no preference exists (edge case)
- Invalid theme values fall back to light mode (error condition)
- Local Storage unavailable: theme changes work in-memory (error condition)

**Name Personalization Tests:**
- Name input field exists in DOM
- Empty name input displays default greeting (edge case)
- Whitespace-only names are treated as empty (edge case)
- Name input is trimmed before storage
- Greeting updates after debounce period
- XSS prevention: HTML in name is escaped

**Timer Duration Tests:**
- Duration selector exists with all three options (25, 30, 45)
- Default duration is 25 minutes when no preference exists (edge case)
- Duration cannot be changed while timer is running (error condition)
- Invalid duration values are rejected (error condition)
- Timer display format is always MM:SS

### Property-Based Test Specifications

**Property 1: Theme Toggle Alternation**
```javascript
// Feature: dashboard-theme-and-personalization, Property 1: Theme Toggle Alternation
// Generator: fc.constantFrom('light', 'dark')
// Test: Apply theme, toggle, verify opposite theme is active
// Iterations: 100
```

**Property 2: Theme Persistence Round-Trip**
```javascript
// Feature: dashboard-theme-and-personalization, Property 2: Theme Persistence Round-Trip
// Generator: fc.constantFrom('light', 'dark')
// Test: Save theme, simulate reload, verify same theme applied
// Iterations: 100
```

**Property 3: User Name Display Integration**
```javascript
// Feature: dashboard-theme-and-personalization, Property 3: User Name Display Integration
// Generator: fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0)
// Test: Set name, verify greeting contains exact name
// Iterations: 100
```

**Property 4: User Name Persistence Round-Trip**
```javascript
// Feature: dashboard-theme-and-personalization, Property 4: User Name Persistence Round-Trip
// Generator: fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0)
// Test: Save name, simulate reload, verify greeting contains same name
// Iterations: 100
```

**Property 5: Timer Duration Display Update**
```javascript
// Feature: dashboard-theme-and-personalization, Property 5: Timer Duration Display Update
// Generator: fc.constantFrom(25, 30, 45)
// Test: Select duration, verify display shows correct MM:SS format
// Iterations: 100
```

**Property 6: Timer Duration Persistence Round-Trip**
```javascript
// Feature: dashboard-theme-and-personalization, Property 6: Timer Duration Persistence Round-Trip
// Generator: fc.constantFrom(25, 30, 45)
// Test: Save duration, simulate reload, verify timer initialized with same duration
// Iterations: 100
```

**Property 7: Timer Functionality Preservation**
```javascript
// Feature: dashboard-theme-and-personalization, Property 7: Timer Functionality Preservation
// Generator: fc.constantFrom(25, 30, 45)
// Test: Change duration, verify start/stop/reset all work correctly
// Iterations: 100
```

**Property 8: Timer Reset Restoration**
```javascript
// Feature: dashboard-theme-and-personalization, Property 8: Timer Reset Restoration
// Generator: fc.constantFrom(25, 30, 45)
// Test: Select duration, start timer, reset, verify display shows full duration
// Iterations: 100
```

### Test Environment Setup

**DOM Mocking:**
- Use jsdom or similar for Node.js test environments
- Create minimal HTML structure matching index.html
- Mock Local Storage API for controlled testing

**Test Utilities:**
```javascript
// Helper to simulate page reload
function simulateReload() {
    // Clear in-memory state
    // Re-run initialization functions
    // Load from Local Storage
}

// Helper to clear Local Storage
function clearStorage() {
    localStorage.clear();
}

// Helper to set up DOM elements
function setupDOM() {
    document.body.innerHTML = `
        <div id="greeting-message"></div>
        <input id="name-input" />
        <button id="theme-toggle"></button>
        <select id="duration-select"></select>
        <div id="timer-display"></div>
    `;
}
```

### Integration Testing

While property-based tests validate individual features, integration tests should verify:
- All three features work together without conflicts
- Multiple preference changes in sequence persist correctly
- Theme changes don't affect name or timer preferences
- Page reload restores all three preferences simultaneously

### Manual Testing Checklist

- Visual verification of theme colors in both modes
- Greeting readability with various name lengths
- Timer display clarity with all three durations
- Smooth transitions between theme modes
- Responsive behavior on mobile devices
- Browser compatibility (Chrome, Firefox, Safari, Edge)

