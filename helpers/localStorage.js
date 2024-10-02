export const setLocalStorage = function (key, data) {
  if (typeof key != "string") {
    throw new Error("key must be a string."); // (*)
  }
  localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalStorage = function (key) {
  if (typeof key !== "string") {
    throw new Error("key must be a string."); // (*)
  }
  const data = localStorage.getItem(key);

  return data !== "undefined" ? JSON.parse(data) : "";
  // return (data !== "undefined" && JSON.parse(data)) || "";
};
