import Header from '../components/partials/Header/Header'
import Hero from '../components/Hero/Hero'
import Welcome from '../components/Welcome/Welcome'
import ChooseUs from '../components/Choose/ChooseUs'
import Moment from '../components/Moments/Moment'
import Services from '../components/Services/Services'
import Threads from '../components/Threads/Threads'
import Benefits from '../components/Benefits/Benefits'
import Classes from '../components/Classes/Classes'
import Wellness from '../components/Wellness/Wellness'
import Trainer from '../components/Trainer/Trainer'
import Testimonials from '../components/Testimonials/Testimonials'
import Subscribe from '../components/Subscribe/Subscribe'
import Footer from '../components/partials/Footer/Footer'

function Home() {

    return (
        <>
            <Header />
            <main>
                <Hero />
                <Welcome />
                <ChooseUs />
                <Moment />
                <Services />
                <Threads />
                <Benefits />
                <Classes />
                {/*<Wellness />
                <Trainer />
                <Testimonials />
                <Subscribe />  */}
            </main>
            <Footer />
        </>
    )
}

export default Home