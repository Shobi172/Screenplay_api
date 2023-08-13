/**
 * @swagger
 * tags:
 *   name: Relations
 *   description: API to manage relations between characters
 */

/**
 * @swagger
 * /api/relations:
 *   post:
 *     summary: Create a new relation
 *     tags: [Relations]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Relation data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RelationInput'
 *     responses:
 *       '201':
 *         description: Relation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Relation'
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/relations:
 *   get:
 *     summary: Get all relations
 *     tags: [Relations]
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
 *                 $ref: '#/components/schemas/Relation'
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/relations/{id}:
 *   get:
 *     summary: Get a relation by ID
 *     tags: [Relations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the relation
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Relation'
 *       '404':
 *         description: Relation not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/relations/{id}:
 *   put:
 *     summary: Update a relation by ID
 *     tags: [Relations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the relation
 *     requestBody:
 *       description: Updated relation data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RelationInput'
 *     responses:
 *       '200':
 *         description: Relation updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Relation'
 *       '404':
 *         description: Relation not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/relations/{id}:
 *   delete:
 *     summary: Delete a relation by ID
 *     tags: [Relations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the relation
 *     responses:
 *       '200':
 *         description: Relation deleted successfully
 *       '404':
 *         description: Relation not found
 *       '500':
 *         description: Internal server error
 */




const express = require('express');
const relationController = require('../controllers/relationController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/', authMiddleware, relationController.createRelation);

router.get('/', authMiddleware, relationController.getAllRelations);

router.get('/:id', authMiddleware, relationController.getRelationById);

router.put('/:id', authMiddleware, relationController.updateRelation);

router.delete('/:id', authMiddleware, relationController.deleteRelation);

module.exports = router;
