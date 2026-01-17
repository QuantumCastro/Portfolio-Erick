const path = require("node:path");
const fs = require("node:fs/promises");

if (process.platform === "win32") {
  const originalSymlink = fs.symlink.bind(fs);

  fs.symlink = async (target, linkPath, type) => {
    const linkType = type === "dir" ? "junction" : type;
    try {
      return await originalSymlink(target, linkPath, linkType);
    } catch (error) {
      if (type === "dir" && error && (error.code === "EPERM" || error.code === "EINVAL")) {
        const resolvedTarget = path.resolve(path.dirname(linkPath), target);
        await fs.cp(resolvedTarget, linkPath, { recursive: true });
        return;
      }
      throw error;
    }
  };
}
