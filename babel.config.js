module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      ['module-resolver', {
        alias: {
          '@': './src',  // Adjust the alias to match your project structure
        },
      }],
    ],
  };
};
