import React from 'react'

function Card({username}) {
    console.log(username);
  return (
    <div className="relative overflow-hidden rounded-lg mb-6">
        <img
          src="https://picsum.photos/400/300?random=90"
          alt="Featured content"
          className="object-cover object-center w-full h-48 transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
  )
}

export default Card