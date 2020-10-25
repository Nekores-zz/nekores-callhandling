export function getParsedPath(path) {
  const args = path.split("/").splice(1);

  return {
    base: args[0],
    id: args[1],
    action: args[2],
    option: args.length === 4 ? args[3] : ""
  };
}

export function convertToPath(locationObject) {
  const { base, id, action, option } = locationObject;

  let pathname = "/";
  pathname += !!base ? base : "";
  pathname += !!id ? "/" + id : "";
  pathname += !!action ? "/" + action : "";
  pathname += !!option ? "/" + option : "";

  return pathname;
}
