import {
  findContainersByDestination,
  findOverweightTransporters,
  isSafeToAddContainer,
} from "../src/functions";
import { HeavyContainer } from "../src/HeavyContainer";
import { LightContainer } from "../src/LightContainer";
import { ShippingContainer } from "../src/models/ShippingContainer";
import { Transporter } from "../src/models/Transporter";
import { Ship } from "../src/Ship";
import { Truck } from "../src/Truck";

describe("findContainersByDestination function", () => {
  test("Do a test case with an array of LightContainer", () => {
    const array: ShippingContainer[] = [
      new LightContainer("Detroit", 100),
      new LightContainer("Miami", 200),
    ];
    expect(findContainersByDestination(array, "Detroit")).toEqual([
      { destination: "Detroit", cargoWeight: 100 },
    ]);
  });
  test("Do a test case with an array that has a mix of LightContainer and HeavyContainer", () => {
    const array: ShippingContainer[] = [
      new LightContainer("Detroit", 100),
      new HeavyContainer(200, "Miami", 1000),
    ];
    expect(findContainersByDestination(array, "Detroit")).toEqual([
      { destination: "Detroit", cargoWeight: 100 },
    ]);
  });
  test("Do a test case where none of the containers match the destination", () => {
    const array: ShippingContainer[] = [
      new LightContainer("Detroit", 100),
      new HeavyContainer(200, "Miami", 1000),
    ];
    expect(findContainersByDestination(array, "Korea")).toEqual([]);
  });
  test("Do a test case with an empty array", () => {
    const array: ShippingContainer[] = [];
    expect(findContainersByDestination(array, "Korea")).toEqual([]);
  });
});

describe("findOverweightTransporters function", () => {
  test("Do a test case with an array of Trucks, some overweight, some not", () => {
    const overweightTruck: Truck = new Truck(100);
    overweightTruck.addContainer(new LightContainer("Miami", 500));
    const underweightTruck: Truck = new Truck(100);
    underweightTruck.addContainer(new LightContainer("Miami", 50));
    const trucks: Truck[] = [overweightTruck, underweightTruck];
    expect(findOverweightTransporters(trucks)).toEqual([
      { maxWeight: 100, container: { destination: "Miami", cargoWeight: 500 } },
    ]);
  });
  test("Do a test case with an array that has a mix of Truck and Ship, some overweight, some not", () => {
    const overweightTruck: Truck = new Truck(100);
    overweightTruck.addContainer(new LightContainer("Miami", 500));
    const underweightTruck: Truck = new Truck(100);
    underweightTruck.addContainer(new LightContainer("Miami", 50));
    const overweightShip: Ship = new Ship(100);
    overweightShip.addContainer(new HeavyContainer(100, "Detroit", 1000));
    const underweightShip: Ship = new Ship(100);
    underweightShip.addContainer(new LightContainer("Korea", 50));
    const vehicles: Transporter[] = [
      overweightTruck,
      underweightTruck,
      overweightShip,
      underweightShip,
    ];
    expect(findOverweightTransporters(vehicles)).toEqual([
      { maxWeight: 100, container: { destination: "Miami", cargoWeight: 500 } },
      {
        maxWeight: 100,
        containers: [
          { tareWeight: 100, destination: "Detroit", cargoWeight: 1000 },
        ],
      },
    ]);
  });
  test("Do a test case with an array of Transporters where none are overweight", () => {
    const underweightTruck: Truck = new Truck(100);
    underweightTruck.addContainer(new LightContainer("Miami", 50));
    const underweightShip: Ship = new Ship(100);
    underweightShip.addContainer(new LightContainer("Korea", 50));
    const vehicles: Transporter[] = [underweightTruck, underweightShip];
    expect(findOverweightTransporters(vehicles)).toEqual([]);
  });
  test("Do a test case with an empty array.", () => {
    const vehicles: Transporter[] = [];
    expect(findOverweightTransporters(vehicles)).toEqual([]);
  });
});

describe("isSafeToAddContainer function", () =>
  test("isSafeToAddContainer returns true for an empty ship and empty LightContainer when transporter maxWeight is 5000", () => {
    const newShip: Ship = new Ship(5000);
    expect(isSafeToAddContainer(newShip, new LightContainer("Detroit"))).toBe(
      true
    );
  }));
test("isSafeToAddContainer returns true for an empty ship and a LightContainer with some cargo, but less than maxWeight.", () => {
  const newShip: Ship = new Ship(5000);
  expect(
    isSafeToAddContainer(newShip, new LightContainer("Detroit", 4999))
  ).toBe(true);
});
test("isSafeToAddContainer returns true for an empty ship and a HeavyContainer with some cargo, but less than maxWeight.", () => {
  const newShip: Ship = new Ship(5000);
  expect(
    isSafeToAddContainer(newShip, new HeavyContainer(500, "Miami", 4000))
  ).toBe(true);
});
test("isSafeToAddContainer returns false for an empty ship and a LightContainer with some cargo, more than maxWeight.", () => {
  const newShip: Ship = new Ship(5000);
  expect(
    isSafeToAddContainer(newShip, new LightContainer("Miami", 10000))
  ).toBe(false);
});
test("isSafeToAddContainer returns false for an empty ship and a HeavyContainer with some cargo, more than maxWeight.", () => {
  const newShip: Ship = new Ship(5000);
  expect(
    isSafeToAddContainer(newShip, new HeavyContainer(5000, "Miami", 10000))
  ).toBe(false);
});
test("isSafeToAddContainer returns true for an empty ship and a container with the same gross weight as the maxWeight.", () => {
  const newShip: Ship = new Ship(5000);
  expect(
    isSafeToAddContainer(newShip, new HeavyContainer(4500, "Miami", 500))
  ).toBe(true);
});
test("Create a ship with one or more containers already added. isSafeToAddContainer returns true for a container that is light enough to be added to this ship.", () => {
  const newShip: Ship = new Ship(5000);
  newShip.addContainer(new LightContainer("Detroit", 250));
  expect(
    isSafeToAddContainer(newShip, new HeavyContainer(500, "Miami", 4000))
  ).toBe(true);
});
test("Create a ship with one or more containers already added. isSafeToAddContainer returns false for a container that is too heavy to be added to this ship.", () => {
  const newShip: Ship = new Ship(5000);
  newShip.addContainer(new LightContainer("Detroit", 250));
  expect(
    isSafeToAddContainer(newShip, new HeavyContainer(500, "Miami", 5000))
  ).toBe(false);
});
