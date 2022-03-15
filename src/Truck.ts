import { ShippingContainer } from "./models/ShippingContainer";
import { Transporter } from "./models/Transporter";

export class Truck implements Transporter {
  maxWeight: number;
  container: ShippingContainer | null = null;
  constructor(maxWeight: number) {
    this.maxWeight = maxWeight;
  }
  addContainer(container: ShippingContainer): void {
    this.container = container;
  }
  getTotalWeight(): number {
    return this.container ? this.container.getGrossWeight() : 0;
  }
  isOverweight(): boolean {
    return this.getTotalWeight() > this.maxWeight;
  }
}
