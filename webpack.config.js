import path, { resolve } from "path";

module.exports = {
  resolve: {
    extensions: [".js", ".ts"],
    alias: {
      //   "@interfaces": path.resolve(__dirname, "src/interfaces"),
      components: path.resolve(__dirname, "src/components"),
      utils: path.resolve(__dirname, "src/utils"),

      "@": resolve("/src"),
    },
  },
};
