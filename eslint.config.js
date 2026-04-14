import { defaultConfig } from '@feathers-community/eslint-config'

export default [
  ...defaultConfig(),
  {
    files: ['test/**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.lint.json',
      },
    },
  },
]
