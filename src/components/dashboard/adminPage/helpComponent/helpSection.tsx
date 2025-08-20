// import { useState } from 'react';
// import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routes';
import { Text, Title } from '@mantine/core';

const helpArticles = [
    {
        id: 1,
        title: 'How do I set up other modules of the app?',
        description:
            'Full access to system functionalities, including editing but needs approval from super.',
    },
    // Duplicate for demonstration
    { id: 2, title: 'How do I set up other modules of the app?', description: 'Full access to system functionalities, including editing but needs approval from super.' },
    { id: 3, title: 'How do I set up other modules of the app?', description: 'Full access to system functionalities, including editing but needs approval from super.' },
    { id: 4, title: 'How do I set up other modules of the app?', description: 'Full access to system functionalities, including editing but needs approval from super.' },
    { id: 5, title: 'How do I set up other modules of the app?', description: 'Full access to system functionalities, including editing but needs approval from super.' },
    { id: 6, title: 'How do I set up other modules of the app?', description: 'Full access to system functionalities, including editing but needs approval from super.' },
];

const HelpSection = () => {
    const filteredArticles = helpArticles;

    return (
        <section className="p-6 bg-white rounded-xl">
            <div className="flex justify-between items-center mb-[3em] flex-wrap gap-4">
                <Title order={3} size="20px" fw={500} c="#101828">
                    Need Assistance?
                </Title>
                {/* <div className="relative w-full max-w-xs">
                    <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search questions"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full border-[#D0D5DD] border rounded-lg text-[#98A2B3] text-sm"
                    />
                </div> */}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                {filteredArticles.map((article) => (
                    <div
                        key={article.id}
                        className="border border-[#D0D5DD] rounded-lg p-4 hover:shadow-md transition bg-white"
                    >
                        <Title order={3} fw={600} c="gray.9" size="md" mb={2}>
                            {article.title}
                        </Title>

                        <Text size="sm" c="gray.6" mb={3}>
                            {article.description}
                        </Text>

                        <Link to={`${ROUTES.learnMore}/${article.id}`}>
                            <Text c="#F04D4D" size="sm" fw={500}>
                                Learn More
                            </Text>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HelpSection;
