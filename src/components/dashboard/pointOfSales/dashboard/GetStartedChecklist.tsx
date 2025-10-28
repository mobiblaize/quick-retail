import { useState, useEffect } from "react";
import {
  Checkbox,
  Button,
  Progress,
  Collapse,
  Text,
  Group,
  Card,
} from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useGetData } from "../../../../hooks/useApis";
import { useNavigate } from "react-router-dom";

interface OnboardingStep {
  key: string;
  label?: string;
  description?: string;
  completed?: boolean;
  route?: string;
}

export interface OnboardingData {
  completed_steps: string[];
  total_steps: number;
  progress: number;
  steps: Step[];
}

export interface Step {
  key: string;
  label: string;
  completed: boolean;
}

const steps: Partial<OnboardingStep[]> = [
  {
    key: "create_store",
    label: "Create a store",
    description: "Set up your first store location to start selling",
    completed: true,
    route: "/dashboard/stores/store_target",
  },
  {
    key: "create_category",
    label: "Create a category",
    description: "Organize your products under categories",
    completed: true,
    route: "/dashboard/categories",
  },
  {
    key: "create_subcategory",
    label: "Create a subcategory",
    description: "Add subcategories for better product grouping",
    completed: true,
    route: "/dashboard/categories",
  },
  {
    key: "add_products",
    label: "Add products",
    description: "Add your inventory items to start tracking stock",
    completed: true,
    route: "/dashboard/product-management",
  },
  {
    key: "make_sale",
    label: "Make a sale",
    description: "Complete your first transaction using the POS system",
    completed: true,
    route: "/dashboard/sales/create_order",
  },
];

function getDescription(key: string) {
  return steps.find((step) => step?.key === key)?.description || "";
}

function getStepRoute(key: string) {
  return steps.find((step) => step?.key === key)?.route;
}

export default function GetStartedChecklist() {
  const [opened, setOpened] = useState(true);
  const navigate = useNavigate();

  const { data: onboardingData } = useGetData(
    "pos/onboard/onboarding-progress"
  );

  const apiSteps: OnboardingStep[] = onboardingData?.steps || [];

  const completedCount = onboardingData?.completed_steps?.length || 0;

  const progress = (completedCount / apiSteps.length) * 100 ;
  const isAllCompleted = apiSteps?.every((step) => step.completed);
  // Define the logical order of steps

  // Load progress from API and auto-mark steps
  useEffect(() => {
    if (onboardingData) {
      // Automatically collapse checklist if all steps are complete
      setOpened(!isAllCompleted);
    }
  }, [onboardingData, isAllCompleted]);

  function handleStepClick(step: OnboardingStep) {
    const route = getStepRoute(step.key);
    if (route) {
      navigate(route);
    }
  }
  console.log(apiSteps);
  

  return (
    <div>
      {!isAllCompleted && (
        <Card shadow="sm" radius="lg" className="p-6 bg-white">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <Text fw={600} size="lg">
                Get Started
              </Text>
              <Text size="sm" c="dimmed">
                Complete these steps to start using the platform
              </Text>
            </div>

            <Button
              variant="light"
              color="orange"
              radius="xl"
              size="xs"
              onClick={() => setOpened((o) => !o)}
              rightSection={
                opened ? (
                  <IconChevronUp size={16} />
                ) : (
                  <IconChevronDown size={16} />
                )
              }
            >
              {`${completedCount} of ${steps.length} completed`}
            </Button>
          </div>

          {/* Progress Bar */}
          <Progress
            value={progress}
            color="orange"
            radius="xl"
            className="mb-4"
            striped
            animated
          />

          {/* Checklist */}
          <Collapse in={opened}>
            <div className="flex flex-col gap-4">
              {apiSteps?.map((step: OnboardingStep, index: number) => (
                <div
                  onClick={() => handleStepClick(step)}
                  key={step.key}
                  className={`flex items-center cursor-pointer justify-between border rounded-lg p-4 transition ${
                    step.completed
                      ? "bg-orange-50 border-orange-200"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <Group align="flex-start">
                    <Checkbox
                      size="md"
                      radius="xl"
                      checked={step.completed}
                      readOnly
                    />
                    <div>
                      <Text fw={500}>{step.label}</Text>
                      <Text size="sm" c="dimmed">
                        {getDescription(step.key)}
                      </Text>
                    </div>
                  </Group>

                  <Button
                    variant={step.completed ? "filled" : "light"}
                    color={step.completed ? "orange" : "gray"}
                    radius="xl"
                    size="xs"
                    disabled
                  >
                    Step {index + 1}
                  </Button>
                </div>
              ))}
            </div>
          </Collapse>
        </Card>
      )}
    </div>
  );
}
