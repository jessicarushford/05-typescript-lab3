import { ShippingContainer } from "./ShippingContainer";

export interface Transporter {
  maxWeight: number;
  addContainer: (container: ShippingContainer) => void;
  getTotalWeight: () => number;
  isOverweight: () => boolean;
}
