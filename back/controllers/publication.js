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
    // donc on doit parser le json
    const publicationObject = JSON.parse(req.body.publication);
    // on racupère l'id de l'utilisateur qui crée la publication
    const userId = decodeToken(req).id;
    // On construit l'objet publication que l'on veut sauvegarder en base
    const publication = {
        ...publicationObject,
        userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    };
    // On crée la publication 
    Publication.create(publication).then(
        (p) => {
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


// On récupère la liste des publications les pls populaires
exports.getMorePopularPublication = async (req, res, next) => {
    // On récupère les 4 premières publications pour lesquels il y a le plus de j'aime 
    const sql = "SELECT count(value) as nb, publicationId FROM groupomania.likes where value='1' group by publicationId order by nb DESC limit 4;"
    let results = null;
    try {
        results = await db.sequelize.query(sql, {
            type: db.sequelize.QueryTypes.SELECT
        });

    } catch (error) {
        console.warn(error);
        res.status(500).json("Une erreure est arrivé en essayant de recuperer la liste des publications les plus populaires");
    }

    // Dans results on a actuellement seulement une list d'id de publication et le nombre de j'aime associé
    // Pour chaque id de publication on récupère l'objet publication en entier
    const publications = [];
    for (r of results) {
        let p = {};
        // on recupère la publication
        await Publication.findOne({
            where: { id: r.publicationId },
            raw: true
        }).then((foundPblication) => {
            p = foundPblication;
        });
        p.popularity = r.nb;

        // On récupère l'autheur de cette publication
        await getUserById(p.userId).then(u => {
            p.user = u
        });

        // On affiche le nombre de commentaires sur cette publication
        await getNumberComments(p.id).then(c => {
            p.comments = c;
        })

        // Enfin on récupère les likes/dislikes
        await getUserLikePublication(p.id).then(l => {
            p.iLike = l.like;
            p.iDislike = l.dislike;
        });

        publications.push(p);
    }
    res.status(200).json(publications);
}

exports.updatePublication = (req, res, next) => {
    // On récupère les infos envoyés depuis le front concernat les pdate de la publication
    const publicationObject = req.body;
    const publicationId = req.params.id;
    // on récupère l'id de l'user qui veut faire la mise à jour
    const user = decodeToken(req);
    const user_id = user.id;

    // Tout d'abbord on récupère la publication que l'on veut mettre à jour
    Publication.findOne({ where: { id: publicationId }, raw: true })
        .then(p => {
            // Si l'utilisateur n'est pas l'auteur de la publication
            // ET qu'il n'est pas admin alors on refuse la mise à jour
            if (user.id != p.userId && !user.isAdmin) {
                res.status(403).json({ message: 'Vous ne pouvez pas éditer cette publication' });
                return;
            }
            // Sinon on met à jour la publication
            Publication.update(
                {
                    title: publicationObject.title,
                    description: publicationObject.description
                },
                { where: { id: publicationId, userId: user_id }, raw: true }
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
        }).catch(error => res.status(500).json({ error }));
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
    // Pour chacune des publications
    for (p of publications) {
        // On récupère l'auteur complet
        await getUserById(p.userId).then(u => {
            p.user = u
        });
        // On récupère le nombre de commentaires
        await getNumberComments(p.id).then(c => {
            p.comments = c;
        });

        // On récupère le nombre de like/dislike pour la publication
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
    // On récupère l'utilsiateur qui fait la demande
    const user = decodeToken(req);
    // On récupère la Publication que l'on veut supprimer
    Publication.findOne({ where: { id: req.params.id }, raw: true })
        .then(p => {
            // Si on est ni l'auteur de la publication et ni un admin
            if (user.id != p.userId && !user.isAdmin) {
                // On est interdit de supprimer la publication
                res.status(403).json({ message: 'Vous ne pouvez pas supprimer cette publication' });
                return;
            }
            // Sinon on peut la supprimer et dans ce cas
            // En premier on supprime l'image lié à la publication
            const filename = p.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                // Quand l'image est supprimé on peut alors supprimer la publication
                Publication.destroy({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'Publication supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};
