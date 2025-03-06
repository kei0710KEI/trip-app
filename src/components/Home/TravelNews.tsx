import React from "react";

const TravelNews = () => {
  const news = [
    {
      id: 1,
      title: "世界の観光業が回復基調に",
      date: "2024-03-21",
      summary: "世界観光機関（UNWTO）の最新レポートによると...",
    },
    // 他のニュースを追加
  ];

  return (
    <section className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8">最新の旅行ニュース</h2>
      <div className="space-y-6">
        {news.map((item) => (
          <article key={item.id} className="border-b pb-4">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-500">{item.date}</p>
            <p className="mt-2">{item.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TravelNews;
