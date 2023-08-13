/**
 * @swagger
 * tags:
 *   name: Characters
 *   description: API to manage characters in a screenplay
 */

/**
 * @swagger
 * /api/characters:
 *   post:
 *     summary: Create a new character
 *     tags: [Characters]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Character data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CharacterInput'
 *     responses:
 *       '201':
 *         description: Character created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Character'
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/characters:
 *   get:
 *     summary: Get all characters
 *     tags: [Characters]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Character'
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/characters/{id}:
 *   get:
 *     summary: Get a character by ID
 *     tags: [Characters]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the character
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Character'
 *       '404':
 *         description: Character not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/characters/{id}:
 *   put:
 *     summary: Update a character by ID
 *     tags: [Characters]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the character
 *     requestBody:
 *       description: Updated character data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CharacterInput'
 *     responses:
 *       '200':
 *         description: Character updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Character'
 *       '404':
 *         description: Character not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/characters/{id}:
 *   delete:
 *     summary: Delete a character by ID
 *     tags: [Characters]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the character
 *     responses:
 *       '200':
 *         description: Character deleted successfully
 *       '404':
 *         description: Character not found
 *       '500':
 *         description: Internal server error
 */

const express = require("express");
const characterController = require("../controllers/characterController");
const authMiddleware = require("../middleware/authMiddleware");

const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const router = express.Router();

router.post("/", authMiddleware, upload.array("image"), characterController.createCharacter);

router.get("/", authMiddleware, characterController.getAllCharacters);
 
router.get("/:id", authMiddleware, characterController.getCharacterById);

router.put("/:id", authMiddleware, characterController.updateCharacter);

router.delete("/:id", authMiddleware, characterController.deleteCharacter);

module.exports = router;
