import React, { useEffect, useState } from 'react';

function Card({ title, text, target, linkTitle, href, rel, onClick, linkClassName }) {
  return (
    <div className="card">
      <div className="card__title">{title}</div>
      <div className="card__text">{text}</div>
      <a
        className={`default-link card__link ${linkClassName}`}
        target={target}
        rel={rel}
        href={href}
        onClick={() => onClick(href)}
      >
        {linkTitle}
      </a>
    </div>
  );
}

export default function Page() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://my-json-server.typicode.com/savayer/demo/posts');
        const data = await response.json();
        const transformedData = data.map((item) => ({
          id: item.id,
          title: item.title.en,
          link_title: item.link_title,
          link: item.link,
          text: item.body.en.substr(0, 50) + '...',
        }));
        setCards(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []); // <-- Added an empty dependency array

  function analyticsTrackClick(url) {
    // Sending clicked link URL to analytics
    console.log(url);
  }

  return (
    <div>
      {cards.map((item) => (
        <Card
          key={item.id}
          title={item.title}
          linkTitle={item.link_title}
          href={item.link}
          text={item.text}
          linkClassName={item.id === 1 ? 'card__link--red' : ''}
          target={item.id === 1 ? '_blank' : ''}
          onClick={analyticsTrackClick}
        />
      ))}
    </div>
  );
}
