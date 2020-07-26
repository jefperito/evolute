class PluginA {
    constructor() {
        this.callPreSampleFeature = false;
        this.callPosSampleFeature = false;
    }

    load() {
        console.log('loading configuracoes PluginA');
    }

    handle(event, data) {
        if (event == 'PRE_SAMPLE_FEATURE') {
            this.callPreSampleFeature = true;
        }
        if (event == 'POS_SAMPLE_FEATURE') {
            this.callPosSampleFeature = true;
        }
    }

    events() {
        return [
            'PRE_SAMPLE_FEATURE',
            'POS_SAMPLE_FEATURE'
        ]
    }

    ableToResponse(invokedEvent) {
        return this.events().some(event => event.localeCompare(invokedEvent));
    }
}
module.exports = PluginA;