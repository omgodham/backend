const User = require("../models/user");
const Category = require("../models/category");

//This is middleware for creating particular category by ID
exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to find category for this id",
      });
    }
    req.category = cate;
    next();
  });
};

//Create Category
exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to save category for this user",
      });
    }
    res.json(category);
  });
};

//Read Category
exports.getCategory = (req, res) => {
  return res.json(req.category);
};

//Update category
exports.updateCategory = (req, res) => {
  const category = req.body.name;
  Category.findOneAndUpdate(
    { _id: req.category._id },
    { $set: { name: category } },
    { new: true },
    (err, updatedCategory) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to update category for this user",
        });
      }
      res.json(updatedCategory);
    }
  );
};


//Remove Category
exports.removeCategory = (req,res) => {
    Category.deleteOne({_id:req.category._id}).exec((err,removedCategory) => {
        if (err) {
            return res.status(400).json({
              error: "Unable to Delete category",
            });
          } 
          res.json({
              messsage:'Deleted Successfully'
          });
    })
}

//Read All Categories
exports.getAllCategories = (req,res) => {
    Category.find({},(err,categories) =>{
        if (err) {
            return res.status(400).json({
              error: "Unable to get All categories",
            });
          }        
          res.json(categories);
    })
}