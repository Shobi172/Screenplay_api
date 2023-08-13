const supertest = require("supertest");
const express = require("express");
const propertyController = require("../controllers/propertyController");
const Property = require("../models/Property");

const app = express();
app.use(express.json());

// Mock Property model methods
jest.mock("../models/Property");

app.post("/api/properties", propertyController.createProperty);
app.get("/api/properties", propertyController.getAllProperties);
app.get("/api/properties/:id", propertyController.getPropertyById);
app.put("/api/properties/:id", propertyController.updateProperty);
app.delete("/api/properties/:id", propertyController.deleteProperty);

const request = supertest(app);

describe("Property Controller", () => {
  it("should create a new property", async () => {
    // Mock data and expected response
    const reqBody = {
      name: "Size",
      value: "Large",
      description: "Property to indicate size",
    };
    const expectedResponse = { _id: "mockPropertyId", ...reqBody };

    // Mock the Property.create method
    Property.create.mockResolvedValue(expectedResponse);

    const response = await request.post("/api/properties").send(reqBody);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expectedResponse);
  });

  it("should get all properties", async () => {
    // Mock data and expected response
    const mockProperties = [
      {
        _id: "propertyId1",
        name: "Color",
        value: "Blue",
        description: "Color property",
      },
      {
        _id: "propertyId2",
        name: "Weight",
        value: "Heavy",
        description: "Weight property",
      },
    ];

    // Mock the Property.find method
    Property.find.mockResolvedValue(mockProperties);

    const response = await request.get("/api/properties");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProperties);
  });

  it("should get a property by ID", async () => {
    // Mock data and expected response
    const propertyId = "propertyId1";
    const mockProperty = {
      _id: propertyId,
      name: "Color",
      value: "Blue",
      description: "Color property",
    };

    // Mock the Property.findById method
    Property.findById.mockResolvedValue(mockProperty);

    const response = await request.get(`/api/properties/${propertyId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProperty);
  });

  it("should update a property by ID", async () => {
    // Mock data and expected response
    const propertyId = "propertyId1";
    const updatedPropertyData = {
      name: "Size",
      value: "Medium",
      description: "Size property",
    };
    const updatedProperty = { _id: propertyId, ...updatedPropertyData };

    // Mock the Property.findByIdAndUpdate method
    Property.findByIdAndUpdate.mockResolvedValue(updatedProperty);

    const response = await request
      .put(`/api/properties/${propertyId}`)
      .send(updatedPropertyData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedProperty);
  });

  it("should delete a property by ID", async () => {
    // Mock data
    const propertyId = "propertyId1";

    // Mock the Property.findByIdAndDelete method
    Property.findByIdAndDelete.mockResolvedValue({ _id: propertyId });

    const response = await request.delete(`/api/properties/${propertyId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Property deleted successfully" });
  });
});
