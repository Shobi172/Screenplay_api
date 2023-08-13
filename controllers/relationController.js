const Relation = require("../models/Relation");

const relationController = {
  createRelation: async (req, res) => {
    try {
      const { name, description } = req.body;
      const relation = await Relation.create({ name, description });
      res.status(201).json(relation);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating relation", error: error.message });
    }
  },

  getAllRelations: async (req, res) => {
    try {
      const relations = await Relation.find();
      res.status(200).json(relations);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving relations", error: error.message });
    }
  },

  getRelationById: async (req, res) => {
    try {
      const relationId = req.params.id;
      const relation = await Relation.findById(relationId);
      if (!relation) {
        return res.status(404).json({ message: "Relation not found" });
      }
      res.status(200).json(relation);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving relation", error: error.message });
    }
  },

  updateRelation: async (req, res) => {
    try {
      const relationId = req.params.id;
      const { name, description } = req.body;
      const updatedRelation = await Relation.findByIdAndUpdate(
        relationId,
        { name, description },
        { new: true }
      );
      if (!updatedRelation) {
        return res.status(404).json({ message: "Relation not found" });
      }
      res.status(200).json(updatedRelation);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating relation", error: error.message });
    }
  },

  deleteRelation: async (req, res) => {
    try {
      const relationId = req.params.id;
      const deletedRelation = await Relation.findByIdAndDelete(relationId);
      if (!deletedRelation) {
        return res.status(404).json({ message: "Relation not found" });
      }
      res.status(200).json({ message: "Relation deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting relation", error: error.message });
    }
  },
};

module.exports = relationController;
