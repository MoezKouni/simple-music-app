const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')

const Music = require('../models/Music')

// Get music
// Private Route
router.get('/', auth,(req, res) => {
    Music.find({user: req.user.id}).sort({date: -1})
        .then(songs => res.json(songs))
        .catch(err => {
            console.error(err.message)
            res.status(500).send('Server Error')
        })
})

// Add music
// Private Route
router.post('/', [auth, [
    check('singer', 'Singer is required').not().isEmpty(),
    check('song', 'Song name is required').not().isEmpty(),
    check('singerImg', 'Singer image is required').not().isEmpty(),
    check('video', 'Video clip is required').not().isEmpty()
]],(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const { singer, song, singerImg, video} = req.body

    const newMusic = new Music({
        singer,
        song,
        singerImg,
        video,
        user: req.user.id
    })

    newMusic.save()
        .then(song => res.json(song))
        .catch(err => {
            console.error(err.message)
            res.status(500).send('Server Error')
        })
})

// Update music
// Private Route
router.put('/:id', auth,(req, res) => {
    const { singer, song, singerImg, video } = req.body

    // Build a music object
    let musicFields = {}
    if(singer) musicFields.singer = singer
    if(song) musicFields.song = song
    if(singerImg) musicFields.singerImg = singerImg
    if(video) musicFields.video = video

    Music.findById(req.params.id)
        .then(music => {
            if(!music){
                return res.status(404).json({msg: 'Music not found'})
            }else if(music.user.toString() !== req.user.id){
                res.status(401).json({msg: "Not authorized"})
            }else{
                Music.findByIdAndUpdate(req.params.id, {$set: musicFields}, (err, data) => {
                    res.json({msg: "Music Updated!"})
                })
            }
        })
        .catch(err => {
            console.error(err.message)
            res.status(500).send('Server error')
        })
})



// Delete music
// Private Route
router.delete('/:id', auth,(req, res) => {
    Music.findById(req.params.id)
        .then(music => {
            if(!music){
                return res.status(404).json({msg: 'Music not found'})
            }else if(music.user.toString() !== req.user.id){
                res.status(401).json({msg: "Not authorized"})
            }else{
                Music.findByIdAndDelete(req.params.id, (err, data) => {
                    res.json({msg: "Music Deleted!"})
                })
            }
        })
        .catch(err => {
            console.error(err.message)
            res.status(500).send('Server error')
        })
})


module.exports = router