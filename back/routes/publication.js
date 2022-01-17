const express = require('express');
const router = express.Router();

// on importe le publication controller
const publicationCtrl = require("../controllers/publication");
const commentCtrl = require("../controllers/comment");
const likeCtrl = require("../controllers/like");

// on importe nos middleware 
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

router.post('/', multer, auth.isAuthentified, publicationCtrl.createPublication);
router.get('/', auth.isAuthentified, publicationCtrl.getAllPublication);
router.get('/:id', auth.isAuthentified, publicationCtrl.getOnePublication);
router.delete('/:id', auth.isUser, publicationCtrl.deletePublication);

router.post('/:id/like', auth.isAuthentified, likeCtrl.like);

router.get('/:id/comment', auth.isAuthentified, commentCtrl.getAllCommentPublication);
router.post('/:id/comment', auth.isAuthentified, commentCtrl.createComment);
router.delete('/:id/comment/:id_comment', auth.isUser, commentCtrl.deleteComment);

/*
// on définit nos routes 
router.put('/:id', multer, auth, sauceCtrl.modifySauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);

*/
module.exports = router;