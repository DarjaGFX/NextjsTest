import loader from 'react-loader-spinner';
const About = () => {
	if (typeof window !== 'undefined') {
		sessionStorage.setItem('ss', 'hi from ali');
		localStorage.setItem('ls', 'hi from ali');
	}
  return (
	<>
		<div>About</div>
		<loader>sas</loader>
	</>
  )
}

export default About