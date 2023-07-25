module.exports = {
  moduleFileExtensions: ["ts", "tsx"],
  moduleDirectories: ["node_modules"],

  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "./__mocks__/fileMock.ts",
    "\\.(css|less)$": "./__mocks__/styleMock.ts",
  },
};
