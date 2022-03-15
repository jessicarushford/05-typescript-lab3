import { LightContainer } from "../src/LightContainer";
import { Transporter } from "../src/models/Transporter";
import { Truck } from "../src/Truck";

describe("Truck class", () => {
  test("The maxWeight property is set from the constructor parameter", () => {
    const newTruck: Truck = new Truck(100);
    expect(newTruck.maxWeight).toBe(100);
  });
  test("The container property is set to null in a new Truck instance", () => {
    const newTruck: Truck = new Truck(100);
    expect(newTruck.container).toBe(null);
  });
  test("Calling addContainer sets the container property", () => {
    const newTruck: Truck = new Truck(100);
    newTruck.addContainer(new LightContainer("Detroit", 50));
    expect(newTruck.container).toEqual({
      destination: "Detroit",
      cargoWeight: 50,
    });
  });
  test("getTotalWeight returns the gross weight of the container when a container is added", () => {
    const newTruck: Truck = new Truck(100);
    newTruck.addContainer(new LightContainer("Detroit", 50));
    expect(newTruck.getTotalWeight()).toBe(50);
  });
  test("getTotalWeight returns the gross weight of the container when a container is added", () => {
    const newTruck: Truck = new Truck(100);
    expect(newTruck.getTotalWeight()).toBe(0);
  });
  test("isOverweight returns true when the total weight is greater than maxWeight", () => {
    const newTruck: Truck = new Truck(100);
    newTruck.addContainer(new LightContainer("Detroit", 150));
    expect(newTruck.isOverweight()).toBe(true);
  });
  test("isOverweight returns false when the total weight is less than maxWeight", () => {
    const newTruck: Truck = new Truck(100);
    newTruck.addContainer(new LightContainer("Detroit", 99));
    expect(newTruck.isOverweight()).toBe(false);
  });
  test("isOverweight returns false when the total weight is equal to maxWeight", () => {
    const newTruck: Truck = new Truck(100);
    newTruck.addContainer(new LightContainer("Detroit", 100));
    expect(newTruck.isOverweight()).toBe(false);
  });
});
