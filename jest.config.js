module.exports = {

    // Customizes where Jest stores snapshot files
    snapshotResolver: "<rootDir>/internals/jestSnapshotResolver.js",

    // Automatically clear mock calls, instances and results before every test
    clearMocks: true,

    // Indicates whether the coverage information should be collected while executing
    // the test
    collectCoverage: true,

    // The directory where Jest should output its coverage files
    coverageDirectory: "coverage",

    // A map from regular expressions to module names or to arrays of module names
    // that allow to stub out resources with a single module
    moduleNameMapper: {
        "\\.css$": "<rootDir>/internals/stubObjectModule.js",
    },

    // A map from regular expressions to paths to transformers
    transform: {
        "^.+\\.(ts|tsx)?$": "ts-jest",
    }

};
