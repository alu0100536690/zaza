/*
* Dependencias
*/
var gulp = require('gulp');
var shell = require('gulp-shell');
var install = require('gulp-install');
var path = require('path');
var json = require(path.join(__dirname,'package.json'));
var git = require('simple-git');
var fs = require('fs-extra');
//var hero = require("gitbook-start-heroku-merquililycony");

gulp.task('push', function(){

    if (!fs.existsSync(path.join(__dirname, '.git'))){
      git()
        .init()
        .add('./*')
        .commit("first commit")
        .addRemote('origin', json.repository.url)
        .push('origin', 'master');
    }
    else
    {
       git()
        .add('./*')
        .commit("Actualizando Gitbook.")
        .push('origin', 'master');
    }
});

///gulp.task('instalar_recursos',['instalar_dependencias','instalar_plugins']);

gulp.task('instalar_dependencias', function()
{
    gulp.src(['./package.json']).pipe(install())
});

gulp.task('instalar_plugins', function()
{
    return gulp.src('').pipe(shell([
        'gitbook install'
    ]))
});
gulp.task('deploy', function () {
  return gulp.src('').pipe(shell(["./scripts/losh deploy-gitbook"]))
      .pipe(shell(['./scripts/losh generate-gitbook']))
      .pipe(shell(['./scripts/losh generate-wiki']))
      .pipe(shell(['./scripts/losh deploy-gitbook']))
     // .pipe(shell(['./scripts/losh deploy-wiki']));
});

gulp.task('default', ['deploy']);


//generar pdf
gulp.task('pdf',shell.task("gitbook pdf ./txt",{ verbose: true }));



gulp.task('build', function() {
  return gulp.src('').pipe(shell(['./scripts/losh generate-gitbook']));
});


gulp.task('deploy-ull-iaas-es',function(){
    var iaas = require ("gitbook-start-iaas-ull-es-merquililycony");
    iaas.deploy();
});

gulp.task('crear-repo', function() {

  var hero = require("gitbook-start-heroku-merquililycony");
});

gulp.task('deploy-heroku', function(){
   return gulp.src('').pipe(shell([
       'git add . ;'+
       'git commit -am "Desplegando en Heroku" ;'+
       'git push heroku master'
       ]))
});
