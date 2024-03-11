import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import autoprefixer from 'autoprefixer';
import env from 'postcss-preset-env';
import copy from 'rollup-plugin-copy';
import dts from 'rollup-plugin-dts';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import svg from 'rollup-plugin-svg';

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'dist/cjs/index.js',
                format: 'cjs',
                name: 'phoqer',
                sourcemap: true,
            },
            {
                file: 'dist/esm/index.js',
                format: 'esm',
                sourcemap: true,
            },
        ],
        external: ['react'],
        plugins: [
            external(),
            json(),
            svg(),
            postcss({
                minimize: true,
                modules: {
                    generateScopedName: '[hash:base64:6]',
                },
                autoModules: true,
                plugins: [env(), autoprefixer()],
            }),
            typescript({
                exclude: [/\.test.*$/, /\.stories.*$/],
                tsconfig: 'tsconfig.json',
            }),
            commonjs(),
            resolve(),
            terser(),
        ],
    },
    {
        input: 'dist/esm/index.d.ts',
        output: {
            file: 'dist/index.d.ts',
            format: 'esm',
        },
        plugins: [
            dts(),
            copy({
                targets: [
                    {
                        src: 'src/styles',
                        dest: 'dist',
                        rename: 'styles',
                    },
                ],
            }),
        ],
    },
];
