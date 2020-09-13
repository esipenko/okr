module.exports = {
    extends: ["../../.eslintrc.js"],
    overrides: [
        {
            files: ["shims-tsx.d.ts"],
            rules: {
                "@typescript-eslint/no-empty-interface": "off",
                "@typescript-eslint/no-explicit-any": "off",
                "@typescript-eslint/no-unused-vars": "off",
            },
        },
    ],
};
