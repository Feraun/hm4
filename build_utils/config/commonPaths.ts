import path from "path";

const PROJECT_ROOT = path.resolve(__dirname, "../../");

const commonPaths = {
  projectRootPath: PROJECT_ROOT,
  entryPath: path.join(PROJECT_ROOT, "src", "index.tsx"),
  outputPath: path.join(PROJECT_ROOT, "dist"),
};

export default commonPaths;