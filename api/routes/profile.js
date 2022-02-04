// initialize route
const router = require("express").Router();
const mongoose = require("mongoose");
const passport = require("passport");
// custom modules (Schema)
const Post = require("../models/Post.js");
const Profile = require("../models/Profile.js");
const User = require("../models/User.js");
// Load validation
const validateProfileInput = require("../validation/profile");
const validateExperienceInput = require("../validation/experience");
const validateEducationInput = require("../validation/education");
/**
 * @route GET /api/profile
 * @description Get current user profile
 * @access Private
 */
router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    const errors = {};
    Profile.findOne({
      user: req.user.id,
    })
      .populate("user", ["name", "avatar"])
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "You have no profile";
          return res.status(404).json(errors);
        }
        return res.status(200).json(profile);
      })
      .catch((error) => {
        return res.json(error);
      });
  }
);

/**
 * @route GET /api/profile/all
 * @description Get all profiles
 * @access public
 */
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find({})
    .populate("user", ["name", "avatar"])
    .then((profiles) => {
      if (profiles) {
        return res.status(200).json(profiles);
      } else {
        errors.noprofiles = "There is no profile";
        return res.status(404).json(errors);
      }
    })
    .catch((error) => {
      errors.noprofiles = "There is no profile";
      return res.status(404).json(errors);
    });
});

/**
 * @route POST /api/profile/experience
 * @description Add experience to the profile
 * @access private
 */
router.post(
  "/experience",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Profile.findOne({
      user: req.user.id,
    })
      .then((profile) => {
        const newExp = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description,
        };
        // add to the experience array
        profile.experience.unshift(newExp);
        profile
          .save()
          .then((profile) => res.status(200).json(profile))
          .catch((error) => {
            return res.status(400).json(error);
          });
      })
      .catch((error) => {
        return res.status(400).json(error);
      });
  }
);

/**
 * @route DELETE /api/profile/experience/:exp_id
 * @description Delete the experince
 * @access private
 */
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    Profile.findOne({user: req.user.id})
    .then(profile => {
        // get the item
       const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id); 
       // delete the item
      profile.experience.splice(removeIndex, 1);
      // save the update experience
      profile.save().then(profile => res.json(profile));
    })
    .catch(error => res.json(error))
  }
);
/**
 * @route POST /api/profile/education
 * @description Add education to the profile
 * @access private
 */
router.post(
  "/education",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Profile.findOne({
      user: req.user.id,
    })
      .then((profile) => {
        const newEdu = {
          school: req.body.school,
          degree: req.body.degree,
          fieldofstudy: req.body.fieldofstudy,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description,
        };
        // add to the experience array
        profile.education.unshift(newEdu);
        profile
          .save()
          .then((profile) => res.status(200).json(profile))
          .catch((error) => {
            return res.status(400).json(error);
          });
      })
      .catch((error) => {
        return res.status(400).json(error);
      });
  }
);
/**
 * @route DELETE /api/profile/education/:edu_id
 * @description Delete the education
 * @access private
 */
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    Profile.findOne({user: req.user.id})
    .then(profile => {
        // get the item
       const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id); 
       // delete the item
      profile.education.splice(removeIndex, 1);
      // save the update education
      profile.save().then(profile => res.json(profile));
    })
    .catch(error => res.json(error))
  }
);

/**
 * @route GET /api/profile/handle/:handle
 * @description Get profile by handle
 * @access public
 */
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({
    handle: req.params.handle,
  })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "No profile for this user";
        return res.status(404).json(errors);
      }
      return res.json(profile);
    })
    .catch((error) => res.status(404).json(error));
});
/**
 * @route GET /api/profile/user/:user_id
 * @description Get profile by USER ID
 * @access public
 */
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({
    user: req.params.user_id,
  })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "No profile for this user";
        return res.status(404).json(errors);
      }
      return res.json(profile);
    })
    .catch((error) => {
      errors.noprofile = "This user has no profile";
      res.status(404).json(errors);
    });
});

/**
 * @route POST /api/profile
 * @description Create or update profile
 * @access Private
 */
router.post(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // get field
    const profileFields = {};
    profileFields.user = req.user.id;

    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // skills - CSV to Array conversion
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;

    Profile.findOne({
      user: req.user.id,
    }).then((profile) => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          {
            user: req.user.id,
          },
          {
            $set: profileFields,
          },
          {
            new: true,
          }
        ).then((profile) => res.json(profile));
      } else {
        // Create
        Profile.findOne({
          handle: profileFields.handle,
        })
          .then((profile) => {
            if (profile) {
              let errors = {};
              errors.handle = "This handle already exist";
              return res.status(400).json(errors);
            }
            // save the user
            new Profile(profileFields)
              .save()
              .then((profile) => res.json(profile));
          })
          .catch((error) => res.json(error));
      }
    });
  }
);
/**
 * @route DELETE /api/profile
 * @description Delete the user and profile
 * @access Private
 */
 router.delete('/', passport.authenticate('jwt', {session: false}), (req, res) => {
   Profile.findOneAndRemove({user: req.user.id})
    .then(profile => {
        User.findOneAndRemove({_id: req.user.id})
            .then(deletedUser => {
                return res.json({'Succesfull': true});
            })
            .catch(error => res.json(error));
    })
    .catch(error => res.json(error));
 })

module.exports = router;