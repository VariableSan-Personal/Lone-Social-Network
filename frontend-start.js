/* const cmd = require('node-cmd')
cmd.run('npm run frontend') */

const exec = require('child_process').exec
exec('npm run frontend', { windowsHide: true })
