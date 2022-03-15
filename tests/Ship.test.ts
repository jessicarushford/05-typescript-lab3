import { HeavyContainer } from "../src/HeavyContainer";
import { LightContainer } from "../src/LightContainer";
import { Ship } from "../src/Ship";

describe("Ship class", () => {
  test("The maxWeight property is set from the constructor parameter", () => {
    const newShip: Ship = new Ship(100);
    expect(newShip.maxWeight).toBe(100);
  });
  test("The containers property is set to an empty array in a new Ship instance", () => {
    const newShip: Ship = new Ship(100);
    expect(newShip.containers).toEqual([]);
  });
  test("Calling addContainer adds to the containers array property", () => {
    const newShip: Ship = new Ship(100);
    newShip.addContainer(new HeavyContainer(50, "Detroit", 1000));
    expect(newShip.containers).toEqual([
      { tareWeight: 50, destination: "Detroit", cargoWeight: 1000 },
    ]);
  });
  test("Calling addContainer twice adds both containers to the containers array property.", () => {
    const newShip: Ship = new Ship(100);
    newShip.addContainer(new HeavyContainer(50, "Detroit", 1000));
    newShip.addContainer(new HeavyContainer(50, "Detroit", 1000));
    expect(newShip.containers).toEqual([
      { tareWeight: 50, destination: "Detroit", cargoWeight: 1000 },
      { tareWeight: 50, destination: "Detroit", cargoWeight: 1000 },
    ]);
  });
  test("getTotalWeight returns the combined gross weight of the containers in the array.", () => {
    const newShip: Ship = new Ship(100);
    newShip.addContainer(new HeavyContainer(50, "Detroit", 1000));
    newShip.addContainer(new HeavyContainer(50, "Detroit", 1000));
    expect(newShip.getTotalWeight()).toBe(2100);
  });
  test("getTotalWeight returns the combined gross weight of the containers in the array.", () => {
    const newShip: Ship = new Ship(100);
    newShip.addContainer(new HeavyContainer(50, "Detroit", 1000));
    newShip.addContainer(new LightContainer("Detroit", 50));
    expect(newShip.getTotalWeight()).toBe(1100);
  });
  test("getTotalWeight returns 0 when containers is empty", () => {
    const newShip: Ship = new Ship(100);
    expect(newShip.getTotalWeight()).toBe(0);
  });
  test("isOverweight returns true when the total weight is greater than maxWeight", () => {
    const newShip: Ship = new Ship(100);
    newShip.addContainer(new HeavyContainer(50, "Detroit", 1000));
    expect(newShip.isOverweight()).toBe(true);
  });
  test("isOverweight returns false when the total weight is less than maxWeight", () => {
    const newShip: Ship = new Ship(100);
    newShip.addContainer(new HeavyContainer(50, "Detroit", 49));
    expect(newShip.isOverweight()).toBe(false);
  });
  test("isOverweight returns false when the total weight is equal to maxWeight", () => {
    const newShip: Ship = new Ship(100);
    newShip.addContainer(new HeavyContainer(50, "Detroit", 50));
    expect(newShip.isOverweight()).toBe(false);
  });
});
