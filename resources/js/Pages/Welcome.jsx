import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Landing/Navbar';
import Hero from '@/Components/Landing/Hero';
import Stats from '@/Components/Landing/Stats';
import Services from '@/Components/Landing/Services';
import BookingWizard from '@/Components/Landing/BookingWizard';
import Testimonials from '@/Components/Landing/Testimonials';
import FAQ from '@/Components/Landing/FAQ';
import Footer from '@/Components/Landing/Footer';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Paws & Relax PetHub" />
            <div className="min-h-screen bg-white">
                <Navbar auth={auth} />
                <main>
                    <Hero />
                    <Stats />
                    <Services />
                    <BookingWizard />
                    <Testimonials />
                    <FAQ />
                    {/* Booking Wizard akan diletakkan di sini */}
                </main>
                <Footer />
            </div>
        </>
    );
}