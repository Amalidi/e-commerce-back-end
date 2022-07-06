const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  try {
    const allCategories = await Category.findAll({
      // be sure to include its associated Products
      include: [
        { model: Product, attributes: ["product_name", "price", "stock"] },
      ],
    });
    return res.json(allCategories);
  } catch (error) {
    console.log(`[ERROR] - ${error.message}`);
    return res.status(500).json({ error: "Failed to get categories" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    // find one category by its `id` value
    const singleCategory = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [
        {
          model: Product,
          attributes: ["product_name", "price", "stock"],
        },
      ],
    });

    if (!singleCategory) {
      return res.status(404).json({
        error: "Category does not exist",
      });
    }

    return res.status(200).json(singleCategory);
  } catch (error) {
    return res.status(500).json({
      error: "Failed to get category",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    // create a new category
    const { category_name } = req.body;

    const newCategory = await Category.create({
      category_name,
    });
    res
      .status(200)
      .json({ message: "A new category has been successfully created." });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to create category" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    // update a category by its `id` value
    const { id } = req.params;
    const { category_name } = req.body;
    const category = await Category.update(
      { category_name },
      { where: { id } }
    );
    res.status(200).json({ message: "Successfully updated category." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Sorry, your category couldn't be updated." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // delete a category by its `id` value
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to delete category. Please try again later.",
    });
  }
});

module.exports = router;
