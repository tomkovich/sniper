const requireLogin = require("../middlewares/requireLogin");
const Recipe = require("../models/Recipe");
const AppError = require("../utils/AppError");

module.exports = (app) => {
  app.get("/api/recipes", async (req, res) => {
    try {
      const recipes = await Recipe.find();

      res.status(200).json({
        status: "success",
        requestAt: req.requestTime,
        results: recipes.length,
        data: {
          data: recipes,
        },
      });
    } catch (err) {
      console.log(err);
    }
  });

  app.get("/api/recipes/:id", async (req, res, next) => {
    try {
      const recipe = await Recipe.findById(req.params.id);

      if (!recipe)
        return next(new AppError("Not found document with that ID!", 404));

      res.status(200).json({
        status: "success",
        data: {
          data: recipe,
        },
      });
    } catch (err) {
      console.log(err);
    }
  });

  app.post("/api/recipes", requireLogin, async (req, res) => {
    const recipe = await Recipe.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: recipe,
      },
    });
  });

  app.delete("/api/recipes/:id", requireLogin, async (req, res, next) => {
    try {
      const recipe = await Recipe.findByIdAndDelete(req.params.id);

      if (!recipe)
        return next(new AppError("Not found document with that ID!", 404));

      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (err) {
      console.log(err);
    }
  });

  app.patch("/api/recipes/:id", async (req, res, next) => {
    try {
      const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!recipe)
        return next(new AppError("Not found document with that ID!", 404));

      res.status(200).json({
        status: "success",
        data: {
          data: recipe,
        },
      });
    } catch (err) {
      console.log(err);
    }
  });
};
