const User = require("../model/userSchema");

const getData = async (req, res) => {
  try {
    let currentUser = req.user;
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const filter = { email: { $ne: currentUser.email } };
    const [data, total] = await Promise.all([
      User.find(filter).skip(skip).limit(limit),
      User.countDocuments(filter),
    ]);
    res.status(200).json({
      status: true,
      message: "data loaded successfully",
      user: currentUser,
      data,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    console.log("Error while loading the user data");
    res.status(500).json({
      status: false,
      message: "Error while fetching the data",
    });
  }
};
const updateStatus = async (req, res) => {
  try {
    const { _id, status } = req.body;
    const user = await User.find({ _id: _id });
    if (status == user.status) return;
    const updatedUser = await User.findByIdAndUpdate(
      { _id: _id },
      { status: status },
      { new: true, runValidators: true }
    );
    if (!updatedUser)
      return res
        .status(500)
        .json({ status: false, message: "status updation failed" });
    console.log("updatedData:");
    return res.status(200).json({
      message: "status updated successfully",
      status: true,
      data: updatedUser,
    });
  } catch (error) {
    console.log("Error while updating the status " + error.message);
    res.status(500).json({
      status: false,
      message: "Error while updating the status",
    });
  }
};

module.exports = {
  getData,
  updateStatus,
};
