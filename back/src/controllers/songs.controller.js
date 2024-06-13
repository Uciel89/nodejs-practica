const Op = require('sequelize').Op;

const { uploadFile, deleteFile } = require("../config/cloudinary");

const { Song } = require("../models");

const uploadSong = async (req, res) => {
    try {
        const result = await uploadFile(req.files.song);
        const song = await Song.create({
            ...req.body,
            cloudinaryPublicId: result.public_id,
            cloudinarySecureUrl: result.secure_url
        });
        res.json(song);
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

const search = async (req, res) => {
    const {search} = req.body;
    try {
        const songs = await Song.findAll({
            where: {
                title: {[Op.like]: `%${search}%`}
            }
        })
        res.json(songs);
    } catch (error) {
        res.status(400).json({message: error})
    }
}

const deleteSong = async (req, res) => {
    const {song_id} = req.params;
    try {
        const songs = await Song.findByPk(song_id);
        
        // Eliminamos archivo de cloudinary
        const result = await deleteFile(songs.dataValues.cloudinaryPublicId);
        
        // Eliminamos la cansión de nuestra BD
        await Song.destroy();
        res.json(songs);
    } catch (error) {
        res.status(400).json({message: error})
    }
}

module.exports = { uploadSong, search, deleteSong }