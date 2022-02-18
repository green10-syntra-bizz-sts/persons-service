// features/support/config.js
const { configure, ArtifactArchiver } = require('@serenity-js/core');
const { SerenityBDDReporter } = require('@serenity-js/serenity-bdd');

configure({
    crew: [
        new SerenityBDDReporter(),
        ArtifactArchiver.storingArtifactsAt('./target/site/serenity'),    ],
});