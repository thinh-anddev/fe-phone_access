export const getUserFromSession = () => {
  const user = sessionStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};
