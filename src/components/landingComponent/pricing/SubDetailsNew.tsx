import { useState } from "react";
import {
  Box,
  Card,
  Text,
  Title,
  Button,
  Stack,
  List,
  ThemeIcon,
  Badge,
  SimpleGrid,
  rem,
} from "@mantine/core";
import { Check } from "lucide-react";

// --- Types ---
type BillingCycle = "Monthly" | "Quarterly" | "Yearly";

// --- Data Configuration based on Screenshots ---

const CYCLES: BillingCycle[] = ["Monthly", "Quarterly", "Yearly"];

const PLANS = [
  {
    id: "basic",
    name: "Basic",
    description:
      "Small retail businesses, single-store owners, kiosks, neighbourhood shops, and new retailers moving away from manual records or basic POS tools.",
    prices: {
      Monthly: "10,500.00",
      Quarterly: "30,000.00",
      Yearly: "119,000.00",
    },
    features: [
      "1 store",
      "Up to 3 users",
      "Full Instore POS (Point of Sale Management)",
      "Real-time stock tracking, low stock alerts",
      "Basic customer profiles",
      "Basic sales and inventory reports",
      "Pre-built sales dashboard",
      "User roles, basic RBAC (Role-Based Access Control)",
      "Standard support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    isPopular: true,
    description:
      "Growing retailers, supermarkets, pharmacies, fashion stores, and businesses with multiple staff and increasing transaction volume.",
    prices: {
      Monthly: "26,250.00",
      Quarterly: "77,000.00",
      Yearly: "299,000.00",
    },
    features: [
      "Up to 3 stores",
      "Up to 10 users",
      "All Starter features",
      "Multi-store inventory, stock transfers",
      "Customer segmentation, purchase history",
      "Sales tracking, cash flow, basic income statement",
      "Advanced sales and inventory reports",
      "Customisable dashboards",
      "Advanced RBAC, audit trail",
      "Priority support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description:
      "Suitable for large retailers, chains, wholesalers, and businesses with complex operations, compliance needs, and multiple locations.",
    prices: {
      Monthly: "39,500.00",
      Quarterly: "115,000.00",
      Yearly: "450,000.00",
    },
    features: [
      "Unlimited stores",
      "Unlimited users",
      "All Growth features",
      "Advanced inventory, audits, shrinkage tracking",
      "Loyalty programmes, advanced customer insights",
      "Full financial management, multi-currency, tax",
      "Custom reports, exports",
      "Advanced analytics & KPIs",
      "2FA, advanced security, system controls",
      "APIs, third-party integrations",
      "Dedicated account support + SLA (Service Level Agreement)",
    ],
  },
];

export default function PricingPage() {
  const [activeCycle, setActiveCycle] = useState<BillingCycle>("Quarterly");
  const [selectedPlanId, setSelectedPlanId] = useState<string>("growth");

  return (
    <Box className="min-h-screen bg-gray-50 py-12 px-4 flex flex-col items-center">
      
      {/* --- 1. Billing Cycle Tabs --- */}
      <Box className="bg-gray-100 p-1 rounded-lg mb-12 flex items-center gap-1 w-full max-w-md border border-gray-200">
        {CYCLES.map((cycle) => {
          const isActive = activeCycle === cycle;
          return (
            <button
              key={cycle}
              onClick={() => setActiveCycle(cycle)}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                isActive
                  ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
              }`}
            >
              {cycle}
            </button>
          );
        })}
      </Box>

      {/* --- 2. Pricing Grid --- */}
      <SimpleGrid
        cols={{ base: 1, md: 3 }}
        spacing="xl"
        verticalSpacing="xl"
        className="w-full max-w-7xl pb-20"
      >
        {PLANS.map((plan) => {
          const isSelected = selectedPlanId === plan.id;
          const isPopular = plan.isPopular;

          return (
            <div key={plan.id} className="relative pt-6 h-full"> 
              
              <Card
                shadow={isSelected ? "xl" : "sm"}
                padding="xl"
                radius="lg"
                withBorder
                onClick={() => setSelectedPlanId(plan.id)}
                className={`h-full cursor-pointer transition-all duration-300 relative flex flex-col ${
                  isSelected
                    ? "border-purple-600 ring-1 ring-purple-600 bg-white transform -translate-y-1"
                    : "border-gray-200 hover:shadow-md bg-white hover:-translate-y-1"
                }`}
                style={{
                    // If popular but not selected, show a gold border (optional detail matching some designs)
                    borderColor: !isSelected && isPopular ? "#FCD34D" : undefined 
                }}
              >
                {/* --- Selected 'V' Badge (Purple) --- */}
                {isSelected && (
                  <div className="absolute -top-5 right-6 z-20">
                    <div className="bg-[#692BEB] w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-[3px] border-gray-50">
                       <span className="text-white font-bold text-xl leading-none">V</span>
                    </div>
                  </div>
                )}

                {/* --- Most Popular Badge (Orange/Yellow) --- */}
                {isPopular && (
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-10">
                    <Badge
                      variant="filled"
                      size="lg"
                      radius="sm"
                      styles={{
                        root: {
                          backgroundColor: "#FFF7E6", // Light orange bg
                          color: "#D97706", // Dark orange text
                          border: "1px solid #FCD34D",
                          textTransform: "capitalize",
                          fontWeight: 600,
                          height: "28px",
                          paddingLeft: "12px",
                          paddingRight: "12px",
                        }
                      }}
                      leftSection={<span className="mr-1 text-[#D97706]">★</span>}
                    >
                      Most Popular Plan
                    </Badge>
                  </div>
                )}

                <Stack gap="md" className="h-full">
                  {/* Header */}
                  <div>
                    <Title order={3} size="h2" fw={700} className="text-gray-900">
                      {plan.name}
                    </Title>
                    <Text size="sm" c="dimmed" mt="xs" lh={1.5} className="min-h-[80px]">
                      {plan.description}
                    </Text>
                  </div>

                  {/* Price */}
                  <Text fw={700} size={rem(32)} className="text-[#EA580C] tracking-tight">
                    ₦{plan.prices[activeCycle]}
                  </Text>

                  {/* Features */}
                  <div className="flex-grow mt-2 mb-8">
                    <List
                      spacing="sm"
                      size="sm"
                      center
                      icon={
                        <ThemeIcon color="transparent" size={20}>
                          <Check size={18} className="text-[#EA580C]" strokeWidth={3} />
                        </ThemeIcon>
                      }
                    >
                      {plan.features.map((feature, index) => (
                        <List.Item key={index} className="text-gray-700 items-start">
                          <span className="leading-snug">{feature}</span>
                        </List.Item>
                      ))}
                    </List>
                  </div>

                  {/* Button */}
                  <div className="mt-auto">
                    <Button
                      fullWidth
                      size="lg"
                      radius="md"
                      className="bg-[#EA580C] hover:bg-[#C2410C] transition-colors font-semibold"
                    >
                      Get Started
                    </Button>
                  </div>
                </Stack>
              </Card>
            </div>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}