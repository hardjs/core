const { src, dest } = require('gulp');

function buildTask() {
    return src([
        'core/**/*',
        'package.json',
        'README.md',
        'LICENSE'
    ]).pipe(dest('node_modules/@hardjs'));
}

exports.build = buildTask;
