import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { PointsProgress } from './components/PointsProgress';
import { Prizes } from './components/Prizes';
import { RegistrationForm } from './components/RegistrationForm';
import { RulesAccordion } from './components/RulesAccordion';
import { FAQSection } from './components/FAQSection';
import { CommunityTrust } from './components/CommunityTrust';
import { Footer } from './components/Footer';
import { StickyMobileCTA } from './components/StickyMobileCTA';
import { LegalModals } from './components/LegalModals';
import { BingoCardData } from './types';

export default function App() {
  const [rulesModalOpen, setRulesModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const scrollToRegistration = () => {
    const el = document.getElementById('inscripcion');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-stone-800 selection:bg-[#00C2D1]/30 selection:text-stone-900 pb-12 sm:pb-0">
      {/* Top Header */}
      <Header onRegisterClick={scrollToRegistration} />

      {/* Main Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onRegisterClick={scrollToRegistration} />

        {/* 2. Cómo Funciona el Torneo */}
        <HowItWorks onRegisterClick={scrollToRegistration} />

        {/* 3. Sistema de Puntos - 500 Puntos */}
        <PointsProgress />

        {/* 4. Premios Que Sí Se Usan en Casa */}
        <Prizes onRegisterClick={scrollToRegistration} />

        {/* 5. Formulario de Inscripción y Generación de Cartón */}
        <RegistrationForm
          onOpenRulesModal={() => setRulesModalOpen(true)}
          onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
        />

        {/* 6. Reglas Oficiales Completas */}
        <RulesAccordion />

        {/* 7. Preguntas Frecuentes (FAQ) */}
        <FAQSection />

        {/* Community, Transparency & Ad Copy Consistency */}
        <CommunityTrust />
      </main>

      {/* 8. Footer Legal */}
      <Footer
        onOpenRulesModal={() => setRulesModalOpen(true)}
        onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
      />

      {/* Sticky Mobile CTA (<= 15% mobile viewport height) */}
      <StickyMobileCTA onRegisterClick={scrollToRegistration} />

      {/* Legal Modals (Bases del Torneo & Ley 1581) */}
      <LegalModals
        rulesOpen={rulesModalOpen}
        privacyOpen={privacyModalOpen}
        onClose={() => {
          setRulesModalOpen(false);
          setPrivacyModalOpen(false);
        }}
      />
    </div>
  );
}
