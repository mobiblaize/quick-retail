import { Text } from "@mantine/core";

const Review = () => {
  const reviews = [
    {
      id: 1,
      name: "Amanda Seun",
      date: "20 Feb 2023",
      comment:
        "Brilliant!! this was for my sons 13th Birthday. Absolutely amazing. Very fast service. Easy to order and came in perfect time :)",
    },
    {
      id: 2,
      name: "Ayeni Drake",
      date: "20 Feb 2023",
      comment:
        "Brilliant!! this was for my sons 13th Birthday. Absolutely amazing. Very fast service. Easy to order and came in perfect time :)",
    },
    {
      id: 3,
      name: "Same Asake",
      date: "20 Feb 2023",
      comment:
        "Brilliant!! this was for my sons 13th Birthday. Absolutely amazing. Very fast service. Easy to order and came in perfect time :)",
    },
  ];

  return (
    <main>
      <div className="flex justify-between items-center mb-4">
        <Text fw={500} size="lg">
          Review
        </Text>
        <div className="flex items-center gap-2">
          <Text fw={700} size="xl">
            4.5
          </Text>
          <span className="text-yellow-400 text-xl">★</span>
          <Text c="gray" size="sm">
            (1,200 Reviews)
          </Text>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="pb-4">
            <div className="flex justify-between mb-2">
              <Text c="#101010" size="lg" fw={600}>
                {review.name}
              </Text>
              <Text size="md" fw={"500"}>
                {review.date}
              </Text>
            </div>
            <Text c="#101010">{review.comment}</Text>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button className="bg-blue-50 w-full py-3 cursor-pointer rounded-md hover:bg-blue-100 transition-colors">
          <Text c="#003399" fw={"500"} size="lg">
            See more reviews
          </Text>
        </button>
      </div>
    </main>
  );
};

export default Review;
