const { src, dest } = require('gulp');

function buildTask() {
    return src(['dist/**/*']).pipe(dest('node_modules/@hardjs/core'));
}

exports.build = buildTask;
