import { frontNav } from "../models/rebirth.js";

const getAll = async (req, res) => {
  try {
    const navSource = await frontNav.findAll();
    res.json({
      status: "susscess",
      navSource,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

export { getAll };
