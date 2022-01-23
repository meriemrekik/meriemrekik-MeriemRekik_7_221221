const db = require('../db');
const { decodeToken } = require('../middleware/auth');
const Like = db.like;


exports.like = async (req, res, next) => {
    // On récupère l'id de la publication 
    const publicationId = req.params.id;
    // On récupère l'id de l'utilisateur qui fait la requete
    const userId = decodeToken(req).id;

    // Si l'utilisateur envoit 0 cela signifi qu'il veut retire son like ou dislike
    if (req.body.like == "0") {
        // On fait une requete permettant de supprimer tous les like/dislike fait par un user
        Like.destroy({ where: { userId, publicationId } }).then((r) => {
            res.status(201).json({ message: "On a supprimé vos like/dislike de cette publication" });
        }).catch((error) => {
            console.log(error);
            res.status(400).json({ message: "Une erreure est arrivé durant la suppression de vos like/dislike" });
        });
        return false;
        // Si l'utilisater envoit un 1 ou -1 
    } else if (req.body.like == "-1" || req.body.like == "1") {
        // On vérifie d'abord qu'il n'y a pas un like/dislike qui existe déjà
        // pour cette publication et pour ce user
        const monLike = await Like.findOne({
            where: { userId, publicationId },
        })
        // Si il n'en a pas alors on crée notre like/dislike
        if (!monLike) {
            await Like.create({
                value: req.body.like,
                userId,
                publicationId
            }).then((l) => {
                res.status(201).json({ message: `On a ajouté votre ${req.body.like == "1" ? "like" : "dislike"} de cette publication` });
            })
            return
        } else {
            // Sinon on met à jour notre like avec sa nouvelle valeure
            monLike.value = req.body.like;
            monLike.save();
        }

        res.status(201).json({ message: `On a ajouté votre ${req.body.like == "1" ? "like" : "dislike"} de cette publication` });
        return false;
    } else {
        res.status(400).json({
            message: `Le contenu du body ne correspond pas à ce qui est attendu `
        });
    }

}

exports.getUserLikePublication = function (publicationId) {
    // On récupère tous les like qui correspondent à une publication
    return Like.findAll({
        raw: true,
        where: {
            publicationId
        }
    }).then((p) => {
        // Puis on filtre dans deux tableaux les ID des users qui aiment ou n'aiment pas
        const usersLikeId = p.filter(p => p.value == '1').map(p => p.userId);
        const usersDisLikeId = p.filter(p => p.value == '-1').map(p => p.userId);
        return {
            like: usersLikeId,
            dislike: usersDisLikeId,
        }
    });
}