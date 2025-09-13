import bcrypt from 'bcrypt';
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { User } from '../models/index.js';
import { sendActivationToken } from '../services/resendService.js';

export async function createUser(req, res) {
    try {
        const { email, password, telegramId, subscribe } = req.body;

        const existing = await User.findOne({ where: { email } });
        
        if (existing) {
            return res.status(400).json({ error: `Email ${ email } already in use` });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const activationToken = crypto.randomBytes(32).toString("hex");

        const user = await User.create({ email, passwordHash, telegramId, subscribe, activationToken });

        await sendActivationToken(user.email, activationToken);

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getUsers(req, res) {
    try {
        if (req.user.role !== "admin") {
           return res.status(403).json({ message: "Access denied" });
        }

        const users = await User.findAll({
            attributes: ["id", "email", "telegramId", "active", "subscribe", "role", "createdAt", "updatedAt"] 
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getUser(req, res) {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { email, passwordHash, telegramId, active } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Prevent duplicate email on update
        if (email && email !== user.email) {
            const existing = await User.findOne({ where: { email } });
            if (existing) {
                return res.status(400).json({ error: 'Email already in use' });
            }
            user.email = email;
        }

        if (passwordHash !== undefined) user.passwordHash = passwordHash;
        if (telegramId !== undefined) user.telegramId = telegramId;
        if (active !== undefined) user.active = active;

        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function deleteUser(req, res) {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        await user.destroy();
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function changePasswordHash(req, res) {
    try {
        const { id } = req.params;
        const { password, confirmPassword } = req.body;

        if (!password || !confirmPassword) {
            return res.status(400).json({ error: 'Password and confirmPassword are required' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const hashed = await bcrypt.hash(password, 10);
        user.passwordHash = hashed;
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function activateUser (req, res) {
    const { token } = req.params;
    try {
        const user = await User.findOne({ where: { activationToken: token } });
        if (!user) return res.status(400).json({ message: "Invalid token" });

        user.active = true;
        user.activationToken = null;
        await user.save();
        // res.status(200).json({ message: "Account activated successfully" });
        return res.redirect("https://www.finping.space/login");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        // check user
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        // check active
        if (!user.active) {
            return res.status(403).json({ message: "Please activate your account" });
        }
        // check password
        const validPassword = await bcrypt.compare(password, user.passwordHash);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        // create JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || "supersecret",
            { expiresIn: "1h" }
        );

        res.json({ message: "Login successful", token, user });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error" });
    }
};
