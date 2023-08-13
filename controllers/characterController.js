const Character = require("../models/Character");
const characterController = {
  createCharacter: async (req, res) => {
    try {
      const { name, age, gender, occupation } = req.body;
      const userId = req.user._id;

      const relations = JSON.parse(req.body.relations);
      const properties = JSON.parse(req.body.properties);

      const photos = req?.files?.map((file) => ({
        url: file.path,
        filename: file.filename,
      }));

      const characterData = {
        user: userId,
        name,
        age,
        gender,
        occupation,
        relations,
        properties,
        photos,
      };

      const character = await Character.create(characterData);
      res.status(201).json(character);
    } catch (error) {
      console.error("Error in createCharacter:", error);
      res
        .status(500)
        .json({ message: "Error creating character", error: error.message });
    }
  },

  getAllCharacters: async (req, res) => {
    try {
      const characters = await Character.find();
      res.status(200).json(characters);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving characters", error: error.message });
    }
  },

  getCharacterById: async (req, res) => {
    try {
      const characterId = req.params.id;
      const character = await Character.findById(characterId);
      if (!character) {
        return res.status(404).json({ message: "Character not found" });
      }
      res.status(200).json(character);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving character", error: error.message });
    }
  },

  updateCharacter: async (req, res) => {
    try {
      const characterId = req.params.id;
      const updatedCharacterData = req.body;
      const updatedCharacter = await Character.findByIdAndUpdate(
        characterId,
        updatedCharacterData,
        { new: true }
      );
      if (!updatedCharacter) {
        return res.status(404).json({ message: "Character not found" });
      }
      res.status(200).json(updatedCharacter);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating character", error: error.message });
    }
  },

  deleteCharacter: async (req, res) => {
    try {
      const characterId = req.params.id;
      const deletedCharacter = await Character.findByIdAndDelete(characterId);
      if (!deletedCharacter) {
        return res.status(404).json({ message: "Character not found" });
      }
      res.status(200).json({ message: "Character deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting character", error: error.message });
    }
  },
};

module.exports = characterController;
