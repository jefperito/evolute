const fs = require("fs");

class PluginHandler {
  
  constructor() {
    this.plugins = [];
  }

  invoke(event, data) {
      this.plugins.forEach(plugin => {
          if (plugin.ableToResponse(event)) {
              plugin.handle(event, data);
          }
      });
  }

  isClass(value) {
    return typeof value === "function" && /^\s*class\s+/.test(value.toString());
  }

  loadPlugins(pluginsPath) {
    const status = fs.lstatSync(pluginsPath);
    if (!status.isDirectory()) {
      throw new Error("plugins nao eh um diretorio!");
    }
    const files = fs.readdirSync(pluginsPath);
    this.plugins = files.map((file) => {
      const plugin = require(pluginsPath + file);
      if (!this.isClass(plugin)) {
        throw new Error("Plugin nao é uma classe");
      }
      const pluginInstance = new plugin();
      if (!pluginInstance.load) {
        throw new Error("Plugin " + pluginInstance.constructor.name + " nao possui a funcao load");
      }

      return new Proxy(pluginInstance, {
        get(target, key, receiver) {
          if (key != 'handle' && key != 'ableToResponse') {
            return target[key];
          }
          return function () {
            return target[key].apply(target, arguments);
          }
        },
      });
    });
  }
}

module.exports = PluginHandler;
