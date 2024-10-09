import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
  const { token } = req.cookies;

  // Check if the token is missing
  if (!token) {
    return res
      .status(401)
      .send({ status: false, message: "Login required, token missing!" });
  }

  try {
    // Verify the token
    const tokenDetails = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Attach the token details (e.g., user info) to the request object
    req.user = tokenDetails;
    next();
  } catch (error) {
    // Handle invalid or expired tokens
    return res
      .status(401)
      .send({ status: false, message: "Invalid or expired token!" });
  }
};
