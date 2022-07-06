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

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
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
