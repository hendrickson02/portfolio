const autoprefixer = require('autoprefixer')
const htmlStandards = require('spike-html-standards')
const cssStandards = require('spike-css-standards')
const jsStandards = require('spike-js-standards')
const pageId = require('spike-page-id')
const env = process.env.SPIKE_ENV

module.exports = {
  devtool: 'source-map',
  matchers: { html: '*(**/)*.html', css: '*(**/)*.scss' },
  ignore: ['**/layout.html', '**/_*', '**/.*', 'readme.md', 'yarn.lock', 'package-lock.json'],
  module: {
    rules: [
		{ test: /\.scss/, use: [{ loader: 'sass-loader' }] }
	]
  },
  reshape: htmlStandards({
    parser: false,
    locals: (ctx) => { return { pageId: pageId(ctx), foo: 'bar' } },
    minify: env === 'production'
  }),
  postcss: { plugins: [autoprefixer()] },
  babel: jsStandards()
}