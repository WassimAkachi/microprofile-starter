module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": ["eslint:recommended", "standard-with-typescript", "plugin:@typescript-eslint/recommended"],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "@typescript-eslint/no-unused-vars": "error",
        // to enforce using type for object type definitions, can be type or interface
        "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    },
    "plugins": [
        "@typescript-eslint"
    ]
}
