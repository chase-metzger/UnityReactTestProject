import React from 'react';

export default function Meme({ template, onClick }) {
  return <img
    key={template.id}
    src={template.url}
    width={200}
    alt={template.name}
    onClick={onClick}
  />
};
