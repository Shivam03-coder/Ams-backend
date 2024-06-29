import JWT from "jsonwebtoken";

const checkexpiredToken = (token) => {
  if (!token) {
    return true;
  }

  const decodedToken = JWT.decode(token);

  const currentTime = Date.now() / 1000;

  return decodedToken.exp < currentTime;
};

export default checkexpiredToken;
