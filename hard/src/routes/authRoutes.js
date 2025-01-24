import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password } = req.body

    const hashedPassword = bcrypt.hashSync(password, 10)
    console.log(hashedPassword)

    try {
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        })

        const defaultTodo = `Hello :) Add your first Todo!`
        await prisma.todo.create({
            data: {
                task: defaultTodo,
                user: user.id
            }
        })


        const token = jwt.sign({id: result.lastInsertRowid}, process.env.JWT_SECRET, {expiresIn: "24h"})
        res.json({ token })
    } catch (error) {
        console.log(error.message)
        res.sendStatus(503)
    }
    res.sendStatus(201)
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })

        if (!user) {
            return res.status(404).send({message: "User not found"})
        } 
        const passwordIsValid = bcrypt.compareSync(password, user.password)
        if (!passwordIsValid) {
            return res.status(401).send({message: "Invalid password"})
        }
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "24h"})
        res.json({token})
    } catch (error) {
        console.log(error.message)
        res.sendStatus(503)
    }
})


export default router;