var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var rimraf = require('rimraf');
var package = require('../package.json');

var script_directory = __dirname;
// パッケージ名が @ で始まる場合はスコープ有りと見なす
var has_scope = /^@/.test(package.name);

if ('projects' != path.basename(path.resolve(script_directory, (has_scope ? '../' : '') + '../../'))) {
  // 開発インストールの場合無視する
  return;
}

// スクリプトの存在するディレクトリから見たパス
var destination = path.resolve(script_directory, (has_scope ? '../' : '') + '../../../Assets/Projects/' + package.name);

// 配置先ディレクトリを全削除
fs.access(
  destination,
  function(err) {
    if (err && err.code == 'ENOENT') {
      return;
    }
    rimraf(
      destination,
      function(_) {
        // Do nothing.
      }
    );
  }
);
