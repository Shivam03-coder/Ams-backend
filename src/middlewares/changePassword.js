import bcrypt from "bcrypt";

const changePassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(password, salt);

    next();
  } catch (error) {}
};

export default changePassword;
