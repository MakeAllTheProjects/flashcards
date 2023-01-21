import { 
  useCallback,
  useEffect,
  useState, 
} from 'react'
import _ from 'lodash'

import './AppBackground.scss'

export const AppBackground = ({ children }) => {
  const defaultPaperRatio = 0.7727
  const [lines, setLines] = useState([])
  const [lineCount, setLineCount] = useState(33)
  const [windowRatio, setWindowRatio] = useState(defaultPaperRatio)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [paperHeight, setPaperHeight] = useState(window.innerHeight)
  const [paperWidth, setPaperWidth] = useState(window.innerWidth)

  const updateWindowSize = useCallback(
    () => {
      setWindowHeight(window.innerHeight)
      setWindowWidth(window.innerWidth)
      setWindowRatio(window.innerWidth / window.innerHeight)
    },
    [
      window.innerHeight, 
      window.innerWidth
    ]
  )

  const updatePaperSize = useCallback(
    () => {
      if (windowRatio > defaultPaperRatio) {
        setPaperHeight(windowWidth * 1.294117647058824)
        setPaperWidth(windowWidth)
      } else if (windowRatio > defaultPaperRatio) {
        setPaperHeight(windowWidth)
        setPaperWidth(windowWidth)
      }
    },
    [
      windowRatio,
      defaultPaperRatio,
      windowWidth,
    ]
  )

  const updateLineCount = useCallback(
    () => {
      if (windowRatio > defaultPaperRatio) {
        setLineCount(Math.round(33 / windowRatio))
      }
    },
    [
      windowRatio,
      defaultPaperRatio
    ]
  )

  const updateLines = useCallback(
    () => {
      const newLines = []
      _.times(lineCount, (i) => {
        newLines.push(<div className='blue-line' key={`blue-line-${i + 1}`} />)
      })
      setLines(newLines)
    },
    [lineCount]
  )

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
    updateLines()
  }, [lineCount])

  return (
    <div className="app-background-container">

      <div className="holes-container">
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
