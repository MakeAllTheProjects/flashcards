import _ from 'lodash'
import React, {
	useState,
	useEffect
} from 'react'

import './app-background.scss'

export default function AppBackground ({children}) {
	const defaultPaperRatio = 0.7727
	const [lineCount, setLineCount] = useState(33)
	const [windowRatio, setWindowRatio] = useState(defaultPaperRatio)
	const [windowHeight, setWindowHeight] = useState(window.innerHeight)
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)
	// eslint-disable-next-line
	const [paperHeight, setPaperHeight] = useState(window.innerHeight)
	// eslint-disable-next-line
	const [paperWidth, setPaperWidth] = useState(window.innerWidth)
	const [lines, setLines] = useState([])

	const updateWindowSize = () => {
		setWindowHeight(window.innerHeight)
		setWindowWidth(window.innerWidth)
		setWindowRatio(window.innerWidth / window.innerHeight)
	}

	function updatePaperSize() {
		if (windowRatio > defaultPaperRatio) {
			setPaperHeight(windowWidth * 1.294117647058824)
			setPaperWidth(windowWidth)
		} else if (windowRatio > defaultPaperRatio) {
			setPaperHeight(windowWidth)
			setPaperWidth(windowWidth)
		}
	}

	function updateLineCount() {
		if (windowRatio > defaultPaperRatio) {
			setLineCount(Math.round(33 / windowRatio))
		}
	}

	useEffect(() => {
		window.addEventListener("resize", updateWindowSize)
		return () => window.removeEventListener("resize", updateWindowSize)
	}, [windowHeight, windowWidth])

	useEffect(() => {
		updatePaperSize()
		updateLineCount()
		return () => {
			setPaperHeight(windowHeight)
			setPaperWidth(windowWidth)
			setLineCount(33)
		}
	// eslint-disable-next-line
	}, [windowRatio])

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