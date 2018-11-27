/* eslint-disable */
const chokidar = require('chokidar');
const EventEmitter = require('events');
/* eslint-enable */
class DirWatcher extends EventEmitter {
    watch(path, delay) {
        const watcher = chokidar.watch(path, {
            usePolling: true,
            interval: delay
        });
        watcher.on('all', () => {
            this.emit('dirwatcher:changed', path);
        });
    }
}
exports.DirWatcher = DirWatcher; 