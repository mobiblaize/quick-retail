import { useState } from "react";
import { Checkbox, Button, Progress, Collapse, Text, Group, Card } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

const steps = [
  {
    title: "Create a store",
    description: "Set up your first store location to start selling",
  },
  {
    title: "Add products",
    description: "Add your inventory items to start tracking stock",
  },
  {
    title: "Make a sale",
    description: "Complete your first transaction using the POS system",
  },
  {
    title: "Invite team members",
    description: "Add users to help manage your business",
  },
];

export default function GetStartedChecklist() {
  const [opened, setOpened] = useState(true);
  const [checkedSteps, setCheckedSteps] = useState<boolean[]>(Array(steps.length).fill(false));

  const completedCount = checkedSteps.filter(Boolean).length;
  const progress = (completedCount / steps.length) * 100;

  const toggleStep = (index: number) => {
    const updated = [...checkedSteps];
    updated[index] = !updated[index];
    setCheckedSteps(updated);
  };

  return (
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
          rightSection={opened ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
        >
          {`${completedCount} of ${steps.length} completed`}
        </Button>
      </div>

      <Progress value={progress} color="orange" radius="xl" className="mb-4" />

      {/* Checklist */}
      <Collapse in={opened}>
        <div className="flex flex-col gap-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center justify-between border rounded-lg p-4 hover:bg-gray-50 transition"
            >
              <Group align="flex-start">
                <Checkbox
                  size="md"
                  radius="xl"
                  checked={checkedSteps[index]}
                  onChange={() => toggleStep(index)}
                />
                <div>
                  <Text fw={500}>{step.title}</Text>
                  <Text size="sm" c="dimmed">
                    {step.description}
                  </Text>
                </div>
              </Group>

              <Button variant="light" color="gray" radius="xl" size="xs">
                Step {index + 1}
              </Button>
            </div>
          ))}
        </div>
      </Collapse>
    </Card>
  );
}
