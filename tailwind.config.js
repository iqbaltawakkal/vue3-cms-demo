module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1920px'
    },
    extend: {
      fontSize: {
        xxs: '.625rem'
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'system-ui']
      },
      colors: {
        gray: {
          light: '#FAFAFA',
          border: '#E4E7EC',
          body: '#878E9B',
          'body-dark': '#99A2B0'
        },
        blue: {
          primary: '#1C56EB',
          light: '#F3F7FF'
        }
      }
    }
  },
  plugins: [require('daisyui'), require('@tailwindcss/line-clamp')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#1C56EB',
          secondary: '#F000B8',
          accent: '#37CDBE',
          neutral: '#3D4451',
          'base-100': '#FFFFFF',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272'
        }
      }
    ]
  }
}
