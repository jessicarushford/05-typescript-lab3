import { ShippingContainer } from "./models/ShippingContainer";
import { Transporter } from "./models/Transporter";

export class Ship implements Transporter {
  maxWeight: number;
  containers: ShippingContainer[] = [];
  constructor(maxWeight: number) {
    this.maxWeight = maxWeight;
  }
  addContainer(container: ShippingContainer): void {
    this.containers.push(container);
  }
  getTotalWeight(): number {
    if (this.containers.length === 0) {
      return 0;
      //   do not need === 0 for empty array becuz it has an initial value
    } else {
      return this.containers.reduce((prev, curr) => {
        return prev + curr.getGrossWeight();
      }, 0);
    }
  }
  isOverweight(): boolean {
    return this.getTotalWeight() > this.maxWeight;
  }
}
