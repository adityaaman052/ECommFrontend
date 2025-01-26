import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accImg from "../../assets/banner/banner5.jpg";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";

function ShoppingAccount() {
  return (
    <div
      className="flex flex-col"
      style={{
        backgroundColor: "#0F3443", // Dark greenish-blue
        color: "#34E89E", // Light green for text
      }}
    >
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accImg}
          className="h-full w-full object-cover object-center"
          alt="Account Header"
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border border-gray-300 bg-[#0F3443] p-6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger
                value="orders"
                className="text-[#34E89E] hover:scale-105 transition-transform"
              >
                Orders
              </TabsTrigger>
              <TabsTrigger
                value="address"
                className="text-[#34E89E] hover:scale-105 transition-transform"
              >
                Address
              </TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
