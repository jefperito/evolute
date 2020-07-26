const PluginHandler = require('./plugin_handler')

class FeatureHandler {
  constructor(pluginPath, features = {}) {
    this.features = features;
    this.pluginHandler = new PluginHandler();
    this.pluginHandler.loadPlugins(pluginPath);
  }

  addFeature(feature) {
      this.features[feature.name()] = feature;
  }

  get(featureName) {
    const feature = this.__getFeatureByName(featureName);
    const self = this;

    return new Proxy(feature, {
      get(target, key, receiver) {
        return function () {
          self.pluginHandler.invoke("PRE_" + target.name(), ...arguments);
          const result = Reflect.get(target, key, receiver).apply(target, arguments);
          self.pluginHandler.invoke("POS_" + target.name(), result);

          return result;
        };
      },
    });
  }

  __getFeatureByName(featureName) {
      return this.features[featureName];
  }
}

module.exports = FeatureHandler;
