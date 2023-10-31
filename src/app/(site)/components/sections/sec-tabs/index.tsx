"use client";

import CarsList from "@/components/cars/cars-list";
import SectionHeading from "@/components/data-display/section-heading";
import { Button } from "@/components/ui/button";
import CarSkeletonLayout from "@/components/ui/car-skeleton-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useCarsBroker from "@/hooks/useCarsBroker";
import useCarsDealership from "@/hooks/useCarsDealership";
import useCarsPrivateSeller from "@/hooks/useCarsPrivateSeller";
import { useTabs } from "@/state/TabsState";
import { InView } from "react-intersection-observer";

export default function SecTabs() {
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

  const handlePrivateSellerCarsNextPage = async () => {
    if (!isFetchingNextPrivateSellerCarsPage)
      await fetchNextPrivateSellerCarsPage();
  };
  const handleDealershipCarsNextPage = async () => {
    if (!isFetchingNextDealershipCarsPage) await fetchNextDealershipCarsPage();
  };
  const handleBrokersCarsNextPage = async () => {
    if (!isFetchingNextBrokerCarsPage) await fetchNextBrokerCarsPage();
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
          className="flex flex-col items-center px-2"
          defaultValue={tabsState.tab}
          onValueChange={tabsState.setTab}
        >
          <TabsList className="mb-5">
            <TabsTrigger value="private-sellers">Private sellers</TabsTrigger>
            <TabsTrigger value="dealerships">Dealerships</TabsTrigger>
            <TabsTrigger value="brokers">Brokers</TabsTrigger>
          </TabsList>

          <TabsContent
            value="private-sellers"
            className="relative w-full space-y-1 sm:space-y-4"
          >
            {privateSellerCars?.pages.map((page, i) => (
              <CarsList cars={page.data.data} key={i} />
            ))}{" "}
            {isFetchingNextPrivateSellerCarsPage ||
              (isPrivateSellerCarsInitialLoading && <CarSkeletonLayout />)}
            {hasNextPrivateSellerCarsPage && (
              <div className="grid place-content-center">
                <Button
                  onClick={handlePrivateSellerCarsNextPage}
                  className="w-fit"
                  variant="red"
                >
                  More cars
                </Button>
              </div>
            )}
          </TabsContent>
          <TabsContent
            value="dealerships"
            className="relative w-full space-y-1 sm:space-y-4"
          >
            {dealershipCars?.pages.map((page, i) => (
              <CarsList cars={page.data.data} key={i} />
            ))}{" "}
            {isFetchingNextDealershipCarsPage ||
              (isDealershipCarsInitialLoading && <CarSkeletonLayout />)}
            {hasNextDealershipCarsPage && (
              <div className="grid place-content-center">
                <Button
                  onClick={handleDealershipCarsNextPage}
                  className="w-fit"
                  variant="red"
                >
                  More cars
                </Button>
              </div>
            )}
          </TabsContent>
          <TabsContent
            value="brokers"
            className="relative w-full space-y-1 sm:space-y-4"
          >
            {brokerCars?.pages.map((page, i) => (
              <CarsList cars={page.data.data} key={i} />
            ))}{" "}
            {isFetchingNextBrokerCarsPage ||
              (isBrokerCarsInitialLoading && <CarSkeletonLayout />)}
            {hasNextBrokerCarsPage && (
              <div className="grid place-content-center">
                <Button
                  onClick={handleBrokersCarsNextPage}
                  className="w-fit"
                  variant="red"
                >
                  More cars
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
