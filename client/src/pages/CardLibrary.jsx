import './CardLibrary.scss'
import viewCardsIcon from '../assets/svg/sketch-style/018-layers.svg'
import {
  PageWrapper
} from '../components'

export const CardLibrary = () => {
  return (
    <PageWrapper
      pageTitle="Card Library"
      cornerIcon={{
        icon: viewCardsIcon
      }}
    >
      Card Library
    </PageWrapper>
  )
}
