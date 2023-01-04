import '../styles/globals.css'
import Layout from '../components/Layout'
import { ProvideAuth } from '../hooks/use-auth'

function MyApp({ Component, pageProps }) {
  return (
		<ProvideAuth>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ProvideAuth>
  )
}

export default MyApp
