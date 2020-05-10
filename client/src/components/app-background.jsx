import _ from 'lodash'
import React, {
	useState,
	useEffect,
	useContext
} from 'react'
import { ThemeContext } from '../utils/context/theme-context'

export default function AppBackground ({children}) {
	const { lineCount, windowRatio } = useContext(ThemeContext)
	const [lines, setLines] = useState([])

	useEffect(() => {
		const newLines = []
		_.times(lineCount, (i) => {
			newLines.push(<div className='blue-line' key={`blue-line-${i + 1}`} />)
		})
		setLines(newLines)
	}, [lineCount])

	return (
		<div className='app-background-container'>
			<div className='holes-contianer'>
				<div className='blue-lines-container'>
					{lines.length > 0 && lines.map(line => line)}
				</div>
				<div className='punch-hole' />
				{windowRatio <= 2.05 && <div className='punch-hole' />}
				{windowRatio <= 1 && <div className='punch-hole' />}
			</div>
			{children}
		</div>
	)
}