const userlogoutController = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.clearCookie("isAuthenticated");

    res.status(200).json({
      status: "sucess",
      message: "Logout succesfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: `Unable to Logout ! `,
    });
  }
};

export default userlogoutController;
