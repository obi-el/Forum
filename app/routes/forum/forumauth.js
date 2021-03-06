/**
 * @author ObinnaElobi
 * @since 13/9/17
 */

let config = require("../../../config");
let response = require("../../../utils/response");
let http = require("../../../utils/HttpStats");
let moduleId = "forumAuth";
let Forum = require("../../models/ForumModel").Forum;

/**
 * checks if you are a mod in the specified forum
 *
 * @param req request
 * @param res response
 * @param next middleware
 * @returns {Promise.<*>}
 */
exports.modsOnly = async function(req,res,next){
  let {user, topic} = req.body;
  let respondErr = response.failure(res, moduleId);

  try{
    if(!user || !topic){
      return respondErr(http.BAD_REQUEST, "Missing Parameter " + (!user) ? "user" : "topic");
    }

    let found = await Forum.findOne({topic: topic}).exec();

    if(!found){
      return respondErr(http.NOT_FOUND, "Forum Doesn't exist");
    }


    let mod = found.mods.find(x => x == user);

    if(!mod){
      return respondErr(http.UNAUTHORIZED, config.DEFAULT_ERR_MSG);
    }
    next();
  }
  catch(err){
    respondErr(http.UNAUTHORIZED, config.DEFAULT_ERR_MSG, err);
  }

};

/**
 * checks if you are a subscriber in the specified forum
 *
 * @param req request
 * @param res response
 * @param next middleware
 * @returns {Promise.<*>}
 */
exports.subsOnly = async function(req, res, next){
  let {user, topic} = req.body;
  let respondErr = response.failure(res, moduleId);

  try{
    if(!user || !topic){
      return respondErr(http.BAD_REQUEST, "Missing Parameter " + (!user) ? "user" : "topic");
    }

    let found = await Forum.findOne({topic: topic}).exec();

    if(!found){
      return respondErr(http.NOT_FOUND, "Forum Doesn't exist");
    }

    let sub = await found.subs.find(x => x == user);

    if(!sub){
      return respondErr(http.UNAUTHORIZED, config.DEFAULT_ERR_MSG);
    }
    next();
  }
  catch(err){
    respondErr(http.UNAUTHORIZED, config.DEFAULT_ERR_MSG, err);
  }

};
