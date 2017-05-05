'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  http = require('http'),
  fs = require('fs'),
  Slides = mongoose.model('Slides'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  user = require(path.resolve('./modules/users/server/controllers/users/users.profile.server.controller'));
/**
 * Create an slide
 */
exports.create = function(req, res) {
  var slide = new Slides(req.body);
  slide.user = req.user;
  slide.save(function(err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(slide);
    }
  });
};

/**
 * Show the current slide
 */
exports.read = function(req, res) {
  var slide = req.slide ? req.slide.toJSON() : {};
  slide.isCurrentUserOwner = !!(req.user && slide.user && slide.user._id.toString() === req.user._id.toString());
  res.json(slide);
};

/**
 * Update an slide
 */
exports.update = function(req, res) {
  var slide = req.slide;
  slide.title = req.body.title;
  slide.content = req.body.content;
  slide.public = req.body.public;
  slide.save(function(err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(slide);
    }
  });
};

/**
 * Delete an slide
 */
exports.delete = function(req, res) {
  var slide = req.slide;

  slide.remove(function(err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(slide);
    }
  });
};

/**
 * List of slides
 */
exports.list = function(req, res) {
  Slides.find().sort('-created').populate('user', 'displayName').exec(function(err, slides) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(slides);
    }
  });
};

exports.myList = function(req, res) {
  Slides.find({ $or: [{ author: req.params.username }, { public: true }] }).sort('-created').populate('user', 'displayName').exec(function(err, slides) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(slides);
    }
  });
};
/**
 * slide middleware
 */
exports.slideByID = function(req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'slide is invalid'
    });
  }

  Slides.findById(id).populate('user', 'displayName').exec(function(err, slide) {
    if (err) {
      return next(err);
    } else if (!slide) {
      return res.status(404).send({
        message: 'No slide with that identifier has been found'
      });
    }
    req.slide = slide;
    next();
  });
};
exports.search = function (req, res) {
  var regexS = new RegExp("^" + req.params.toSearch);
  Slides.find({title: regexS}).exec(function (err, slides) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(slides);
    }
  });
};
