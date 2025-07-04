import { useParams } from 'react-router-dom';

const articleContent: Record<string, { title: string; content: string }> = {
    "1": {
        title: 'How do I set up other modules of the app?',
        content: `To configure additional modules, head over to the 'Modules' section located in your dashboard. Here, you can choose which modules to activate. Simply follow the prompts displayed on your screen to tailor each module to fit your business requirements. Should you face any challenges, please refer to the help section or contact our support team for guidance.`,
    },
    "2": {
        title: 'How do I manage user roles?',
        content: `Go to the 'User Management' section and select 'Roles'. From there, you can create new roles or edit existing ones.`,
    },
    "3": {
        title: 'How do I add a new product?',
        content: `Navigate to the 'Products' section and click on 'Add New Product'. Fill in the required details and save.`,
    },
    "4": {
        title: 'How do I add a new product?',
        content: `Navigate to the 'Products' section and click on 'Add New Product'. Fill in the required details and save.`,
    },
     "5": {
        title: 'How do I add a new product?',
        content: `Navigate to the 'Products' section and click on 'Add New Product'. Fill in the required details and save.`,
    },
    "6": {
        title: 'How do I add a new product?',
        content: `Navigate to the 'Products' section and click on 'Add New Product'. Fill in the required details and save.`,
    },
};

const HelpArticle = () => {
    const { id } = useParams<{ id: string }>();
    const article = id ? articleContent[id] : undefined;

    if (!article) {
        return (
            <div className="p-6 text-center text-red-500 text-lg">
                Help article not found.
            </div>
        );
    }

    return (
        <div className="bg-[#fff] p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">{article.title}</h1>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed text-base">{article.content}</p>
        </div>
    );
};

export default HelpArticle;
