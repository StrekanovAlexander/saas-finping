import { Asset, Tracking } from '../models/index.js';
import { checkTrackings } from '../services/trackingService.js';

export const createTracking = async (req, res) => {
    try {
        const tracking = await Tracking.create(req.body);
        res.status(201).json(tracking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getTrackings = async (req, res) => {
    try {
        const trackings = await Tracking.findAll({ include: Asset });
        res.json(trackings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getTracking = async (req, res) => {
    try {
        const asset = await Tracking.findByPk(req.params.id);
        if (!asset) return res.status(404).json({ error: 'Tracking not found' });
        res.json(asset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateTracking = async (req, res) => {
    try {
        const tracking = await Tracking.findByPk(req.params.id);
        if (!tracking) return res.status(404).json({ error: 'Tracking not found' });
        await tracking.update(req.body);
        res.json(tracking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteTracking = async (req, res) => {
    try {
        const tracking = await Tracking.findByPk(req.params.id);
        if (!tracking) return res.status(404).json({ error: 'Tracking not found' });
        await tracking.destroy();
        res.json({ message: 'Tracking deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const runTrackingsManually = async (req, res) => {
  try {
    await checkTrackings();
    res.json({ message: 'Trackings checked manually' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserTrackings = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ message: "User id is required" });
        }
        const trackings = await Tracking.findAll({ 
            where: { userId },
            order: [["createdAt", "DESC"]], 
            include: Asset 
        });
        res.json(trackings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
