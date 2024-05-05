"use client";

import { Heading } from "./_components/heading";
import { Heroes_one } from "./_components/heroes_one";
import { Footer } from "./_components/footer";
import { Heroes_two } from "./_components/heroes_two";
import { motion } from "framer-motion";

const MarketingPage = () => {
  return (
    <div className="min-h-full flex flex-col dark:bg-[#1F1F1F]">
      <div className="flex flex-col items-center justify-center md:justify-start text-center">
        <Heading />
        <motion.div
        initial={{ opacity: 0, paddingTop: "20px" }}
        whileInView={{ opacity: 1, paddingTop: "0px" }}
        transition={{ ease: "linear", duration: 1 }}
        viewport={{ margin: "-200px" }}
        >
          <Heroes_one />
        </motion.div>
        <motion.div
        initial={{ opacity: 0, paddingTop: "20px" }}
        whileInView={{ opacity: 1, paddingTop: "0px" }}
        transition={{ ease: "linear", duration: 1 }}
        viewport={{ margin: "-200px" }}
        >
          <Heroes_two />
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

export default MarketingPage;