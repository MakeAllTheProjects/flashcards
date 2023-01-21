import React from 'react'
import './CardTags.scss'

export default function CardTags ({viewCardDetails, tags}) {
	return (
		<div
			className={viewCardDetails ? "card-tags-container open" : "card-tags-container"}
		>
			{tags.length > 0 && tags.map(tag => <p className="tag" key={tag.tagId}>{tag.tagLabel}</p>)}
		</div>
	)
}