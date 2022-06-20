import Shop from '../models/shop.model';
import errorHandler from './../helpers/dbErrorHandler';
import formidable from 'formidable';
import fs from 'fs';

const create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(400).json({
        message: 'Image could not be uploaded',
      });
    }
    let shop = new Shop(fields);
    shop.owner = req.profile;
    if (files.image) {
      shop.image.data = fs.readFileSync(files.image.filepath);
      shop.image.contentType = files.image.mimetype;
    }
    shop.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err),
        });
      }
      res.status(200).json(result);
    });
  });
};

const listByOwner = async (req, res) => {
  try {
    let shops = await Shop.find({ owner: req.profile._id }).populate(
      'owner',
      '_id name'
    );
    res.json(shops);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const shopByID = async (req, res, next, id) => {
  try {
    let shop = await Shop.findById(id).populate('owner', '_id name').exec();
    if (!shop)
      return res.status('400').json({
        error: 'Shop not found',
      });
    req.shop = shop;
    next();
  } catch (err) {
    return res.status('400').json({
      error: 'Could not retrieve shop',
    });
  }
};

const remove = async (req, res) => {
  try {
    let shop = req.shop;
    let deletedShop = shop.remove();
    res.json(deletedShop);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  try {
    let shops = await Shop.find();
    res.json(shops);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { create, listByOwner, list, remove, shopByID };
