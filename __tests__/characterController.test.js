const supertest = require("supertest");
const express = require("express");
const characterController = require("../controllers/characterController");
const Character = require("../models/Character");

const app = express();
app.use(express.json());

// Mock Character model methods
jest.mock("../models/Character");

// Mock middleware function for authentication
const authMiddleware = (req, res, next) => {
  req.user = { _id: "mockUserId" };
  next();
};

app.post(
  "/api/characters",
  authMiddleware,
  characterController.createCharacter
);
app.get(
  "/api/characters",
  authMiddleware,
  characterController.getAllCharacters
);
app.get(
  "/api/characters/:id",
  authMiddleware,
  characterController.getCharacterById
);
app.put(
  "/api/characters/:id",
  authMiddleware,
  characterController.updateCharacter
);
app.delete(
  "/api/characters/:id",
  authMiddleware,
  characterController.deleteCharacter
);

const request = supertest(app);

describe("Character Controller", () => {
  it("should create a new character", async () => {
    // Mock data and expected response
    const reqBody = {
      name: "Alice",
      age: 28,
      gender: "female",
      occupation: "Software Engineer",
      relations: '["relationId1", "relationId2"]',
      properties: '["propertyId1", "propertyId2"]',
    };
    const expectedResponse = { _id: "mockCharacterId", ...reqBody };

    // Mock the Character.create method to resolve with expectedResponse
    Character.create.mockResolvedValue(expectedResponse);

    // Send a POST request to create a new character
    const response = await request.post("/api/characters").send(reqBody);

    // Debug: Log response status and body

    // Expect the response status to be 201 (Created)
    expect(response.status).toBe(201);

    // Expect the response body to match the expectedResponse
    expect(response.body).toEqual(expectedResponse);
  });

  it("should get all characters", async () => {
    // Mock data and expected response
    const mockCharacters = [
      { _id: "char1", name: "Alice" },
      { _id: "char2", name: "Bob" },
    ];
    Character.find.mockResolvedValue(mockCharacters);

    const response = await request.get("/api/characters");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockCharacters);
  });

  it("should get a character by ID", async () => {
    // Mock data and expected response
    const characterId = "char1";
    const mockCharacter = { _id: characterId, name: "Alice" };
    Character.findById.mockResolvedValue(mockCharacter);

    const response = await request.get(`/api/characters/${characterId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockCharacter);
  });

  it("should update a character by ID", async () => {
    // Mock data and expected response
    const characterId = "char1";
    const updatedData = { name: "Updated Name" };
    const updatedCharacter = { _id: characterId, ...updatedData };
    Character.findByIdAndUpdate.mockResolvedValue(updatedCharacter);

    const response = await request
      .put(`/api/characters/${characterId}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedCharacter);
  });

  it("should delete a character by ID", async () => {
    // Mock data and expected response
    const characterId = "char1";
    const deletedCharacter = { _id: characterId, name: "Alice" };
    Character.findByIdAndDelete.mockResolvedValue(deletedCharacter);

    const response = await request.delete(`/api/characters/${characterId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Character deleted successfully",
    });
  });
});
