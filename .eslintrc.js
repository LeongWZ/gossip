module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    settings: {
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"]
        },
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"],
                moduleDirectory: ["node_modules", "app/frontend"],
            },
            typescript: {
                alwaysTryTypes: true,
                project: "app/frontend",
            },
        },
        react: {
            version: "detect",
        },
    },
    extends: [
        "react-app",
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "plugin:import/recommended",
    ],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 11,
        sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint", "import"],
    rules: {
        "no-unused-var": "off",
        "no-var": "error",
        curly: ["error", "multi-line"],
        "import/order": [
            "error",
            { groups: ["index", "sibling", "parent", "internal", "external", "builtin", "object", "type"] },
        ],
        "prettier/prettier": [
            "error", {
                "endOfLine": "auto"
            }
        ],
        "import/no-unresolved": "error",
    },
    overrides: [
        {
            files: ["**/*.tsx"],
            rules: {
                "react/prop-types": "off",
            },
        },
    ],
};