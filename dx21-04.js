const {
  check,
  defaultConditions,
  filterWithExtensions,
  createKeywordsCondition,
} = require("./lib");

const conditions = [
  ...defaultConditions,
  createKeywordsCondition(["WinMain", "CreateWindowEx", "WndProc"]),
  (filePaths) => {
    const cpps = filterWithExtensions(filePaths, [".cpp"]);
    if (!cpps.some((cpp) => cpp.endsWith("direct3d.cpp")))
      return "direct3d.cppが存在しない。";
    return null;
  },
  (filePaths) => {
    const imagePaths = filterWithExtensions(filePaths, [".png", ".jpg"]);
    if (
      !imagePaths.length ||
      (imagePaths.length === 1 && imagePaths[0] === "dora01.png")
    )
      return "画像ファイルがおかしい。";
    return null;
  },
];

check(conditions);
