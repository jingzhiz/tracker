import path from 'path'
import ts from 'rollup-plugin-typescript2'
import dts from 'rollup-plugin-dts'

export default [
  {
    input:'src/core/index.ts',
    output: [
      {
        file: 'dist/index.esm.js',
        format: 'es'
      },
      {
        file: 'dist/index.cjs',
        format: 'cjs'
      },
      {
        input:'./src/core/index.ts',
        file: path.resolve(__dirname, 'dist/index.js'),
        format: 'umd',
        name: 'tracker'
      }
    ],
    plugins: [
      ts({
        tsconfig: path.resolve(__dirname, 'tsconfig.json'),
        useTsconfigDeclarationDir: true
      })
    ]
  }, 
  {
    input:'src/core/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es'
    },
    plugins: [
      dts()
    ]
  }
]