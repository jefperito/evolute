const mockfs = require("mock-fs");
const assert = require("assert");
var expect = require("chai").expect;
const PluginHandler = require("./../src/plugin_handler");

describe("Plugin", () => {
  describe("Load plugin", () => {
    it("should throws a exception if plugin path is not a directory", () => {
      mockfs({
        "fake/directory": {
          "test.txt": "whatever",
        },
      });

      expect(() => new PluginHandler().loadPlugins("fake/directory/test.txt")).to.throw("plugins nao eh um diretorio!");

      mockfs.restore(); 
    });

    it('should throws a exception if plugin is not a class', () => {
      expect(() => new PluginHandler().loadPlugins(__dirname + '/abc/')).to.throw("Plugin nao é uma classe");
    });

    it('should throws a exception if plugin do not have load function', () => {
      expect(() => new PluginHandler().loadPlugins(__dirname + '/def/')).to.throw("Plugin PluginWithoutLoadFunction nao possui a funcao load");
    });

    it('should load a plugin', () => {
      const pluginHandler = new PluginHandler();
      pluginHandler.loadPlugins(__dirname + '/plugins/');

      assert.equal(pluginHandler.plugins.length, 1);
      assert.equal(pluginHandler.plugins[0].constructor.name, 'PluginA');
    });
  });
});
