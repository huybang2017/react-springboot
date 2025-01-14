const currentTheme = () => {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  if (
    localStorage.theme === 'light' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: light)').matches)
  ) {
    document.documentElement.classList.add('light')
  } else {
    document.documentElement.classList.remove('light')
  }

  // Whenever the user explicitly chooses light mode
  if (localStorage.theme === 'light') {
    localStorage.theme = 'dark'
  } else {
    localStorage.theme = 'light'
  }

  // Whenever the user explicitly chooses to respect the OS preference
  localStorage.removeItem('color-theme')
}

const ToggleThemeButton = () => {
  const handleClick = () => {
    currentTheme()
  }

  return (
    <button
      className="hover:text-primary-700 mr-4 flex size-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-500"
      onClick={handleClick}
    >
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 20 20"
        aria-hidden="true"
        className="size-4"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  )
}

export default ToggleThemeButton
