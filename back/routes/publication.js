const express = require('express');
const router = express.Router();

// on importe le publication controller
const publicationCtrl = require("../controllers/publication");
const commentCtrl = require("../controllers/comment");
const likeCtrl = require("../controllers/like");

// on importe nos middleware 
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

// Routes liés aux publications
router.post('/', multer, auth.isAuthentified, publicationCtrl.createPublication);
router.get('/', auth.isAuthentified, publicationCtrl.getAllPublication);
router.get('/populaire', auth.isAuthentified, publicationCtrl.getMorePopularPublication);
router.get('/:id', auth.isAuthentified, publicationCtrl.getOnePublication);
router.delete('/:id', auth.isUser, publicationCtrl.deletePublication);
router.put('/:id', auth.isUser, publicationCtrl.updatePublication);

// Routes liés aux likes des publications
router.post('/:id/like', auth.isAuthentified, likeCtrl.like);

// Routes liés aux commentaire des publications
router.get('/:id/comment', auth.isAuthentified, commentCtrl.getAllCommentPublication);
router.post('/:id/comment', auth.isAuthentified, commentCtrl.createComment);
router.delete('/:id/comment/:id_comment', auth.isUser, commentCtrl.deleteComment);


module.exports = router;