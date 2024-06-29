const userprofileController = async (req, res) => {

  res.send({ user: req.user });
};

export default userprofileController;
