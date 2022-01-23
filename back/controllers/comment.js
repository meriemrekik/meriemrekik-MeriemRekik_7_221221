const db = require('../db');
const { decodeToken } = require('../middleware/auth');
const { getUserById } = require('./user');
const Comment = db.comment;

exports.createComment = (req, res, next) => {
    // On récupère l'objet comment contenant {content: "mon message"}
    const commentObject = req.body.comment;
    // on racupère l'id de la publication qui est dans les params de la route
    const publicationId = req.params.id;
    // Pour savoir quel user veut créer le commentaire on decode le token qui est dans la requete
    const currentUser = decodeToken(req);
    const userId = currentUser.id;
    // On construit notre objet commentaire avec toutes les infos nécessaires
    const comment = {
        ...commentObject,
        userId,
        publicationId,
    };
    // On crée notre commentaire
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
    // On récupère l'id de la publication pour laquelle on veut voir les commentaires
    const publicationId = req.params.id;
    // on récupère toute les commentaires disponible pour cette publication
    // On les récupère par ordre décroissant de publication => les plus récentes en premier
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

// Fonction permettant de récupérer un commentaire par son id
const getCommentById = function (id) {
    return new Promise((resolve, reject) => {
        return Comment.findOne({ where: { id }, raw: true }).then(value => resolve(value));
    })
}

exports.deleteComment = (req, res, next) => {
    // on récupère l'id du commentaire que l'on veut supprimer
    const id_comment = req.params.id_comment;
    // on récupère l'utilisateur qui veut supprimer le commentaire
    const user = decodeToken(req);

    // On récupère le comentaire que l'on souhaite supprimer
    getCommentById(id_comment).then((currentComment) => {
        // Si l'utilisateur n'est pas admin ET qu'il n'est pas l'auteur de ce commentaire
        if (user.id != currentComment.userId && !user.isAdmin) {
            // alors on refuse que la personne puisse supprimer le commentaire
            res.status(403).json({ message: 'Vous ne pouvez pas supprimer ce commentaire' });
            return;
        }
        // Sinon on autorise la suppression du commentaire
        Comment.destroy({ where: { id: id_comment } })
            .then(c => {
                res.status(200).json({ message: 'Commentaire supprimé !' })
            })
            .catch(error => res.status(500).json({ error }));
    });
};

// Fonction permettant de récperer le nombre de commentaire publié pour une publication
exports.getNumberComments = function (publicationId) {
    return new Promise((resolve, reject) => {
        return Comment.count({ where: { publicationId } }).then(value => resolve(value))
    })
}



