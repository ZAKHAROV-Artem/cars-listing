"use client";

import CarsList from "@/components/cars/cars-list";
import SectionHeading from "@/components/data-display/section-heading";
import { Button } from "@/components/ui/button";
import CarSkeletonLayout from "@/components/ui/car-skeleton-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useCarsBroker from "@/hooks/useCarsBroker";
import useCarsDealership from "@/hooks/useCarsDealership";
import useCarsPrivateSeller from "@/hooks/useCarsPrivateSeller";
import useCarsRecent from "@/hooks/useCarsRecent";
import { useTabs } from "@/state/TabsState";

export default function SecTabs() {
  const tabsState = useTabs();
  const { data: recentCars, isInitialLoading: isRecentCarsInitialLoading } =
    useCarsRecent();
  const {
    data: privateSellerCars,
    fetchNextPage: fetchNextPrivateSellerCarsPage,
    hasNextPage: hasNextPrivateSellerCarsPage,
    isLoading: isPrivateSellerCarsLoading,
  } = useCarsPrivateSeller();
  const {
    data: dealershipCars,
    fetchNextPage: fetchNextDealershipCarsPage,
    hasNextPage: hasNextDealershipCarsPage,
    isLoading: isDealershipCarsLoading,
  } = useCarsDealership();
  const {
    data: brokerCars,
    fetchNextPage: fetchNextBrokerCarsPage,
    hasNextPage: hasNextBrokerCarsPage,
    isLoading: isBrokerCarsLoading,
  } = useCarsBroker();

  const handlePrivateSellerCarsNextPage = async () => {
    if (!isPrivateSellerCarsLoading) await fetchNextPrivateSellerCarsPage();
  };
  const handleDealershipCarsNextPage = async () => {
    if (!isDealershipCarsLoading) await fetchNextDealershipCarsPage();
  };
  const handleBrokersCarsNextPage = async () => {
    if (!isBrokerCarsLoading) await fetchNextBrokerCarsPage();
  };

  return (
    <div className="">
      <div className=" space-y-10 sm:container">
        <SectionHeading
          className="ml-5 hidden sm:ml-0"
          textAccent="Search"
          text="cars by seller"
        />
        <Tabs
          className="relative flex flex-col items-center px-2"
          defaultValue={tabsState.tab}
          onValueChange={tabsState.setTab}
        >
          <TabsList className="sticky left-0 top-[100px] z-10 mb-5 ">
            <TabsTrigger value="recent-cars">Recent cars</TabsTrigger>
            <TabsTrigger value="private-sellers">Private sellers</TabsTrigger>
            <TabsTrigger value="brokers">Brokers</TabsTrigger>
            <TabsTrigger value="dealerships">Dealerships</TabsTrigger>
          </TabsList>
          <TabsContent
            value="recent-cars"
            className="relative w-full space-y-1 sm:space-y-4"
          >
            {recentCars?.data.data && <CarsList cars={recentCars.data.data} />}
            {isRecentCarsInitialLoading && <CarSkeletonLayout />}
          </TabsContent>
          <TabsContent
            value="private-sellers"
            className="relative w-full space-y-1 sm:space-y-4"
          >
            {privateSellerCars?.pages.map((page, i) => (
              <CarsList cars={page.data.data} key={i} />
            ))}{" "}
            {isPrivateSellerCarsLoading && <CarSkeletonLayout />}
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
            {isDealershipCarsLoading && <CarSkeletonLayout />}
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
            {isBrokerCarsLoading && <CarSkeletonLayout />}
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
