import { HeavyContainer } from "../src/HeavyContainer";
import { ShippingContainer } from "../src/models/ShippingContainer";

describe("HeavyContainer class", () => {
  test("The tareWeight, destination, and cargoWeight properties are set from the constructor parameters", () => {
    const newHeavyContainer: HeavyContainer = new HeavyContainer(
      100,
      "Michigan",
      200
    );
    expect(newHeavyContainer.tareWeight).toBe(100);
    expect(newHeavyContainer.destination).toBe("Michigan");
    expect(newHeavyContainer.cargoWeight).toBe(200);
  });
  test("cargoWeight defaults to 0, when the third constructor parameter is omitted", () => {
    const newHeavyContainer: HeavyContainer = new HeavyContainer(
      100,
      "Michigan"
    );
    expect(newHeavyContainer.cargoWeight).toBe(0);
  });
  test("getGrossWeight returns the tareWeight plus the cargoWeight", () => {
    const newHeavyContainer: HeavyContainer = new HeavyContainer(
      100,
      "Michigan",
      200
    );
    expect(newHeavyContainer.getGrossWeight()).toBe(300);
  });
  test("getGrossWeight returns the tareWeight plus the cargoWeight", () => {
    const newHeavyContainer: HeavyContainer = new HeavyContainer(
      200,
      "Michigan",
      500
    );
    expect(newHeavyContainer.getGrossWeight()).toBe(700);
  });
});
