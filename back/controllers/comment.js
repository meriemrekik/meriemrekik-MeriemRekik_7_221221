const db = require('../db');
const { decodeToken } = require('../middleware/auth');
const { getUserById } = require('./user');
const Comment = db.comment;

exports.createComment = (req, res, next) => {
    // On récupère les infos envoyés depuis un formulaire
    // le json de la publication est mis dans une chaine de caractère
    // on parse le json
    const commentObject = req.body.comment;
    const publicationId = req.params.id;
    const currentUser = decodeToken(req);
    const userId = currentUser.id;
    const comment = {
        ...commentObject,
        userId,
        publicationId,
    };
    Comment.create(comment).then(
        (c) => {
            c.dataValues.user = {
                id: currentUser.id,
                nom: currentUser.nom,
                prenom: currentUser.prenom,
            }
            res.status(201).json({
                message: 'Commentaire ajouté avec succès !',
                comment: c,
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}



exports.getAllCommentPublication = (req, res, next) => {
    const publicationId = req.params.id;
    // on récupère toute les commentaires disponible
    Comment.findAll({ where: { publicationId }, raw: true, order: [['createdAt', 'DESC']] }).then(
        async (comments) => {
            for (const comment of comments) {
                await getUserById(comment.userId).then((u) => {
                    comment.user = u;
                })
            }
            res.status(200).json(comments);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

const getCommentById = function (id) {
    return new Promise((resolve, reject) => {
        return Comment.findOne({ where: { id }, raw: true }).then(value => resolve(value));
    })
}

exports.deleteComment = (req, res, next) => {
    const id_comment = req.params.id_comment;
    const user = decodeToken(req);
    console.log(id_comment)
    getCommentById(id_comment).then((currentComment) => {
        console.log(currentComment);
        if (user.id != currentComment.userId && !user.isAdmin) {
            res.status(403).json({ message: 'Vous ne pouvez pas supprimer ce commentaire' });
            return;
        }
        Comment.destroy({ where: { id: id_comment } })
            .then(c => {
                res.status(200).json({ message: 'Commentaire supprimé !' })
            })
            .catch(error => res.status(500).json({ error }));
    });
};

exports.getNumberComments = function (publicationId) {
    return new Promise((resolve, reject) => {
        return Comment.count({ where: { publicationId } }).then(value => resolve(value))
    })
}



