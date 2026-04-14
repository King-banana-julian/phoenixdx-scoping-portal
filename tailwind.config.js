/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'swiss-bg-primary': '#FFFFFF',
        'swiss-bg-secondary': '#F7F6F3',
        'swiss-bg-tertiary': '#EDECEA',
        'swiss-bg-info': '#E6F1FB',
        'swiss-bg-success': '#E1F5EE',
        'swiss-bg-warning': '#FAEEDA',
        'swiss-bg-danger': '#FCEBEB',
        
        'swiss-text-primary': '#0A0A0A',
        'swiss-text-secondary': '#5F5E5A',
        'swiss-text-tertiary': '#888780',
        'swiss-text-info': '#0C447C',
        'swiss-text-success': '#085041',
        'swiss-text-warning': '#633806',
        'swiss-text-danger': '#791F1F',
        
        'swiss-border-subtle': '#EDECEA',
        'swiss-border-default': '#D3D1C7',
        'swiss-border-strong': '#888780',
        'swiss-border-accent': '#185FA5',
        'swiss-border-danger': '#A32D2D',
        'swiss-border-warning': '#854F0B',
        'swiss-border-success': '#0F6E56',
        
        'swiss-interactive-primary': '#185FA5',
        'swiss-interactive-primary-hover': '#0C447C',
        'swiss-interactive-primary-inactive': '#E6F1FB',
        'swiss-interactive-secondary': '#F7F6F3',
        'swiss-interactive-secondary-hover': '#EDECEA',
        'swiss-interactive-destructive': '#A32D2D',
      },
      spacing: {
        '0': '0',
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
      },
      borderRadius: {
        'none': '0',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        'full': '999px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['10px', '1.5'],
        'sm': ['13px', '1.5'],
        'base': ['16px', '1.5'],
        'lg': ['20px', '1.5'],
        'xl': ['25px', '1.2'],
        '2xl': ['31px', '1.2'],
        '3xl': ['39px', '1.2'],
      }
    }
  },
  plugins: [],
}