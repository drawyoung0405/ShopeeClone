import RegisterHeader from '../../Components/RegisterHeader'
import Footer from '../../Footer'

interface Props {
  children?: React.ReactNode
}
export default function RegisterLayout({ children }: Props) {
  return (
    <div>
      <RegisterHeader />
      {children}
      <Footer />
    </div>
  )
}
