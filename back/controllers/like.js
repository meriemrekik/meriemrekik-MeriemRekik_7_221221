const db = require('../db');
const { decodeToken } = require('../middleware/auth');
const Like = db.like;



exports.like = async (req, res, next) => {
    const publicationId = req.params.id;
    const userId = decodeToken(req).id;
    if (req.body.like == "0") {
        Like.destroy({ where: { userId, publicationId } }).then((r) => {
            res.status(201).json({ message: "On a supprimé vos like/dislike de cette publication" });
        }).catch((error) => {
            console.log(error);
            res.status(400).json({ message: "Une erreure est arrivé durant la suppression de vos like/dislike" });
        });
        return false;
    } else if (req.body.like == "-1" || req.body.like == "1") {
        console.log(req.body);
        const monLike = await Like.findOne({
            where: { userId, publicationId },
        })/*.then((like)=>{
            if (!like) {
                console.log("You should create One");
            } else {
                console.log(like);
            }
        }).catch((error)=>{

        });*/
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
            monLike.value = req.body.like;
            monLike.save();
        }
        console.log(monLike);
        res.status(201).json({ message: `On a ajouté votre ${req.body.like == "1" ? "like" : "dislike"} de cette publication` });
        return false;
    } else {
        res.status(400).json({
            message: `Le parametre '${$req.body.like}' n'est pas prit en charge `
        });
    }

}

exports.getUserLikePublication = function (publicationId) {
    return Like.findAll({
        raw: true,
        where: {
            publicationId
        }
    }).then((p) => {
        const usersLikeId = p.filter(p => p.value == '1').map(p => p.userId);
        const usersDisLikeId = p.filter(p => p.value == '-1').map(p => p.userId);
        return {
            like: usersLikeId,
            dislike: usersDisLikeId,
        }
    });
}