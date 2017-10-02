var mkdirp = require('mkdirp');
var path = require('path');
var package = require('../package.json');
var ncp = require('ncp').ncp;

var script_directory = __dirname;

if ('projects' != path.basename(path.resolve(script_directory, '../../'))) {
  // 開発インストールの場合無視する
  return;
}

// スクリプトの存在するディレクトリから見たパス
var source = path.resolve(script_directory, '../Assets');
var destination = path.resolve(script_directory, '../../../Assets/Projects/' + package.name);

// 宛先ディレクトリを作る (mkdir -p)
mkdirp(destination, function(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  ncp(
    source,
    destination,
    function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    }
  );
});
