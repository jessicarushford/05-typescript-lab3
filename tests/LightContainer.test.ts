import { LightContainer } from "../src/LightContainer";
import { ShippingContainer } from "../src/models/ShippingContainer";

describe("LightContainer class", () => {
  test("The destination and cargoWeight properties are set from the constructor parameters", () => {
    const newLightContainer: ShippingContainer = new LightContainer(
      "Korea",
      150
    );
    expect(newLightContainer.destination).toBe("Korea");
    expect(newLightContainer.cargoWeight).toBe(150);
  });
  test("cargoWeight defaults to 0, when the second constructor parameter is omitted", () => {
    const newLightContainer: ShippingContainer = new LightContainer("Korea");
    expect(newLightContainer.cargoWeight).toBe(0);
  });
  test("getGrossWeight returns the cargoWeight", () => {
    const newLightContainer: ShippingContainer = new LightContainer(
      "Korea",
      150
    );
    expect(newLightContainer.getGrossWeight()).toBe(150);
  });
  test("getGrossWeight returns the cargoWeight", () => {
    const newLightContainer: ShippingContainer = new LightContainer(
      "Korea",
      200
    );
    expect(newLightContainer.getGrossWeight()).toBe(200);
  });
});
