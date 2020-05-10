import React, {
	useState,
	useEffect
} from 'react'

export const ThemeContext = React.createContext({
	lineCount: 33,
	windowRatio: 0.7727
})

export function ThemeProvider ({children}) {
	const defaultPaperRatio = 0.7727
	const [lineCount, setLineCount] = useState(33)
	const [windowRatio, setWindowRatio] = useState(defaultPaperRatio)
	const [windowHeight, setWindowHeight] = useState(window.innerHeight)
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)
	const [paperHeight, setPaperHeight] = useState(window.innerHeight)
	const [paperWidth, setPaperWidth] = useState(window.innerWidth)

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
	})

	useEffect(() => {
		updatePaperSize()
		updateLineCount()
		return () => {
			setPaperHeight(windowHeight)
			setPaperWidth(windowWidth)
			setLineCount(33)
		}
	}, [windowRatio])

	return (
		<ThemeContext.Provider
			value={{
				lineCount: lineCount,
				windowRatio: windowRatio
			}}
		>
			{children}
		</ThemeContext.Provider>
	)
}
