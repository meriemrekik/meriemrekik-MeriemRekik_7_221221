const db = require('../db');
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
    /*
    */
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
    Publication.findOne({ where: { id: req.params.id } })
        .then(p => {
            const filename = p.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Publication.destroy({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'Publication supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};
