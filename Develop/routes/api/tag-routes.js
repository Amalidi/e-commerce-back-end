const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// get all tags with product information
router.get("/", async (req, res) => {
  try {
    // find all tags
    const allTags = await Tag.findAll({
      // be sure to include its associated Product data
      include: [
        { model: Product, attributes: ["product_name", "price", "stock"] },
      ],
    });
    res.status(200).json(allTags);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: "Failed to get all tags. Please try again." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    // find a single tag by its `id`
    const { id } = req.params;
    // be sure to include its associated Product data
    const singleTag = await Tag.findByPk(id, {
      include: [
        { model: Product, attributes: ["product_name", "price", "stock"] },
      ],
    });
    if (!singleTag) {
      res.status(404).json({ message: "No tag found with this id." });
    }
    res.status(200).json(singleTag);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to get tag" });
  }
});

router.post("/", (req, res) => {
  // create a new tag
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
