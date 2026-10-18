import React, { useState, useEffect } from 'react';
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
import { RegistrationConfirmationModal } from './components/RegistrationConfirmationModal';
import { InviteFamilyModal } from './components/InviteFamilyModal';
import { RedeemInvitationModal } from './components/RedeemInvitationModal';
import { AdminPanel } from './components/AdminPanel';
import { TournamentSettings, RegistrationRecord } from './types';
import {
  loadSettings,
  updateRegistrationWhatsAppStatus,
  DEFAULT_SETTINGS,
} from './lib/supabase';

export default function App() {
  const [rulesModalOpen, setRulesModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [inviteFamilyModalOpen, setInviteFamilyModalOpen] = useState(false);
  const [redeemModalOpen, setRedeemModalOpen] = useState(false);

  const [inviteParams, setInviteParams] = useState<{
    inviterName: string;
    suggestedName?: string;
  }>({
    inviterName: '',
    suggestedName: '',
  });

  // Dynamic tournament settings (prizes, whatsapp link, supabase keys)
  const [settings, setSettings] = useState<TournamentSettings>(DEFAULT_SETTINGS);

  // Confirmation modal state for newly registered player
  const [confirmationRecord, setConfirmationRecord] = useState<RegistrationRecord | null>(null);

  useEffect(() => {
    const initialSettings = loadSettings();
    setSettings(initialSettings);

    // Detect if user arrives via WhatsApp invitation link (?invitado=true...)
    if (typeof window !== 'undefined' && window.location.search) {
      const params = new URLSearchParams(window.location.search);
      const isInvited =
        params.get('invitado') === 'true' ||
        params.has('invitado_por') ||
        params.has('codigo');
      const inviter = params.get('invitado_por') || params.get('de') || '';
      const suggested = params.get('nombre_invitado') || params.get('para') || '';

      if (isInvited) {
        setInviteParams({
          inviterName: inviter || 'Un familiar o amigo',
          suggestedName: suggested,
        });
        setRedeemModalOpen(true);
      }
    }
  }, []);

  const scrollToRegistration = () => {
    const el = document.getElementById('inscripcion');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRegistrationSuccess = (record: RegistrationRecord) => {
    setConfirmationRecord(record);
  };

  const handleJoinedWhatsApp = async (recordId: string) => {
    await updateRegistrationWhatsAppStatus(recordId, true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-stone-800 selection:bg-[#00C2D1]/30 selection:text-stone-900 pb-12 sm:pb-0">
      {/* Top Header */}
      <Header
        onRegisterClick={scrollToRegistration}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* Main Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onRegisterClick={scrollToRegistration} />

        {/* 2. Cómo Funciona el Torneo */}
        <HowItWorks onRegisterClick={scrollToRegistration} />

        {/* 3. Sistema de Puntos - 500 Puntos */}
        <PointsProgress />

        {/* 4. Premios Que Sí Se Usan en Casa (Configurable from Admin) */}
        <Prizes
          onRegisterClick={scrollToRegistration}
          settings={settings}
        />

        {/* 5. Formulario de Inscripción y Generación de Cartón */}
        <RegistrationForm
          onRegistrationSuccess={handleRegistrationSuccess}
          onOpenRulesModal={() => setRulesModalOpen(true)}
          onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
          onInviteAnother={() => setInviteFamilyModalOpen(true)}
        />

        {/* 6. Reglas Oficiales Completas */}
        <RulesAccordion />

        {/* 7. Preguntas Frecuentes (FAQ) */}
        <FAQSection />

        {/* Community, Transparency & Ad Copy Consistency */}
        <CommunityTrust />
      </main>

      {/* 8. Footer Legal with Admin Link */}
      <Footer
        onOpenRulesModal={() => setRulesModalOpen(true)}
        onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* Sticky Mobile CTA (<= 15% mobile viewport height) */}
      <StickyMobileCTA onRegisterClick={scrollToRegistration} />

      {/* Mandatory WhatsApp Confirmation Modal */}
      <RegistrationConfirmationModal
        record={confirmationRecord}
        whatsappGroupLink={settings.whatsappGroupLink}
        onClose={() => setConfirmationRecord(null)}
        onJoinedWhatsApp={handleJoinedWhatsApp}
        onInviteAnother={() => setInviteFamilyModalOpen(true)}
      />

      {/* Inscribir Otro Familiar Modal (Opens WhatsApp with redemption link) */}
      <InviteFamilyModal
        isOpen={inviteFamilyModalOpen}
        onClose={() => setInviteFamilyModalOpen(false)}
        inviterName={confirmationRecord?.fullName || 'Un participante de los Bingos Comunitarios'}
      />

      {/* Redimir Invitación Modal (When arriving via WhatsApp link) */}
      <RedeemInvitationModal
        isOpen={redeemModalOpen}
        onClose={() => setRedeemModalOpen(false)}
        inviterName={inviteParams.inviterName}
        suggestedName={inviteParams.suggestedName}
        onRedeemSuccess={(record) => {
          setConfirmationRecord(record);
          setRedeemModalOpen(false);
        }}
        onOpenRulesModal={() => setRulesModalOpen(true)}
        onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
      />

      {/* Administrative Panel Modal */}
      <AdminPanel
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        settings={settings}
        onSettingsUpdated={(newSettings) => setSettings(newSettings)}
      />

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
