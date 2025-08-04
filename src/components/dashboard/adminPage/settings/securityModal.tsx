import { Modal, Button, Text, Box, TextInput, Select } from "@mantine/core";
import { useState } from "react";
import {
  useAllQuestion,
  useSecurityQuestion,
} from "../../../../hooks/backendApis/admin/settings";
import { useUserStore } from "../../../../hooks/useUserStore";

type Props = {
  opened: boolean;
  onClose: () => void;
};

export default function SecurityQuestionModal({ opened, onClose }: Props) {
  const { user } = useUserStore();
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [newQuestionId, setNewQuestionId] = useState<string | null>(null);
  const [newAnswer, setNewAnswer] = useState("");
  const [, setErrorMessage] = useState("");
  const [, setSuccessMessage] = useState("");
  // @ts-ignore
  const { mutate, isLoading } = useSecurityQuestion();
  const { data: questionsRes, isLoading: loadingQuestions } = useAllQuestion();

  const questionOptions =
    questionsRes?.data?.map((q: any) => ({
      label: q.question,
      value: String(q.id),
    })) || [];

  const handleSubmit = () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!currentAnswer || !newAnswer || !newQuestionId) {
      setErrorMessage("All fields are required");
      return;
    }

    // Find the new question text from the selected ID
    const newQuestionObj = questionsRes?.data?.find(
      (q: any) => String(q.id) === newQuestionId
    );

    if (!newQuestionObj) {
      setErrorMessage("Invalid new question selected.");
      return;
    }

    const payload = {
      current_question: user?.security_question || "",
      current_answer: currentAnswer,
      new_question: newQuestionObj.question,
      new_answer: newAnswer,
    };

    mutate(payload, {
      onSuccess: (res) => {
        if (!res.error) {
          setSuccessMessage(res.message);
          setTimeout(() => {
            onClose();
            setCurrentAnswer("");
            setNewQuestionId(null);
            setNewAnswer("");
            setSuccessMessage("");
          }, 1500);
        } else {
          setErrorMessage(res.message || "Something went wrong");
        }
      },
      onError: (err: any) => {
        const msg = err?.response?.data?.message || "An error occurred";
        setErrorMessage(msg);
      },
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Text fw={600} size="lg" c="#101928">
          Security Question
          <Text fw={600} size="sm" c="#667185">
            Fill the details below to change your security question
          </Text>
        </Text>
      }
      radius="lg"
      centered
    >
      <Box className="space-y-4">
        <TextInput
          label="Current Security Question"
          value={user?.security_question || ""}
          disabled
          styles={{
            input: { background: "#F3F4F6", fontWeight: 500, color: "#101928" },
          }}
        />

        <TextInput
          label="Answer to Current Question"
          placeholder="Enter current answer"
          value={currentAnswer}
          onChange={(e) => setCurrentAnswer(e.currentTarget.value)}
          required
        />

        <Select
          label="New Security Question"
          placeholder="Select new security question"
          data={questionOptions}
          value={newQuestionId}
          onChange={(value) => setNewQuestionId(value)}
          required
          disabled={loadingQuestions}
        />

        <TextInput
          label="Answer to New Question"
          placeholder="Enter answer"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.currentTarget.value)}
          required
        />
        <div className="flex justify-center gap-[2em] mt-8">
          <Button
            variant="outline"
            onClick={onClose}
            size="md"
            style={{
              padding: "0.75rem 2rem",
              fontSize: "1rem",
              minWidth: "150px",
            }}
          >
            No
          </Button>

          <Button
            onClick={handleSubmit}
            loading={isLoading}
            size="md"
            style={{
              padding: "0.75rem 2rem",
              fontSize: "1rem",
              minWidth: "150px",
            }}
          >
            Save
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
