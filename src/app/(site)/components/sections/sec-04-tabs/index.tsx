"use client";

import CarsList from "@/components/cars/cars-list";
import SectionHeading from "@/components/data-display/section-heading";
import CarSkeletonLayout from "@/components/ui/car-skeleton-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useCarsBroker from "@/hooks/useCarsBroker";
import useCarsDealership from "@/hooks/useCarsDealership";
import useCarsPrivateSeller from "@/hooks/useCarsPrivateSeller";
import { useTabs } from "@/state/TabsState";
import { InView } from "react-intersection-observer";

export default function Sec04Tabs() {
  const tabsState = useTabs();
  const {
    data: privateSellerCars,
    fetchNextPage: fetchNextPrivateSellerCarsPage,
    hasNextPage: hasNextPrivateSellerCarsPage,
    isFetchingNextPage: isFetchingNextPrivateSellerCarsPage,
    isInitialLoading: isPrivateSellerCarsInitialLoading,
  } = useCarsPrivateSeller();
  const {
    data: dealershipCars,
    fetchNextPage: fetchNextDealershipCarsPage,
    hasNextPage: hasNextDealershipCarsPage,
    isFetchingNextPage: isFetchingNextDealershipCarsPage,
    isInitialLoading: isDealershipCarsInitialLoading,
  } = useCarsDealership();
  const {
    data: brokerCars,
    fetchNextPage: fetchNextBrokerCarsPage,
    hasNextPage: hasNextBrokerCarsPage,
    isFetchingNextPage: isFetchingNextBrokerCarsPage,
    isInitialLoading: isBrokerCarsInitialLoading,
  } = useCarsBroker();

  const handlePrivateSellerCarsNextPage = async (isView: boolean) => {
    if (isView && !isFetchingNextPrivateSellerCarsPage)
      await fetchNextPrivateSellerCarsPage();
  };
  const handleDealershipCarsNextPage = async (isView: boolean) => {
    if (isView && !isFetchingNextDealershipCarsPage)
      await fetchNextDealershipCarsPage();
  };
  const handleBrokerpCarsNextPage = async (isView: boolean) => {
    if (isView && !isFetchingNextBrokerCarsPage)
      await fetchNextBrokerCarsPage();
  };

  return (
    <div className="rounded-[80px]  py-10 ">
      <div className="space-y-10 sm:container">
        <SectionHeading
          className="ml-5 sm:ml-0"
          textAccent="Search"
          text="cars by seller"
        />
        <Tabs
          className="px-2 flex flex-col items-center"
          defaultValue={tabsState.tab}
          onValueChange={tabsState.setTab}
        >
          <TabsList className="mb-5">
            <TabsTrigger value="private-sellers">Private sellers</TabsTrigger>
            <TabsTrigger value="dealerships">Dealerships</TabsTrigger>
            <TabsTrigger value="brokers">Brokers</TabsTrigger>
          </TabsList>

          <TabsContent value="private-sellers" className="relative w-full">
            {privateSellerCars?.pages.map((page, i) => (
              <CarsList cars={page.data.data} key={i} />
            ))}{" "}
            {isFetchingNextPrivateSellerCarsPage ||
              (isPrivateSellerCarsInitialLoading && <CarSkeletonLayout />)}
            {hasNextPrivateSellerCarsPage && (
              <InView
                as="div"
                className="absolute bottom-[400px] h-2 w-full bg-transparent"
                onChange={handlePrivateSellerCarsNextPage}
              />
            )}
          </TabsContent>
          <TabsContent value="dealerships" className="relative w-full">
            {dealershipCars?.pages.map((page, i) => (
              <CarsList cars={page.data.data} key={i} />
            ))}{" "}
            {isFetchingNextDealershipCarsPage ||
              (isDealershipCarsInitialLoading && <CarSkeletonLayout />)}
            {hasNextDealershipCarsPage && (
              <InView
                as="div"
                className="absolute bottom-[400px] h-2 w-full bg-transparent"
                onChange={handleDealershipCarsNextPage}
              />
            )}
          </TabsContent>
          <TabsContent value="brokers" className="relative w-full">
            {brokerCars?.pages.map((page, i) => (
              <CarsList cars={page.data.data} key={i} />
            ))}{" "}
            {isFetchingNextBrokerCarsPage ||
              (isBrokerCarsInitialLoading && <CarSkeletonLayout />)}
            {hasNextBrokerCarsPage && (
              <InView
                as="div"
                className="absolute bottom-[400px] h-2 w-full bg-transparent"
                onChange={handleBrokerpCarsNextPage}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
