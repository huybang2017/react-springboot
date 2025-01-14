import BestChoice from '../../components/home/BestChoice.jsx'
import BrandDisplay from '../../components/home/BrandDisplay.jsx'
import NewsSection from '../../components/home/NewsSection.jsx'
import ProductDetail from '../../components/home/ProductDetail.jsx'
import { ModalProductProminent } from '../../components/home/ModalProductProminent.jsx'
const PageHome = () => {
  return (
    <>
      <ModalProductProminent />
      <ProductDetail />
      <BestChoice />
      <NewsSection />
      <BrandDisplay />
    </>
  )
}

export default PageHome
