/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { Divider, Pill } from "@mantine/core";
import { Barchat } from "../../../assets/svg";
import frame from "../../../assets/images/frame01.png";
import frame2 from "../../../assets/images/frame02.png";
import frame3 from "../../../assets/images/frame03.png";
import frame4 from "../../../assets/images/frame04.png";

const PointOfSales = () => {
  // --- Animation Variants ---
  
  // Fade and slide up for text containers
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  // Lift and scale effect for images
  const imageVariants = {
    initial: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.8 } 
    },
    hover: { 
      y: -12, 
      scale: 1.03, 
      transition: { duration: 0.4, ease: "easeInOut" } 
    }
  };

  // Staggering the list items
  const listContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const listItem = {
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0 }
  };

  // --- Data Arrays ---

  const sales = [
    { icon: Barchat, label: "Sales Processing" },
    { icon: Barchat, label: "Product and inventory management" },
    { icon: Barchat, label: "Returns log" },
    { icon: Barchat, label: "Customer management" },
    { icon: Barchat, label: "Discounts/Promo and so much more..." },
  ];

  const purchase = [
    { icon: Barchat, label: "Inventory Tracking" },
    { icon: Barchat, label: "Purchase Invoice" },
    { icon: Barchat, label: "Supplier Management" },
  ];

  const finance = [
    { icon: Barchat, label: "Sales and Purchase Invoice" },
    { icon: Barchat, label: "Journal Entry" },
    { icon: Barchat, label: "Account Reconciliation" },
    { icon: Barchat, label: "Transaction Management" },
  ];

  const asset = [
    { icon: Barchat, label: "Asset Request and Register" },
    { icon: Barchat, label: "Procurement" },
    { icon: Barchat, label: "Reports" },
  ];

  // Helper Component for the Feature Lists
  const AnimatedList = ({ items, cols = "grid-cols-1" }: { items: any[], cols?: string }) => (
    <motion.div 
      variants={listContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`grid ${cols} gap-4 mt-6`}
    >
      <div className="text-[#667085] font-sans col-span-full">Some features include:</div>
      {items.map((item, i) => (
        <motion.div
          key={i}
          variants={listItem}
          className="grid grid-cols-[auto_1fr] items-center gap-2"
        >
          <item.icon height="20" width="20" />
          <p className="text-sm font-clash-medium text-gray-800">{item.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );

  return (
    <main className="overflow-hidden">
      {/* 1. POINT OF SALES */}
      <Divider
        label={<Pill size="xl" c="#F16722" bg="#F1672226" py="10" px={24} h={"auto"} w={"auto"}>Point of Sales</Pill>}
        labelPosition="center"
        py="10"
        color="#F8E2D8"
        size="sm"
        styles={{ root: { borderColor: "#F8E2D8" }, label: { backgroundColor: "transparent" } }}
      />
      <section className="py-8 sm:py-10 max-w-7xl mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div 
            variants={fadeInUp as import("framer-motion").Variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col h-full bg-[#F0F2F5] rounded-[16px] p-[40px]"
          >
            <h2 className="text-[#101828] text-2xl sm:text-3xl font-clash-medium">Point of Sales System</h2>
            <p className="mt-4 text-[#667085] font-sans">
              This covers sales, inventory, products, discounts, customer management and so many other in-store functionalities needed for businesses to make and manage sales.
            </p>
            <AnimatedList items={sales} />
          </motion.div>

          <motion.div 
            variants={imageVariants as import("framer-motion").Variants}
            initial="initial"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
            className="flex justify-center lg:justify-end cursor-pointer"
          >
            <img src={frame} alt="ERP POS" className="w-full object-contain drop-shadow-2xl" loading="lazy" />
          </motion.div>
        </div>
      </section>

      {/* 2. PROCUREMENT SYSTEM */}
      <Divider
        label={<Pill size="xl" c="#F16722" bg="#F1672226" py="10" px={24} h={"auto"} w={"auto"}>Procurement System</Pill>}
        labelPosition="center"
        color="#F8E2D8"
        size="sm"
        styles={{ root: { borderColor: "#F8E2D8" }, label: { backgroundColor: "transparent" } }}
      />
      <section className="py-8 sm:py-10 max-w-7xl mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div 
            variants={imageVariants as import("framer-motion").Variants}
            initial="initial"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
            className="h-full flex justify-center lg:justify-start order-2 lg:order-1 cursor-pointer"
          >
            <img src={frame2} alt="ERP Procurement" className="w-full h-[500px] object-contain drop-shadow-2xl" loading="lazy" />
          </motion.div>
          
          <motion.div 
            variants={fadeInUp as import("framer-motion").Variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col bg-[#F0F2F5] rounded-[16px] p-[40px] order-1 lg:order-2"
          >
            <h2 className="text-[#101828] text-2xl sm:text-3xl font-clash-medium">Procurement System Functionalities</h2>
            <p className="mt-4 text-[#667085] font-sans">
              The procurement app in the ERP streamlines the purchasing process by integrating with various modules, including inventory management, supplier management, and order tracking.
            </p>
            <AnimatedList items={purchase} />
          </motion.div>
        </div>
      </section>

      {/* 3. FINANCE SYSTEM */}
      <Divider
        label={<Pill size="xl" c="#F16722" bg="#F1672226" py="10" px={24} h={"auto"} w={"auto"}>Finance System</Pill>}
        labelPosition="center"
        color="#F8E2D8"
        size="sm"
        styles={{ root: { borderColor: "#F8E2D8" }, label: { backgroundColor: "transparent" } }}
      />
      <section className="py-8 sm:py-10 max-w-7xl mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div 
            variants={fadeInUp as import("framer-motion").Variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col bg-[#F0F2F5] rounded-[16px] p-[40px]"
          >
            <h2 className="text-[#101828] text-2xl sm:text-3xl font-clash-medium">Finance System Functionalities</h2>
            <p className="mt-4 text-[#667085] font-sans">
              This covers core accounting functions, enabling efficient tracking of sales, expenses, and profits. It simplifies financial reporting and customer transactions.
            </p>
            <AnimatedList items={finance} cols="sm:grid-cols-2" />
          </motion.div>

          <motion.div 
            variants={imageVariants as import("framer-motion").Variants}
            initial="initial"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
            className="h-full flex justify-center lg:justify-end cursor-pointer"
          >
            <img src={frame3} alt="ERP Finance" className="w-full h-[500px] object-contain drop-shadow-2xl" loading="lazy" />
          </motion.div>
        </div>
      </section>

      {/* 4. ASSET SYSTEM */}
      <Divider
        label={<Pill size="xl" c="#F16722" bg="#F1672226" py="10" px={24} h={"auto"} w={"auto"}>Asset System</Pill>}
        labelPosition="center"
        color="#F8E2D8"
        size="sm"
        styles={{ root: { borderColor: "#F8E2D8" }, label: { backgroundColor: "transparent" } }}
      />
      <section className="py-8 sm:py-10 max-w-7xl mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div 
            variants={imageVariants as import("framer-motion").Variants}
            initial="initial"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
            className="h-full flex justify-center lg:justify-start order-2 lg:order-1 cursor-pointer"
          >
            <img src={frame4} alt="ERP Asset Management" className="w-full h-[500px] object-contain drop-shadow-2xl" loading="lazy" />
          </motion.div>

          <motion.div 
            variants={fadeInUp as import("framer-motion").Variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col bg-[#F0F2F5] rounded-[16px] p-[40px] order-1 lg:order-2"
          >
            <h2 className="text-[#101828] text-2xl sm:text-3xl font-clash-medium">Asset Management System Features</h2>
            <p className="mt-4 text-[#667085] font-sans">
              Simplifies asset management for retail businesses. Boost efficiency with real-time updates and user-friendly dashboards. Say goodbye to manual tracking!
            </p>
            <AnimatedList items={asset} cols="sm:grid-cols-2" />
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default PointOfSales;