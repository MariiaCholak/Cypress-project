import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    rules: {
      indent: ['error', 2],
      'no-unused-vars': 'error',
      'no-undef': 'off',
      semi:['error', 'never'],
      quotes: ['error', 'single'],
      'max-len': [ 
        'error',
        { code: 120, ignoreComments: true, ignoreStrings: true }
      ]
    },
  },
])