const { src, dest } = require('gulp');

function buildTask() {
    return src([
        'package.json',
        'README.md',
        'LICENSE'
    ]).pipe(dest('core'));
}

exports.build = buildTask;
