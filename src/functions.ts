import { ShippingContainer } from "./models/ShippingContainer";
import { Transporter } from "./models/Transporter";
import { Ship } from "./Ship";

export const findContainersByDestination = (
  array: ShippingContainer[],
  destination: string
): ShippingContainer[] => {
  return array.filter((item) => {
    return item.destination === destination;
  });
};

export const findOverweightTransporters = (
  array: Transporter[]
): Transporter[] => {
  return array.filter((item) => item.isOverweight());
};

export const isSafeToAddContainer = (
  ship: Ship,
  container: ShippingContainer
): boolean => {
  return ship.maxWeight >= ship.getTotalWeight() + container.getGrossWeight();
};
