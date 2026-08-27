import hero from "../../../assets/images/heroImage2.png";
import heroBg from "../../../assets/images/herobg.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // 1. Import motion

export default function HeroSection() {
  const navigate = useNavigate();

  // Animation variants for the text container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Time between each child's animation
      },
    },
  };

  // Animation variants for individual elements
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="home" className="container max-w-7xl mt-4 sm:mt-6 mx-auto">
      <div className="px-4 pt-6 sm:pt-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="rounded-xl sm:rounded-2xl overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroBg})`,
          }}
        >
          <section className="px-4 sm:px-6 pt-8 sm:pt-12">
            <motion.div
              className="max-w-7xl mx-auto text-center"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }} // Only animate once
            >
              {/* Title Animation */}
              <motion.h1
                variants={itemVariants as import("framer-motion").Variants}
                className="text-3xl sm:text-4xl lg:text-5xl leading-tight font-clash-regular text-gray-800"
              >
                Manage Account, Finance all in
                <br className="hidden md:block" />
                One place with a{" "}
                <span className="text-orange-500 font-clash-medium">
                  Tailored ERP.
                </span>
              </motion.h1>

              {/* Subtext Animation */}
              <motion.p
                variants={itemVariants as import("framer-motion").Variants}
                className="mt-4 text-gray-600 mb-8 sm:mb-10 max-w-2xl font-sans mx-auto text-base sm:text-lg lg:text-xl px-4 sm:px-0"
              >
                Manage accounts payable/receivable, Generate financial
                statements, including balance sheets, general ledger, and
                banking transactions at ease.
              </motion.p>

              {/* Button Animation + Hover Effect */}
              <motion.button
                variants={itemVariants as import("framer-motion").Variants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/payment-summary")}
                className="bg-[#F16722] mb-12 cursor-pointer sm:mb-18 rounded-xl px-4 sm:px-5 py-2.5 sm:py-2 text-white text-sm sm:text-base hover:bg-[#e55a1f] transition-colors"
              >
                Get Started Now
              </motion.button>

              {/* Image Animation: Sliding up from the bottom */}
              {/* Image Animation: Now includes hover effects */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                // HOVER EFFECT START
                whileHover={{
                  y: -15, // Lift upward
                  scale: 1.02, // Subtle zoom
                  transition: { duration: 0.4, ease: "easeInOut" },
                }}
                // HOVER EFFECT END

                className="mt-auto mb-5 shadow-xl hover:shadow-2xl max-w-4xl mx-auto rounded-lg sm:rounded-xl overflow-hidden cursor-pointer bg-white transition-shadow duration-500"
              >
                <motion.img
                  src={hero}
                  alt="ERP Dashboard"
                  className="w-full object-cover"
                  // Add a slight brightness boost on hover
                  whileHover={{ filter: "brightness(1.05)" }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            </motion.div>
          </section>
        </motion.div>
      </div>
    </section>
  );
}
