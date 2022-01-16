const db = require('../db');
const { decodeToken } = require('../middleware/auth');
const Comment = db.comment;

exports.createComment = (req, res, next) => {
    // On récupère les infos envoyés depuis un formulaire
    // le json de la publication est mis dans une chaine de caractère
    // on parse le json
    const commentObject = req.body.comment;
    const publicationId = req.params.id;
    const userId = decodeToken(req).id;
    const comment = {
        ...commentObject,
        userId,
        publicationId,
    };
    Comment.create(comment).then(
        (c) => {
            console.log('CREATION SUCCESS')
            res.status(201).json({
                message: 'Commentaire ajouté avec succès !',
                comment: c
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
        (comments) => {
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

exports.deleteComment = (req, res, next) => {
    Comment.destroy({ where: { id: req.params.id_comment } })
        .then(c => {
            res.status(200).json({ message: 'Commentaire supprimé !' })
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getNumberComments = function (publicationId) {
    return new Promise((resolve, reject) => {
        return Comment.count({ where: { publicationId } }).then(value => resolve(value))
    })
}


