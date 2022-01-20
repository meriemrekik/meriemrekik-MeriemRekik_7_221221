const db = require('../db');
const fs = require('fs');
const { decodeToken } = require('../middleware/auth');
const { getNumberComments } = require('./comment');
const { getUserLikePublication } = require('./like');
const { getUserById } = require('./user');
const Publication = db.publication;

exports.createPublication = (req, res, next) => {
    // On récupère les infos envoyés depuis un formulaire
    // le json de la publication est mis dans une chaine de caractère
    // on parse le json
    const publicationObject = JSON.parse(req.body.publication);
    const userId = decodeToken(req).id;
    const publication = {
        ...publicationObject,
        userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    };
    Publication.create(publication).then(
        (p) => {
            console.log('CREATION SUCCESS')
            res.status(201).json({
                message: 'Publication crée avec succès !',
                publication: {
                    ...p,
                    comments: 0,
                    iLike: [],
                    iDislike: []
                }
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                // on crée la publication en base de données
                error: error
            });
        }
    );
}

exports.getMorePopularPublication = async (req, res, next) => {
    const sql = "SELECT count(publicationId) as nb, publicationId FROM groupomania.comments group by publicationId order by nb DESC;"
    let results = null;
    try {
        results = await db.sequelize.query(sql, {
            type: db.sequelize.QueryTypes.SELECT
        });

    } catch (error) {
        console.warn(error);
        res.status(500).json("Une erreure est arrivé en essayant de recuperer la liste des publications les plus populaires");
    }
    const publications = [];
    for (r of results) {
        let p = {};

        await Publication.findOne({
            where: { id: r.publicationId },
            raw: true
        }).then((foundPblication) => {
            p = foundPblication;
        });
        p.popularity = r.nb;

        await getUserById(p.userId).then(u => {
            p.user = u
        });

        await getNumberComments(p.id).then(c => {
            p.comments = c;
        })

        await getUserLikePublication(p.id).then(l => {
            p.iLike = l.like;
            p.iDislike = l.dislike;
        });

        publications.push(p);
    }
    res.status(200).json(publications);
}

exports.updatePublication = (req, res, next) => {
    // On récupère les infos envoyés depuis un formulaire
    // le json de la publication est mis dans une chaine de caractère
    // on parse le json
    const publicationObject = req.body;
    const user_id = decodeToken(req).id;

    Publication.update(
        {
            title: publicationObject.title,
            description: publicationObject.description
        },
        { where: { id: req.params.id, userId: user_id }, raw: true }
    ).then(
        (publication) => {
            res.status(200).json(publication);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error
            });
        }
    );
}


exports.getAllPublication = async (req, res, next) => {
    // on récupère toute les publications disponible
    let publications = null;
    try {


        await Publication.findAll({ raw: true, order: [['createdAt', 'DESC']] }).then(
            (p) => {
                publications = p;
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    error: error
                });
            }
        );
    } catch (error) {
        console.warn(error);
    }

    for (p of publications) {
        await getUserById(p.userId).then(u => {
            p.user = u
        });

        await getNumberComments(p.id).then(c => {
            p.comments = c;
        })

        await getUserLikePublication(p.id).then(l => {
            p.iLike = l.like;
            p.iDislike = l.dislike;
        })
    }

    res.status(200).json(publications);
}

exports.getOnePublication = async (req, res, next) => {
    Publication.findOne({
        where: { id: req.params.id },
        raw: true
    }).then(
        async (publication) => {
            await getUserById(publication.userId).then(u => {
                publication.user = u
            });

            await getNumberComments(publication.id).then(c => {
                publication.comments = c;
            })

            await getUserLikePublication(publication.id).then(l => {
                publication.iLike = l.like;
                publication.iDislike = l.dislike;
            })

            res.status(200).json(publication);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.deletePublication = (req, res, next) => {
    const user = decodeToken(req);
    Publication.findOne({ where: { id: req.params.id }, raw: true })
        .then(p => {
            if (user.id != p.userId && !user.isAdmin) {
                res.status(403).json({ message: 'Vous ne pouvez pas supprimer cette publication' });
                return;
            }
            const filename = p.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Publication.destroy({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'Publication supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};
