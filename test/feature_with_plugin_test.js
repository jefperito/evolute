const assert = require("assert");
const SampleFeature = require('./sample_feature');
const FeatureHandler = require('../src/feature_handler');

describe("Feature", () => {
  describe("with 1 plugin", () => {
    it("should invoke a plugin when it executes a feature", () => {
      const featureHandler = new FeatureHandler(__dirname + '/plugins/');
      featureHandler.addFeature(new SampleFeature());

      const sampleFeature = featureHandler.get('SAMPLE_FEATURE');
      sampleFeature.save({'name': 'Test'});

      assert.equal(featureHandler.pluginHandler.plugins.length, 1);
      assert.equal(featureHandler.pluginHandler.plugins[0].callPreSampleFeature, true);
    });
  });
});
