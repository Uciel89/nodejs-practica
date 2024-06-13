const { Artist, Song } = require('../models');

const Op = require('sequelize').Op;

const getAll = async (req, res) => {
    try {
        const artists = await Artist.findAll({
            include: {
                model: Song,
                as: 'songs',
                separate: true,
                order: [['createdAt', 'desc']]
            }
        });
        res.json(artists);
    } catch (error) {
        res.status(400).json(error);
    }
}

// Recuperamos todos los artistas del usuario logeado
const ownArtists = async (req, res) => {
    try {
        const artists = await Artist.findAll({ userId: req.user.id });
        res.json(artists);
    } catch (error) {
        res.status(400).json(error);
    }
}

const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const artist = await Artist.findByPk(id, {
            include: {
                model: Song,
                as: 'songs',
                separate: true,
                order: [['createdAd', 'desc']]
            }
        });
        res.json(artist);
    } catch (error) {
        res.status(400).json(error);
    }
}

const getSongsByArtist = async (req, res) => {
    const { artist_id } = req.body;
    try {
        const songs = await Song.findAll({ artistId: artist_id });
        res.json(songs);
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

const create = async (req, res) => {
    try {
        req.body.userId = req.user.id;
        const artist = await Artist.create(req.body);
        res.json(artist);
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

const search = async (req, res) => {
    const { search } = req.body;
    try {
        const artists = await Artist.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } }, // Buscamos por nombre
                    { bio: { [Op.like]: `%${search}%` } }, // Buscamos por biografia
                ]
            }
        });
        res.json(artists);
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = { getAll, ownArtists, getById, getSongsByArtist, create, search }; 