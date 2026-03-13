# Implementation Plan: Dashboard Theme and Personalization

## Overview

This implementation plan adds theme customization and personalization features to the existing To-Do List Life Dashboard. The implementation extends the vanilla JavaScript application with three key features: light/dark mode toggle, name personalization in greetings, and configurable Pomodoro timer durations. All user preferences persist across sessions using Local Storage.

## Tasks

- [x] 1. Set up Local Storage utilities and constants
  - Create storage key constants (STORAGE_KEYS object)
  - Implement isStorageAvailable() function to check Local Storage availability
  - Implement getStorageItem(key) with error handling
  - Implement setStorageItem(key, value) with quota exceeded handling
  - Add storage utilities to js/dashboard.js
  - _Requirements: 2.1, 3.4, 5.4, 7.1, 7.3_

- [ ] 2. Implement theme toggle system
  - [x] 2.1 Add theme toggle button to HTML
    - Add theme toggle button with icon to greeting section in index.html
    - Position button in top-right corner with absolute positioning
    - Include aria-label for accessibility
    - _Requirements: 1.1, 7.4_

  - [x] 2.2 Implement theme CSS variables and classes
    - Define CSS custom properties for light theme in :root
    - Define dark theme overrides in body.theme-dark selector
    - Apply variables to all dashboard components (background, text, borders, shadows)
    - Style theme toggle button with hover effects
    - Add icon switching logic for sun/moon emoji
    - Add to css/styles.css
    - _Requirements: 1.3, 1.4, 1.5, 7.2, 7.3_

  - [x] 2.3 Implement theme JavaScript logic
    - Create THEMES constant object (LIGHT, DARK)
    - Implement getCurrentTheme() to read theme from DOM
    - Implement applyTheme(theme) to add/remove CSS classes
    - Implement toggleTheme() to switch between themes
    - Implement saveThemePreference(theme) using storage utilities
    - Implement loadThemePreference() to restore saved theme
    - Implement initTheme() to initialize on page load
    - Add theme toggle event listener
    - Add to js/dashboard.js
    - _Requirements: 1.2, 2.1, 2.2, 2.3, 2.4, 7.1, 7.3, 7.5_

  - [ ]* 2.4 Write property test for theme toggle alternation
    - **Property 1: Theme Toggle Alternation**
    - **Validates: Requirements 1.2**

  - [ ]* 2.5 Write property test for theme persistence round-trip
    - **Property 2: Theme Persistence Round-Trip**
    - **Validates: Requirements 2.1, 2.2, 2.3**

- [-] 3. Checkpoint - Verify theme system works
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Implement name personalization
  - [~] 4.1 Add name input field to HTML
    - Add name input container to greeting section in index.html
    - Create input field with placeholder "Enter your name..."
    - Set maxlength attribute to 50 characters
    - Style input with semi-transparent background
    - Add to index.html
    - _Requirements: 3.1, 7.4_

  - [~] 4.2 Style name input field
    - Create .name-input-container and .name-input CSS classes
    - Style input with rounded borders and transitions
    - Add focus state styling
    - Style placeholder text with transparency
    - Add to css/styles.css
    - _Requirements: 3.1, 7.2, 7.3_

  - [~] 4.3 Implement name personalization JavaScript logic
    - Implement getUserName() to retrieve name from storage
    - Implement saveUserName(name) to persist name
    - Enhance updateGreeting() to include user name in greeting
    - Implement handleNameInput(event) with debouncing (500ms)
    - Add name input event listener
    - Update initGreeting() to load persisted name
    - Add to js/dashboard.js
    - _Requirements: 3.2, 3.3, 3.4, 4.1, 4.2, 4.3, 7.1, 7.3, 7.5_

  - [ ]* 4.4 Write property test for user name display integration
    - **Property 3: User Name Display Integration**
    - **Validates: Requirements 3.3**

  - [ ]* 4.5 Write property test for user name persistence round-trip
    - **Property 4: User Name Persistence Round-Trip**
    - **Validates: Requirements 3.2, 3.4, 4.1, 4.2, 4.4**

- [~] 5. Checkpoint - Verify name personalization works
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Implement timer duration configuration
  - [~] 6.1 Add duration selector to HTML
    - Add duration selector container to timer section in index.html
    - Create select element with label "Duration:"
    - Add three option elements (25, 30, 45 minutes)
    - Add to index.html
    - _Requirements: 5.1, 7.4_

  - [~] 6.2 Style duration selector
    - Create .timer-duration-selector CSS class with flexbox layout
    - Style label with font weight
    - Style .duration-select with borders and transitions
    - Add focus state styling
    - Ensure selector uses theme CSS variables
    - Add to css/styles.css
    - _Requirements: 5.1, 7.2, 7.3_

  - [~] 6.3 Implement timer duration JavaScript logic
    - Create TIMER_DURATIONS constant object (SHORT: 25, MEDIUM: 30, LONG: 45)
    - Create timerState object to track duration, remaining time, running state
    - Implement getTimerDuration() to retrieve duration from storage
    - Implement saveTimerDuration(duration) to persist duration
    - Implement setTimerDuration(duration) to update timer state and display
    - Implement handleDurationChange(event) with validation
    - Prevent duration change while timer is running
    - Update updateTimerDisplay() to format MM:SS correctly
    - Update initTimer() to load persisted duration
    - Add duration selector event listener
    - Add to js/dashboard.js
    - _Requirements: 5.2, 5.3, 5.4, 6.1, 6.2, 6.3, 6.4, 7.1, 7.3, 7.5_

  - [ ]* 6.4 Write property test for timer duration display update
    - **Property 5: Timer Duration Display Update**
    - **Validates: Requirements 5.2**

  - [ ]* 6.5 Write property test for timer duration persistence round-trip
    - **Property 6: Timer Duration Persistence Round-Trip**
    - **Validates: Requirements 5.4, 6.1, 6.2**

  - [ ]* 6.6 Write property test for timer functionality preservation
    - **Property 7: Timer Functionality Preservation**
    - **Validates: Requirements 5.3**

  - [ ]* 6.7 Write property test for timer reset restoration
    - **Property 8: Timer Reset Restoration**
    - **Validates: Requirements 6.4**

- [~] 7. Checkpoint - Verify timer configuration works
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Integrate all features and update initialization
  - [~] 8.1 Update DOMContentLoaded event handler
    - Call initTheme() first (affects visual rendering)
    - Call initGreeting() with name loading
    - Call initTimer() with duration loading
    - Ensure proper initialization order
    - Update in js/dashboard.js
    - _Requirements: 2.2, 4.1, 6.1, 7.1, 7.3_

  - [~] 8.2 Add error handling for all storage operations
    - Add try-catch blocks in all storage utility functions
    - Log warnings when Local Storage is unavailable
    - Handle QuotaExceededError with user-friendly messages
    - Validate data format when reading from storage
    - Use default values for invalid stored data
    - Add to js/dashboard.js
    - _Requirements: 2.4, 4.3, 6.3, 7.5_

  - [~] 8.3 Add input validation and sanitization
    - Trim whitespace from name input
    - Treat empty strings as "no name"
    - Validate timer duration is one of allowed values (25, 30, 45)
    - Ensure XSS prevention by using textContent (not innerHTML)
    - Add to js/dashboard.js
    - _Requirements: 3.2, 3.3, 5.2, 7.5_

  - [ ]* 8.4 Write unit tests for edge cases
    - Test empty name input displays default greeting
    - Test whitespace-only names are treated as empty
    - Test default theme is light when no preference exists
    - Test default timer duration is 25 when no preference exists
    - Test duration cannot be changed while timer is running
    - Test invalid theme/duration values fall back to defaults
    - Test Local Storage unavailable: features work in-memory

- [~] 9. Final checkpoint - Comprehensive testing
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at logical breaks
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- All JavaScript code goes in js/dashboard.js (Requirement 7.1)
- All CSS code goes in css/styles.css (Requirement 7.2)
- Implementation uses vanilla JavaScript only (Requirement 7.3)
- Code comments should be added for important sections (Requirement 7.5)
