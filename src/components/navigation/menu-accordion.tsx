import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import RouteItem from "./route-item";
import { menuRoutes } from "@/data/navigation-data";

type Props = {
  closeDrawer: () => void;
};
export default function MenuAccordion({ closeDrawer }: Props) {
  return (
    <Accordion type="single" collapsible className="space-y-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>Cars</AccordionTrigger>
        <AccordionContent onClick={closeDrawer}>
          {menuRoutes.cars.map((route) => (
            <RouteItem route={route} key={route.href} />
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Sellers</AccordionTrigger>
        <AccordionContent onClick={closeDrawer}>
          {menuRoutes.sellers.map((route) => (
            <RouteItem route={route} key={route.href} />
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Sell</AccordionTrigger>
        <AccordionContent onClick={closeDrawer}>
          {menuRoutes.sell.map((route) => (
            <RouteItem route={route} key={route.href} />
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>Services</AccordionTrigger>
        <AccordionContent onClick={closeDrawer}>
          {menuRoutes.services.map((route) => (
            <RouteItem route={route} key={route.href} />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
