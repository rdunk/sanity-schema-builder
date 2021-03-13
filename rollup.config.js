import ts from 'rollup-plugin-typescript2';

const pkg = require('./package.json');

const createConfig = (file, format, plugins = []) => ({
  input: 'src/index.ts',
  output: { file, format },
  external: Object.keys(pkg.dependencies),
  plugins: [
    ts({
      tsconfig: 'tsconfig.json',
    }),
    ...plugins,
  ],
});

export default [createConfig(pkg.module, 'es'), createConfig(pkg.main, 'cjs')];
