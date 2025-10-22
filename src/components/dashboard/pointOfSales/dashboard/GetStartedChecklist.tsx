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
}


export default function GetStartedChecklist() {
  const [opened, setOpened] = useState(true);
  const [checkedSteps, setCheckedSteps] = useState<boolean[]>([]);
  const navigate = useNavigate();
  

  const { data: onboardingData} = useGetData(
    "pos/onboard/onboarding-progress"
  );
const isAllCompleted = onboardingData?.steps?.every((step: any) => step.completed);
  // Define the logical order of steps
  const steps = [
    {
      key: "create_store",
      title: "Create a store",
      description: "Set up your first store location to start selling",
      isChecked: true,
    },
    {
      key: "create_category",
      title: "Create a category",
      description: "Organize your products under categories",
      isChecked: true,
    },
    {
      key: "create_subcategory",
      title: "Create a subcategory",
      description: "Add subcategories for better product grouping",
      isChecked: true,
    },
    {
      key: "add_products",
      title: "Add products",
      description: "Add your inventory items to start tracking stock",
      isChecked: true,
    },
    {
      key: "make_sale",
      title: "Make a sale",
      description: "Complete your first transaction using the POS system",
      isChecked: true,
    },
  ];

  // Load progress from API and auto-mark steps
  useEffect(() => {
    if (onboardingData?.data) {
      const { steps: apiSteps = [], completed_steps = [] } =
        onboardingData.data;

      // Map each UI step to its completion state from API
      const updatedCheckedSteps = steps.map((step) => {
        const apiStep = apiSteps.find((s: any) => s.key === step.key);
        return apiStep ? apiStep.completed : completed_steps.includes(step.key);
      });

      setCheckedSteps(updatedCheckedSteps);

      const allCompleted = updatedCheckedSteps.every(Boolean);

      // Automatically collapse checklist if all steps are complete
      setOpened(!allCompleted);

      // If not all steps done, route user to onboarding page automatically
      if (!allCompleted) {
        navigate("/dashboard/categories", { replace: true });
      }
    }
  }, [navigate, onboardingData]);

  const completedCount = checkedSteps.filter(Boolean).length;
  const progress =
    onboardingData?.data?.progress ?? (completedCount / steps.length) * 100;

  return (
    <div>
      {!isAllCompleted && (
        <Card shadow="sm" radius="lg" className="p-6 bg-white"
    
    >
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
            opened ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />
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
          {onboardingData?.steps?.map((step: OnboardingStep, index: number) => (
            <div
              key={step.key}
              className={`flex items-center justify-between border rounded-lg p-4 transition ${
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
                    {step.description}
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
