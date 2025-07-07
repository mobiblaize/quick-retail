import { Modal, Button, TextInput, Select, Textarea, Group, Text, Box, FileButton } from '@mantine/core';
import { useState } from 'react';
import { IconUpload, IconTrash, IconCheck } from '@tabler/icons-react';

type Props = {
    opened: boolean;
    onClose: () => void;
};

const areasOfConcern = ['Point of Sales', 'User Management', 'Inventory', 'Billing'];

export default function ContactSupportModal({ opened, onClose }: Props) {
    const [email, setEmail] = useState('');
    const [concern, setConcern] = useState('');
    const [message, setMessage] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const isValid = email.trim() !== '' && concern !== '' && message.trim() !== '';

    const handleSubmit = () => {
        if (!isValid) return;

        // handle submit logic
        console.log({ email, concern, message, file });

        // clear and close
        setEmail('');
        setConcern('');
        setMessage('');
        setFile(null);
        onClose();
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={<Text fw={600} size="lg">Contact Support</Text>}
            radius="lg"
            centered
        >
            <Box className="space-y-4">
                <TextInput
                    label="Email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    required
                />

                <Select
                    label="Area of Concern"
                    placeholder="Select role"
                    data={areasOfConcern}
                    value={concern}
                    onChange={(value) => setConcern(value || '')}
                    required
                />

                <Textarea
                    label="Message"
                    placeholder="Type message here"
                    value={message}
                    onChange={(e) => setMessage(e.currentTarget.value)}
                    minRows={3}
                    required
                />

                {/* File Upload Section */}
                <div className="border border-dashed border-gray-300 rounded-lg p-3 text-sm">
                    <Text fw={500} size="sm" mb={6}>
                        Supporting document if any
                    </Text>

                    {file ? (
                        <Group justify="space-between">
                            <Group gap="xs">
                                <IconCheck size={16} color="green" />
                                <div>
                                    <Text size="sm" fw={500}>Upload Successful</Text>
                                    <Text size="xs" c="dimmed">
                                        {file.name} • {(file.size / 1024).toFixed(1)} KB
                                    </Text>
                                </div>
                            </Group>
                            <IconTrash
                                size={18}
                                color="red"
                                className="cursor-pointer"
                                onClick={() => setFile(null)}
                            />
                        </Group>
                    ) : (
                        <FileButton onChange={setFile} accept="image/png,image/jpeg,application/pdf">
                            {(props) => (
                                <Button
                                    leftSection={<IconUpload size={16} />}
                                    variant="outline"
                                    color="orange"
                                    {...props}
                                >
                                    Click to upload
                                </Button>
                            )}
                        </FileButton>
                    )}
                </div>

                {/* Footer buttons */}
                <div
                    key="buttons"
                    className="flex gap-4 mt-[2em] justify-center"
                >
                    <Button variant="outline-primary" onClick={onClose}>
                        No
                    </Button>

                    <Button variant="filled-primary" onClick={handleSubmit}
                        disabled={!isValid}>Save</Button>
                </div>
            </Box>
        </Modal>
    );
}
