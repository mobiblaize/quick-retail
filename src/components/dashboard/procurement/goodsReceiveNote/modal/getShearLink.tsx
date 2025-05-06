import {
    Modal,
    Button,
    TextInput,
    Text,
    List,
    ThemeIcon,
  } from '@mantine/core';
  import { useState } from 'react';
  import { Check, X } from 'lucide-react';
  
  interface ShareableLinkModalProps {
    opened: boolean;
    onClose: () => void;
  }
  
  const ShareableLinkModal = ({ opened, onClose }: ShareableLinkModalProps) => {
    const [link] = useState('http://remittance-advice/2023');
  
    return (
      <Modal
        opened={opened}
        onClose={onClose}
        title="Shareable Link"
        radius="md"
        size="md"
        centered
      >
        <div className="space-y-4">
          <div>
            <Text fw={500} size="sm" mb={4}>
              Receipt Shareable Link
            </Text>
            <TextInput value={link} readOnly />
          </div>
  
          <Button color="orange" className="mt-2">
            Get Link
          </Button>
  
          <div className="pt-4">
            <Text fw={600} size="sm" mb={2}>
              Kindly Note that
            </Text>
            <List
              size="sm"
              icon={
                <ThemeIcon color="gray" size={16} radius="xl">
                  <Check size={12} />
                </ThemeIcon>
              }
            >
              <List.Item>View Document</List.Item>
              <List.Item>Download Document</List.Item>
              <List.Item>Print Document</List.Item>
              <List.Item>
                Document view access is active as long as it is active on system.
              </List.Item>
            </List>
          </div>
        </div>
      </Modal>
    );
  };
  
  export default ShareableLinkModal;
  