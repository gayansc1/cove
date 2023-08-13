import React, { useEffect, useState } from 'react';

function Card({ title, text, linkTitle, href, onClick, linkClassName }) {
  return (
    <div className={`card ${linkClassName}`}>
      <div className="card__title">{title}</div>
      <div className="card__text">{text}</div>
      <a className="default-link card__link" href={href} onClick={onClick}>
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
        const json = await response.json();
        
        const newData = json.map(item => ({
          id: item.id,
          title: item.title.en,
          linkTitle: item.link_title,
          href: item.link,
          text: `${item.body.en.substr(0, 50)}...`,
          linkClassName: item.id === 1 ? 'card__link--red' : ''
        }));
        
        setCards(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    
    fetchData();
  }, []);

  function analyticsTrackClick(url) {
    console.log('Clicked link:', url);
    // Additional analytics tracking code can be added here
  }

  return (
    <div>
      {cards.map(item => (
        <Card
          key={item.id}
          title={item.title}
          linkTitle={item.linkTitle}
          href={item.href}
          text={item.text}
          linkClassName={item.linkClassName}
          onClick={() => analyticsTrackClick(item.href)}
        />
      ))}
    </div>
  );
}
