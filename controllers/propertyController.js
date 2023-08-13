const Property = require("../models/Property");

const propertyController = {
  createProperty: async (req, res) => {
    try {
      const { name, value, description } = req.body;
      const property = await Property.create({ name, value, description });
      res.status(201).json(property);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating property", error: error.message });
    }
  },

  getAllProperties: async (req, res) => {
    try {
      const properties = await Property.find();
      res.status(200).json(properties);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving properties", error: error.message });
    }
  },

  getPropertyById: async (req, res) => {
    try {
      const propertyId = req.params.id;
      const property = await Property.findById(propertyId);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      res.status(200).json(property);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving property", error: error.message });
    }
  },

  updateProperty: async (req, res) => {
    try {
      const propertyId = req.params.id;
      const { name, value, description } = req.body;
      const updatedProperty = await Property.findByIdAndUpdate(
        propertyId,
        { name, value, description },
        { new: true }
      );
      if (!updatedProperty) {
        return res.status(404).json({ message: "Property not found" });
      }
      res.status(200).json(updatedProperty);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating property", error: error.message });
    }
  },

  deleteProperty: async (req, res) => {
    try {
      const propertyId = req.params.id;
      const deletedProperty = await Property.findByIdAndDelete(propertyId);
      if (!deletedProperty) {
        return res.status(404).json({ message: "Property not found" });
      }
      res.status(200).json({ message: "Property deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting property", error: error.message });
    }
  },
};

module.exports = propertyController;
