import { Button, Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import { useState } from "react";
import HelpSection from "../../../components/dashboard/adminPage/helpComponent/helpSection";
import ContactSupportModal from "../../../components/dashboard/adminPage/helpComponent/modal/sendMessageModal";

const HelpPage = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const subHeaders = [
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            <Text fw={500} size="xl" c="black">
                Help
            </Text>
            <div className="flex flex-row gap-2 md:gap-4">
                <div>
                    <div className="hidden sm:block">
                        <Button variant="filled-primary" onClick={() => setModalOpen(true)}>
                            Send a Message
                        </Button>
                    </div>
                </div>
            </div>
        </div>,
    ];

    return (
        <PageContainer subHeaders={subHeaders}>
            <HelpSection />
            <ContactSupportModal opened={modalOpen} onClose={() => setModalOpen(false)} />
        </PageContainer>
    );
};

export default HelpPage;
