const express = require('express');
const Router = express.Router();
const db = require('../config/conn');

// CREATE - POST
Router.post('/create', async (req, res) => {
    try {
        const { title } = req.body;
        
        if (!title || typeof title !== 'string') {
            return res.status(400).json({ 
                status: false, 
                message: 'Invalid title' 
            });
        }

        const [result] = await db.promise().query(
            'INSERT INTO post (post_title) VALUES (?)',
            [title]
        );

        res.status(201).json({
            status: true,
            message: 'Post inserted successfully',
            data: {
                id: result.insertId,
                title
            }
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({
            status: false,
            message: 'Server error',
            error: err.message
        });
    }
});

// READ ALL - GET
Router.get('/', async (req, res) => {
    try {
        const [posts] = await db.promise().query('SELECT * FROM post');
        
        res.status(200).json({
            status: true,
            message: 'Posts retrieved successfully',
            data: posts
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({
            status: false,
            message: 'Server error',
            error: err.message
        });
    }
});

// READ SINGLE - GET
Router.get('/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const [post] = await db.promise().query(
            'SELECT * FROM post WHERE id = ?',
            [postId]
        );

        if (post.length === 0) {
            return res.status(404).json({
                status: false,
                message: 'Post not found'
            });
        }

        res.status(200).json({
            status: true,
            message: 'Post retrieved successfully',
            data: post[0]
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({
            status: false,
            message: 'Server error',
            error: err.message
        });
    }
});

// UPDATE - PUT
Router.put('/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const { title } = req.body;

        if (!title || typeof title !== 'string') {
            return res.status(400).json({ 
                status: false, 
                message: 'Invalid title' 
            });
        }

        const [result] = await db.promise().query(
            'UPDATE post SET post_title = ? WHERE id = ?',
            [title, postId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: false,
                message: 'Post not found'
            });
        }

        res.status(200).json({
            status: true,
            message: 'Post updated successfully',
            data: {
                id: postId,
                title
            }
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({
            status: false,
            message: 'Server error',
            error: err.message
        });
    }
});

// DELETE - DELETE
Router.delete('/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const [result] = await db.promise().query(
            'DELETE FROM post WHERE id = ?',
            [postId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: false,
                message: 'Post not found'
            });
        }

        res.status(200).json({
            status: true,
            message: 'Post deleted successfully',
            data: {
                id: postId
            }
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({
            status: false,
            message: 'Server error',
            error: err.message
        });
    }
});

module.exports = Router;