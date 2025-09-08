import bcrypt from 'bcrypt';
import { User } from '../models/index.js';

export async function createUser(req, res) {
    try {
        const { email, passwordHash, telegramId } = req.body;

        const existing = await User.findOne({ where: { email } });
        if (existing) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const user = await User.create({ email, passwordHash, telegramId });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getUsers(req, res) {
    try {
        const users = await User.findAll();
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
