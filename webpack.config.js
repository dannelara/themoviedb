import path, { resolve } from "path";

module.exports = {
  resolve: {
    extensions: [".js", ".ts"],
    alias: {
      components: path.resolve(__dirname, "components"),
      utils: path.resolve(__dirname, "components/utilsComponents"),
    },
  },
};
