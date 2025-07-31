import { Text, Loader } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import { useFetchProfile } from "../../../hooks/backendApis/admin/profile";
import NotificationsPanel from "../../../components/dashboard/adminPage/notification/notificationui";

const NotificationPage = () => {
    // const [activeTab, setActiveTab] = useState<"account" | "security">("account");
    const { data, isLoading, error } = useFetchProfile();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Loader color="orange" size="lg" />
            </div>
        );
    }

    if (error || !data || !data.data) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Loader color="orange" size="lg" />
            </div>
        );
    }


    const subHeaders = [
        <div key="1" className="flex items-center gap-6">
            <Text
                unstyled
                fw={500}
                size="xl"
                c="#101928"
            >
                Notifications
            </Text>
        </div>,
    ];

    return (
        <PageContainer subHeaders={subHeaders}>
            <NotificationsPanel />
        </PageContainer>
    );
};

export default NotificationPage;
